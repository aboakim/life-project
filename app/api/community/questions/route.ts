import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { prisma } from "@/lib/prisma";
import { rateLimitAllow } from "@/lib/rate-limit";

export const runtime = "nodejs";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_POSTS_PER_HOUR = 8;
const MAX_LIST = 40;

function clean(s: unknown, max: number): string {
  if (typeof s !== "string") return "";
  const t = s.trim();
  return t.length > max ? t.slice(0, max) : t;
}

export async function GET() {
  const rows = await prisma.communityQuestion.findMany({
    where: { status: "visible" },
    orderBy: { createdAt: "desc" },
    take: MAX_LIST,
    include: {
      answers: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return NextResponse.json(
    { questions: rows },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimitAllow(`q:${ip}`, MAX_POSTS_PER_HOUR, WINDOW_MS)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const authorName = clean(body.authorName, 80);
  const authorEmailRaw = clean(body.authorEmail, 120);
  const title = clean(body.title, 200);
  const bodyText = clean(body.body, 5000);
  const locale =
    typeof body.locale === "string" ? body.locale.trim().slice(0, 12) : undefined;

  if (authorName.length < 1 || authorName.length > 80) {
    return NextResponse.json({ error: "validation_name" }, { status: 400 });
  }
  if (title.length < 3 || title.length > 200) {
    return NextResponse.json({ error: "validation_title" }, { status: 400 });
  }
  if (bodyText.length < 10 || bodyText.length > 5000) {
    return NextResponse.json({ error: "validation_body" }, { status: 400 });
  }

  let authorEmail: string | undefined;
  if (authorEmailRaw) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmailRaw)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    authorEmail = authorEmailRaw;
  }

  const q = await prisma.communityQuestion.create({
    data: {
      authorName,
      authorEmail,
      title,
      body: bodyText,
      locale,
      status: "visible",
    },
    include: { answers: true },
  });

  return NextResponse.json({ question: q });
}
