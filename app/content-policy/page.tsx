import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";

export const metadata: Metadata = {
  title: "Content Policy",
  description:
    "What Life Decision Engine publishes: editorial articles, AI-assisted tools, expert directory listings, and community Q&A. Quality standards and moderation.",
  alternates: { canonical: "/content-policy" },
};

export default function ContentPolicyPage() {
  return (
    <MarketingPageShell
      eyebrow="Publisher"
      title="Content Policy"
      subtitle={
        <p>
          This policy describes what appears on lifedecisions.space, who
          creates it, and how we keep quality high for readers and advertising
          partners.
        </p>
      }
    >
      <div className="max-w-3xl space-y-8 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Original editorial content
          </h2>
          <p className="mt-2">
            Our primary value is original long-form articles in the{" "}
            <Link
              href="/blog"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              blog
            </Link>
            : decision frameworks for career, relocation, relationships, and
            money. Articles are drafted by the{" "}
            <Link
              href="/editorial-team"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              editorial team
            </Link>
            , reviewed against{" "}
            <Link
              href="/editorial-standards"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              editorial standards
            </Link>
            , and updated when facts or product behaviour changes. We do not
            scrape third-party articles or publish auto-generated filler pages.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Tools and generated reports
          </h2>
          <p className="mt-2">
            The analyzer produces personalised text from your inputs using
            structured templates and AI assistance documented on{" "}
            <Link
              href="/how-we-use-ai"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              How we use AI
            </Link>
            . Generated reports are private to your session unless you choose to
            share them. They are educational, not professional advice.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Expert directory listings
          </h2>
          <p className="mt-2">
            Professionals submit their own profiles via{" "}
            <Link
              href="/experts/register"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              registration
            </Link>
            . We review listings before publication and remove misleading or
            spam entries. We do not guarantee outcomes from any professional
            relationship.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Community Q&amp;A
          </h2>
          <p className="mt-2">
            The{" "}
            <Link
              href="/community"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              community board
            </Link>{" "}
            allows text questions and answers subject to{" "}
            <Link
              href="/community/guidelines"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              community guidelines
            </Link>
            . Posts may be removed for abuse, spam, medical or legal advice
            presented as definitive, or content that endangers others. Community
            content is moderated; it does not represent the editorial team&apos;s
            views.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Advertising
          </h2>
          <p className="mt-2">
            We may display Google AdSense ads on pages that contain substantial
            publisher-written content. Ads are labelled and separated from
            editorial copy. We do not place ads on pages that lack meaningful
            text. Revenue helps keep the free analyzer available; see{" "}
            <Link
              href="/monetize"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              how we earn
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Report a problem
          </h2>
          <p className="mt-2">
            For corrections, takedown requests, or policy questions, email{" "}
            <a
              href="mailto:hello@lifedecisions.space"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              hello@lifedecisions.space
            </a>{" "}
            or use the{" "}
            <Link
              href="/contact"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              contact form
            </Link>
            . We aim to respond within five business days.
          </p>
        </section>
      </div>
    </MarketingPageShell>
  );
}
