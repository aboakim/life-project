import Link from "next/link";
import { cookies } from "next/headers";
import {
  LDE_LOCALE_COOKIE_NAME,
  localeFromCookieValue,
} from "@/lib/locale-cookie";
import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getHomePublisherCopy } from "@/lib/i18n/trust-pages/get-copy";
import { getTrustLinkLabels } from "@/lib/i18n/trust-pages/link-labels";
import TrustInlineText from "@/components/trust/TrustInlineText";

type Props = { locale?: AppLocale };

/** Compact editorial / policy strip — AdSense publisher signal without dominating the page. */
export default async function HomePublisherStatic({ locale: localeProp }: Props = {}) {
  const locale =
    localeProp ??
    localeFromCookieValue(
      (await cookies()).get(LDE_LOCALE_COOKIE_NAME)?.value,
    );
  const copy = getHomePublisherCopy(locale);
  const labels = getTrustLinkLabels(locale);
  const overview = copy.editorialOverviewLabel ?? "Publisher overview";

  return (
    <section
      aria-label="About Life Decision Engine"
      className="relative z-[1] mx-auto max-w-6xl px-4 pb-8 pt-2 sm:px-6"
      dir={isRtlLocale(locale) ? "rtl" : undefined}
    >
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-dim))]">
              {overview}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
              <TrustInlineText text={copy.introParagraphs[0] ?? ""} labels={labels} />
            </p>
          </div>
          <nav
            aria-label="Policies"
            className="flex shrink-0 flex-wrap gap-2 sm:max-w-xs sm:justify-end"
          >
            {(
              [
                ["privacy", labels.privacy],
                ["terms", labels.terms],
                ["contentPolicy", labels.contentPolicy],
                ["contact", labels.contact],
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
                        : "/contact"
                }
                className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.08] hover:text-[rgb(var(--ink))]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-4 text-[11px] text-[rgb(var(--ink-soft))]/75">
          {copy.lastReviewed} ·{" "}
          <Link href="/disclaimer" className="underline-offset-2 hover:underline">
            {labels.disclaimer}
          </Link>
        </p>
      </div>
    </section>
  );
}
