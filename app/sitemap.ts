import type { MetadataRoute } from "next";
import { getSiteUrlString } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrlString().replace(/\/$/, "");

  const paths = ["", "/experts", "/experts/register", "/pricing", "/monetize"];

  return paths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
