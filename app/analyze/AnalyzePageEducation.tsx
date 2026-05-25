import Link from "next/link";
import PageEducation from "@/components/layout/PageEducation";

/** Server-rendered publisher copy for /analyze (AdSense + crawlers). */
export default function AnalyzePageEducation() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 pt-4 sm:px-6 sm:pb-28">
      <PageEducation
        intro={
          <>
            <p>
              The Life Decision Engine analyzer is a structured workspace for
              decisions that feel too big for a pros-and-cons list. You describe
              your situation in plain language — what you are deciding, the
              context around it, and any constraints you will not move (money,
              geography, family, ethics). The engine then produces a private
              report: named scenarios (best, worst, and likely), four lenses
              (finances, psychology, risks, opportunities), a simple timeline,
              and a score that reflects how well each path fits what you said
              you care about.
            </p>
            <p>
              This is not a chatbot that improvises advice. The output follows
              a fixed editorial framework we maintain and review. It is designed
              to help you think clearly and arrive at a better question — not to
              replace a therapist, lawyer, or financial planner. When a decision
              touches regulated domains, we link you to the{" "}
              <Link
                href="/experts"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                experts directory
              </Link>{" "}
              and to articles on{" "}
              <Link
                href="/blog/when-to-talk-to-a-professional"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                when to involve a professional
              </Link>
              .
            </p>
          </>
        }
        sections={[
          {
            heading: "What you get in a report",
            body: (
              <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Scenarios
                  </strong>{" "}
                  — three concrete futures so you can compare feelings and
                  facts side by side instead of looping on one vague worry.
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Four lenses
                  </strong>{" "}
                  — money, emotional load, downside risk, and upside you might
                  be discounting. Each lens is written in full sentences, not
                  bullet fragments.
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Timeline
                  </strong>{" "}
                  — what tends to change at six months, two years, and five
                  years if you choose each path.
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Score
                  </strong>{" "}
                  — a comparative signal, not a verdict. Use it to notice
                  trade-offs, not to outsource judgment.
                </li>
              </ul>
            ),
          },
          {
            heading: "Free vs Premium",
            body: (
              <p>
                The free tier runs the full framework with sensible limits on
                how often you can generate reports. Premium adds deeper runs,
                history, and reminders — see{" "}
                <Link
                  href="/pricing"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  pricing
                </Link>{" "}
                for current features. Payments, when you choose Premium, are
                processed by Stripe; we never store card numbers on our
                servers.
              </p>
            ),
          },
          {
            heading: "Privacy and data use",
            body: (
              <p>
                Your decision text is sent to our servers only when you run an
                analysis, so we can generate the report. We do not publish your
                questions, sell them to data brokers, or show them in a social
                feed. Retention, cookies, advertising (Google AdSense), and
                your GDPR/CCPA rights are explained in our{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  privacy policy
                </Link>
                . How AI is used — and what it cannot do — is documented on{" "}
                <Link
                  href="/how-we-use-ai"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  How we use AI
                </Link>
                .
              </p>
            ),
          },
          {
            heading: "How this page relates to the home analyzer",
            body: (
              <p>
                The same engine powers the interactive workspace on the{" "}
                <Link
                  href="/"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  home page
                </Link>
                . This dedicated URL exists so you can bookmark the tool,
                share it with a coach, or land directly from search without
                scrolling past marketing sections. The editorial standards for
                all generated copy match our{" "}
                <Link
                  href="/editorial-standards"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  editorial standards
                </Link>{" "}
                page.
              </p>
            ),
          },
        ]}
        faq={[
          {
            q: "Is this medical, legal, or financial advice?",
            a: "No. It is educational software that organises your thinking. For diagnosis, contracts, tax, or investment decisions with real money at stake, consult a licensed professional in your jurisdiction.",
            plainAnswer:
              "No. It is educational software that organises your thinking. For diagnosis, contracts, tax, or investment decisions with real money at stake, consult a licensed professional in your jurisdiction.",
          },
          {
            q: "Can I use the report in a session with my therapist or lawyer?",
            a: "Yes — many readers print or paste the scenario summary so the first 15 minutes of a session focus on the real fork in the road instead of re-telling context.",
            plainAnswer:
              "Yes — many readers print or paste the scenario summary so the first 15 minutes of a session focus on the real fork in the road instead of re-telling context.",
          },
          {
            q: "Who writes the frameworks behind the analyzer?",
            a: "The Life Decision Engine editorial team maintains the scenario templates, lens definitions, and safety copy. See the editorial team page for how we source and update material.",
            plainAnswer:
              "The Life Decision Engine editorial team maintains the scenario templates, lens definitions, and safety copy.",
          },
        ]}
        footer={
          <p className="text-xs leading-relaxed text-[rgb(var(--ink-soft))]/85">
            In a crisis or emergency, contact local emergency services or a
            crisis line — this tool is not monitored for urgent messages. See
            our{" "}
            <Link
              href="/disclaimer"
              className="underline-offset-2 hover:underline"
            >
              disclaimer
            </Link>{" "}
            for full limits of liability.
          </p>
        }
        lastReviewed="May 25, 2026"
        lastReviewedISO="2026-05-25"
      />
    </section>
  );
}
