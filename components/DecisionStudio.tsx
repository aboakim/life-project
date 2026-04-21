"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DecisionBriefWizard from "@/components/home/DecisionBriefWizard";
import HeroVisualSlider from "@/components/home/HeroVisualSlider";
import HomeSectionNav from "@/components/home/HomeSectionNav";
import ProductSceneStrip from "@/components/home/ProductSceneStrip";
import OrbDecor from "@/components/ui/OrbDecor";
import { getExpertsCopy } from "@/lib/i18n/experts-network";
import { getPricingCopy } from "@/lib/i18n/pricing-page";
import type { DecisionAnalysis } from "@/lib/types";
import {
  LOCALE_OPTIONS,
  type AppLocale,
  isAppLocale,
  isRtlLocale,
} from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import {
  readLocaleCookieClient,
  syncLocaleCookieClient,
} from "@/lib/locale-cookie";
import {
  HERO_SLIDE_IMAGE_URLS,
  PRODUCT_STRIP_IMAGE_URLS,
} from "@/lib/home/hero-slide-images";
import { getDecisionBriefCopy } from "@/lib/i18n/decision-brief";
import WelcomeModal from "@/components/home/WelcomeModal";
import {
  LOCALE_CHANGE_EVENT,
  dispatchLocaleChanged,
} from "@/lib/locale-sync";
import type { InitialPreset } from "@/components/home/DecisionStudioShell";
import { getSiteExtras, getWarmPresets } from "@/lib/i18n/site-extras";
import { getPostAnalysisCopy } from "@/lib/i18n/post-analysis";
import AnalysisResultTools from "@/components/home/AnalysisResultTools";
import {
  pushHistory,
  isReminderDue,
  clearReminder,
} from "@/lib/analysis-local";

const LOCALE_STORAGE_KEY = "lde-locale";
const VISIT_COUNT_KEY = "lde-home-visits";
const VISITOR_BANNER_DISMISS_KEY = "lde-visitor-path-dismissed";

type ApiResponse = {
  analysis: DecisionAnalysis;
  mode: "live" | "demo" | "fallback";
  hint?: string;
  warning?: string;
};

function previewHref(
  section: "workspace" | "product" | "language"
): string {
  const m = {
    workspace: "section-workspace",
    product: "section-product",
    language: "section-language",
  } as const;
  return `#${m[section]}`;
}

