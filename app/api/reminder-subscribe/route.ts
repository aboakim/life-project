import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { sendDecisionReminderWelcome } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { rateLimitAllow } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_HOUR = 12;

function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
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

  if (!firstName || firstName.length > 80 || !lastName || lastName.length > 80) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const email = normalizeEmail(emailRaw);
  const ipForTurnstile = ip && ip !== "unknown" ? ip : undefined;
  const captchaOk = await verifyTurnstileToken(turnstileToken, ipForTurnstile);
  if (!captchaOk) {
    return NextResponse.json({ error: "captcha_failed" }, { status: 400 });
  }

  const row = await prisma.decisionReminderSubscriber.upsert({
    where: { email },
    create: {
      email,
      firstName,
      lastName,
      locale: locale || undefined,
    },
    update: {
      firstName,
      lastName,
      locale: locale || undefined,
    },
  });

  void sendDecisionReminderWelcome({
    to: row.email,
    firstName: row.firstName,
  });

  return NextResponse.json({ ok: true as const, subscriberId: row.id });
}
