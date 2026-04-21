import { NextResponse } from "next/server";
import { readAdminSecret } from "@/lib/admin-env";
import { ADMIN_COOKIE_NAME, signAdminToken } from "@/lib/admin-cookie";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = readAdminSecret();
  if (!secret) {
    return NextResponse.json(
      { error: "Admin not configured (set ADMIN_SECRET in .env)" },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const pwd = typeof body.password === "string" ? body.password.trim() : "";
  if (pwd !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
