import { cookies } from "next/headers";
import {
  LDE_LOCALE_COOKIE_NAME,
  localeFromCookieValue,
} from "@/lib/locale-cookie";
import { isRtlLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";
import { HERO_SLIDE_IMAGE_URLS } from "@/lib/home/hero-slide-images";

/**
 * Shown until the home client bundle hydrates. Keeps LCP on a real <img>
 * in the initial HTML (no /_next/image round-trip, no React hydration wait).
 */
export default async function HomeHeroFallback() {
  const jar = await cookies();
  const locale = localeFromCookieValue(
    jar.get(LDE_LOCALE_COOKIE_NAME)?.value,
  );
  const t = getUi(locale);
  const slide = t.heroSlides[0]!;
  const rtl = isRtlLocale(locale);

  return (
    <div
      className="relative z-10 min-h-screen"
      dir={rtl ? "rtl" : undefined}
      style={
        rtl
          ? { fontFamily: "var(--font-ar), var(--font-noto), sans-serif" }
          : undefined
      }
    >
      <div className="relative z-[1] mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <section
          id="section-hero"
          className="home-section-wash home-section-wash--hero relative overflow-hidden rounded-[1.75rem] border border-white/[0.16] bg-gradient-to-br from-white/[0.1] via-white/[0.05] to-[rgb(var(--surface-elevated))]/55 p-4 shadow-[0_28px_80px_-48px_rgb(var(--accent)/0.35),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-sm sm:rounded-[2.5rem] sm:p-10 lg:p-14"
          aria-busy="true"
        >
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:items-center">
            <div className="space-y-4" aria-hidden>
              <div className="h-8 w-40 max-w-[70%] rounded-full bg-white/[0.08]" />
              <div className="h-14 w-full max-w-xl rounded-2xl bg-white/[0.07]" />
              <div className="h-24 w-full max-w-lg rounded-2xl bg-white/[0.06]" />
            </div>
            <div className="relative space-y-5">
              <div
                className="relative overflow-hidden rounded-2xl border border-white/[0.14] bg-[rgb(var(--surface-2))] shadow-[0_24px_80px_-32px_rgb(var(--accent)/0.45)]"
              >
                <div className="relative aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={HERO_SLIDE_IMAGE_URLS[0]}
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
