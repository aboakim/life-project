import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";

export const metadata: Metadata = {
  title: "FAQ — Life Decision Engine",
  description:
    "Frequently asked questions about how Life Decision Engine works: AI analysis, privacy, experts, pricing, and more.",
  alternates: { canonical: "/faq" },
};

type QA = {
  q: string;
  /** Rich JSX rendered on the page. */
  a: ReactNode;
  /** Plain-text mirror used for JSON-LD schema (keep it concise). */
  plain: string;
};

const FAQ_GENERAL: QA[] = [
  {
    q: "What is Life Decision Engine?",
    a: (
      <>
        Life Decision Engine is a structured decision-analysis workspace for
        big life questions — relocation, career moves, relationships, large
        purchases. Instead of a generic chat, it gives you scenarios
        (best/worst/likely), four analytical lenses (finance, psychology,
        risk, upside), a 6-month to 5-year timeline, and an alignment score
        you can discuss with a professional if needed.
      </>
    ),
    plain:
      "A structured decision-analysis workspace for big life questions. It gives you scenarios, four lenses, a timeline, and an alignment score instead of generic chat.",
  },
  {
    q: "Is it a replacement for a therapist, lawyer, or financial advisor?",
    a: (
      <>
        No. It is a <strong>support tool</strong>, not a substitute for
        licensed professionals. It will never diagnose, prescribe, or provide
        legal/medical advice. If the question touches those areas, use the
        tool to clarify your thinking and then consult a qualified expert —
        we list some on the{" "}
        <Link
          href="/experts"
          className="text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
        >
          experts
        </Link>{" "}
        page.
      </>
    ),
    plain:
      "No. It is a support tool, not a substitute for licensed professionals. For clinical, legal, or financial matters, consult a qualified expert.",
  },
  {
    q: "Who is it for?",
    a: (
      <>
        Adults facing consequential forks in life (relocation, career pivots,
        breakups, buying a home, starting a business). It works for people who
        prefer <em>structure over chit-chat</em> and want to see trade-offs
        explicitly before committing.
      </>
    ),
    plain:
      "Adults facing consequential life forks who prefer structure over generic conversation.",
  },
];

const FAQ_USAGE: QA[] = [
  {
    q: "How do I use the analyzer?",
    a: (
      <>
        Open the home page, scroll to the analyzer section, describe your
        decision in one or two sentences, then optionally add context (numbers,
        deadlines, constraints) and values you won’t cross. Click Run
        analysis. You can also use the 60-second decision brief to fill those
        three fields quickly.
      </>
    ),
    plain:
      "Describe your decision in the analyzer, add optional context and values, and click Run analysis. A 60-second brief helps fill the fields quickly.",
  },
  {
    q: "Do I need an account?",
    a: (
      <>
        For the core analyzer — no. You can use the workspace and read the
        output without signing in. Accounts are used for saving history,
        subscribing to Premium, or booking expert sessions when those flows
        become available.
      </>
    ),
    plain:
      "No account is needed for the core analyzer. Accounts are used for history, Premium, or expert bookings.",
  },
  {
    q: "What languages are supported?",
    a: (
      <>
        The UI supports 8+ languages including English, Armenian, Russian,
        German, French, Spanish, Italian and Arabic. You can switch language
        in the Language section at the bottom of the home page.
      </>
    ),
    plain:
      "8+ languages including English, Armenian, Russian, German, French, Spanish, Italian, and Arabic.",
  },
];

