import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import {
  sendDecisionReminderNudge,
  sendDecisionReminderWelcome,
} from "@/lib/email";
import { rateLimitAllow } from "@/lib/rate-limit";

export const runtime = "nodejs";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_HOUR_PER_IP = 8;

type Body = {
  to?: string;
  firstName?: string;
  template?: "welcome" | "nudge";
  miles?: number | null;
};

function validEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

function parseMiles(raw: unknown): number | null | "invalid" {
  if (raw === undefined || raw === null || raw === "") return null;
  const n =
    typeof raw === "number"
      ? raw
      : Number(String(raw).trim().replace(/,/g, ""));
  if (!Number.isFinite(n) || n < 0 || !Number.isInteger(n) || n > 999_999) {
    return "invalid";
  }
  return n;
}

/**
 * One-off transactional send (welcome or nudge copy) to an explicit address.
 * Protect with REMINDER_SEND_SECRET — not for public clients.
 *
 *   curl -sS -X POST "https://lifedecisions.space/api/reminder-send-once" \
 *     -H "Authorization: Bearer $REMINDER_SEND_SECRET" \
 *     -H "Content-Type: application/json" \
 *     -d '{"to":"you@example.com","firstName":"Alex","template":"nudge","miles":12000}'
 */
export async function POST(req: Request) {
  const configured = process.env.REMINDER_SEND_SECRET?.trim();
  if (!configured) {
    return NextResponse.json(
      { error: "not_configured", hint: "Set REMINDER_SEND_SECRET on the host." },
      { status: 503 },
    );
  }

  const auth = req.headers.get("authorization");
  const bearer =
    auth?.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!bearer || bearer !== configured) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const ip = getClientIp(req);
  if (!rateLimitAllow(`rem-send-once:${ip}`, MAX_PER_HOUR_PER_IP, WINDOW_MS)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  if (!process.env.RESEND_API_KEY?.trim()) {
    return NextResponse.json({ error: "resend_not_configured" }, { status: 400 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const to = body.to?.trim();
  if (!to || !validEmail(to)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const milesParsed = parseMiles(body.miles);
  if (milesParsed === "invalid") {
    return NextResponse.json({ error: "invalid_miles" }, { status: 400 });
  }

  const firstName = (body.firstName?.trim() || "there").slice(0, 80);
  const template = body.template === "nudge" ? "nudge" : "welcome";

  const result =
    template === "nudge"
      ? await sendDecisionReminderNudge({
          to,
          firstName,
          miles: milesParsed,
        })
      : await sendDecisionReminderWelcome({
          to,
          firstName,
          miles: milesParsed,
        });

  if (!result.ok) {
    return NextResponse.json(
      { error: "send_failed", detail: result.error },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true as const,
    template,
    resendId: result.resendId,
  });
}
