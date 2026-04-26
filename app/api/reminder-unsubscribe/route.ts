import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { prisma } from "@/lib/prisma";
import { rateLimitAllow } from "@/lib/rate-limit";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 40;

function htmlPage(title: string, body: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${title}</title></head><body style="font-family:system-ui,sans-serif;max-width:32rem;margin:3rem auto;padding:0 1rem;line-height:1.5;color:#222"><h1 style="font-size:1.1rem">${title}</h1><p>${body}</p><p style="margin-top:2rem;font-size:0.8rem;opacity:0.55"><a href="/">Home</a></p></body></html>`;
}

/**
 * One-click unsubscribe from optional reminder emails (GET from link in message).
 */
export async function GET(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimitAllow(`reminder-unsub:${ip}`, MAX_PER_WINDOW, WINDOW_MS)) {
    return new NextResponse("Too many requests.", { status: 429 });
  }

  const url = new URL(req.url);
  const t = url.searchParams.get("t")?.trim() ?? "";
  if (!t || t.length > 200) {
    return new NextResponse(
      htmlPage("Invalid link", "This unsubscribe link is incomplete or invalid."),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  try {
    const row = await prisma.decisionReminderSubscriber.findUnique({
      where: { unsubscribeToken: t },
      select: { id: true },
    });
    if (!row) {
      return new NextResponse(
        htmlPage(
          "Link not recognized",
          "This link may have expired or was already used. You can still ignore any future messages.",
        ),
        { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    }

    await prisma.decisionReminderSubscriber.update({
      where: { id: row.id },
      data: {
        emailOptOutAt: new Date(),
        nextNudgeAt: null,
      },
    });

    return new NextResponse(
      htmlPage(
        "You’re unsubscribed",
        "You won’t receive optional reminder emails from Life Decision Engine at this address. If you change your mind, you can sign up again from the analyzer (same email, with consent).",
      ),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  } catch (e) {
    console.error("[reminder-unsubscribe]", e);
    return new NextResponse(
      htmlPage("Something went wrong", "Please try again in a few minutes."),
      { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }
}
