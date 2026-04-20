import Link from "next/link";
import { pickOffersForTags } from "@/lib/monetization/config";

/**
 * Contextual affiliate card rendered at the bottom of blog articles.
 * - Silently renders nothing when no affiliate env var is set (safe default).
 * - Picks an offer whose topic matches the article's tags.
 * - Uses rel="sponsored noopener" so the link is honest with Google.
 */
export default function AffiliateSuggestion({ tags }: { tags: string[] }) {
  const offers = pickOffersForTags(tags, 1);
  if (offers.length === 0) return null;
  const o = offers[0];

  return (
    <aside
      aria-label="Recommended resource"
      className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[rgb(var(--accent-2))]/[0.07] via-white/[0.03] to-transparent p-5 sm:p-6"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-2))]/90">
        {o.badge ?? "Sponsored resource"}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-[rgb(var(--ink))] [text-wrap:balance]">
        {o.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
        {o.blurb}
      </p>
      <Link
        href={o.href}
        target="_blank"
        rel="sponsored noopener"
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.22)] transition hover:brightness-110"
      >
        {o.cta}
        <span aria-hidden="true">→</span>
      </Link>
      <p className="mt-3 text-[11px] text-[rgb(var(--ink-soft))]/70">
        {o.id === "amazon" ? (
          <>
            As an Amazon Associate, Life Decision Engine earns from qualifying
            purchases. Same price for you; it helps fund the site.
          </>
        ) : (
          <>
            Affiliate link — if you sign up through this button, Life Decision
            Engine may earn a small commission at no cost to you. We only list
            services we&rsquo;d genuinely recommend to someone in this
            situation.
          </>
        )}
      </p>
    </aside>
  );
}
