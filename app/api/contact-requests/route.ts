import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { sendContactNotifications } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { rateLimitAllow } from "@/lib/rate-limit";

export const runtime = "nodejs";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_HOUR = 8;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimitAllow(`contact:${ip}`, MAX_PER_HOUR, WINDOW_MS)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const expertId =
    typeof body.expertId === "string" ? body.expertId.trim() : "";
  const clientName =
    typeof body.clientName === "string" ? body.clientName.trim() : "";
  const clientEmail =
    typeof body.clientEmail === "string" ? body.clientEmail.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const locale =
    typeof body.locale === "string" ? body.locale.trim() : undefined;

  if (!expertId || !clientName || !clientEmail || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const expert = await prisma.expert.findUnique({ where: { id: expertId } });
  if (!expert) {
    return NextResponse.json({ error: "Expert not found" }, { status: 404 });
  }

  await prisma.contactRequest.create({
    data: {
      expertId,
      clientName,
      clientEmail,
      message,
      locale,
    },
  });

  void sendContactNotifications({
    expertEmail: expert.email,
    expertName: expert.name,
    clientName,
    clientEmail,
    message,
    locale,
  });

  return NextResponse.json({ ok: true });
}
