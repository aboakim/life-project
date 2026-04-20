import Link from "next/link";
import { getDirectSponsor } from "@/lib/monetization/config";

/**
 * Self-managed direct-advertiser slot. Renders only when NEXT_PUBLIC_SPONSOR_*
 * vars are configured. Useful when you sell ad space directly to a local
 * business (banks, immigration consultants, HR agencies) without going through
 * an ad network.
 *
 * Clearly labelled "Sponsored" and uses rel="sponsored" — AdSense-compliant.
 */
export default function DirectSponsorSlot({
  className = "",
}: {
  className?: string;
}) {
  const sponsor = getDirectSponsor();
  if (!sponsor) return null;

  return (
    <aside
      aria-label="Sponsored"
      className={`rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-5 ${className}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--ink-soft))]/80">
        Sponsored · {sponsor.name}
      </p>
      <h3 className="mt-2 text-base font-semibold text-[rgb(var(--ink))] [text-wrap:balance]">
        {sponsor.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
        {sponsor.blurb}
      </p>
      <Link
        href={sponsor.href}
        target="_blank"
        rel="sponsored noopener"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[rgb(var(--accent-2))] hover:underline"
      >
        {sponsor.cta} <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
