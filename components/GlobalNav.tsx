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
    <header className="sticky top-0 z-50 border-b border-white/[0.12] bg-[rgb(var(--surface))]/82 backdrop-blur-2xl shadow-[0_12px_40px_-16px_rgb(0_0_0/0.45),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
      <NavRoutePrefetch />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
        <Link
          href="/"
          className="font-display flex items-center gap-2 text-lg font-extrabold tracking-tight text-[rgb(var(--ink))] transition hover:text-[rgb(var(--accent-2))] md:text-xl"
        >
          <span
            className="hidden size-9 shrink-0 rounded-xl bg-gradient-to-br from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] shadow-lg shadow-[rgb(var(--accent)/0.35)] sm:inline-block"
            aria-hidden
          />
          Life Decision Engine
        </Link>
        <nav
          className="flex flex-wrap items-center gap-0.5 text-[0.95rem] font-medium md:text-base"
          aria-label="Main"
        >
          <Link
            href="/#section-workspace"
            className="rounded-xl px-3 py-2 text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.08] hover:text-[rgb(var(--ink))]"
          >
            {ec.navHome}
          </Link>
          <Link
            href="/experts"
            className="rounded-xl px-3 py-2 text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.08] hover:text-[rgb(var(--ink))]"
          >
            {ec.navExperts}
          </Link>
          <Link
            href="/community"
            className="rounded-xl px-3 py-2 text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.08] hover:text-[rgb(var(--ink))]"
          >
            {cq.navLabel}
          </Link>
          <Link
            href="/pricing"
            className="rounded-xl px-3 py-2 text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.08] hover:text-[rgb(var(--ink))]"
          >
            {pr.navPricing}
          </Link>
          <Link
            href="/monetize"
            className="rounded-xl px-3 py-2 text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.08] hover:text-[rgb(var(--ink))]"
          >
            {mz.navLabel}
          </Link>
          <Link
            href="/blog"
            className="rounded-xl px-3 py-2 text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.08] hover:text-[rgb(var(--ink))]"
          >
            Blog
          </Link>
          <Link
            href="/faq"
            className="rounded-xl px-3 py-2 text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.08] hover:text-[rgb(var(--ink))]"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className="rounded-xl px-3 py-2 text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.08] hover:text-[rgb(var(--ink))]"
          >
            About
          </Link>
          <Link
            href="/experts/register"
            className="rounded-xl border border-[rgb(var(--accent))]/45 bg-[rgb(var(--accent))]/16 px-4 py-2 font-semibold text-[rgb(var(--ink))] shadow-[0_0_28px_-12px_rgb(var(--accent)/0.5)] transition hover:border-[rgb(var(--accent))]/65 hover:bg-[rgb(var(--accent))]/22"
          >
            {ec.navRegister}
          </Link>
        </nav>
      </div>
    </header>
  );
}
