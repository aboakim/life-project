import { getSiteUrlString } from "@/lib/site-url";

/**
 * Site-wide JSON-LD: Organization + WebSite with SearchAction.
 * Rendered once in the root layout so every page carries publisher
 * identity (strong E-E-A-T signal for Google crawl/AdSense review).
 */
export default function SiteJsonLd() {
  const base = getSiteUrlString().replace(/\/$/, "");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "Life Decision Engine",
    url: base,
    logo: {
      "@type": "ImageObject",
      url: `${base}/logo-192.png`,
      width: 192,
      height: 192,
    },
    /** Publisher image — reinforces brand logo URL for crawlers (same asset as logo). */
    image: [`${base}/logo-192.png`],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: `${base}/contact`,
        availableLanguage: ["en-US", "hy", "ru", "es", "fr", "de", "ar", "it"],
      },
    ],
    description:
      "Structured AI for major life decisions: scenarios, lenses, timelines, and a decision score. Free core, Premium subscription, and a refer-20-visits promotion. Optional directory of human experts.",
    knowsAbout: [
      "decision analysis",
      "career decisions",
      "relocation decisions",
      "relationship decisions",
      "personal finance decisions",
      "decision psychology",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: "Life Decision Engine",
    publisher: { "@id": `${base}/#organization` },
    inLanguage: ["en-US", "hy", "ru", "de", "fr", "es", "ar", "it"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const graph = { "@context": "https://schema.org", "@graph": [organization, website] };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
