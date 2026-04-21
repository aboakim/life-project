"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import PageLocalePicker from "@/components/layout/PageLocalePicker";
import { getMonetizeCopy } from "@/lib/i18n/monetization-page";
import { getPricingCopy } from "@/lib/i18n/pricing-page";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { isAppLocale, type AppLocale } from "@/lib/i18n/locale";
import { syncLocaleCookieClient } from "@/lib/locale-cookie";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";

const LOCALE_KEY = "lde-locale";

export default function PricingPageClient() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);
  const t = getPricingCopy(locale);
  const mz = getMonetizeCopy(locale);
  const [note, setNote] = useState<string | null>(null);
  const [checkoutBanner, setCheckoutBanner] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(LOCALE_KEY);
    if (raw === null) {
      localStorage.setItem(LOCALE_KEY, DEFAULT_LOCALE);
      setLocale(DEFAULT_LOCALE);
    } else if (isAppLocale(raw)) setLocale(raw);
  }, []);

  useEffect(() => {
    function syncFromNav() {
      const raw = localStorage.getItem(LOCALE_KEY);
      if (raw && isAppLocale(raw)) setLocale(raw);
    }
    window.addEventListener(LOCALE_CHANGE_EVENT, syncFromNav);
    return () => window.removeEventListener(LOCALE_CHANGE_EVENT, syncFromNav);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
    syncLocaleCookieClient(locale);
  }, [locale]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const c = params.get("checkout");
    if (c === "success") setCheckoutBanner(t.checkoutSuccess);
    if (c === "canceled") setCheckoutBanner(t.checkoutCanceled);
    if (c) {
      window.history.replaceState({}, "", "/pricing");
    }
  }, [t.checkoutSuccess, t.checkoutCanceled]);

  async function onUpgrade() {
    setLoading(true);
    setNote(null);
    try {
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        url?: string;
        message?: string;
      };
      if (data.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setNote(data.message ?? t.toastNotReady);
    } catch {
      setNote(t.toastNotReady);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MarketingPageShell
      eyebrow={t.badgePlaceholder}
      title={t.pageTitle}
      subtitle={
        <>
          <p>{t.pageSubtitle}</p>
          <p className="mt-3 text-xs leading-relaxed text-[rgb(var(--ink-soft))]/90">
            {t.deployHint}
          </p>
        </>
      }
    >
      <PageLocalePicker
        locale={locale}
        onChange={setLocale}
        className="mb-10 max-w-3xl"
      />

      {checkoutBanner ? (
        <div
          className="mb-8 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm leading-relaxed text-emerald-50/95 [text-wrap:pretty]"
          role="status"
        >
          {checkoutBanner}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass card-glow rounded-3xl border border-white/10 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[rgb(var(--ink))]">
            {t.freeTitle}
          </h2>
          <p className="mt-1 text-3xl font-bold text-[rgb(var(--ink))]">
            {t.freePrice}
            <span className="text-base font-normal text-[rgb(var(--ink-soft))]">
              {" "}
              / {t.freeDesc}
            </span>
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[rgb(var(--ink-soft))]">
            {t.freeBullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-emerald-400">✓</span>
                {b}
              </li>
            ))}
          </ul>
          <Link
            href="/#section-workspace"
            className="mt-8 inline-flex rounded-2xl border border-white/15 px-5 py-2.5 text-sm font-medium text-[rgb(var(--ink))] transition hover:bg-white/5"
          >
            {t.ctaFree}
          </Link>
        </section>

        <section className="glass card-glow relative rounded-3xl border border-[rgb(var(--accent))]/35 bg-gradient-to-br from-[rgb(var(--accent))]/10 to-transparent p-6 sm:p-8">
          <span className="absolute end-4 top-4 rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-200/90">
            {t.badgePlaceholder}
          </span>
          <h2 className="text-lg font-semibold text-[rgb(var(--ink))]">
            {t.premiumTitle}
          </h2>
          <p className="mt-1 text-3xl font-bold text-gradient">
            {t.premiumPrice}
            <span className="text-base font-normal text-[rgb(var(--ink-soft))]">
              {" "}
              / {t.premiumDesc}
            </span>
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[rgb(var(--ink-soft))]">
            {t.premiumBullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-[rgb(var(--accent))]">✓</span>
                {b}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onUpgrade}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] py-3 text-sm font-semibold text-white shadow-lg shadow-[rgb(124_92_255/0.2)] transition enabled:hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "…" : t.ctaUpgrade}
          </button>
          {note ? (
            <p className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-amber-100/95">
              {note}
            </p>
          ) : null}
        </section>
      </div>

      <section
        className="mt-12 rounded-[1.75rem] border border-white/[0.1] bg-gradient-to-br from-[rgb(var(--accent))]/[0.08] via-transparent to-[rgb(var(--accent-2))]/[0.06] p-6 sm:p-8"
        aria-labelledby="revenue-models-heading"
      >
        <h2
          id="revenue-models-heading"
          className="text-lg font-semibold text-[rgb(var(--ink))] [text-wrap:balance]"
        >
          {mz.pricingTeaserTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
          {mz.pricingTeaserBody}
        </p>
        <Link
          href="/monetize"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--accent))]/35 bg-[rgb(var(--accent))]/10 px-5 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition hover:border-[rgb(var(--accent))]/50 hover:bg-[rgb(var(--accent))]/15"
        >
          {mz.pricingTeaserCta}
          <span aria-hidden>→</span>
        </Link>
      </section>
    </MarketingPageShell>
  );
}
