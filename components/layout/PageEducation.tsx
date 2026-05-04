import Link from "next/link";
import type { ReactElement, ReactNode } from "react";

export type EducationSection = {
  heading: string;
  body: ReactNode;
};

export type EducationFaqItem = {
  q: string;
  a: ReactNode;
  /**
   * Plain-text answer for the FAQPage JSON-LD `acceptedAnswer.text` field.
   * Optional — when omitted, we recursively extract text content from `a`.
   * Provide this when the answer contains complex JSX (links, lists) and
   * you want a hand-tuned schema string.
   */
  plainAnswer?: string;
};

type Props = {
  /** Lead paragraph(s) above the body sections. */
  intro?: ReactNode;
  /** Body sections — each with a sub-heading and free-form ReactNode body. */
  sections: EducationSection[];
  /** Optional FAQ block at the end. */
  faq?: EducationFaqItem[];
  /** Optional bottom CTA / cross-link block. */
  footer?: ReactNode;
  /**
   * Human-readable last-reviewed date (e.g. "May 5, 2026"). When provided
   * we render a small editorial byline ("Curated by Editorial Team · Last
   * reviewed …") at the foot of the section. This is a strong E-E-A-T
   * signal: Google explicitly weighs author + date metadata when ranking
   * informational content, and AdSense reviewers read it as a sign that
   * the page has an accountable editor rather than being abandoned.
   */
  lastReviewed?: string;
  /**
   * ISO 8601 date for the same review (e.g. "2026-05-05"). Used in the
   * machine-readable `<time dateTime>` attribute. Optional but
   * recommended; falls back to omitting the attribute if missing.
   */
  lastReviewedISO?: string;
  className?: string;
};

/**
 * Recursively extract visible text from a ReactNode tree.
 *
 * Used to derive the plain-text answer that goes into FAQPage JSON-LD
 * when the caller didn't provide an explicit `plainAnswer`. Works for
 * strings, numbers, arrays, fragments, and most native elements; ignores
 * booleans/null/undefined and falls through props.children for elements.
 */
function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in (node as object)) {
    const props = (node as ReactElement<{ children?: ReactNode }>).props;
    if (props && "children" in props) return extractText(props.children);
  }
  return "";
}

function buildFaqJsonLd(faq: EducationFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          item.plainAnswer ??
          (typeof item.a === "string" ? item.a : extractText(item.a)).replace(
            /\s+/g,
            " ",
          ).trim(),
      },
    })),
  };
}

/**
 * Shared "About this page" educational block.
 *
 * Provides the substantial publisher content AdSense reviewers expect on every
 * indexable page (≥ ~500 words of unique editorial copy beside any UI widget).
 * Each instance is composed of unique per-page props — same component, distinct
 * content — so we keep visual consistency without creating duplicate content.
 *
 * When `faq` is non-empty we also emit FAQPage JSON-LD so Google can surface
 * rich FAQ snippets in search and AdSense reviewers see the strong E-E-A-T
 * signal of structured Q&A on the page.
 */
export default function PageEducation({
  intro,
  sections,
  faq,
  footer,
  lastReviewed,
  lastReviewedISO,
  className = "",
}: Props) {
  const hasFaq = faq && faq.length > 0;
  const faqLd = hasFaq ? buildFaqJsonLd(faq) : null;

  return (
    <section
      aria-label="About this page"
      className={`mt-12 max-w-3xl space-y-10 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] ${className}`.trim()}
    >
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}

      {intro ? (
        <div className="space-y-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-dim))]">
            Editorial overview
          </p>
          <div className="space-y-3 text-[15px] text-[rgb(var(--ink))]/95">
            {intro}
          </div>
        </div>
      ) : null}

      {sections.length > 0 ? (
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.heading} className="space-y-3">
              <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
                {s.heading}
              </h2>
              <div className="space-y-3 [&_p]:text-[15px] [&_li]:text-[15px]">
                {s.body}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {hasFaq ? (
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Frequently asked
          </h2>
          <dl className="space-y-5">
            {faq.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5"
              >
                <dt className="text-[14px] font-semibold text-[rgb(var(--ink))]">
                  {item.q}
                </dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-[rgb(var(--ink-soft))]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {footer ? <div className="pt-2">{footer}</div> : null}

      {lastReviewed ? (
        <p className="border-t border-white/[0.06] pt-5 text-xs text-[rgb(var(--ink-soft))]/80 [text-wrap:pretty]">
          Curated by the{" "}
          <Link
            href="/editorial-team"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            rel="author"
          >
            Life Decision Engine Editorial Team
          </Link>
          {" · "}
          Last reviewed{" "}
          {lastReviewedISO ? (
            <time dateTime={lastReviewedISO}>{lastReviewed}</time>
          ) : (
            lastReviewed
          )}
          .{" "}
          <Link
            href="/editorial-standards"
            className="text-[rgb(var(--ink-soft))] underline-offset-2 hover:text-[rgb(var(--ink))] hover:underline"
          >
            Our editorial standards
          </Link>
          .
        </p>
      ) : null}
    </section>
  );
}
