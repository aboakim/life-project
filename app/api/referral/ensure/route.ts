import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { prisma } from "@/lib/prisma";
import { rateLimitAllow } from "@/lib/rate-limit";
import {
  generateReferralCode,
  normalizeReferralCode,
} from "@/lib/referral";
import { getReferralStatus } from "@/lib/referral-server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimitAllow(`referral-ensure:${ip}`, 40, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let preferred: string | null = null;
  try {
    const body = (await req.json()) as { code?: unknown };
    preferred = normalizeReferralCode(body.code);
  } catch {
    preferred = null;
  }

  try {
    if (preferred) {
      const existing = await prisma.referralOwner.findUnique({
        where: { code: preferred },
      });
      if (existing) {
        const status = await getReferralStatus(preferred);
        return NextResponse.json(status);
      }
    }

    for (let i = 0; i < 6; i++) {
      const code = preferred && i === 0 ? preferred : generateReferralCode();
      try {
        await prisma.referralOwner.create({ data: { code } });
        const status = await getReferralStatus(code);
        return NextResponse.json(status);
      } catch {
        preferred = null;
      }
    }
    return NextResponse.json({ error: "create_failed" }, { status: 500 });
  } catch (e) {
    console.error("[referral/ensure]", e);
    return NextResponse.json({ error: "db_unavailable" }, { status: 503 });
  }
}
