import { getSiteUrlString } from "@/lib/site-url";

/** Person + editorial org schema for E-E-A-T (editorial-team, about, sitewide). */
export default function EditorialTeamJsonLd() {
  const base = getSiteUrlString().replace(/\/$/, "");

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#editorial-team`,
        name: "Life Decision Engine Editorial Team",
        url: `${base}/editorial-team`,
        parentOrganization: { "@id": `${base}/#organization` },
        knowsAbout: [
          "decision-making frameworks",
          "editorial review",
          "AI-assisted publishing",
        ],
      },
      {
        "@type": "Person",
        "@id": `${base}/#founder`,
        name: "Albert Akimyan",
        jobTitle: "Founder & Editor",
        url: `${base}/about`,
        worksFor: { "@id": `${base}/#organization` },
        memberOf: { "@id": `${base}/#editorial-team` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
