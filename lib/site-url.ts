/**
 * Safe site URL for metadata, sitemap, robots.
 * Empty or invalid NEXT_PUBLIC_SITE_URL must not crash the app (new URL("") throws).
 */
const FALLBACK = "https://lifedecisions.space";

function normalizeEnvUrl(raw: string | undefined): string {
  if (raw == null) return "";
  let s = raw.trim();
  // Strip common .env quoting mistakes: NEXT_PUBLIC_SITE_URL="https://x.com"
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

export function getSiteUrlString(): string {
  const raw = normalizeEnvUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (!raw) return FALLBACK;
  try {
    let href = raw;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(href)) {
      href = `https://${href}`;
    }
    const u = new URL(href);
    if (!u.hostname) return FALLBACK;
    return u.origin;
  } catch {
    return FALLBACK;
  }
}

export function getMetadataBase(): URL {
  try {
    return new URL(getSiteUrlString());
  } catch {
    return new URL(FALLBACK);
  }
}
