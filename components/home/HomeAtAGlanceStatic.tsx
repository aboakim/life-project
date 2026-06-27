import Link from "next/link";
import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";
import HomeIconBadge from "@/components/home/HomeIconBadge";

type Props = { locale: AppLocale };

const GLANCE_ICONS = ["🗺️", "🌀", "✅"] as const;

export default function HomeAtAGlanceStatic({ locale }: Props) {
  const t = getUi(locale);
  const rtl = isRtlLocale(locale);

  return (
    <section
      id="section-overview"
      aria-labelledby="home-overview-heading"
      className="relative z-[1] home-section-scroll-mt px-4 pb-6 pt-4 sm:px-6"
      dir={rtl ? "rtl" : undefined}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[rgb(var(--accent-2))]">
            {t.atAGlanceEyebrow}
          </p>
          <h2
            id="home-overview-heading"
            className="font-display mx-auto mt-3 max-w-3xl text-[clamp(1.75rem,1.15rem+2.2vw,2.55rem)] font-extrabold leading-[1.08] tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
          >
            {t.atAGlanceTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-[0_20px_50px_-32px_rgb(var(--accent)/0.35)]">
          <div className="grid divide-white/[0.08] sm:grid-cols-3 sm:divide-x divide-y sm:divide-y-0">
            {t.atAGlanceCards.map((card, i) => (
              <article
                key={card.title}
                className="group flex flex-col p-6 sm:p-7"
              >
                <HomeIconBadge icon={GLANCE_ICONS[i] ?? "✦"} />
                <h3 className="font-display mt-4 text-lg font-bold leading-snug text-[rgb(var(--ink))] sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] sm:text-base">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
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
