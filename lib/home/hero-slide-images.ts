/**
 * Self-hosted home images under /public/hero and /public/home.
 * Mirrored via `node scripts/mirror-home-images.mjs` — no runtime Unsplash hop.
 */
/** Smaller derivative for server-rendered home LCP (`scripts/optimize-hero-lcp.mjs`). */
export const HERO_LCP_IMAGE_URL = "/hero/slide-0-lcp.jpg";

/** Looping hero video on `/` (poster uses HERO_LCP_IMAGE_URL for fast first paint). */
export const HERO_VIDEO_URL = "/hero/AI_Decisions.mp4";

export const HERO_SLIDE_IMAGE_URLS = [
  "/hero/slide-0.jpg",
  "/hero/slide-1.jpg",
  "/hero/slide-2.jpg",
  "/hero/slide-3.jpg",
  "/hero/slide-4.jpg",
  "/hero/slide-5.jpg",
  "/hero/slide-6.jpg",
] as const;

export const PRODUCT_STRIP_IMAGE_URLS = [
  "/home/product-0.jpg",
  "/home/product-1.jpg",
  "/home/product-2.jpg",
  "/home/product-3.jpg",
  "/home/product-4.jpg",
  "/home/product-5.jpg",
] as const;
