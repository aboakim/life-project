/**
 * Stable photo covers for blog cards (home news + /blog index).
 * Uses self-hosted /public assets — no remote hops.
 */

const COVER_POOL = [
  "/home/story-overview-0.jpg",
  "/home/story-overview-1.jpg",
  "/home/story-overview-2.jpg",
  "/home/story-trust-0.jpg",
  "/home/story-trust-1.jpg",
  "/home/story-trust-2.jpg",
  "/home/story-how-0.jpg",
  "/home/story-how-1.jpg",
  "/home/story-how-2.jpg",
  "/home/story-fixes-0.jpg",
  "/home/story-fixes-1.jpg",
  "/home/story-fixes-2.jpg",
  "/home/product-0.jpg",
  "/home/product-1.jpg",
  "/home/product-2.jpg",
  "/home/product-3.jpg",
  "/home/product-4.jpg",
  "/home/product-5.jpg",
  "/home/thematic-a.jpg",
  "/home/thematic-b.jpg",
  "/hero/slide-1.jpg",
  "/hero/slide-2.jpg",
  "/hero/slide-3.jpg",
  "/hero/slide-4.jpg",
  "/hero/slide-5.jpg",
  "/hero/slide-6.jpg",
] as const;

const TAG_COVER: Record<string, string> = {
  career: "/home/story-fixes-0.jpg",
  relocation: "/home/story-overview-2.jpg",
  relationships: "/home/story-trust-0.jpg",
  money: "/home/product-2.jpg",
  finance: "/home/product-2.jpg",
  psychology: "/home/story-trust-1.jpg",
  parenting: "/home/story-fixes-2.jpg",
  education: "/home/story-how-0.jpg",
  business: "/home/product-1.jpg",
  framework: "/home/story-how-1.jpg",
  "decision-making": "/hero/slide-2.jpg",
};

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function getBlogPostCover(
  slug: string,
  tags: readonly string[] = [],
): { src: string; alt: string } {
  for (const tag of tags) {
    const key = tag.toLowerCase();
    const matched = TAG_COVER[key];
    if (matched) {
      return { src: matched, alt: "" };
    }
  }
  const src = COVER_POOL[hashSlug(slug) % COVER_POOL.length]!;
  return { src, alt: "" };
}
