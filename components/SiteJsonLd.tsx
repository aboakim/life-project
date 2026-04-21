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
    sameAs: [] as string[],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: `${base}/contact`,
        availableLanguage: ["en", "hy", "ru", "es", "fr", "de", "ar", "uk"],
      },
    ],
    description:
      "A structured workspace for big life decisions — scenarios, lenses, timelines, and a score. Paired with a human expert directory.",
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
    inLanguage: "en-US",
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
