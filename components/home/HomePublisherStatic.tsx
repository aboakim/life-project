import Link from "next/link";
import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getHomePublisherCopy } from "@/lib/i18n/trust-pages/get-copy";
import { getTrustLinkLabels } from "@/lib/i18n/trust-pages/link-labels";
import TrustInlineText from "@/components/trust/TrustInlineText";
import { DEFAULT_LOCALE } from "@/lib/locale-default";

type Props = { locale?: AppLocale };

/** Full publisher overview for AdSense / crawlers — intro + policy sections. */
export default function HomePublisherStatic({ locale = DEFAULT_LOCALE }: Props = {}) {
  const copy = getHomePublisherCopy(locale);
  const labels = getTrustLinkLabels(locale);
  const overview = copy.editorialOverviewLabel ?? "Publisher overview";

  return (
    <section
      aria-label="About Life Decision Engine"
      className="relative z-[1] mx-auto max-w-6xl px-4 pb-8 pt-2 sm:px-6"
      dir={isRtlLocale(locale) ? "rtl" : undefined}
    >
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-6 sm:px-8 sm:py-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-dim))]">
          {overview}
        </p>
        <div className="mt-4 max-w-3xl space-y-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
          {copy.introParagraphs.map((p) => (
            <p key={p.slice(0, 48)}>
              <TrustInlineText text={p} labels={labels} />
            </p>
          ))}
        </div>

        {copy.sections.map((section) => (
          <div key={section.heading} className="mt-8 max-w-3xl">
            <h2 className="text-sm font-semibold text-[rgb(var(--ink))]">
              {section.heading}
            </h2>
            {section.blocks.map((block, i) => {
              if (block.kind === "ul") {
                return (
                  <ul
                    key={i}
                    className="mt-2 list-disc space-y-1.5 ps-5 text-sm leading-relaxed text-[rgb(var(--ink-soft))] marker:text-[rgb(var(--accent-2))]/70"
                  >
                    {block.items.map((item) => (
                      <li key={item}>
                        <TrustInlineText text={item} labels={labels} />
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.kind === "p") {
                return (
                  <p key={i} className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                    <TrustInlineText text={block.text} labels={labels} />
                  </p>
                );
              }
              return null;
            })}
          </div>
        ))}

        <nav
          aria-label="Policies"
          className="mt-8 flex flex-wrap gap-2 border-t border-white/[0.08] pt-6"
        >
          {(
            [
              ["privacy", labels.privacy],
              ["terms", labels.terms],
              ["contentPolicy", labels.contentPolicy],
              ["contact", labels.contact],
              ["editorialStandards", labels.editorialStandards],
              ["faq", labels.faq],
            ] as const
          ).map(([key, label]) => (
            <Link
              key={key}
              href={
                key === "privacy"
                  ? "/privacy"
                  : key === "terms"
                    ? "/terms"
                    : key === "contentPolicy"
                      ? "/content-policy"
                      : key === "contact"
                        ? "/contact"
                        : key === "editorialStandards"
                          ? "/editorial-standards"
                          : "/faq"
              }
              className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.08] hover:text-[rgb(var(--ink))]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="mt-5 text-[11px] text-[rgb(var(--ink-soft))]/75">
          {copy.lastReviewed} ·{" "}
          <Link href="/disclaimer" className="underline-offset-2 hover:underline">
            {labels.disclaimer}
          </Link>
        </p>
      </div>
    </section>
  );
}
