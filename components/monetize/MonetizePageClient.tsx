"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import PageLocalePicker from "@/components/layout/PageLocalePicker";
import { getMonetizeCopy } from "@/lib/i18n/monetization-page";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { isAppLocale, type AppLocale } from "@/lib/i18n/locale";
import { syncLocaleCookieClient } from "@/lib/locale-cookie";

const LOCALE_KEY = "lde-locale";

export default function MonetizePageClient() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);
  const t = getMonetizeCopy(locale);

  useEffect(() => {
    const raw = localStorage.getItem(LOCALE_KEY);
    if (raw === null) {
      localStorage.setItem(LOCALE_KEY, DEFAULT_LOCALE);
      setLocale(DEFAULT_LOCALE);
    } else if (isAppLocale(raw)) setLocale(raw);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
    syncLocaleCookieClient(locale);
  }, [locale]);

  return (
    <MarketingPageShell
      eyebrow={t.navLabel}
      title={t.pageTitle}
      subtitle={t.pageSubtitle}
    >
      <PageLocalePicker
        locale={locale}
        onChange={setLocale}
        className="mb-10 max-w-3xl"
      />

      <p className="mb-10 max-w-3xl rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] px-4 py-3 text-xs leading-relaxed text-amber-100/90 [text-wrap:pretty]">
        {t.disclaimer}
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.cards.map((c) => (
          <li
            key={c.title}
            className="list-none rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-transparent p-5 transition hover:border-[rgb(var(--accent))]/25"
          >
            <span className="inline-block rounded-full bg-[rgb(var(--accent))]/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent-2))]">
              {c.tag}
            </span>
            <h2 className="mt-3 text-base font-semibold text-[rgb(var(--ink))]">
              {c.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
              {c.body}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/experts/register"
          className="inline-flex rounded-xl bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgb(124_92_255/0.2)] transition hover:brightness-110"
        >
          {t.ctaRegister}
        </Link>
        <Link
          href="/pricing"
          className="inline-flex rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.08]"
        >
          {t.ctaPricing}
        </Link>
      </div>
    </MarketingPageShell>
  );
}
