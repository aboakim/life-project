import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { prisma } from "@/lib/prisma";
import { rateLimitAllow } from "@/lib/rate-limit";

export const runtime = "nodejs";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_POSTS_PER_HOUR = 12;

function clean(s: unknown, max: number): string {
  if (typeof s !== "string") return "";
  const t = s.trim();
  return t.length > max ? t.slice(0, max) : t;
}

type Params = { params: Promise<{ id: string }> };

export async function POST(req: Request, ctx: Params) {
  const ip = getClientIp(req);
  if (!rateLimitAllow(`a:${ip}`, MAX_POSTS_PER_HOUR, WINDOW_MS)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const { id: questionId } = await ctx.params;
  if (!questionId) {
    return NextResponse.json({ error: "missing_id" }, { status: 400 });
  }

  const exists = await prisma.communityQuestion.findFirst({
    where: { id: questionId, status: "visible" },
  });
  if (!exists) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const authorName = clean(body.authorName, 80);
  const authorEmailRaw = clean(body.authorEmail, 120);
  const bodyText = clean(body.body, 8000);

  if (authorName.length < 1 || authorName.length > 80) {
    return NextResponse.json({ error: "validation_name" }, { status: 400 });
  }
  if (bodyText.length < 5 || bodyText.length > 8000) {
    return NextResponse.json({ error: "validation_body" }, { status: 400 });
  }

  let authorEmail: string | undefined;
  if (authorEmailRaw) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmailRaw)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    authorEmail = authorEmailRaw;
  }

  const answer = await prisma.communityAnswer.create({
    data: {
      questionId,
      authorName,
      authorEmail,
      body: bodyText,
    },
  });

  return NextResponse.json({ answer });
}
