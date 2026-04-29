import Link from "next/link";
import { getAmazonAffiliateUi } from "@/lib/i18n/amazon-associates";
import type { AppLocale } from "@/lib/i18n/locale";
import { getAmazonAffiliateHref } from "@/lib/monetization/config";

/** Amazon logotype (simplified "a" + smile) — not the official raster asset; keeps bundle self-contained. */
function AmazonWordmark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`text-[#0F1419] ${className}`}
      viewBox="0 0 120 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <text
        x="0"
        y="27"
        fill="currentColor"
        style={{
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          fontSize: "28px",
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        amazon
      </text>
      <path
        d="M2 32c4.5 2.2 9.2 3.2 14 3.2 4.2 0 8.2-.6 12-1.8 2.1-.6 3.1-1.1 3.1-1.1s-1.2 1-3.3 1.6c-3.4 1-7.2 1.4-10.8 1.4-4.4 0-8.5-.5-12-1.4-1.2-.3-1.6-.5-1.6-.5s.3 0 1.5.5z"
        fill="#FF9900"
      />
    </svg>
  );
}

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
        className={`relative overflow-hidden rounded-2xl border border-orange-400/45 bg-gradient-to-br from-orange-500/[0.22] via-rose-500/[0.12] to-indigo-700/[0.18] p-4 shadow-[0_18px_44px_-28px_rgb(249_115_22/0.55)] ring-1 ring-orange-300/25 sm:p-5 ${className}`}
      >
        <div
          className="pointer-events-none absolute -end-16 -top-12 size-40 rounded-full bg-orange-400/25 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex min-w-0 flex-1 gap-4">
            <div className="hidden shrink-0 rounded-xl bg-white/95 p-3 shadow-inner shadow-orange-500/15 ring-1 ring-orange-200/40 sm:block">
              <AmazonWordmark className="h-7 w-[7.5rem]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <AmazonWordmark className="h-6 w-[6.5rem] opacity-95 sm:hidden" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-100/95">
                  {u.eyebrow}
                </p>
              </div>
              <p className="mt-1 text-sm font-semibold text-[rgb(var(--ink))] [text-wrap:balance]">
                {u.headline}
              </p>
              <p className="mt-1 text-xs leading-snug text-[rgb(var(--ink-soft))]/90 [text-wrap:pretty]">
                {u.body}
              </p>
              <p className="mt-1 text-[10px] leading-snug text-[rgb(var(--ink-soft))]/75">
                {u.disclosure}
              </p>
            </div>
          </div>
          <Link
            href={href}
            target="_blank"
            rel="sponsored noopener"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-orange-300/50 bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/35 transition hover:brightness-110 sm:py-2.5"
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
      className={`relative mt-8 overflow-hidden rounded-2xl border border-orange-400/40 bg-gradient-to-br from-orange-500/[0.15] via-rose-500/[0.1] to-indigo-800/[0.12] p-5 shadow-[0_22px_50px_-30px_rgb(249_115_22/0.45)] ring-1 ring-orange-300/20 sm:p-6 ${className}`}
    >
      <div
        className="pointer-events-none absolute -start-10 -top-16 size-44 rounded-full bg-orange-400/20 blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div className="hidden shrink-0 rounded-xl bg-white/95 p-4 shadow-inner shadow-orange-500/15 ring-1 ring-orange-200/40 sm:block">
          <AmazonWordmark className="h-8 w-[8.5rem]" />
        </div>
        <div className="min-w-0 flex-1">
          <AmazonWordmark className="mb-3 h-7 w-[7.5rem] opacity-95 sm:hidden" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-100/95">
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
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-orange-300/45 bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/30 transition hover:brightness-110"
          >
            {u.cta}
            <span aria-hidden="true">→</span>
          </Link>
          <p className="mt-3 text-[11px] text-[rgb(var(--ink-soft))]/80">
            {u.disclosure}
          </p>
        </div>
      </div>
    </aside>
  );
}
