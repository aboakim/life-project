"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getExpertsCopy } from "@/lib/i18n/experts-network";
import { getCommunityCopy } from "@/lib/i18n/community-page";
import { getMonetizeCopy } from "@/lib/i18n/monetization-page";
import { getPricingCopy } from "@/lib/i18n/pricing-page";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import {
  LOCALE_OPTIONS,
  isAppLocale,
  isRtlLocale,
  type AppLocale,
} from "@/lib/i18n/locale";
import { getPostAnalysisCopy } from "@/lib/i18n/post-analysis";
import { getSiteExtras } from "@/lib/i18n/site-extras";
import { getUi } from "@/lib/i18n/ui";
import {
  readLocaleCookieClient,
  syncLocaleCookieClient,
} from "@/lib/locale-cookie";
import {
  LOCALE_CHANGE_EVENT,
  dispatchLocaleChanged,
} from "@/lib/locale-sync";
import NavRoutePrefetch from "@/components/NavRoutePrefetch";

const LOCALE_KEY = "lde-locale";

const navLinkClass =
  "shrink-0 rounded-xl px-2.5 py-2 text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.08] hover:text-[rgb(var(--ink))] sm:px-3";

type MoreLink = { href: string; label: string };

function NavMoreMenu({ label, links }: { label: string; links: MoreLink[] }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (wrapRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        className={`${navLinkClass} inline-flex items-center gap-1 font-medium`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <span className="text-[0.65em] opacity-80" aria-hidden>
          ▾
        </span>
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute end-0 top-full z-[100] mt-1 min-w-[min(100vw-2rem,16rem)] max-h-[min(70vh,24rem)] overflow-y-auto rounded-xl border border-white/[0.12] bg-[rgb(var(--surface-elevated))]/[0.98] py-1 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              role="menuitem"
              className="block px-3 py-2 text-sm text-[rgb(var(--ink))] transition hover:bg-white/[0.08]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function GlobalNav() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const raw = localStorage.getItem(LOCALE_KEY);
    const fromCookie = readLocaleCookieClient();
    let resolved: AppLocale = DEFAULT_LOCALE;
    if (raw !== null && isAppLocale(raw)) {
      resolved = raw;
    } else if (fromCookie !== null) {
      resolved = fromCookie;
    }
    setLocale(resolved);
    if (raw === null || !isAppLocale(raw)) {
      localStorage.setItem(LOCALE_KEY, resolved);
    }
  }, []);

  useEffect(() => {
    syncLocaleCookieClient(locale);
    document.documentElement.lang = locale;
    document.documentElement.setAttribute(
      "dir",
      isRtlLocale(locale) ? "rtl" : "ltr"
    );
  }, [locale]);

  useEffect(() => {
    function syncFromApp() {
      const raw = localStorage.getItem(LOCALE_KEY);
      if (raw && isAppLocale(raw)) setLocale(raw);
    }
    window.addEventListener(LOCALE_CHANGE_EVENT, syncFromApp);
    return () => window.removeEventListener(LOCALE_CHANGE_EVENT, syncFromApp);
  }, []);

  const ec = getExpertsCopy(locale);
  const pr = getPricingCopy(locale);
  const mz = getMonetizeCopy(locale);
  const cq = getCommunityCopy(locale);
  const t = getUi(locale);
  const sx = getSiteExtras(locale);
  const pa = getPostAnalysisCopy(locale);

  const moreLinks: MoreLink[] = [
    { href: "/monetize", label: mz.navLabel },
    { href: "/journal", label: sx.navJournal },
    { href: "/checklists", label: sx.navChecklists },
    { href: "/how-we-use-ai", label: sx.navHowAi },
    { href: "/playbooks", label: pa.playbooksCta },
    { href: "/community/guidelines", label: pa.guidelinesCta },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="print:hidden sticky top-0 z-50 border-b border-white/[0.12] bg-[rgb(var(--surface))]/82 backdrop-blur-2xl shadow-[0_12px_40px_-16px_rgb(0_0_0/0.45),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
      <NavRoutePrefetch />
      <div className="mx-auto flex max-w-6xl flex-nowrap items-center justify-between gap-2 px-4 py-2.5 sm:gap-3 sm:px-6">
        <Link
          href="/"
          className="font-display flex min-w-0 shrink-0 items-center gap-2 text-base font-extrabold tracking-tight text-[rgb(var(--ink))] transition hover:text-[rgb(var(--accent-2))] sm:text-lg md:text-xl"
        >
          <span
            className="hidden size-9 shrink-0 rounded-xl bg-gradient-to-br from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] shadow-lg shadow-[rgb(var(--accent)/0.35)] sm:inline-block"
            aria-hidden
          />
          <span className="truncate">Life Decision Engine</span>
        </Link>
        <nav
          className="flex min-w-0 flex-1 flex-nowrap items-center justify-end gap-0.5 text-[0.8125rem] font-medium sm:text-[0.9rem] md:text-base"
          aria-label="Main"
        >
          {/*
            Horizontal scroll lives only on this strip. NavMoreMenu must NOT be
            inside an overflow-x container or its dropdown is clipped (invisible).
          */}
          <div className="flex min-w-0 flex-1 flex-nowrap items-center justify-end gap-0.5 overflow-x-auto scrollbar-none">
            <Link href="/#section-workspace" className={navLinkClass}>
              {ec.navHome}
            </Link>
            <Link href="/experts" className={navLinkClass}>
              {ec.navExperts}
            </Link>
            <Link href="/community" className={navLinkClass}>
              {cq.navLabel}
            </Link>
            <Link href="/pricing" className={navLinkClass}>
              {pr.navPricing}
            </Link>
            <Link href="/blog" className={navLinkClass}>
              Blog
            </Link>
          </div>
          <NavMoreMenu label={t.navMore} links={moreLinks} />
          <label className="flex shrink-0 items-center gap-1.5 ps-0.5">
            <span className="sr-only">{t.langLabel}</span>
            <select
              value={locale}
              aria-label={t.langLabel}
              onChange={(e) => {
                const v = e.target.value;
                if (!isAppLocale(v)) return;
                setLocale(v);
                localStorage.setItem(LOCALE_KEY, v);
                syncLocaleCookieClient(v);
                document.documentElement.lang = v;
                document.documentElement.setAttribute(
                  "dir",
                  isRtlLocale(v) ? "rtl" : "ltr"
                );
                dispatchLocaleChanged();
              }}
              className="max-w-[9.5rem] cursor-pointer rounded-lg border border-white/[0.12] bg-black/35 px-1.5 py-1.5 text-[0.7rem] font-medium text-[rgb(var(--ink))] outline-none transition focus:border-[rgb(var(--accent))]/45 sm:max-w-[11rem] sm:px-2 sm:text-sm"
            >
              {LOCALE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.flag} {opt.label}
                </option>
              ))}
            </select>
          </label>
          <Link
            href="/experts/register"
            className="shrink-0 rounded-xl border border-[rgb(var(--accent))]/45 bg-[rgb(var(--accent))]/16 px-3 py-2 text-[0.8125rem] font-semibold text-[rgb(var(--ink))] shadow-[0_0_28px_-12px_rgb(var(--accent)/0.5)] transition hover:border-[rgb(var(--accent))]/65 hover:bg-[rgb(var(--accent))]/22 sm:px-4 sm:text-base"
          >
            {ec.navRegister}
          </Link>
        </nav>
      </div>
    </header>
  );
}
