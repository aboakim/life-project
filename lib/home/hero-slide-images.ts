/**
 * Self-hosted hero slides. Mirrored once from images.unsplash.com (curated set)
 * into /public/hero/ so they share the Vercel edge cache with the page HTML —
 * eliminates a third-party DNS+TLS hop and the cold-region image optimizer
 * miss that was pushing LCP into the "needs improvement" range (≥3s) for the
 * US/EU. `next/image` still re-encodes (AVIF/WebP) and srcset-resizes them.
 */
export const HERO_SLIDE_IMAGE_URLS = [
  // 0 · scenarios / horizon — see farther before you commit (LCP slide)
  "/hero/slide-0.jpg",
  // 1 · structured lens, not guesswork — plans & measurement
  "/hero/slide-1.jpg",
  // 2 · humans in the loop — expertise
  "/hero/slide-2.jpg",
  // 3 · calm workspace — career, relocation, life forks
  "/hero/slide-3.jpg",
  // 4 · score & timeline — clarity / metrics (not decorative stars)
  "/hero/slide-4.jpg",
  // 5 · fork in the road — name the paths
  "/hero/slide-5.jpg",
  // 6 · reflection — write, pause, revisit
  "/hero/slide-6.jpg",
] as const;

export const PRODUCT_STRIP_IMAGE_URLS = [
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=65",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=65",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=65",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=65",
  // 4 · city crossroads / momentum
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=65",
  // 5 · home & stability — “roots” in the model
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=65",
] as const;
