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
    sitemap: `${base}/sitemap.xml`,
  };
}
