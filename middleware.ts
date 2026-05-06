import { NextResponse, type NextRequest } from "next/server";

import { canonicalBlogPathSegment } from "@/lib/blog/slug-normalize";

/**
 * Reject common probe/scan paths early (defense in depth; not a full WAF).
 * Does not replace Vercel firewall, dependency updates, or secrets hygiene.
 */
const BLOCK_PREFIX = [
  "/.env",
  "/.git",
  "/.svn",
  "/.aws",
  "/wp-admin",
  "/wp-includes",
  "/wp-content",
  "/wp-login",
  "/xmlrpc",
  "/phpmyadmin",
  "/pma",
  "/server-status",
  "/.kube",
] as const;

function isBlockedPath(pathname: string): boolean {
  const p = pathname.toLowerCase();
  for (const b of BLOCK_PREFIX) {
    if (p === b || p.startsWith(b + "/")) {
      return true;
    }
  }
  if (p.includes("..") || p.includes("%2e%2e")) {
    return true;
  }
  if (/(?:^|\/)config\.(ya?ml|json|env)(?:$|[/?#])/.test(p)) {
    return true;
  }
  if (/(?:^|\/)(?:id_rsa|id_dsa|\.htpasswd|\.htaccess)(?:$|[/?#])/i.test(p)) {
    return true;
  }
  return false;
}

/**
 * 301 space / odd-casing blog URLs to a single hyphenated lowercase slug so
 * crawlers consolidate on the canonical path (see GSC "Discovered" dupes).
 */
function redirectIfBlogPathNeedsNormalization(
  request: NextRequest,
): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "blog") return null;

  let normalized: string | null = null;

  if (segments.length === 2 && segments[1] !== "tag") {
    const raw = segments[1];
    const norm = canonicalBlogPathSegment(raw);
    if (norm && norm !== raw) normalized = `/blog/${norm}`;
  } else if (segments.length === 3 && segments[1] === "tag") {
    const raw = segments[2];
    const norm = canonicalBlogPathSegment(raw);
    if (norm && norm !== raw) normalized = `/blog/tag/${norm}`;
  }

  if (!normalized) return null;
  const url = request.nextUrl.clone();
  url.pathname = normalized;
  return NextResponse.redirect(url, 301);
}

export function middleware(request: NextRequest) {
  if (isBlockedPath(request.nextUrl.pathname)) {
    return new NextResponse(null, { status: 404 });
  }
  const blogRedirect = redirectIfBlogPathNeedsNormalization(request);
  if (blogRedirect) return blogRedirect;
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run on HTML + API, skip Next internals and static assets.
     * Extension list covers common public files; unknown extensions still get checked.
     */
    "/((?!_next/|_vercel/|favicon\\.ico|robots\\.txt|sitemap|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|avif|woff2?|ttf|eot|txt|xml|js|mjs|map|webmanifest|css|json|pdf)$).*)",
  ],
};
