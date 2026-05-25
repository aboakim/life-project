import Link from "next/link";
import PageEducation from "@/components/layout/PageEducation";

/** Server-rendered publisher copy for /pricing (AdSense + crawlers). */
export default function PricingPageEducation() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 pt-2 sm:px-6 sm:pb-28">
      <PageEducation
        intro={
          <>
            <p>
              Life Decision Engine is funded so the core analyzer can stay
              useful without paywalls on thinking. The free plan includes the
              structured report framework — scenarios, four lenses, timeline,
              and score — with fair-use limits so the service stays sustainable.
              Premium is for people who run many decisions per month, want
              longer history, email reminders, and deeper analysis passes.
            </p>
            <p>
              We are transparent about money: subscription revenue, optional
              expert introductions (professionals bill you directly), and —
              where enabled — display advertising through Google AdSense. We do
              not sell your decision text to advertisers or data brokers. See
              our{" "}
              <Link
                href="/monetize"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                how we earn
              </Link>{" "}
              page for the full breakdown.
            </p>
          </>
        }
        sections={[
          {
            heading: "What Premium adds",
            body: (
              <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
                <li>
                  More frequent or deeper analysis runs when you are working
                  through a multi-step decision (relocation, separation, career
                  pivot).
                </li>
                <li>
                  Saved history and reminders so you can revisit a report after
                  a cooling-off period instead of re-entering everything.
                </li>
                <li>
                  Priority access to new framework updates we ship for Premium
                  subscribers first.
                </li>
              </ul>
            ),
          },
          {
            heading: "Billing and refunds",
            body: (
              <p>
                Checkout is handled by Stripe. Your card details never touch
                our servers. Subscription terms, cancellation, and refund
                rules are in the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  Terms of Service
                </Link>
                . If billing fails or you need help, use the{" "}
                <Link
                  href="/contact"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  contact page
                </Link>{" "}
                with your account email.
              </p>
            ),
          },
          {
            heading: "Advertising on free pages",
            body: (
              <p>
                On the free experience we may show Google AdSense units on
                pages that also contain substantial editorial content — blog
                articles, this pricing explanation, the analyzer education
                block, and the experts directory guide. We follow Google&apos;s
                program policies: clear separation between ads and content,
                consent for EU/UK visitors before personalised ads, and no ads
                that mimic navigation. Details are in our{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  privacy policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/content-policy"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  content policy
                </Link>
                .
              </p>
            ),
          },
        ]}
        faq={[
          {
            q: "Do I need Premium to get a useful report?",
            a: "No. The free tier is designed to produce a complete structured report for a typical life decision. Premium is for power users and repeat workflows.",
            plainAnswer:
              "No. The free tier is designed to produce a complete structured report for a typical life decision.",
          },
          {
            q: "Will upgrading remove ads?",
            a: "Premium focuses on product features. Ad placement may still appear on some informational pages depending on configuration; we aim to keep the analyzer workspace readable either way.",
            plainAnswer:
              "Premium focuses on product features. Ad placement may still appear on some informational pages depending on configuration.",
          },
        ]}
        lastReviewed="May 25, 2026"
        lastReviewedISO="2026-05-25"
      />
    </section>
  );
}
