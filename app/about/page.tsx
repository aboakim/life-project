import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";

export const metadata: Metadata = {
  title: "About — Life Decision Engine",
  description:
    "Why Life Decision Engine exists: a calm, structured workspace for big life decisions, built on the belief that scenarios, lenses, and timelines beat endless chat.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <MarketingPageShell
      eyebrow="About"
      title="Built for the forks in life that actually matter"
      subtitle={
        <p>
          Life Decision Engine is a calm, structured workspace for the kinds
          of decisions that shape years — career pivots, relocation,
          relationships, large purchases. It is opinionated in one direction:
          structure beats endless debate.
        </p>
      }
    >
      <div className="max-w-3xl space-y-10 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))]">
        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Why this project exists
          </h2>
          <p className="mt-3">
            Most people approach life’s biggest questions the way they
            approach small ones — with a group chat and a feeling. That works
            for choosing a restaurant. It breaks down for choosing a country,
            a partner, a career, or a business. The goal of this project is
            to give adults a tool that mirrors how professionals actually
            think about decisions: scenarios, lenses, a timeline, and a score
            — without pretending to be an oracle.
          </p>
          <p className="mt-3">
            We also believe AI-only tools underwhelm for decisions of
            consequence. AI can help frame the problem, but humans — lawyers,
            therapists, financial planners — are still the right endpoint for
            specialised questions. That is why the product is paired with a
            directory of human experts and content that respects the limits
            of both the software and the software builder.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            What we build
          </h2>
          <ul className="mt-3 list-disc space-y-2 ps-5">
            <li>
              A{" "}
              <Link
                href="/#section-workspace"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                structured analyzer
              </Link>{" "}
              that takes your question, context, and values and produces
              scenarios, lenses, timelines, and a score.
            </li>
            <li>
              A growing{" "}
              <Link
                href="/experts"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                experts directory
              </Link>{" "}
              for moments when software is not enough.
            </li>
            <li>
              A{" "}
              <Link
                href="/blog"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                blog
              </Link>{" "}
              of long-form essays on career, relocation, relationships, and
              the psychology of regret.
            </li>
            <li>
              A multilingual interface (8+ languages today) for people who
              think about hard things in more than one language.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Our editorial principles
          </h2>
          <ul className="mt-3 list-disc space-y-2 ps-5">
            <li>
              <strong className="text-[rgb(var(--ink))]">
                No false certainty.
              </strong>{" "}
              We will not pretend the engine can decide for you. We will help
              you decide clearly.
            </li>
            <li>
              <strong className="text-[rgb(var(--ink))]">
                Respect your story.
              </strong>{" "}
              No public feed, no voting wall, no “other people’s stories”
              mined for engagement.
            </li>
            <li>
              <strong className="text-[rgb(var(--ink))]">
                Humans when it matters.
              </strong>{" "}
              We actively recommend professionals for medical, legal, and
              financial questions. We will never try to replace them.
            </li>
            <li>
              <strong className="text-[rgb(var(--ink))]">Calm design.</strong>{" "}
              If a feature raises anxiety or rewards compulsive use, we won’t
              ship it.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Who we are
          </h2>
          <p className="mt-3">
            Life Decision Engine is an independent product team based
            internationally, working in English and Armenian as primary
            working languages. The project is privately operated; it is not
            affiliated with any therapy, legal, or financial firm. Revenue is
            planned through a small Premium subscription, optional expert
            bookings, and — where appropriate — advertising served by
            Google AdSense.
          </p>
          <p className="mt-3">
            If you are a psychologist, lawyer, or financial professional and
            would like to be listed in the directory, apply through the{" "}
            <Link
              href="/experts/register"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              expert registration
            </Link>{" "}
            page. If you are press, a partner, or a user with a question, use
            the{" "}
            <Link
              href="/contact"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              contact
            </Link>{" "}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            What this site is not
          </h2>
          <p className="mt-3">
            It is not therapy, not a lawyer, not a financial advisor, and not
            a social feed. In an emergency or crisis, contact a licensed
            professional or your local emergency service. In matters of
            clinical, legal, or tax consequence, consult a qualified human
            with the right credentials in your jurisdiction.
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
