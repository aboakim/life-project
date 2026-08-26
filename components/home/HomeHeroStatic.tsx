import Link from "next/link";
import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";
import { getPricingCopy } from "@/lib/i18n/pricing-page";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { HERO_LCP_IMAGE_URL, HERO_LCP_IMAGE_JPEG_URL, HERO_VIDEO_URL } from "@/lib/home/hero-slide-images";
import HomeHeroVideoDeferred from "@/components/home/HomeHeroVideoDeferred";

type Props = { locale?: AppLocale };

function ReportMock({
  locale,
  question,
  cards,
  scorePill,
  headerLabel,
}: {
  locale: AppLocale;
  question: string;
  cards: readonly { pill: string; title: string }[];
  scorePill: string;
  headerLabel: string;
}) {
  const rtl = isRtlLocale(locale);
  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/[0.14] bg-[rgb(var(--surface-2))] shadow-[0_24px_70px_-32px_rgb(var(--accent)/0.5)] max-md:shadow-[0_16px_40px_-24px_rgb(0_0_0/0.5)]"
      dir={rtl ? "rtl" : undefined}
    >
      <div className="border-b border-white/10 bg-white/[0.06] px-4 py-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[rgb(var(--accent-2))]">
          {headerLabel}
        </p>
        <p className="mt-1 text-sm font-semibold leading-snug text-[rgb(var(--ink))] [text-wrap:pretty]">
          “{question}”
        </p>
      </div>
      <div className="space-y-2 p-3">
        {cards.slice(0, 3).map((c, i) => (
          <div
            key={c.pill}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[rgb(var(--ink-soft))]">
                {c.pill}
              </p>
              <p className="text-sm font-semibold text-[rgb(var(--ink))]">
                {c.title}
              </p>
            </div>
            <span className="shrink-0 rounded-lg bg-[rgb(var(--accent))]/15 px-2 py-1 text-xs font-bold text-[rgb(var(--accent-2))]">
              {i === 0 ? "72%" : i === 1 ? "58%" : "31%"}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-3">
        <p className="text-[11px] text-[rgb(var(--ink-soft))]">
          {scorePill}:{" "}
          <span className="font-semibold text-[rgb(var(--ink))]">64%</span> · 4
          lenses · timeline
        </p>
      </div>
    </div>
  );
}

/**
 * Server-rendered home hero — clear value prop + sample report preview.
 */
export default function HomeHeroStatic({ locale: localeProp }: Props = {}) {
  const locale = localeProp ?? DEFAULT_LOCALE;
  const t = getUi(locale);
  const pr = getPricingCopy(locale);
  const slide = t.heroSlides[0]!;
  const rtl = isRtlLocale(locale);

  return (
    <div
      className="relative z-10"
      dir={rtl ? "rtl" : undefined}
      style={
        rtl
          ? { fontFamily: "var(--font-ar), var(--font-noto), sans-serif" }
          : undefined
      }
    >
      <div className="relative z-[1] mx-auto max-w-6xl px-4 pb-4 pt-6 sm:px-6 sm:pt-10">
        <section
          id="section-hero"
          className="home-hero-panel home-section-wash home-section-wash--hero relative overflow-hidden rounded-[1.75rem] border border-white/[0.14] bg-gradient-to-br from-white/[0.09] via-white/[0.04] to-[rgb(var(--surface-elevated))]/50 p-5 max-md:border-white/[0.1] max-md:bg-[rgb(var(--surface-2))] max-md:bg-none sm:rounded-[2.25rem] sm:p-10 lg:p-12"
        >
          <div className="home-hero-panel__tint pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgb(var(--accent)/0.08),transparent_45%,rgb(var(--accent-magenta)/0.06))]" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,380px)] lg:items-center lg:gap-12">
            <div className="home-hero-copy relative z-[1]">
              <div className="home-hero-ribbon inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[rgb(var(--accent-2))] sm:text-[11px]">
                <span className="size-2 rounded-full bg-[rgb(var(--accent))] shadow-[0_0_10px_rgb(var(--accent)/0.6)]" />
                {t.heroRibbon}
              </div>

              <h1 className="font-display mt-5 text-[clamp(2rem,1.1rem+3.8vw,3.75rem)] font-extrabold leading-[1.04] tracking-tight [text-wrap:balance]">
                <span className="text-[rgb(var(--ink))]">{t.heroLine1}</span>{" "}
                <span className="text-gradient">{t.heroAccent}</span>
              </h1>

              <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-[rgb(var(--ink))]/95 [text-wrap:pretty] sm:text-xl">
                {t.subtitle}
              </p>

              <ul className="mt-6 space-y-2.5">
                {t.trustMicroPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-[rgb(var(--ink-soft))] sm:text-[15px]"
                  >
                    <span
                      className="home-hero-check mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] text-emerald-300 ring-1 ring-emerald-400/20"
                      aria-hidden
                    >
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-2">
                {t.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-[rgb(var(--ink))] sm:text-sm"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/analyze"
                  className="home-hero-cta inline-flex min-h-[64px] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-10 py-5 text-lg font-extrabold tracking-tight text-white shadow-[0_16px_48px_-12px_rgb(var(--accent)/0.55)] ring-1 ring-white/20 transition hover:brightness-110 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] sm:min-h-[72px] sm:w-auto sm:px-12 sm:py-6 sm:text-xl"
                >
                  {t.heroCtaPrimary}
                  <span aria-hidden className="text-xl sm:text-2xl">
                    →
                  </span>
                </Link>
                <Link
                  href="/experts"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.16] bg-white/[0.06] px-6 py-3 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.1] sm:w-auto sm:text-base"
                >
                  {t.heroCtaSecondary}
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center px-2 py-2 text-sm font-semibold text-[rgb(var(--accent-warm))] underline-offset-4 hover:underline"
                >
                  {pr.navPricing} →
                </Link>
              </div>
            </div>

            <div className="home-hero-media-column relative isolate z-[1] space-y-4">
              <div className="home-hero-video-shell relative overflow-hidden rounded-2xl border border-white/[0.12] shadow-[0_20px_60px_-28px_rgb(var(--accent)/0.4)] max-md:border-white/[0.1] max-md:shadow-[0_10px_28px_-14px_rgb(0_0_0/0.55)]">
                <div className="home-hero-video-shell__media relative aspect-[5/4] w-full overflow-hidden">
                  {/* Poster under video — fast LCP; WebP with JPEG fallback */}
                  <picture className="absolute inset-0 z-0 block h-full w-full">
                    <source
                      srcSet={HERO_LCP_IMAGE_URL}
                      type="image/webp"
                    />
                    <img
                      src={HERO_LCP_IMAGE_JPEG_URL}
                      alt=""
                      aria-hidden
                      decoding="sync"
                      fetchPriority="high"
                      width={840}
                      height={672}
                      sizes="(min-width: 1024px) 380px, 100vw"
                      className="h-full w-full object-cover"
                    />
                  </picture>
                  <HomeHeroVideoDeferred
                    src={HERO_VIDEO_URL}
                    poster={HERO_LCP_IMAGE_JPEG_URL}
                    ariaLabel={slide.alt}
                  />
                  <div
                    className="home-hero-video-shell__caption-scrim pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[44%] bg-gradient-to-t from-[rgb(20_18_38)] via-[rgb(20_18_38/0.72)] to-transparent"
                    aria-hidden
                  />
                  <p className="home-hero-video-shell__caption absolute bottom-0 left-0 right-0 z-[3] px-4 py-3 text-center text-xs font-medium leading-snug text-white sm:text-sm md:pb-4 md:text-white/95">
                    {slide.caption}
                  </p>
                </div>
              </div>
              <ReportMock
                locale={locale}
                question={t.homeDemoExample1}
                cards={t.bentoCards}
                scorePill={t.bentoCards[3]?.pill ?? "Score"}
                headerLabel={t.homeDemoTitle}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