const FAQ_PRIVACY: QA[] = [
  {
    q: "Is my text private?",
    a: (
      <>
        There is no public feed or voting wall — your text stays within your
        session flow. If AI analysis is enabled on the server, your prompt is
        sent to the AI provider (e.g. OpenAI) <em>only</em> to generate your
        answer, under their terms. See the{" "}
        <Link
          href="/privacy"
          className="text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
        >
          Privacy Policy
        </Link>{" "}
        for details.
      </>
    ),
    plain:
      "There is no public feed. If AI is enabled, your prompt goes only to the AI provider to generate your answer. See the Privacy Policy for details.",
  },
  {
    q: "Do you sell my data?",
    a: (
      <>
        No. We do not sell personal content. Ads (via Google AdSense) may be
        shown on some pages; that is a standard ad network and covered in our
        Privacy Policy.
      </>
    ),
    plain:
      "No. Ads may be shown via Google AdSense, a standard ad network covered in our Privacy Policy.",
  },
  {
    q: "Can I delete my data?",
    a: (
      <>
        Yes. Your analyzer input is not publicly published. For any
        account-linked data you may have submitted (for example, an expert
        profile or a contact request), you can reach out via the contact
        details on the site and we will delete it on request.
      </>
    ),
    plain:
      "Yes. Analyzer input is never published. For any account-linked data, contact us via the site and we will delete it on request.",
  },
];

const FAQ_BILLING: QA[] = [
  {
    q: "Is the engine free?",
    a: (
      <>
        Yes — the core analyzer is free to use. Premium (currently modelled
        around $4.99/month as an example) unlocks extra depth in future
        versions. See{" "}
        <Link
          href="/pricing"
          className="text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
        >
          pricing
        </Link>
        .
      </>
    ),
    plain:
      "The core analyzer is free. A Premium tier (example pricing $4.99/month) unlocks additional depth.",
  },
  {
    q: "How do payments work?",
    a: (
      <>
        Paid features (when active) use <strong>Stripe</strong> for secure
        card handling. We never store full card numbers on our servers; Stripe
        handles payment data under its policies.
      </>
    ),
    plain:
      "Paid features use Stripe for secure card handling. We do not store full card numbers on our servers.",
  },
  {
    q: "Can I talk to a real human expert?",
    a: (
      <>
        Yes — the{" "}
        <Link
          href="/experts"
          className="text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
        >
          experts directory
        </Link>{" "}
        lists psychologists, lawyers, and financial professionals. Booking
        flows will be added progressively; for now the directory helps you
        discover who works in the area you need.
      </>
    ),
    plain:
      "Yes. The experts directory lists psychologists, lawyers, and financial professionals. Booking flows will be added progressively.",
  },
];

const SECTIONS: { id: string; title: string; items: QA[] }[] = [
  { id: "general", title: "About the product", items: FAQ_GENERAL },
  { id: "usage", title: "Using the analyzer", items: FAQ_USAGE },
  { id: "privacy", title: "Privacy & data", items: FAQ_PRIVACY },
  { id: "billing", title: "Pricing & experts", items: FAQ_BILLING },
];

const ALL_QAS: QA[] = SECTIONS.flatMap((s) => s.items);

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_QAS.map((qa) => ({
    "@type": "Question",
    name: qa.q,
    acceptedAnswer: { "@type": "Answer", text: qa.plain },
  })),
};

export default function FAQPage() {
  return (
    <MarketingPageShell
      eyebrow="Help center"
      title="Frequently asked questions"
      subtitle={
        <p>
          Short answers about how the decision engine works, what it is (and
          isn’t), and how we handle your data. Can’t find yours? Use the
          contact path on the site.
        </p>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-dim))]">
            Jump to
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-[rgb(var(--ink-soft))] transition hover:text-[rgb(var(--ink))]"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent-2))]/90">
              Still stuck?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
              Read the{" "}
              <Link
                href="/blog"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                blog
              </Link>{" "}
              for deeper guides, or browse{" "}
              <Link
                href="/experts"
                className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                experts
              </Link>
              .
            </p>
          </div>
        </aside>

        <div className="space-y-12">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="text-xl font-semibold tracking-tight text-[rgb(var(--ink))] sm:text-2xl">
                {s.title}
              </h2>
              <ul className="mt-6 space-y-4">
                {s.items.map((qa, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-5 sm:p-6"
                  >
                    <h3 className="text-base font-semibold text-[rgb(var(--ink))]">
                      {qa.q}
                    </h3>
                    <div className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                      {qa.a}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <p className="pt-4 text-sm">
            <Link
              href="/"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </MarketingPageShell>
  );
}
