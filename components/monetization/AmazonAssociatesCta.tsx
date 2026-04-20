import Link from "next/link";
import { getAmazonAffiliateHref } from "@/lib/monetization/config";

/**
 * Always-on Amazon Associates strip for blog articles. Separate from
 * AffiliateSuggestion because Wise/Booking otherwise win the single-slot pick.
 */
export default function AmazonAssociatesCta() {
  const href = getAmazonAffiliateHref();
  if (!href) return null;

  return (
    <aside
      aria-label="Amazon Associates"
      className="mt-8 overflow-hidden rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-500/[0.06] via-white/[0.02] to-transparent p-5 sm:p-6"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/90">
        Amazon Associates
      </p>
      <h3 className="mt-2 text-lg font-semibold text-[rgb(var(--ink))] [text-wrap:balance]">
        Books &amp; gear for your next chapter
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
        Decision-making reads, travel basics, and home-office essentials — the
        same Amazon checkout you already use; no extra cost to you.
      </p>
      <Link
        href={href}
        target="_blank"
        rel="sponsored noopener"
        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-amber-500/[0.16]"
      >
        Shop on Amazon
        <span aria-hidden="true">→</span>
      </Link>
      <p className="mt-3 text-[11px] text-[rgb(var(--ink-soft))]/75">
        As an Amazon Associate, Life Decision Engine earns from qualifying
        purchases.
      </p>
    </aside>
  );
}
