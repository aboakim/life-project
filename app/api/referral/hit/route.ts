import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { prisma } from "@/lib/prisma";
import { rateLimitAllow } from "@/lib/rate-limit";
import {
  REFERRAL_VID_COOKIE,
  generateReferralCode,
  hashVisitorKey,
  normalizeReferralCode,
} from "@/lib/referral";
import { getReferralStatus } from "@/lib/referral-server";

export const runtime = "nodejs";

function readCookie(req: Request, name: string): string | null {
  const raw = req.headers.get("cookie") ?? "";
  for (const part of raw.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("=") || "");
  }
  return null;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimitAllow(`referral-hit:${ip}`, 120, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { code?: unknown };
  try {
    body = (await req.json()) as { code?: unknown };
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const code = normalizeReferralCode(body.code);
  if (!code) {
    return NextResponse.json({ error: "invalid_code" }, { status: 400 });
  }

  let vid = readCookie(req, REFERRAL_VID_COOKIE);
  if (!vid || vid.length < 8) {
    vid = generateReferralCode() + generateReferralCode();
  }
  const visitorKey = hashVisitorKey(ip, vid);

  try {
    const owner = await prisma.referralOwner.findUnique({ where: { code } });
    if (!owner) {
      return NextResponse.json({ error: "unknown_code" }, { status: 404 });
    }

    // Owner opening their own link must not count.
    // We cannot know ownership server-side without a secret; skip same IP+vid
    // is enough for uniqueness — self-hits still possible via different browser.
    // Optional: client sends ownerCode; if equal, skip. Handled below via header.
    const ownerCodeHdr = normalizeReferralCode(
      req.headers.get("x-lde-owner-code"),
    );
    if (ownerCodeHdr && ownerCodeHdr === code) {
      const status = await getReferralStatus(code);
      const res = NextResponse.json({ ...status, counted: false, self: true });
      res.cookies.set(REFERRAL_VID_COOKIE, vid, {
        path: "/",
        maxAge: 60 * 60 * 24 * 400,
        sameSite: "lax",
        httpOnly: false,
      });
      return res;
    }

    try {
      await prisma.referralHit.create({
        data: { code, visitorKey },
      });
    } catch {
      /* unique violation — already counted */
    }

    const status = await getReferralStatus(code);
    const res = NextResponse.json({ ...status, counted: true });
    res.cookies.set(REFERRAL_VID_COOKIE, vid, {
      path: "/",
      maxAge: 60 * 60 * 24 * 400,
      sameSite: "lax",
      httpOnly: false,
    });
    return res;
  } catch (e) {
    console.error("[referral/hit]", e);
    return NextResponse.json({ error: "db_unavailable" }, { status: 503 });
  }
}
