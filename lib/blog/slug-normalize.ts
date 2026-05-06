/**
 * URL-safe tag / blog segment normalization (shared by middleware + data layer).
 * Keeps edge bundles small — do not import `posts.ts` from middleware.
 */

export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\+/g, " ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Unify `/blog/foo-bar`, `/blog/foo bar`, and casing for lookups + redirects. */
export function normalizeBlogSegment(segment: string): string {
  return tagToSlug(segment.replace(/-/g, " "));
}

/**
 * Decode `%20`, `+`, and occasional double-encoding before slugify.
 * Without this, literal `%20` in a path segment becomes `20` after `[^a-z0-9...]` stripping.
 */
export function safeDecodeUrlSegment(segment: string): string {
  let s = segment.replace(/\+/g, " ");
  for (let i = 0; i < 3; i++) {
    try {
      const next = decodeURIComponent(s);
      if (next === s) break;
      s = next;
    } catch {
      break;
    }
  }
  return s;
}

/** Segment as stored in canonical URLs: decode → hyphenated lowercase. */
export function canonicalBlogPathSegment(segment: string): string {
  return normalizeBlogSegment(safeDecodeUrlSegment(segment));
}
