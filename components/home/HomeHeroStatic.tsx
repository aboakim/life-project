import Link from "next/link";
import { cookies } from "next/headers";
import {
  LDE_LOCALE_COOKIE_NAME,
  localeFromCookieValue,
} from "@/lib/locale-cookie";
import { isRtlLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";
import { getExpertsCopy } from "@/lib/i18n/experts-network";
import { getPricingCopy } from "@/lib/i18n/pricing-page";
import { HERO_LCP_IMAGE_URL } from "@/lib/home/hero-slide-images";

function previewHref(section: string): string {
  return `#section-${section}`;
}

/**
 * Full server-rendered home hero — LCP image + copy without the 300kB client bundle.
 */
export default async function HomeHeroStatic() {
  const jar = await cookies();
  const locale = localeFromCookieValue(
    jar.get(LDE_LOCALE_COOKIE_NAME)?.value,
  );
  const t = getUi(locale);
  const slide = t.heroSlides[0]!;
  const exNav = getExpertsCopy(locale);
  const pr = getPricingCopy(locale);
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
      <div className="relative z-[1] mx-auto max-w-6xl max-md:pb-8 px-4 pb-8 pt-6 sm:px-6 sm:pt-8">
        <section
          id="section-hero"
          className="home-section-wash home-section-wash--hero relative overflow-hidden rounded-[1.75rem] border border-white/[0.16] bg-gradient-to-br from-white/[0.1] via-white/[0.05] to-[rgb(var(--surface-elevated))]/55 p-4 shadow-[0_28px_80px_-48px_rgb(var(--accent)/0.35),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-sm sm:rounded-[2.5rem] sm:p-10 lg:p-14"
        >
          <div className="home-hero-spine-breathe pointer-events-none absolute inset-y-10 start-3 w-[5px] rounded-full bg-gradient-to-b from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] opacity-90 shadow-[0_0_20px_rgb(var(--accent)/0.4)] sm:start-5 sm:w-1.5" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgb(var(--accent)/0.1),transparent_40%,rgb(var(--accent-2)/0.07),transparent_60%,rgb(var(--accent-magenta)/0.08))]" />
          <div className="grid-view pointer-events-none absolute inset-0 opacity-[0.5]" />
          <div className="relative grid gap-12 ps-4 sm:ps-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:items-center lg:ps-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.22] bg-white/[0.11] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[rgb(var(--ink))] shadow-[0_0_32px_-10px_rgb(var(--accent)/0.45),inset_0_1px_0_0_rgba(255,255,255,0.12)] ring-1 ring-[rgb(var(--accent))]/15 backdrop-blur-sm sm:text-xs">
                <span className="home-brand-pulse-dot size-2.5 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] shadow-[0_0_16px_rgb(var(--accent)/0.6)]" />
                {t.brand}
              </div>
              <p className="mt-6 text-sm font-semibold leading-snug text-[rgb(var(--accent-2))] [text-wrap:balance] sm:text-base">
                {t.heroRibbon}
              </p>
              <div className="mt-4">
                <Link
                  href="/analyze"
                  className="touch-manipulation inline-flex min-h-[64px] items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-8 py-4 text-xl font-extrabold text-white/95 shadow-lg shadow-fuchsia-500/30 ring-1 ring-white/25 transition md:hover:brightness-110"
                >
                  {t.heroCtaPrimary}
                  <span aria-hidden>→</span>
                </Link>
              </div>
              <h1 className="font-display mt-5 text-[clamp(2.1rem,1.15rem+4vw,4rem)] font-extrabold leading-[1.02] tracking-tight [text-wrap:balance]">
                <span className="text-[rgb(var(--ink))]">{t.heroLine1}</span>{" "}
                <span className="text-gradient">{t.heroAccent}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] md:text-xl md:leading-relaxed">
                {t.subtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {t.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/[0.14] bg-white/[0.07] px-4 py-2 text-sm font-medium text-[rgb(var(--ink))]"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/analyze"
                  className="inline-flex min-h-[52px] min-w-[min(100%,18rem)] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-10 py-4 text-lg font-bold text-white shadow-xl shadow-[rgb(var(--accent)/0.3)] transition hover:brightness-110 sm:w-auto"
                >
                  {t.heroCtaPrimary}
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/experts"
                  className="btn-extrude-3d inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.18] bg-white/[0.07] px-8 py-3.5 text-base font-bold text-[rgb(var(--ink))] transition-colors hover:bg-white/[0.12]"
                >
                  {t.heroCtaSecondary}
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 text-base font-semibold text-[rgb(var(--accent-warm))] underline-offset-4 hover:underline"
                >
                  {pr.navPricing}
                </Link>
              </div>
            </div>

            <div className="relative space-y-5">
              <div className="absolute -inset-4 -z-10 rounded-[1.75rem] bg-gradient-to-br from-[rgb(var(--accent))]/14 via-[rgb(var(--accent-magenta))]/8 to-[rgb(var(--accent-2))]/12 blur-xl" />
              <div className="block w-full space-y-5">
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.14] bg-[rgb(var(--surface-2))] shadow-[0_24px_80px_-32px_rgb(var(--accent)/0.45)]">
                  <div className="relative aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-[4/5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={HERO_LCP_IMAGE_URL}
                      alt={slide.alt}
                      width={380}
                      height={475}
                      fetchPriority="high"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(28_24_52/0.9)] via-[rgb(40_36_70/0.32)] to-[rgb(var(--accent)/0.12)]" />
                    <p className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-12 text-center text-[13px] font-medium leading-snug text-white/95 sm:px-5 sm:pb-5 sm:text-sm">
                      {slide.caption}
                    </p>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[rgb(var(--surface-2))]/90 shadow-2xl backdrop-blur-xl">
                  <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3">
                    <span className="text-xs font-semibold text-[rgb(var(--ink))]">
                      {t.previewCardTitle}
                    </span>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-200/95 ring-1 ring-emerald-400/25">
                      Live
                    </span>
                  </div>
                  <div className="relative space-y-0 divide-y divide-white/[0.06] p-2">
                    {t.previewRows.map((row) => (
                      <a
                        key={row.label}
                        href={previewHref(row.section)}
                        className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/[0.04]"
                      >
                        <span className="text-xs text-[rgb(var(--ink-soft))]">
                          {row.label}
                        </span>
                        <span className="text-sm font-semibold text-[rgb(var(--ink))]">
                          {row.value}
                        </span>
                      </a>
                    ))}
                  </div>
                  <div className="border-t border-white/[0.12] bg-white/[0.06] px-4 py-3">
                    <p className="text-[11px] leading-relaxed text-[rgb(var(--ink-soft))]">
                      {exNav.homePromoLink}
                    </p>
                    <Link
                      href="/experts"
                      className="mt-2 inline-flex text-xs font-semibold text-[rgb(var(--accent-2))] hover:underline"
                    >
                      {exNav.navExperts} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
