/**
 * Monetag (ex-PropellerAds) — controlled loading.
 *
 * Defaults: In-Page Push only, never vignette/onclick globally.
 * Zone IDs can be overridden via env. Leave empty to disable that format.
 */

export const MONETAG_CONSENT_STORAGE_KEY = "lde.consent.v1";
export const MONETAG_CONSENT_EVENT = "lde-consent-change";

/** In-Page Push — corner notice; least disruptive Monetag format we use. */
export function monetagInPageZone(): string {
  return (
    process.env.NEXT_PUBLIC_MONETAG_INPAGE_ZONE?.trim() ||
    "11546283"
  );
}

/**
 * Optional MultiTag / secondary zone (quge5). Empty = off.
 * Set NEXT_PUBLIC_MONETAG_MULTITAG_ZONE=268879 to enable.
 */
export function monetagMultitagZone(): string {
  return process.env.NEXT_PUBLIC_MONETAG_MULTITAG_ZONE?.trim() || "";
}

/** Master switch — set to "0" to disable all Monetag. */
export function monetagEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_MONETAG_ENABLED?.trim();
  if (flag === "0" || flag === "false") return false;
  return Boolean(monetagInPageZone() || monetagMultitagZone());
}

/**
 * Content pages only — never analyzer focus, admin, or form-heavy flows.
 * In-Page Push still draws its own corner UI; we only choose *when* it can load.
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
