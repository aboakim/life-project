"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
import { syncLocaleCookieClient } from "@/lib/locale-cookie";
import {
  HERO_SLIDE_IMAGE_URLS,
  PRODUCT_STRIP_IMAGE_URLS,
} from "@/lib/home/hero-slide-images";
import { getDecisionBriefCopy } from "@/lib/i18n/decision-brief";
const LOCALE_STORAGE_KEY = "lde-locale";

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

export default function DecisionStudio() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);
  const t = getUi(locale);
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
    if (raw === null) {
      localStorage.setItem(LOCALE_STORAGE_KEY, DEFAULT_LOCALE);
      setLocale(DEFAULT_LOCALE);
    } else if (isAppLocale(raw)) {
      setLocale(raw);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    syncLocaleCookieClient(locale);
    document.documentElement.lang = locale;
    document.documentElement.setAttribute(
      "dir",
      isRtlLocale(locale) ? "rtl" : "ltr"
    );
  }, [locale]);

  const [decision, setDecision] = useState("");
  const [context, setContext] = useState("");
  const [constraints, setConstraints] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);

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

  return (
    <div
      className="relative z-10 min-h-screen"
      style={
        rtl
          ? { fontFamily: "var(--font-ar), var(--font-noto), sans-serif" }
          : undefined
      }
    >
      <OrbDecor />
      <HomeSectionNav links={sectionLinks} />

      <div className="mx-auto max-w-6xl px-4 pb-32 pt-6 sm:px-6 sm:pt-8">
        {/* Hero — split layout like leading SaaS landings */}
        <section
          id="section-hero"
          className="animate-fade-up relative overflow-hidden rounded-[2rem] border border-white/[0.14] bg-gradient-to-br from-white/[0.12] via-white/[0.04] to-white/[0.02] p-6 shadow-[0_32px_100px_-48px_rgb(var(--accent)/0.45),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-sm sm:p-10 lg:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(var(--accent)/0.14),transparent_36%,rgb(var(--accent-2)/0.1),transparent_64%,rgb(var(--accent-magenta)/0.1))]" />
          <div className="grid-view pointer-events-none absolute inset-0 opacity-[0.45]" />
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.1] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--ink))] shadow-[0_0_24px_-8px_rgb(var(--accent)/0.4)] backdrop-blur-sm">
                <span className="size-2 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] shadow-[0_0_14px_rgb(var(--accent)/0.55)]" />
                {t.brand}
              </div>
              <p className="mt-5 text-[13px] font-medium leading-snug text-[rgb(var(--accent-2))]/95 [text-wrap:balance]">
                {t.heroRibbon}
              </p>
              <h1 className="font-display mt-4 text-4xl font-bold tracking-tight [text-wrap:balance] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
                <span className="text-[rgb(var(--ink))]">{t.heroLine1}</span>{" "}
                <span className="text-gradient">{t.heroAccent}</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                {t.subtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {t.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-[rgb(var(--ink))]"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#section-workspace"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.28)] transition hover:brightness-110"
                >
                  {t.heroCtaPrimary}
                  <span aria-hidden>↓</span>
                </a>
                <Link
                  href="/experts"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.08]"
                >
                  {t.heroCtaSecondary}
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-amber-200/90 underline-offset-4 hover:underline"
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
          className="scroll-mt-36 pt-12 sm:pt-14"
          aria-labelledby="overview-heading"
        >
          <div className="rounded-[1.75rem] border border-white/[0.12] bg-gradient-to-br from-white/[0.1] via-white/[0.04] to-transparent p-6 shadow-[0_20px_60px_-36px_rgb(var(--accent)/0.25),0_0_0_1px_rgba(255,255,255,0.05)_inset] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-2))]">
              {t.atAGlanceEyebrow}
            </p>
            <h2
              id="overview-heading"
              className="font-display mt-2 text-xl font-bold tracking-tight text-[rgb(var(--ink))] sm:text-2xl [text-wrap:balance]"
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
          className="scroll-mt-36 pt-16 sm:pt-20"
          aria-labelledby="product-heading"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-2))]">
              {t.sectionNavProduct}
            </p>
            <h2
              id="product-heading"
              className="font-display mt-2 text-2xl font-bold tracking-tight text-[rgb(var(--ink))] sm:text-3xl [text-wrap:balance]"
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
          className="scroll-mt-36 pt-16 sm:pt-20"
          aria-labelledby="trust-heading"
        >
          <h2
            id="trust-heading"
            className="font-display text-2xl font-bold tracking-tight text-[rgb(var(--ink))] sm:text-3xl [text-wrap:balance]"
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
          className="scroll-mt-36 pt-16 sm:pt-20"
          aria-labelledby="how-heading"
        >
          <h2
            id="how-heading"
            className="font-display text-2xl font-bold tracking-tight text-[rgb(var(--ink))] sm:text-3xl [text-wrap:balance]"
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
          className="scroll-mt-36 pt-16 sm:pt-20"
          aria-labelledby="lang-heading"
        >
          <h2
            id="lang-heading"
            className="font-display text-2xl font-bold tracking-tight text-[rgb(var(--ink))] sm:text-3xl"
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
          className="scroll-mt-32 pt-16 sm:pt-20"
          aria-labelledby="workspace-heading"
        >
          <h2
            id="workspace-heading"
            className="font-display text-2xl font-bold tracking-tight text-[rgb(var(--ink))] sm:text-3xl [text-wrap:balance]"
          >
            {t.workspaceTitle}
          </h2>
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
                className="mt-4 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm leading-relaxed text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/65 outline-none transition focus:border-[rgb(var(--accent))]/45 focus:ring-2 focus:ring-[rgb(var(--accent))]/15"
              />

              <label className="mt-5 block text-sm font-medium text-[rgb(var(--ink))]">
                {t.context}
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder={t.contextPh}
                rows={3}
                className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm outline-none transition focus:border-[rgb(var(--accent))]/45"
              />

              <label className="mt-5 block text-sm font-medium text-[rgb(var(--ink))]">
                {t.constraints}
              </label>
              <textarea
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder={t.constraintsPh}
                rows={2}
                className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm outline-none transition focus:border-[rgb(var(--accent))]/45"
              />

              {error && (
                <p className="mt-4 text-sm text-rose-300" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className="rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.28)] transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? t.analyzing : t.analyze}
                </button>
                {result && (
                  <span className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-[rgb(var(--ink-soft))]">
                    {result.mode === "live" && t.badgeLive}
                    {result.mode === "demo" && t.badgeDemo}
                    {result.mode === "fallback" && t.badgeFallback}
                  </span>
                )}
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
          className="scroll-mt-36 pt-10 sm:pt-12"
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
            className="scroll-mt-28 mt-16 space-y-6 border-t border-white/[0.08] pt-16"
          >
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

            <footer className="border-t border-white/10 pt-8 text-center text-xs leading-relaxed text-[rgb(var(--ink-soft))]">
              {t.footerPremium}
            </footer>
          </section>
        )}
      </div>
    </div>
  );
}
