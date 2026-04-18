import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";

export const metadata: Metadata = {
  title: "Editorial standards — Life Decision Engine",
  description:
    "How articles on Life Decision Engine are written, reviewed, sourced, and corrected. Plus clear disclaimers on what AI analysis is and is not.",
  alternates: { canonical: "/editorial-standards" },
};

export default function EditorialStandardsPage() {
  return (
    <MarketingPageShell
      eyebrow="Editorial"
      title="Editorial standards"
      subtitle={
        <p>
          We write about decisions that change lives — relocation, career
          pivots, relationships, money. This page is our public commitment to
          how we do that responsibly.
        </p>
      }
    >
      <div className="max-w-3xl space-y-10 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))]">
        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            1. What we publish
          </h2>
          <p className="mt-2">
            Every article is original long-form writing by the Life Decision
            Engine editorial team. We do not auto-generate articles and we do
            not republish content from other sites. Tools like AI assistance
            may be used for research, outlining, or copy editing; the final
            arguments, examples, and framing are always written, reviewed, and
            approved by a human editor before publication.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            2. Who writes and reviews
          </h2>
          <p className="mt-2">
            Our essays are attributed to the{" "}
            <Link
              href="/editorial-team"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              Life Decision Engine Editorial Team
            </Link>
            . When a piece draws on professional domains — law, finance,
            mental health — we seek input from practitioners in our{" "}
            <Link
              href="/experts"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              expert directory
            </Link>
            {" "}before publishing, and we flag that review in the article.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            3. Sourcing
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 ps-6">
            <li>
              Statistics, studies, and quotes link directly to the primary
              source wherever one exists.
            </li>
            <li>
              We prefer peer-reviewed research, official statistics, and
              first-party documentation over secondary commentary.
            </li>
            <li>
              Personal anecdotes are clearly marked as such and never
              presented as general evidence.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            4. Corrections and updates
          </h2>
          <p className="mt-2">
            If we get something wrong, we fix it and say so. Substantive
            corrections are logged at the bottom of the affected article with
            a date. Minor typos are fixed silently. To request a correction,
            email us via the{" "}
            <Link
              href="/contact"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              contact page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            5. What AI analysis on this site is — and is not
          </h2>
          <p className="mt-2">
            The{" "}
            <Link
              href="/"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              decision analyzer
            </Link>{" "}
            produces structured scenarios, risks, and timelines to help you
            think more clearly. It is a writing and reflection tool, not a
            substitute for professional advice.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 ps-6">
            <li>
              <strong className="text-[rgb(var(--ink))]/95">It is not</strong>{" "}
              legal, medical, psychological, tax, or investment advice.
            </li>
            <li>
              <strong className="text-[rgb(var(--ink))]/95">It is not</strong>{" "}
              a substitute for a licensed professional in your jurisdiction.
            </li>
            <li>
              <strong className="text-[rgb(var(--ink))]/95">It is</strong> a
              framework to structure your own thinking and identify questions
              worth asking a professional.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            6. Affiliate / sponsorship disclosure
          </h2>
          <p className="mt-2">
            We do not publish sponsored articles or accept payment to feature
            specific products, services, or experts. The site runs on two
            revenue streams: (a) Google AdSense advertising displayed on
            public pages, and (b) an optional paid Premium plan. Advertising
            does not influence editorial decisions. If this ever changes, the
            change will be announced here and any sponsored content will be
            clearly labelled.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            7. Advertising policy
          </h2>
          <p className="mt-2">
            Ads are delivered by Google AdSense under Google&rsquo;s content
            and publisher policies. We do not accept ads for adult content,
            gambling, weapons, or any category prohibited by Google&rsquo;s
            policies. If you see an ad that seems inappropriate, please report
            it through our{" "}
            <Link
              href="/contact"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              contact page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            8. Contact
          </h2>
          <p className="mt-2">
            Questions, corrections, or press inquiries? Use the{" "}
            <Link
              href="/contact"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              contact page
            </Link>
            . Legal notices are covered in the{" "}
            <Link
              href="/terms"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              Privacy Policy
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
