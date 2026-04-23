import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { sendDecisionReminderWelcome } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { rateLimitAllow } from "@/lib/rate-limit";
import { isTurnstileEnforced, verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_HOUR = 12;

function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

function addDays(from: Date, days: number): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimitAllow(`reminder-sub:${ip}`, MAX_PER_HOUR, WINDOW_MS)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const firstName =
    typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName =
    typeof body.lastName === "string" ? body.lastName.trim() : "";
  const emailRaw = typeof body.email === "string" ? body.email.trim() : "";
  const locale =
    typeof body.locale === "string" ? body.locale.trim().slice(0, 16) : null;
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  const consentOptIn = body.consent === true;
  const honeypot =
    typeof body.honeypot === "string" ? body.honeypot.trim() : "";
  const returnIn7Days = body.returnIn7Days === true;

  if (!consentOptIn) {
    return NextResponse.json({ error: "consent_required" }, { status: 400 });
  }
  if (honeypot !== "") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  if (!firstName || firstName.length > 80 || !lastName || lastName.length > 80) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const email = normalizeEmail(emailRaw);
  const ipForTurnstile = ip && ip !== "unknown" ? ip : undefined;

  if (isTurnstileEnforced()) {
    const captchaOk = await verifyTurnstileToken(turnstileToken, ipForTurnstile);
    if (!captchaOk) {
      return NextResponse.json({ error: "captcha_failed" }, { status: 400 });
    }
  }

  let existing;
  let row;
  try {
    existing = await prisma.decisionReminderSubscriber.findUnique({
      where: { email },
    });
    const now = new Date();
    row = await prisma.decisionReminderSubscriber.upsert({
      where: { email },
      create: {
        email,
        firstName,
        lastName,
        locale: locale || undefined,
        nextNudgeAt: returnIn7Days ? addDays(now, 7) : undefined,
      },
      update: {
        firstName,
        lastName,
        locale: locale || undefined,
        ...(returnIn7Days ? { nextNudgeAt: addDays(now, 7) } : {}),
      },
    });
  } catch (e) {
    console.error("[reminder-subscribe] db error", e);
    return NextResponse.json(
      { error: "save_failed" },
      { status: 503 },
    );
  }

  if (!existing) {
    void sendDecisionReminderWelcome({
      to: row.email,
      firstName: row.firstName,
    });
  }

  return NextResponse.json({ ok: true as const, subscriberId: row.id });
}