function ScoreCircle({
  score,
  sublabel,
}: {
  score: number;
  sublabel: string;
}) {
  const pct = Math.min(100, Math.max(0, score));
  return (
    <div
      className="relative mx-auto size-44 rounded-full p-[3px] score-ring shadow-[0_0_60px_-12px_rgb(var(--glow))]"
      style={{ "--score": pct } as React.CSSProperties}
    >
      <div className="flex size-full items-center justify-center rounded-full bg-[rgb(var(--surface))]">
        <div className="text-center">
          <div className="text-4xl font-bold tabular-nums text-gradient">
            {pct}%
          </div>
          <div className="mt-1 px-2 text-[11px] leading-snug text-[rgb(var(--ink-soft))]">
            {sublabel}
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = { initialPreset?: InitialPreset };

export default function DecisionStudio({ initialPreset = null }: Props) {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);
  const t = getUi(locale);
  const sx = getSiteExtras(locale);
  const warmPresets = useMemo(() => getWarmPresets(locale), [locale]);
  const pa = useMemo(() => getPostAnalysisCopy(locale), [locale]);
  const presetApplied = useRef(false);
  const exNav = getExpertsCopy(locale);
  const pr = getPricingCopy(locale);
  const brief = getDecisionBriefCopy(locale);
  const rtl = isRtlLocale(locale);

  const sectionLinks = useMemo(
    () => [
      { id: "section-overview" as const, label: t.sectionNavOverview },
      { id: "section-product" as const, label: t.sectionNavProduct },
      { id: "section-trust" as const, label: t.sectionNavTrust },
      { id: "section-how" as const, label: t.sectionNavHow },
      { id: "section-workspace" as const, label: t.sectionNavAnalyzer },
      { id: "section-language" as const, label: t.sectionNavLanguage },
      { id: "section-privacy" as const, label: t.sectionNavPrivacy },
    ],
    [t]
  );

  useEffect(() => {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
    const fromCookie = readLocaleCookieClient();
    let resolved: AppLocale = DEFAULT_LOCALE;
    if (raw !== null && isAppLocale(raw)) {
      resolved = raw;
    } else if (fromCookie !== null) {
      resolved = fromCookie;
    }
    setLocale(resolved);
    if (raw === null || !isAppLocale(raw)) {
      localStorage.setItem(LOCALE_STORAGE_KEY, resolved);
    }
  }, []);

  useEffect(() => {
    function syncFromNav() {
      const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (raw && isAppLocale(raw)) setLocale(raw);
    }
    window.addEventListener(LOCALE_CHANGE_EVENT, syncFromNav);
    return () => window.removeEventListener(LOCALE_CHANGE_EVENT, syncFromNav);
  }, []);

  const [visitorBannerOpen, setVisitorBannerOpen] = useState(false);
  const [decisionReminderBanner, setDecisionReminderBanner] = useState(false);
  const [decision, setDecision] = useState("");
  const [context, setContext] = useState("");
  const [constraints, setConstraints] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);

  useEffect(() => {
    try {
      const prev = parseInt(
        window.localStorage.getItem(VISIT_COUNT_KEY) ?? "0",
        10
      );
      const next = Number.isFinite(prev) ? prev + 1 : 1;
      window.localStorage.setItem(VISIT_COUNT_KEY, String(next));
      const dismissed =
        window.localStorage.getItem(VISITOR_BANNER_DISMISS_KEY) === "1";
      if (next >= 3 && !dismissed) setVisitorBannerOpen(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      if (isReminderDue()) setDecisionReminderBanner(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!initialPreset || presetApplied.current) return;
    const pack = warmPresets[initialPreset];
    setDecision(pack.decision);
    setContext(pack.context);
    setConstraints(pack.constraints);
    presetApplied.current = true;
  }, [initialPreset, warmPresets]);

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    syncLocaleCookieClient(locale);
    document.documentElement.lang = locale;
    document.documentElement.setAttribute(
      "dir",
      isRtlLocale(locale) ? "rtl" : "ltr"
    );
    dispatchLocaleChanged();
  }, [locale]);

  const demoMode =
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_DEMO_MODE === "1";

  const canSubmit = useMemo(() => decision.trim().length > 0, [decision]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decision,
          context,
          constraints,
          language: locale,
        }),
      });
      const data = (await res.json()) as ApiResponse & { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Request failed");
        return;
      }
      setResult(data);
      try {
        pushHistory({
          decision,
          context,
          constraints,
          analysis: data.analysis,
          mode: data.mode,
        });
      } catch {
        /* ignore */
      }
      setTimeout(() => {
        document.getElementById("section-results")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 120);
    } catch {
      setError(t.networkError);
    } finally {
      setLoading(false);
    }
  }

  const a = result?.analysis;

  const expertsSearchHref = useMemo(() => {
    const q = decision.trim().slice(0, 160);
    return q ? `/experts?q=${encodeURIComponent(q)}` : "/experts";
  }, [decision]);

  const heroSlideDeck = useMemo(() => {
    const n = Math.min(
      HERO_SLIDE_IMAGE_URLS.length,
      t.heroSlides.length
    );
    return Array.from({ length: n }, (_, i) => ({
      src: HERO_SLIDE_IMAGE_URLS[i]!,
      alt: t.heroSlides[i]!.alt,
      caption: t.heroSlides[i]!.caption,
    }));
  }, [t.heroSlides]);

  const scrollToAnalyzer = useCallback(() => {
    window.setTimeout(() => {
      document.getElementById("analyzer")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.setTimeout(() => {
        document.getElementById("decision-input")?.focus({ preventScroll: true });
      }, 450);
    }, 30);
  }, []);

  const loadBriefFromHistory = useCallback(
    (d: string, ctx: string, cons: string) => {
      setDecision(d);
      setContext(ctx);
      setConstraints(cons);
      window.setTimeout(() => scrollToAnalyzer(), 40);
    },
    [scrollToAnalyzer],
  );

  return (
    <div
      className="relative z-10 min-h-screen"
      style={
        rtl
          ? { fontFamily: "var(--font-ar), var(--font-noto), sans-serif" }
          : undefined
      }
    >
      <WelcomeModal locale={locale} onLocaleChange={setLocale} />
      <OrbDecor />
      <HomeSectionNav links={sectionLinks} />

      {demoMode ? (
        <div className="pointer-events-none fixed start-3 end-3 top-[4.75rem] z-[30] max-w-none rounded-xl border border-amber-400/35 bg-amber-500/[0.12] px-3 py-2 text-center text-[11px] font-medium leading-snug text-amber-100/95 shadow-lg backdrop-blur-md sm:start-auto sm:end-4 sm:top-[4.5rem] sm:max-w-[min(100%,20rem)] sm:text-start sm:text-xs">
          {sx.demoBadge}
        </div>
      ) : null}

      {visitorBannerOpen ? (
        <div
          className="relative z-[45] mx-auto max-w-6xl px-4 pt-4 sm:px-6"
          role="region"
          aria-label={sx.visitorTitle}
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-[rgb(var(--accent-2))]/35 bg-gradient-to-br from-[rgb(var(--accent))]/14 via-white/[0.06] to-transparent px-4 py-4 shadow-[0_20px_60px_-40px_rgb(var(--accent)/0.5)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[rgb(var(--accent-2))]">
                {sx.visitorEyebrow}
              </p>
              <p className="mt-1 font-display text-base font-semibold text-[rgb(var(--ink))]">
                {sx.visitorTitle}
              </p>
              <ol className="mt-2 list-decimal space-y-1 ps-5 text-sm text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                <li>{sx.visitorStep1}</li>
                <li>{sx.visitorStep2}</li>
                <li>{sx.visitorStep3}</li>
              </ol>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.12]"
              onClick={() => {
                try {
                  window.localStorage.setItem(VISITOR_BANNER_DISMISS_KEY, "1");
                } catch {
                  /* ignore */
                }
                setVisitorBannerOpen(false);
              }}
            >
              {sx.visitorDismiss}
            </button>
          </div>
        </div>
      ) : null}

      {decisionReminderBanner ? (
        <div
          className="relative z-[44] mx-auto max-w-6xl px-4 pt-3 sm:px-6"
          role="region"
        >
          <div className="flex flex-col gap-2 rounded-2xl border border-cyan-400/25 bg-cyan-500/[0.08] px-4 py-3 text-sm text-cyan-50/95 sm:flex-row sm:items-center sm:justify-between">
            <p className="[text-wrap:pretty]">{pa.reminderBanner}</p>
            <button
              type="button"
              className="shrink-0 rounded-xl border border-white/15 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-[rgb(var(--ink))]"
              onClick={() => {
                try {
                  clearReminder();
                } catch {
                  /* ignore */
                }
                setDecisionReminderBanner(false);
              }}
            >
              {pa.reminderDismiss}
            </button>
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-6xl px-4 pb-32 pt-6 sm:px-6 sm:pt-8">
        {/* Hero — split layout like leading SaaS landings */}
        <section
          id="section-hero"
          className="home-section-wash home-section-wash--hero animate-fade-up relative overflow-hidden rounded-[1.75rem] border border-white/[0.16] bg-gradient-to-br from-white/[0.16] via-white/[0.07] to-[rgb(var(--surface-elevated))]/45 p-4 shadow-[0_40px_120px_-52px_rgb(var(--accent)/0.45),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-md sm:rounded-[2.5rem] sm:p-10 lg:p-14"
        >
          <div className="pointer-events-none absolute inset-y-10 start-3 w-[5px] rounded-full bg-gradient-to-b from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] opacity-95 shadow-[0_0_28px_rgb(var(--accent)/0.55)] sm:start-5 sm:w-1.5" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgb(var(--accent)/0.16),transparent_38%,rgb(var(--accent-2)/0.11),transparent_62%,rgb(var(--accent-magenta)/0.12))]" />
          <div className="grid-view pointer-events-none absolute inset-0 opacity-[0.5]" />
          <div className="relative grid gap-12 ps-4 sm:ps-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:items-center lg:ps-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.2] bg-white/[0.1] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[rgb(var(--ink))] shadow-[0_0_32px_-10px_rgb(var(--accent)/0.45)] backdrop-blur-sm sm:text-xs">
                <span className="size-2.5 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] shadow-[0_0_16px_rgb(var(--accent)/0.6)]" />
                {t.brand}
              </div>
              <p className="mt-6 text-sm font-semibold leading-snug text-[rgb(var(--accent-2))] [text-wrap:balance] sm:text-base">
                {t.heroRibbon}
              </p>
              <h1 className="font-display mt-5 text-[clamp(2.1rem,1.15rem+4vw,4rem)] font-extrabold leading-[1.02] tracking-tight [text-wrap:balance]">
                <span className="text-[rgb(var(--ink))]">{t.heroLine1}</span>{" "}
                <span className="text-gradient">{t.heroAccent}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] md:text-xl md:leading-relaxed">
                {t.subtitle}
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
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
                <a
                  href="#section-workspace"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-[rgb(var(--accent)/0.35)] transition hover:brightness-110"
                >
                  {t.heroCtaPrimary}
                  <span aria-hidden>↓</span>
                </a>
                <Link
                  href="/experts"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.18] bg-white/[0.07] px-8 py-3.5 text-base font-bold text-[rgb(var(--ink))] transition hover:bg-white/[0.12]"
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
              <div className="absolute -inset-4 -z-10 rounded-[1.75rem] bg-gradient-to-br from-[rgb(var(--accent))]/22 via-[rgb(var(--accent-magenta))]/12 to-[rgb(var(--accent-2))]/18 blur-2xl" />
              <HeroVisualSlider slides={heroSlideDeck} />
              <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[rgb(var(--surface-2))]/90 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <span className="text-xs font-semibold text-[rgb(var(--ink))]">
                    {t.previewCardTitle}
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-200/95">
                    Live
                  </span>
                </div>
                <div className="space-y-0 divide-y divide-white/[0.06] p-2">
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
        </section>

        <section
          id="section-overview"
          className="home-section-wash home-section-wash--overview scroll-mt-36 rounded-[1.85rem] px-3 pt-12 pb-1 sm:px-4 sm:pt-14"
          aria-labelledby="overview-heading"
        >
          <div className="rounded-[1.75rem] border border-white/[0.12] bg-gradient-to-br from-white/[0.1] via-white/[0.04] to-transparent p-6 shadow-[0_20px_60px_-36px_rgb(var(--accent)/0.25),0_0_0_1px_rgba(255,255,255,0.05)_inset] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-2))]">
              {t.atAGlanceEyebrow}
            </p>
            <h2
              id="overview-heading"
              className="font-display mt-2 text-[clamp(1.35rem,1rem+1.4vw,1.95rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
            >
              {t.atAGlanceTitle}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {t.atAGlanceCards.map((card, i) => (
                <li
                  key={card.title}
                  className="flex flex-col rounded-2xl border border-white/[0.1] bg-[rgb(var(--surface-2))]/55 p-5 ring-1 ring-white/[0.06]"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(var(--accent))]/35 to-[rgb(var(--accent-2))]/20 text-xs font-bold text-white shadow-inner">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-[rgb(var(--ink))]">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                    {card.body}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-6">
              <a
                href="#section-workspace"
                className="inline-flex items-center justify-center rounded-xl bg-white/[0.07] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] ring-1 ring-white/10 transition hover:bg-white/[0.1]"
              >
                {t.heroCtaPrimary}
              </a>
              <span className="text-xs text-[rgb(var(--ink-soft))]/90">
                {t.sectionNavProduct} → {t.sectionNavHow} → {t.sectionNavAnalyzer}
              </span>
            </div>
          </div>
        </section>

        {/* Product — bento */}
        <section
          id="section-product"
          className="home-section-wash home-section-wash--product scroll-mt-36 rounded-[1.85rem] px-3 pt-16 pb-1 sm:px-4 sm:pt-20"
          aria-labelledby="product-heading"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-2))]">
              {t.sectionNavProduct}
            </p>
            <h2
              id="product-heading"
              className="font-display mt-2 text-[clamp(1.55rem,1.05rem+2vw,2.35rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
            >
              {t.productSectionTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
              {t.productSectionSubtitle}
            </p>
          </div>
          <ProductSceneStrip
            eyebrow={t.productStripEyebrow}
            images={PRODUCT_STRIP_IMAGE_URLS}
            alts={t.productStripAlts}
            ariaLabel={t.productStripAria}
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.bentoCards.map((card) => (
              <li
                key={card.title}
                className="group list-none rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/35 hover:shadow-[0_24px_56px_-28px_rgb(var(--accent)/0.45)]"
              >
                <span className="inline-block rounded-full bg-[rgb(var(--accent))]/12 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent-2))]">
                  {card.pill}
                </span>
                <h3 className="mt-4 text-base font-semibold text-[rgb(var(--ink))]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                  {card.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Trust */}
        <section
          id="section-trust"
          className="home-section-wash home-section-wash--trust scroll-mt-36 rounded-[1.85rem] px-3 pt-16 pb-1 sm:px-4 sm:pt-20"
          aria-labelledby="trust-heading"
        >
          <h2
            id="trust-heading"
            className="font-display text-[clamp(1.55rem,1.05rem+2vw,2.35rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
          >
            {t.trustSectionTitle}
          </h2>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {t.trustCards.map((card) => (
              <li key={card.title} className="trust-card list-none">
                <span className="text-2xl" aria-hidden>
                  {card.emoji}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-[rgb(var(--ink))]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                  {card.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* How — timeline */}
        <section
          id="section-how"
          className="home-section-wash home-section-wash--how scroll-mt-36 rounded-[1.85rem] px-3 pt-16 pb-1 sm:px-4 sm:pt-20"
          aria-labelledby="how-heading"
        >
          <h2
            id="how-heading"
            className="font-display text-[clamp(1.55rem,1.05rem+2vw,2.35rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
          >
            {t.howSectionTitle}
          </h2>
          <ol className="how-timeline mt-10 max-w-3xl space-y-0">
            {t.howSteps.map((step, i) => (
              <li key={step.title} className="how-timeline-item relative ps-10">
                <span className="how-timeline-dot absolute start-0 top-1 flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(var(--accent))]/40 to-[rgb(var(--accent-2))]/25 text-xs font-bold text-white shadow-lg ring-4 ring-[rgb(var(--surface))]">
                  {i + 1}
                </span>
                <div className="rounded-2xl border border-white/[0.1] bg-white/[0.06] px-5 py-4">
                  <h3 className="text-sm font-semibold text-[rgb(var(--ink))]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Language */}
        <section
          id="section-language"
          className="home-section-wash home-section-wash--language scroll-mt-36 rounded-[1.85rem] px-3 pt-16 pb-1 sm:px-4 sm:pt-20"
          aria-labelledby="lang-heading"
        >
          <h2
            id="lang-heading"
            className="font-display text-[clamp(1.55rem,1.05rem+2vw,2.35rem)] font-extrabold tracking-tight text-[rgb(var(--ink))]"
          >
            {t.langLabel}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[rgb(var(--ink-soft))]">
            {t.heroRibbon}
          </p>
          <nav
            className="mt-8 rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-4 shadow-[0_24px_64px_-32px_rgb(var(--accent)/0.2)] backdrop-blur-sm sm:p-6"
            aria-label={t.langLabel}
          >
            <div className="flex flex-wrap gap-2">
              {LOCALE_OPTIONS.map((opt) => {
                const active = locale === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setLocale(opt.value)}
                    className={
                      active
                        ? "rounded-xl border border-[rgb(var(--accent))]/50 bg-gradient-to-r from-[rgb(var(--accent))]/25 to-[rgb(var(--accent-2))]/18 px-3 py-2 text-sm font-semibold text-white shadow-[0_0_24px_-8px_rgb(var(--accent))]"
                        : "rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 py-2 text-sm text-[rgb(var(--ink-soft))] transition hover:border-[rgb(var(--accent-2))]/30 hover:bg-white/[0.1] hover:text-[rgb(var(--ink))]"
                    }
                  >
                    <span className="me-1.5 opacity-90" aria-hidden>
                      {opt.flag}
                    </span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-[rgb(var(--ink-soft))]/85">
              ({LOCALE_OPTIONS.length} locales)
            </p>
          </nav>
        </section>

        {/* Workspace: disclaimer + analyzer */}
        <section
          id="section-workspace"
          className="home-section-wash home-section-wash--workspace scroll-mt-32 rounded-[1.85rem] px-3 pt-16 pb-1 sm:px-4 sm:pt-20"
          aria-labelledby="workspace-heading"
        >
          <h2
            id="workspace-heading"
            className="font-display text-[clamp(1.55rem,1.05rem+2vw,2.35rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
          >
            {t.workspaceTitle}
          </h2>
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-2))]">
              {sx.warmEyebrow}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(
                [
                  ["relocate", sx.warmRelocate, warmPresets.relocate] as const,
                  ["job", sx.warmJob, warmPresets.job] as const,
                  [
                    "relationship",
                    sx.warmRel,
                    warmPresets.relationship,
                  ] as const,
                ] as const
              ).map(([key, label, pack]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setDecision(pack.decision);
                    setContext(pack.context);
                    setConstraints(pack.constraints);
                  }}
                  className="rounded-full border border-white/[0.14] bg-white/[0.07] px-4 py-2 text-sm font-medium text-[rgb(var(--ink))] transition hover:border-[rgb(var(--accent-2))]/35 hover:bg-white/[0.1]"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            <aside className="glass card-glow rounded-3xl p-5 lg:col-span-2 lg:p-6">
              <p className="text-sm font-semibold text-[rgb(var(--ink))]">
                {t.disclaimerTitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                {t.disclaimerBody}
              </p>
            </aside>

            <form
              id="analyzer"
              onSubmit={onSubmit}
              className="glass card-glow rounded-3xl p-5 sm:p-6 lg:col-span-3"
            >
              <h3 className="text-lg font-semibold text-[rgb(var(--ink))]">
                {t.decision}
              </h3>

              <DecisionBriefWizard
                t={brief}
                onApply={({ decision: d, context: ctx, constraints: cons }) => {
                  setDecision(d);
                  setContext(ctx);
                  setConstraints(cons);
                }}
              />

              <textarea
                id="decision-input"
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                placeholder={t.decisionPh}
                rows={4}
                className="mt-4 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-base leading-relaxed text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/65 outline-none transition focus:border-[rgb(var(--accent))]/45 focus:ring-2 focus:ring-[rgb(var(--accent))]/15"
              />

              <label className="mt-5 block text-sm font-medium text-[rgb(var(--ink))]">
                {t.context}
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder={t.contextPh}
                rows={3}
                className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-base outline-none transition focus:border-[rgb(var(--accent))]/45"
              />

              <label className="mt-5 block text-sm font-medium text-[rgb(var(--ink))]">
                {t.constraints}
              </label>
              <textarea
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder={t.constraintsPh}
                rows={2}
                className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-base outline-none transition focus:border-[rgb(var(--accent))]/45"
              />

              {error && (
                <p className="mt-4 text-sm text-rose-300" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className="min-h-[48px] w-full rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.28)] transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:min-w-[14rem]"
                >
                  {loading ? t.analyzing : t.analyze}
                </button>
                {result ? (
                  <span className="inline-flex w-full justify-center rounded-full border border-white/15 bg-white/[0.03] px-3 py-2 text-center text-sm text-[rgb(var(--ink-soft))] sm:inline-flex sm:w-auto sm:justify-start sm:py-1.5 sm:text-xs">
                    {result.mode === "live" && t.badgeLive}
                    {result.mode === "demo" && t.badgeDemo}
                    {result.mode === "fallback" && t.badgeFallback}
                  </span>
                ) : null}
              </div>
              {(result?.hint || result?.warning) && (
                <p className="mt-3 text-xs leading-relaxed text-amber-200/90">
                  {result.warning ?? result.hint}
                </p>
              )}
            </form>
          </div>
        </section>

        <section
          id="section-privacy"
          className="home-section-wash home-section-wash--privacy scroll-mt-36 rounded-[1.85rem] px-3 pt-10 pb-1 sm:px-4 sm:pt-12"
          aria-labelledby="security-heading"
        >
          <div className="glass card-glow rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/[0.08] to-transparent p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/15 text-[1.35rem] shadow-inner shadow-emerald-500/10"
                aria-hidden
              >
                🔒
              </span>
              <div className="min-w-0 flex-1">
                <h2
                  id="security-heading"
                  className="text-base font-semibold tracking-tight text-emerald-50/95"
                >
                  {t.securityTitle}
                </h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-[rgb(var(--ink))]/95 [text-wrap:pretty]">
                  {t.securityIntro}
                </p>
                <ul className="mt-4 list-disc space-y-2.5 ps-5 text-sm leading-relaxed text-[rgb(var(--ink-soft))] marker:text-emerald-400/90 [text-wrap:pretty]">
                  {t.securityPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <p className="mt-5 text-sm">
                  <Link
                    href="/privacy"
                    className="font-medium text-emerald-200/95 underline-offset-2 hover:underline"
                  >
                    Privacy Policy →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {a && (
          <section
            id="section-results"
            className="home-section-wash home-section-wash--results scroll-mt-28 mt-16 space-y-6 rounded-[1.85rem] border-t border-white/[0.08] px-3 pt-16 sm:px-4"
          >
            <div className="animate-fade-up flex flex-col gap-3 rounded-2xl border border-[rgb(var(--accent-2))]/35 bg-gradient-to-br from-[rgb(var(--accent))]/14 via-white/[0.04] to-transparent px-4 py-4 shadow-[0_16px_48px_-28px_rgb(var(--accent)/0.45)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
              <p className="max-w-2xl text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                {pa.runAnotherHint}
              </p>
              <button
                type="button"
                onClick={scrollToAnalyzer}
                className="shrink-0 rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.28)] transition hover:brightness-110"
              >
                {pa.runAnotherCta}
              </button>
            </div>

            <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold text-[rgb(var(--ink))]">
                {t.sectionSummary}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                {a.summary}
              </p>
            </section>

            <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold">{t.sectionDimensions}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ["finances", t.dimFinances],
                    ["psychology", t.dimPsychology],
                    ["risks", t.dimRisks],
                    ["opportunities", t.dimOpportunities],
                  ] as const
                ).map(([key, label]) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.05] to-transparent p-4"
                  >
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--accent-dim))]">
                      {label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                      {a.dimensions[key]}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold">{t.sectionScenarios}</h2>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-4">
                  <h3 className="text-xs font-semibold text-emerald-300/95">
                    {t.scenBest}
                  </h3>
                  <p className="mt-2 text-sm text-[rgb(var(--ink-soft))]">
                    {a.scenarios.bestCase}
                  </p>
                </div>
                <div className="rounded-2xl border border-rose-500/25 bg-rose-500/[0.06] p-4">
                  <h3 className="text-xs font-semibold text-rose-300/95">
                    {t.scenWorst}
                  </h3>
                  <p className="mt-2 text-sm text-[rgb(var(--ink-soft))]">
                    {a.scenarios.worstCase}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-xs font-semibold text-[rgb(var(--ink))]">
                    {t.scenLikely}
                  </h3>
                  <p className="mt-2 text-sm text-[rgb(var(--ink-soft))]">
                    {a.scenarios.mostLikely}
                  </p>
                </div>
              </div>
            </section>

            <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold">{t.sectionTimeline}</h2>
              <ol className="mt-5 space-y-4">
                <li className="flex gap-4">
                  <span className="mt-0.5 shrink-0 rounded-full bg-gradient-to-r from-[rgb(var(--accent))]/25 to-[rgb(var(--accent-2))]/20 px-3 py-1 text-xs font-medium text-[rgb(var(--ink))]">
                    {t.timeM6}
                  </span>
                  <p className="text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                    {a.timeline.months6}
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="mt-0.5 shrink-0 rounded-full bg-gradient-to-r from-[rgb(var(--accent))]/25 to-[rgb(var(--accent-2))]/20 px-3 py-1 text-xs font-medium text-[rgb(var(--ink))]">
                    {t.timeY2}
                  </span>
                  <p className="text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                    {a.timeline.years2}
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="mt-0.5 shrink-0 rounded-full bg-gradient-to-r from-[rgb(var(--accent))]/25 to-[rgb(var(--accent-2))]/20 px-3 py-1 text-xs font-medium text-[rgb(var(--ink))]">
                    {t.timeY5}
                  </span>
                  <p className="text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                    {a.timeline.years5}
                  </p>
                </li>
              </ol>
            </section>

            <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold">{t.sectionScore}</h2>
              <div className="mt-6 grid gap-8 sm:grid-cols-[auto,1fr] sm:items-center">
                <ScoreCircle score={a.score} sublabel={t.scoreSublabel} />
                <p className="text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                  {a.scoreRationale}
                </p>
              </div>
            </section>

            <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold">{t.sectionTwin}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                {a.digitalTwinNote}
              </p>
            </section>

            {result ? (
              <AnalysisResultTools
                analysis={a}
                decision={decision}
                context={context}
                constraints={constraints}
                mode={result.mode}
                pa={pa}
                expertsSearchHref={expertsSearchHref}
                onLoadBrief={loadBriefFromHistory}
              />
            ) : null}

            <section className="glass animate-fade-up rounded-3xl border border-dashed border-[rgb(var(--accent))]/35 bg-gradient-to-br from-[rgb(var(--accent))]/[0.07] to-transparent p-6 sm:p-7">
              <h2 className="text-lg font-semibold text-[rgb(var(--ink))]">
                {sx.premiumTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                {sx.premiumHint}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled
                  className="cursor-not-allowed rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--ink-soft))]/80"
                  title={sx.premiumHint}
                >
                  {sx.premiumCta}
                </button>
                <Link
                  href="/pricing"
                  className="text-sm font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  {pr.navPricing} →
                </Link>
              </div>
            </section>

            <footer className="border-t border-white/10 pt-8 text-center text-xs leading-relaxed text-[rgb(var(--ink-soft))]">
              {t.footerPremium}
            </footer>
          </section>
        )}
      </div>
    </div>
  );
}
