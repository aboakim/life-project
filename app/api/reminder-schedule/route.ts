import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { prisma } from "@/lib/prisma";
import { rateLimitAllow } from "@/lib/rate-limit";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 24;

const ALLOWED_DAYS = new Set([3, 7, 14]);

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimitAllow(`reminder-sch:${ip}`, MAX_PER_WINDOW, WINDOW_MS)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const subscriberId =
    typeof body.subscriberId === "string" ? body.subscriberId.trim() : "";
  const days = typeof body.days === "number" ? body.days : Number(body.days);

  if (!subscriberId || !ALLOWED_DAYS.has(days)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const next = new Date();
  next.setDate(next.getDate() + days);

  try {
    const row = await prisma.decisionReminderSubscriber.findUnique({
      where: { id: subscriberId },
      select: { emailOptOutAt: true },
    });
    if (!row) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    if (row.emailOptOutAt) {
      return NextResponse.json({ error: "opted_out" }, { status: 403 });
    }
    await prisma.decisionReminderSubscriber.update({
      where: { id: subscriberId },
      data: { nextNudgeAt: next },
    });
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true as const });
}
