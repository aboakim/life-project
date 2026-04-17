import type { MetadataRoute } from "next";
import { getSiteUrlString } from "@/lib/site-url";

const PATHS = [
  "",
  "/pricing",
  "/experts",
  "/experts/register",
  "/community",
  "/monetize",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrlString();
  return PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.75,
  }));
}
