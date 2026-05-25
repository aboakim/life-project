import type { MetadataRoute } from "next";
import { getSiteUrlString } from "@/lib/site-url";
import { getAllPosts, getAllTagSlugs } from "@/lib/blog/posts";

const STATIC_PATHS: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, freq: "weekly" },
  { path: "/analyze", priority: 0.95, freq: "weekly" },
  { path: "/pricing", priority: 0.8, freq: "weekly" },
  { path: "/experts", priority: 0.8, freq: "weekly" },
  { path: "/experts/register", priority: 0.6, freq: "monthly" },
  { path: "/community", priority: 0.7, freq: "weekly" },
  { path: "/journal", priority: 0.6, freq: "monthly" },
  { path: "/field-notes", priority: 0.55, freq: "monthly" },
  { path: "/checklists", priority: 0.65, freq: "monthly" },
  { path: "/how-we-use-ai", priority: 0.65, freq: "monthly" },
  { path: "/playbooks", priority: 0.65, freq: "monthly" },
  { path: "/community/guidelines", priority: 0.5, freq: "monthly" },
  { path: "/monetize", priority: 0.6, freq: "monthly" },
  { path: "/blog", priority: 0.9, freq: "weekly" },
  { path: "/faq", priority: 0.7, freq: "monthly" },
  { path: "/about", priority: 0.6, freq: "monthly" },
  { path: "/editorial-team", priority: 0.6, freq: "monthly" },
  { path: "/editorial-standards", priority: 0.6, freq: "monthly" },
  { path: "/contact", priority: 0.5, freq: "monthly" },
  { path: "/terms", priority: 0.4, freq: "monthly" },
  { path: "/privacy", priority: 0.4, freq: "monthly" },
  { path: "/cookies", priority: 0.4, freq: "monthly" },
  { path: "/content-policy", priority: 0.5, freq: "monthly" },
  { path: "/disclaimer", priority: 0.4, freq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrlString().replace(/\/$/, "");

  const statics = STATIC_PATHS.map(({ path, priority, freq }) => ({
    url: `${base}${path}`,
    /**
     * Omit `lastModified` for static marketing pages.
     * Using `new Date()` on every deploy made every URL look freshly rewritten daily,
     * which can confuse crawl scheduling signals without reflecting real edits.
     */
    changeFrequency: freq,
    priority,
  }));

  const blog = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const tags = getAllTagSlugs().map((tag) => ({
    url: `${base}/blog/tag/${tag}`,
    /**
     * Tag index pages change when posts change, but we don't track per-tag timestamps yet.
     * Prefer omitting a fake `lastModified` over claiming "now" on every build.
     */
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...statics, ...blog, ...tags];
}
