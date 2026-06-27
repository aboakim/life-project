import type { MetadataRoute } from "next";
import { getSiteUrlString } from "@/lib/site-url";

/**
 * AdSense / Google crawlers must access public pages.
 * Disallow admin and API routes; keep Mediapartners-Google on public HTML.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrlString();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    host: base,
    sitemap: `${base}/sitemap.xml`,
  };
}
