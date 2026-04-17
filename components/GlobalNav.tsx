"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getExpertsCopy } from "@/lib/i18n/experts-network";
import { getCommunityCopy } from "@/lib/i18n/community-page";
import { getMonetizeCopy } from "@/lib/i18n/monetization-page";
import { getPricingCopy } from "@/lib/i18n/pricing-page";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { isAppLocale, type AppLocale } from "@/lib/i18n/locale";
import { syncLocaleCookieClient } from "@/lib/locale-cookie";
import NavRoutePrefetch from "@/components/NavRoutePrefetch";

const LOCALE_KEY = "lde-locale";

export default function GlobalNav() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const raw = localStorage.getItem(LOCALE_KEY);
    if (raw === null) {
      localStorage.setItem(LOCALE_KEY, DEFAULT_LOCALE);
      setLocale(DEFAULT_LOCALE);
    } else if (isAppLocale(raw)) setLocale(raw);
  }, []);

  useEffect(() => {
    syncLocaleCookieClient(locale);
  }, [locale]);

  const ec = getExpertsCopy(locale);
  const pr = getPricingCopy(locale);
  const mz = getMonetizeCopy(locale);
  const cq = getCommunityCopy(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[rgb(var(--surface))]/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.04)]">
      <NavRoutePrefetch />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold text-[rgb(var(--ink))] transition hover:text-[rgb(var(--accent))]"
        >
          Life Decision Engine
        </Link>
        <nav
          className="flex flex-wrap items-center gap-1 text-sm"
          aria-label="Main"
        >
          <Link
            href="/#section-workspace"
            className="rounded-lg px-3 py-1.5 text-[rgb(var(--ink-soft))] transition hover:bg-white/5 hover:text-[rgb(var(--ink))]"
          >
            {ec.navHome}
          </Link>
          <Link
            href="/experts"
            className="rounded-lg px-3 py-1.5 text-[rgb(var(--ink-soft))] transition hover:bg-white/5 hover:text-[rgb(var(--ink))]"
          >
            {ec.navExperts}
          </Link>
          <Link
            href="/community"
            className="rounded-lg px-3 py-1.5 text-[rgb(var(--ink-soft))] transition hover:bg-white/5 hover:text-[rgb(var(--ink))]"
          >
            {cq.navLabel}
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg px-3 py-1.5 text-[rgb(var(--ink-soft))] transition hover:bg-white/5 hover:text-[rgb(var(--ink))]"
          >
            {pr.navPricing}
          </Link>
          <Link
            href="/monetize"
            className="rounded-lg px-3 py-1.5 text-[rgb(var(--ink-soft))] transition hover:bg-white/5 hover:text-[rgb(var(--ink))]"
          >
            {mz.navLabel}
          </Link>
          <Link
            href="/blog"
            className="rounded-lg px-3 py-1.5 text-[rgb(var(--ink-soft))] transition hover:bg-white/5 hover:text-[rgb(var(--ink))]"
          >
            Blog
          </Link>
          <Link
            href="/faq"
            className="rounded-lg px-3 py-1.5 text-[rgb(var(--ink-soft))] transition hover:bg-white/5 hover:text-[rgb(var(--ink))]"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className="rounded-lg px-3 py-1.5 text-[rgb(var(--ink-soft))] transition hover:bg-white/5 hover:text-[rgb(var(--ink))]"
          >
            About
          </Link>
          <Link
            href="/experts/register"
            className="rounded-lg border border-[rgb(var(--accent))]/35 bg-[rgb(var(--accent))]/10 px-3 py-1.5 font-medium text-[rgb(var(--ink))] transition hover:border-[rgb(var(--accent))]/55"
          >
            {ec.navRegister}
          </Link>
        </nav>
      </div>
    </header>
  );
}
