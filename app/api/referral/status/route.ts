import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { rateLimitAllow } from "@/lib/rate-limit";
import { normalizeReferralCode } from "@/lib/referral";
import { getReferralStatus } from "@/lib/referral-server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimitAllow(`referral-status:${ip}`, 120, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const url = new URL(req.url);
  const code = normalizeReferralCode(url.searchParams.get("code"));
  if (!code) {
    return NextResponse.json({ error: "invalid_code" }, { status: 400 });
  }

  try {
    const status = await getReferralStatus(code);
    if (!status) {
      return NextResponse.json({ error: "unknown_code" }, { status: 404 });
    }
    return NextResponse.json(status);
  } catch (e) {
    console.error("[referral/status]", e);
    return NextResponse.json({ error: "db_unavailable" }, { status: 503 });
  }
}
