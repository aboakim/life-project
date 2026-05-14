import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSiteAccessLogSecret } from "@/lib/site-access-log";
import { safeEqualString } from "@/lib/secure-compare";

export const runtime = "nodejs";

function parseBearer(auth: string | null): string | null {
  if (!auth || !auth.startsWith("Bearer ")) return null;
  const t = auth.slice(7).trim();
  return t.length > 0 ? t : null;
}

function validPath(p: unknown): p is string {
  if (typeof p !== "string" || p.length === 0 || p.length > 512) return false;
  if (!p.startsWith("/")) return false;
  if (p.includes("\0") || p.includes("..")) return false;
  return true;
}

/**
 * Ingest one access row from Edge middleware (Bearer SITE_ACCESS_LOG_SECRET).
 * Not for browser use — no CORS; same-origin fetch from middleware only.
 */
export async function POST(req: Request) {
  const secret = readSiteAccessLogSecret();
  if (secret.length < 16) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const token = parseBearer(req.headers.get("authorization"));
  if (!token || !safeEqualString(token, secret)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "bad_body" }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const path = o.path;
  if (!validPath(path)) {
    return NextResponse.json({ error: "invalid_path" }, { status: 400 });
  }

  const method =
    typeof o.method === "string" && o.method.length <= 8 ? o.method : "GET";
  const country =
    typeof o.country === "string" ? o.country.slice(0, 8) : null;
  const referer =
    typeof o.referer === "string" ? o.referer.slice(0, 512) : null;
  const ua = typeof o.ua === "string" ? o.ua.slice(0, 240) : null;

  await prisma.siteAccessLog.create({
    data: {
      method,
      path,
      country: country && country.length > 0 ? country : null,
      referer: referer && referer.length > 0 ? referer : null,
      ua: ua && ua.length > 0 ? ua : null,
    },
  });

  return NextResponse.json({ ok: true });
}
