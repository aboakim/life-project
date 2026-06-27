import Link from "next/link";
import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";
import HomeIconBadge from "@/components/home/HomeIconBadge";

type Props = { locale: AppLocale };

export default function HomeTrustStatic({ locale }: Props) {
  const t = getUi(locale);
  const rtl = isRtlLocale(locale);

  return (
    <section
      id="section-trust"
      aria-labelledby="home-trust-heading"
      className="relative z-[1] home-section-scroll-mt px-4 py-10 sm:px-6 sm:py-14"
      dir={rtl ? "rtl" : undefined}
    >
      <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-white/[0.1] bg-gradient-to-br from-[rgb(var(--accent))]/8 via-transparent to-[rgb(var(--accent-magenta))]/6 p-6 sm:p-10">
        <h2
          id="home-trust-heading"
          className="font-display text-center text-[clamp(1.5rem,1.05rem+1.8vw,2.15rem)] font-extrabold text-[rgb(var(--ink))] [text-wrap:balance]"
        >
          {t.trustSectionTitle}
        </h2>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.1] bg-[rgb(var(--surface))]/50">
          <div className="grid divide-white/[0.08] sm:grid-cols-3 sm:divide-x divide-y sm:divide-y-0">
            {t.trustCards.map((card) => (
              <article
                key={card.title}
                className="flex flex-col items-center p-6 text-center sm:items-start sm:p-7 sm:text-start"
              >
                <HomeIconBadge icon={card.emoji} size="lg" />
                <h3 className="font-display mt-4 text-lg font-bold text-[rgb(var(--ink))] sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))] sm:text-base">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[rgb(var(--ink-soft))] sm:text-[15px]">
          {t.trustMicroPoints.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <span
                className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] text-emerald-300 ring-1 ring-emerald-400/25"
                aria-hidden
              >
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/experts"
            className="rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] hover:bg-white/[0.1] sm:text-base"
          >
            {t.heroCtaSecondary}
          </Link>
          <Link
            href="/how-we-use-ai"
            className="rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] hover:bg-white/[0.1] sm:text-base"
          >
            AI →
          </Link>
        </div>
      </div>
    </section>
  );
}
