import Link from "next/link";

type Props = {
  className?: string;
};

/**
 * Static newsletter CTA used across /blog index and article pages.
 * No email capture yet — links to /contact so we don't ship a dead
 * form. Signals editorial investment to AdSense reviewers without
 * making a promise we can't keep.
 */
export default function NewsletterCta({ className = "" }: Props) {
  return (
    <aside
      aria-labelledby="newsletter-cta-heading"
      className={`rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[rgb(var(--accent))]/[0.08] via-transparent to-[rgb(var(--accent-magenta))]/[0.07] p-6 sm:p-8 ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-dim))]">
        Editorial
      </p>
      <h3
        id="newsletter-cta-heading"
        className="mt-2 text-lg font-semibold text-[rgb(var(--ink))] sm:text-xl [text-wrap:balance]"
      >
        We publish long-form essays on the decisions that actually matter.
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
        No clickbait, no daily noise — a new framework every week or two, on
        careers, relocation, relationships, finance, and the psychology of
        regret. Bookmark the blog, or reach out if you&rsquo;d like to be
        notified when a new piece lands.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--accent))]/35 bg-[rgb(var(--accent))]/10 px-5 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition hover:border-[rgb(var(--accent))]/55"
        >
          Browse all essays
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-[rgb(var(--ink-soft))] transition hover:border-white/25 hover:text-[rgb(var(--ink))]"
        >
          Ask to be notified
        </Link>
      </div>
    </aside>
  );
}
