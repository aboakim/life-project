import type { MetadataRoute } from "next";
import { getSiteUrlString } from "@/lib/site-url";

/**
 * AdSense / Google crawlers must be able to access public pages.
 * Do not disallow Mediapartners-Google or Googlebot here.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrlString();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // Explicit host hint (safe, optional) helps some crawlers resolve canonical host.
    host: base,
    sitemap: `${base}/sitemap.xml`,
  };
}
