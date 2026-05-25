import Link from "next/link";
import { cookies } from "next/headers";
import {
  LDE_LOCALE_COOKIE_NAME,
  localeFromCookieValue,
} from "@/lib/locale-cookie";
import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";
import { getHomePublisherCopy } from "@/lib/i18n/trust-pages/get-copy";
import { getTrustLinkLabels } from "@/lib/i18n/trust-pages/link-labels";
import TrustInlineText from "@/components/trust/TrustInlineText";

/**
 * Server-rendered publisher block on `/` — visible without the deferred
 * DecisionStudio bundle (AdSense "publisher content" signal).
 */
type Props = { locale?: AppLocale };

export default async function HomePublisherStatic({ locale: localeProp }: Props = {}) {
  const locale =
    localeProp ??
    localeFromCookieValue(
      (await cookies()).get(LDE_LOCALE_COOKIE_NAME)?.value,
    );
  const t = getUi(locale);
  const copy = getHomePublisherCopy(locale);
  const labels = getTrustLinkLabels(locale);
  const overview =
    copy.editorialOverviewLabel ?? "Publisher overview";

  return (
    <section
      id="section-overview"
      aria-label="About Life Decision Engine"
      className="relative z-[1] mx-auto max-w-3xl scroll-mt-[7.5rem] px-4 pb-10 pt-2 sm:px-6"
      dir={isRtlLocale(locale) ? "rtl" : undefined}
    >
      <div className="space-y-6 rounded-3xl border border-white/[0.1] bg-white/[0.04] p-6 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))] sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-dim))]">
          {overview}
        </p>
        <p className="text-[rgb(var(--ink))]/95">
          <TrustInlineText
            text={`${t.subtitle} ${copy.introParagraphs[0] ?? ""}`}
            labels={labels}
          />
        </p>
        {copy.introParagraphs[1] ? (
          <p>
            <TrustInlineText text={copy.introParagraphs[1]} labels={labels} />
          </p>
        ) : null}
        {copy.sections[0]?.blocks[0]?.kind === "ul" ? (
          <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/60">
            {(copy.sections[0].blocks[0] as { kind: "ul"; items: string[] })
              .items.map((item) => (
                <li key={item}>
                  <TrustInlineText text={item} labels={labels} />
                </li>
              ))}
          </ul>
        ) : null}
        <p className="text-xs text-[rgb(var(--ink-soft))]/80">
          {copy.lastReviewed} ·{" "}
          <Link
            href="/disclaimer"
            className="underline-offset-2 hover:underline"
          >
            {labels.disclaimer}
          </Link>
        </p>
      </div>
    </section>
  );
}
