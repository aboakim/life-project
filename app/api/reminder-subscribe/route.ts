import { randomUUID as cryptoRandomUUID } from "node:crypto";
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

/** When user enters miles (no ~7 day opt-in), schedule one nudge this many days out. */
const MILES_FOLLOWUP_DAYS = 3;

function computeNextNudgeAt(
  now: Date,
  returnIn7Days: boolean,
  miles: number | null,
): Date | undefined {
  if (returnIn7Days) return addDays(now, 7);
  if (miles != null) return addDays(now, MILES_FOLLOWUP_DAYS);
  return undefined;
}

/** Whole number 0..999_999 or null if omitted. */
function parseMilesFromBody(body: Record<string, unknown>): number | null | "invalid" {
  if (
    !("miles" in body) ||
    body.miles === "" ||
    body.miles === null ||
    body.miles === undefined
  ) {
    return null;
  }
  const raw = body.miles;
  const n =
    typeof raw === "number"
      ? raw
      : Number(String(raw).trim().replace(/,/g, ""));
  if (!Number.isFinite(n) || n < 0) return "invalid";
  if (!Number.isInteger(n)) return "invalid";
  if (n > 999_999) return "invalid";
  return n;
}

async function handleReminderSubscribe(req: Request): Promise<NextResponse> {
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

  const milesParsed = parseMilesFromBody(body);
  if (milesParsed === "invalid") {
    return NextResponse.json({ error: "invalid_miles" }, { status: 400 });
  }

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
    const nextAt = computeNextNudgeAt(now, returnIn7Days, milesParsed);
    row = await prisma.decisionReminderSubscriber.upsert({
      where: { email },
      create: {
        email,
        firstName,
        lastName,
        locale: locale || undefined,
        miles: milesParsed,
        nextNudgeAt: nextAt,
        unsubscribeToken: cryptoRandomUUID(),
      },
      update: {
        firstName,
        lastName,
        locale: locale || undefined,
        emailOptOutAt: null,
        miles: milesParsed,
        ...(nextAt !== undefined ? { nextNudgeAt: nextAt } : {}),
      },
    });
  } catch (e) {
    /* DB missing/misconfigured in prod is common; do not block analysis. */
    console.error(
      "[reminder-subscribe] database unavailable — using client-only id (fix DATABASE_URL + migrations on Vercel for reminders)",
      e,
    );
    const fallbackId = `local_${cryptoRandomUUID()}`;
    return NextResponse.json(
      { ok: true as const, subscriberId: fallbackId, persistence: "none" as const },
      { status: 200 },
    );
  }

  if (!existing) {
    const base =
      (process.env.NEXT_PUBLIC_SITE_URL ?? "https://lifedecisions.space").replace(
        /\/$/,
        "",
      );
    const unsubscribeUrl = `${base}/api/reminder-unsubscribe?t=${encodeURIComponent(row.unsubscribeToken)}`;
    void sendDecisionReminderWelcome({
      to: row.email,
      firstName: row.firstName,
      unsubscribeUrl,
      miles: row.miles,
    }).then((r) => {
      if (!r.ok) {
        console.error("[reminder-subscribe] welcome email failed", r.error);
      }
    });
  }

  return NextResponse.json({ ok: true as const, subscriberId: row.id });
}

export async function POST(req: Request) {
  try {
    return await handleReminderSubscribe(req);
  } catch (e) {
    console.error(
      "[reminder-subscribe] uncaught — still returning a client id so analysis can run",
      e,
    );
    return NextResponse.json(
      {
        ok: true as const,
        subscriberId: `local_${cryptoRandomUUID()}`,
        persistence: "none" as const,
      },
      { status: 200 },
    );
  }
}
