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
