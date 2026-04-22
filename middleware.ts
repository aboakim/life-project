import { NextResponse, type NextRequest } from "next/server";

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

export function middleware(request: NextRequest) {
  if (isBlockedPath(request.nextUrl.pathname)) {
    return new NextResponse(null, { status: 404 });
  }
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
