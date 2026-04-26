"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SupportCta from "@/components/monetization/SupportCta";
import { getCommunityCopy } from "@/lib/i18n/community-page";
import { getExpertsCopy } from "@/lib/i18n/experts-network";
import { getSiteExtras } from "@/lib/i18n/site-extras";
import { getNoveltyCopy } from "@/lib/i18n/novelty-extras";
import { getMonetizeCopy } from "@/lib/i18n/monetization-page";
import { getPricingCopy } from "@/lib/i18n/pricing-page";
import { getUi } from "@/lib/i18n/ui";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import {
  isAppLocale,
  type AppLocale,
} from "@/lib/i18n/locale";
import { readLocaleCookieClient } from "@/lib/locale-cookie";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";

const LOCALE_KEY = "lde-locale";

export default function GlobalFooter() {
  const year = new Date().getFullYear();
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const raw = window.localStorage.getItem(LOCALE_KEY);
    const fromCookie = readLocaleCookieClient();
    let resolved: AppLocale = DEFAULT_LOCALE;
    if (raw !== null && isAppLocale(raw)) resolved = raw;
    else if (fromCookie !== null) resolved = fromCookie;
    setLocale(resolved);
    if (raw === null || !isAppLocale(raw)) {
      localStorage.setItem(LOCALE_KEY, resolved);
    }
  }, []);

  useEffect(() => {
    function sync() {
      const raw = localStorage.getItem(LOCALE_KEY);
      if (raw && isAppLocale(raw)) setLocale(raw);
    }
    window.addEventListener(LOCALE_CHANGE_EVENT, sync);
    return () => window.removeEventListener(LOCALE_CHANGE_EVENT, sync);
  }, []);

  const ui = getUi(locale);
  const ec = getExpertsCopy(locale);
  const pr = getPricingCopy(locale);
  const mz = getMonetizeCopy(locale);
  const cq = getCommunityCopy(locale);
  const sx = getSiteExtras(locale);
  const nx = getNoveltyCopy(locale);

  const columns: { title: string; links: { href: string; label: string }[] }[] =
    [
      {
        title: "Product",
        links: [
          { href: "/analyze", label: ui.sectionNavAnalyzer },
          { href: "/journal", label: sx.footerJournal },
          { href: "/checklists", label: sx.footerChecklists },
          { href: "/field-notes", label: nx.footerFieldNotes },
          { href: "/how-we-use-ai", label: sx.footerHowAi },
          { href: "/experts", label: ec.navExperts },
          { href: "/community", label: cq.navLabel },
          { href: "/pricing", label: pr.navPricing },
          { href: "/monetize", label: mz.navLabel },
        ],
      },
      {
        title: "Learn",
        links: [
          { href: "/blog", label: "Blog" },
          { href: "/playbooks", label: "Playbooks" },
          { href: "/faq", label: "FAQ" },
          { href: "/community/guidelines", label: "Community guidelines" },
          { href: "/about", label: "About" },
          { href: "/editorial-team", label: "Editorial Team" },
          { href: "/experts/register", label: ec.navRegister },
        ],
      },
      {
        title: "Company & legal",
        links: [
          { href: "/contact", label: "Contact" },
          { href: "/editorial-standards", label: "Editorial Standards" },
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Service" },
          { href: "/disclaimer", label: "Disclaimer" },
        ],
      },
    ];

  return (
    <footer className="print:hidden relative z-10 mt-24 border-t border-white/[0.07] bg-[rgb(var(--surface))]/80 pt-14 pb-10 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-[rgb(var(--ink))]">
              Life Decision Engine
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
              A structured workspace for big life decisions — scenarios,
              lenses, timelines, and a score. Built to help you think clearly,
              not to replace professionals.
            </p>
            <p className="mt-5 text-xs text-[rgb(var(--ink-soft))]/75">
              Not medical, legal, or therapeutic advice.
            </p>
            <SupportCta className="mt-5" />
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--accent-dim))]">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[rgb(var(--ink-soft))] transition hover:text-[rgb(var(--ink))]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-[rgb(var(--ink-soft))]/85 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Life Decision Engine. All rights reserved.</p>
          <p>
            Independent project · operated internationally · built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
