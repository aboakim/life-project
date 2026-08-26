/**
 * Monetag — all active zone formats (In-Page Push, Vignette, MultiTag).
 * Zone IDs override via env; set a zone to empty string to disable that format only.
 * Master kill switch: NEXT_PUBLIC_MONETAG_ENABLED=0
 */

export const MONETAG_CONSENT_STORAGE_KEY = "lde.consent.v1";
export const MONETAG_CONSENT_EVENT = "lde-consent-change";

/** In-Page Push (nap5k.com/tag.min.js) */
export function monetagInPageZone(): string {
  const v = process.env.NEXT_PUBLIC_MONETAG_INPAGE_ZONE;
  if (v !== undefined) return v.trim();
  return "11546283";
}

/** Vignette banner (n6wxm.com/vignette.min.js) */
export function monetagVignetteZone(): string {
  const v = process.env.NEXT_PUBLIC_MONETAG_VIGNETTE_ZONE;
  if (v !== undefined) return v.trim();
  return "11546678";
}

/** MultiTag / secondary (quge5.com/88/tag.min.js) — covers extra formats in dashboard */
export function monetagMultitagZone(): string {
  const v = process.env.NEXT_PUBLIC_MONETAG_MULTITAG_ZONE;
  if (v !== undefined) return v.trim();
  return "268879";
}

/** Master switch — set to "0" to disable all Monetag. */
export function monetagEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_MONETAG_ENABLED?.trim();
  if (flag === "0" || flag === "false") return false;
  return Boolean(
    monetagInPageZone() || monetagVignetteZone() || monetagMultitagZone(),
  );
}

/**
 * Content pages only — never analyzer focus, admin, or form-heavy flows.
 */
const ALLOW_PREFIXES = [
  "/",
  "/blog",
  "/monetize",
  "/faq",
  "/about",
  "/field-notes",
  "/playbooks",
  "/checklists",
  "/how-we-use-ai",
  "/editorial-standards",
  "/editorial-team",
  "/cookies",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/content-policy",
  "/contact",
  "/experts",
  "/pricing",
  "/community",
] as const;

const BLOCK_PREFIXES = [
  "/analyze",
  "/admin",
  "/experts/register",
  "/api",
] as const;

export function isMonetagPathAllowed(pathname: string): boolean {
  const path = pathname.split("?")[0] || "/";
  for (const blocked of BLOCK_PREFIXES) {
    if (path === blocked || path.startsWith(`${blocked}/`)) return false;
  }
  for (const allowed of ALLOW_PREFIXES) {
    if (allowed === "/") {
      if (path === "/") return true;
      continue;
    }
    if (path === allowed || path.startsWith(`${allowed}/`)) return true;
  }
  return false;
}
