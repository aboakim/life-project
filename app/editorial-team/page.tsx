import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import { getSiteUrlString } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Editorial Team — Life Decision Engine",
  description:
    "Who writes for Life Decision Engine: the editorial team, their backgrounds, and how we choose the experts we quote.",
  alternates: { canonical: "/editorial-team" },
};

/**
 * Dedicated author page gives AdSense reviewers a clear E-E-A-T signal
 * (Experience, Expertise, Authoritativeness, Trustworthiness). It also
 * acts as the canonical target for <link rel="author"> pointing from
 * article metadata.
 */
export default function EditorialTeamPage() {
  const base = getSiteUrlString().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#editorial-team`,
    name: "Life Decision Engine Editorial Team",
    url: `${base}/editorial-team`,
    parentOrganization: { "@id": `${base}/#organization` },
    description:
      "Editorial, product, and engineering team behind Life Decision Engine. We write about career, relocation, relationships, and financial decisions — and maintain the decision-analysis tools on this site.",
  };

  return (
    <MarketingPageShell
      eyebrow="People"
      title="Editorial Team"
      subtitle={
        <p>
          Articles on this site are written by the Life Decision Engine
          editorial team: a small group of writers, researchers, and
          engineers who care about decisions made under uncertainty.
        </p>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl space-y-10 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))]">
        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Who we are
          </h2>
          <p className="mt-2">
            The editorial team operates under the byline &ldquo;Life Decision
            Engine Editorial Team&rdquo; across articles on this site. We
            write as a team rather than under individual names because most
            pieces are the product of multiple rounds of drafting, review,
            and expert consultation, and we want the work to stand on its
            research — not on personal brand.
          </p>
          <p className="mt-3">
            Our combined background spans product design, software
            engineering, applied statistics, clinical psychology, and
            personal-finance journalism. We do not claim to be licensed
            professionals in every domain we cover. For regulated topics
            (legal, financial, medical) we consult practitioners from our{" "}
            <Link
              href="/experts"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              expert directory
            </Link>{" "}
            before publishing.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            What we cover
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 ps-6">
            <li>
              Career decisions — job offers, pivots, remote vs. in-person,
              leaving a stable job for risk.
            </li>
            <li>
              Relocation and immigration — country and city moves, family
              impact, legal complexity.
            </li>
            <li>
              Relationships and family — cohabiting, children, ending
              relationships and friendships.
            </li>
            <li>
              Money under uncertainty — emergency funds, financial
              independence, buying vs. renting, trade-offs vs. values.
            </li>
            <li>
              The psychology of large decisions — regret, ambiguity, the
              role of emotion, decision fatigue.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            How we work
          </h2>
          <ol className="mt-2 list-decimal space-y-1.5 ps-6">
            <li>
              A writer drafts an outline and identifies primary sources.
            </li>
            <li>
              At least one other team member reviews for accuracy, framing,
              and obvious blind spots.
            </li>
            <li>
              When a piece touches a regulated domain, we solicit review from
              a practitioner in our expert network.
            </li>
            <li>
              An editor does a final pass for clarity, tone, and
              compliance with our{" "}
              <Link
                href="/editorial-standards"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                editorial standards
              </Link>
              .
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            How to reach us
          </h2>
          <p className="mt-2">
            For tips, corrections, guest submissions, or press inquiries, use
            the{" "}
            <Link
              href="/contact"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              contact page
            </Link>
            . For legal notices, see the{" "}
            <Link
              href="/terms"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              Terms of Service
            </Link>
            .
          </p>
        </section>

        <p className="pt-4">
          <Link
            href="/"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </MarketingPageShell>
  );
}
