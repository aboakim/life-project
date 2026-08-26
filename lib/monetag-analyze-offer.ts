/**
 * Monetag offer opened when the user clicks Analyze / Make a decision.
 * Opens in a new tab so the main SPA keeps running smoothly on /analyze.
 */

import { MONETAG_CONSENT_STORAGE_KEY, monetagEnabled } from "@/lib/monetag-config";

/** Zone used for Direct Link / OnClick-style offer on Analyze CTAs. */
export function monetagOnclickZone(): string {
  const v = process.env.NEXT_PUBLIC_MONETAG_ONCLICK_ZONE;
  if (v !== undefined) return v.trim();
  // One of the Excited tags — override with your OnClick/Direct Link zone from Monetag.
  return "11547425";
}

/**
 * Full Direct Link URL from Monetag dashboard (preferred).
 * Falls back to Monetag smartlink pattern: https://otieu.com/4/{zone}
 */
export function monetagDirectLinkUrl(): string {
  const custom = process.env.NEXT_PUBLIC_MONETAG_DIRECT_LINK?.trim();
  if (custom) return custom;
  const zone = monetagOnclickZone();
  if (!zone) return "";
  return `https://otieu.com/4/${encodeURIComponent(zone)}`;
}

function hasAdConsent(): boolean {
  try {
    return (
      typeof window !== "undefined" &&
      window.localStorage.getItem(MONETAG_CONSENT_STORAGE_KEY) === "accepted"
    );
  } catch {
    return false;
  }
}

/**
 * Call synchronously inside a click/submit handler (popup blockers).
 * Opens the Monetag offer in a new tab; current tab stays on the site.
 */
export function triggerMonetagOnAnalyzeClick(): void {
  if (typeof window === "undefined") return;
  if (!monetagEnabled()) return;
  if (!hasAdConsent()) return;

  const url = monetagDirectLinkUrl();
  if (!url) return;

  try {
    window.open(url, "_blank", "noopener,noreferrer");
  } catch {
    /* popup blocked or privacy mode — analyze flow continues anyway */
  }
}
