import type { ReactNode } from "react";

export type EducationSection = {
  heading: string;
  body: ReactNode;
};

export type EducationFaqItem = {
  q: string;
  a: ReactNode;
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
  className?: string;
};

/**
 * Shared "About this page" educational block.
 *
 * Provides the substantial publisher content AdSense reviewers expect on every
 * indexable page (≥ ~500 words of unique editorial copy beside any UI widget).
 * Each instance is composed of unique per-page props — same component, distinct
 * content — so we keep visual consistency without creating duplicate content.
 */
export default function PageEducation({
  intro,
  sections,
  faq,
  footer,
  className = "",
}: Props) {
  return (
    <section
      aria-label="About this page"
      className={`mt-12 max-w-3xl space-y-10 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] ${className}`.trim()}
    >
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

      {faq && faq.length > 0 ? (
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
    </section>
  );
}
