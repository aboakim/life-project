import Link from "next/link";
import { getAmazonAffiliateUi } from "@/lib/i18n/amazon-associates";
import type { AppLocale } from "@/lib/i18n/locale";
import { getAmazonAffiliateHref } from "@/lib/monetization/config";

type Props = {
  /** `compact` = single row under the title — high visibility without pushing content too far. */
  variant?: "default" | "compact";
  className?: string;
  /** When set, headline/body/disclosure follow locale; otherwise English (e.g. blog posts). */
  locale?: AppLocale;
};

/**
 * Amazon Associates — `compact` is meant directly under breadcrumbs so readers
 * see it before scrolling the full article.
 */
export default function AmazonAssociatesCta({
  variant = "default",
  className = "",
  locale,
}: Props) {
  const href = getAmazonAffiliateHref();
  if (!href) return null;

  const u = getAmazonAffiliateUi(locale ?? "en-US");

  if (variant === "compact") {
    return (
      <aside
        aria-label={u.eyebrow}
        className={`rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.09] via-amber-500/[0.04] to-transparent p-4 shadow-sm shadow-black/20 sm:p-5 ${className}`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/90">
              {u.eyebrow}
            </p>
            <p className="mt-1 text-sm font-semibold text-[rgb(var(--ink))] [text-wrap:balance]">
              {u.headline}
            </p>
            <p className="mt-1 text-xs leading-snug text-[rgb(var(--ink-soft))]/85 [text-wrap:pretty]">
              {u.body}
            </p>
            <p className="mt-1 text-[10px] leading-snug text-[rgb(var(--ink-soft))]/70">
              {u.disclosure}
            </p>
          </div>
          <Link
            href={href}
            target="_blank"
            rel="sponsored noopener"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-amber-400/35 bg-amber-500/15 px-5 py-3 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-amber-500/25 sm:py-2.5"
          >
            {u.cta}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label={u.eyebrow}
      className={`mt-8 overflow-hidden rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-500/[0.06] via-white/[0.02] to-transparent p-5 sm:p-6 ${className}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/90">
        {u.eyebrow}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-[rgb(var(--ink))] [text-wrap:balance]">
        {u.headline}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
        {u.body}
      </p>
      <Link
        href={href}
        target="_blank"
        rel="sponsored noopener"
        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-amber-500/[0.16]"
      >
        {u.cta}
        <span aria-hidden="true">→</span>
      </Link>
      <p className="mt-3 text-[11px] text-[rgb(var(--ink-soft))]/75">
        {u.disclosure}
      </p>
    </aside>
  );
}
