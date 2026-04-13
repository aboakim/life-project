import { NextResponse } from "next/server";
import { sendContactNotifications } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
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
