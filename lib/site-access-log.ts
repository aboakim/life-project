import type { NextRequest } from "next/server";

/** Secret for POST /api/internal/site-access-log (middleware only; min length enforced in route). */
export function readSiteAccessLogSecret(): string {
  return process.env.SITE_ACCESS_LOG_SECRET?.trim() ?? "";
}

/**
 * Whether to enqueue a lightweight access row. Skips API/admin, prefetch/RSC fetches, and non-GET.
 */
export function shouldRecordSiteAccess(request: NextRequest): boolean {
  if (request.method !== "GET") return false;
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith("/") || pathname.length > 512) return false;
  if (pathname.startsWith("/admin")) return false;
  if (pathname.startsWith("/api")) return false;
  if (pathname.startsWith("/_next")) return false;
  if (pathname === "/favicon.ico" || pathname === "/robots.txt") return false;
  if (request.headers.get("next-router-prefetch") === "1") return false;
  const rsc = request.headers.get("rsc");
  if (rsc === "1") return false;
  if (readSiteAccessLogSecret().length < 16) return false;
  return true;
}

export function buildSiteAccessLogPayload(request: NextRequest): {
  method: string;
  path: string;
  country: string | null;
  referer: string | null;
  ua: string | null;
} {
  const path = request.nextUrl.pathname.slice(0, 512);
  const country = request.headers.get("x-vercel-ip-country")?.trim().slice(0, 8) || null;
  const refRaw = request.headers.get("referer")?.trim();
  const referer = refRaw ? refRaw.slice(0, 512) : null;
  const uaRaw = request.headers.get("user-agent")?.trim();
  const ua = uaRaw ? uaRaw.slice(0, 240) : null;
  return {
    method: "GET",
    path,
    country,
    referer,
    ua,
  };
}
