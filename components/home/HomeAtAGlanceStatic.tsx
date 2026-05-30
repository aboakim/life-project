import Link from "next/link";
import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";

type Props = { locale: AppLocale };

export default function HomeAtAGlanceStatic({ locale }: Props) {
  const t = getUi(locale);
  const rtl = isRtlLocale(locale);

  return (
    <section
      id="section-overview"
      aria-labelledby="home-overview-heading"
      className="relative z-[1] scroll-mt-[7.5rem] px-4 pb-6 pt-4 sm:px-6"
      dir={rtl ? "rtl" : undefined}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[rgb(var(--accent-2))]">
            {t.atAGlanceEyebrow}
          </p>
          <h2
            id="home-overview-heading"
            className="font-display mx-auto mt-3 max-w-3xl text-[clamp(1.65rem,1.1rem+2vw,2.45rem)] font-extrabold leading-[1.08] tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
          >
            {t.atAGlanceTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {t.atAGlanceCards.map((card, i) => (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-5 shadow-[0_20px_50px_-32px_rgb(var(--accent)/0.35)] transition duration-300 hover:border-[rgb(var(--accent))]/30 hover:shadow-[0_24px_60px_-28px_rgb(var(--accent)/0.45)] sm:p-6"
            >
              <span
                className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[rgb(var(--accent))]/25 to-[rgb(var(--accent-2))]/15 text-sm font-extrabold text-[rgb(var(--accent-2))] ring-1 ring-white/10"
                aria-hidden
              >
                {i + 1}
              </span>
              <h3 className="font-display mt-4 text-lg font-bold leading-snug text-[rgb(var(--ink))]">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/analyze"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[rgb(var(--accent)/0.28)] transition hover:brightness-110 sm:w-auto"
          >
            {t.heroCtaPrimary}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/blog"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-white/[0.14] bg-white/[0.06] px-8 py-3.5 text-base font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.1] sm:w-auto"
          >
            {t.navBlog} →
          </Link>
        </div>
      </div>
    </section>
  );
}
