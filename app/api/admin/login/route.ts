import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { readAdminSecret } from "@/lib/admin-env";
import { ADMIN_COOKIE_NAME, signAdminToken } from "@/lib/admin-cookie";
import { rateLimitAllow } from "@/lib/rate-limit";
import { safeEqualString } from "@/lib/secure-compare";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimitAllow(`adminLogin:${ip}`, MAX_ATTEMPTS, WINDOW_MS)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const secret = readAdminSecret();
  if (!secret) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const pwd = typeof body.password === "string" ? body.password : "";
  if (!safeEqualString(pwd, secret)) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const token = signAdminToken(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
