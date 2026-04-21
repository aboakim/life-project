"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import { getSiteExtras } from "@/lib/i18n/site-extras";
import {
  isAppLocale,
  type AppLocale,
} from "@/lib/i18n/locale";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { readLocaleCookieClient } from "@/lib/locale-cookie";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";

const LOCALE_KEY = "lde-locale";

type Theme = "slate" | "paper" | "ink";

const themeClass: Record<
  Theme,
  { panel: string; card: string; printRoot: string }
> = {
  slate: {
    panel: "bg-[rgb(var(--surface-2))]/80 text-[rgb(var(--ink))]",
    card: "border-white/[0.1] bg-white/[0.04]",
    printRoot: "",
  },
  paper: {
    panel: "bg-amber-50/[0.97] text-stone-900",
    card: "border-amber-200/80 bg-white/90",
    printRoot: "print:bg-white print:text-black",
  },
  ink: {
    panel: "bg-white text-zinc-900",
    card: "border-zinc-200 bg-zinc-50",
    printRoot: "print:bg-white print:text-black",
  },
};

const themeLabels: Record<Theme, Record<AppLocale, string>> = {
  slate: {
    "en-US": "Dark glass",
    en: "Dark glass",
    hy: "Մուգ",
    ru: "Тёмная",
    de: "Dunkel",
    fr: "Sombre",
    es: "Oscuro",
    ar: "داكن",
    it: "Scuro",
  },
  paper: {
    "en-US": "Paper",
    en: "Paper",
    hy: "Թուղթ",
    ru: "Бумага",
    de: "Papier",
    fr: "Papier",
    es: "Papel",
    ar: "ورقي",
    it: "Carta",
  },
  ink: {
    "en-US": "High contrast",
    en: "High contrast",
    hy: "Կոնտրաստ",
    ru: "Контраст",
    de: "Kontrast",
    fr: "Contraste",
    es: "Contraste",
    ar: "تباين عالٍ",
    it: "Contrasto",
  },
};

export default function ChecklistsPageClient() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);
  const [theme, setTheme] = useState<Theme>("slate");

  useEffect(() => {
    const raw = window.localStorage.getItem(LOCALE_KEY);
    const fromCookie = readLocaleCookieClient();
    let resolved: AppLocale = DEFAULT_LOCALE;
    if (raw !== null && isAppLocale(raw)) resolved = raw;
    else if (fromCookie !== null) resolved = fromCookie;
    setLocale(resolved);
    if (raw === null || !isAppLocale(raw)) {
      window.localStorage.setItem(LOCALE_KEY, resolved);
    }
  }, []);

  useEffect(() => {
    function sync() {
      const raw = window.localStorage.getItem(LOCALE_KEY);
      if (raw && isAppLocale(raw)) setLocale(raw);
    }
    window.addEventListener(LOCALE_CHANGE_EVENT, sync);
    return () => window.removeEventListener(LOCALE_CHANGE_EVENT, sync);
  }, []);

  const t = getSiteExtras(locale);
  const tc = themeClass[theme];
  const tl = (th: Theme) => themeLabels[th][locale] ?? themeLabels[th].en;

  const blocks = [
    {
      title: t.cRelocateTitle,
      items: t.cRelocateItems,
      id: "check-relocate",
    },
    {
      title: t.cJobTitle,
      items: t.cJobItems,
      id: "check-job",
    },
    {
      title: t.cRelTitle,
      items: t.cRelItems,
      id: "check-rel",
    },
  ] as const;

  return (
    <MarketingPageShell
      eyebrow={t.navChecklists}
      title={t.checklistsTitle}
      subtitle={<p>{t.checklistsSubtitle}</p>}
    >
      <div className="max-w-4xl space-y-8 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-dim))]">
            {t.checklistsThemeLabel}
          </span>
          {(["slate", "paper", "ink"] as const).map((th) => (
            <button
              key={th}
              type="button"
              onClick={() => setTheme(th)}
              className={
                theme === th
                  ? "rounded-full border border-[rgb(var(--accent))]/50 bg-[rgb(var(--accent))]/20 px-4 py-1.5 text-sm font-semibold text-white"
                  : "rounded-full border border-white/12 bg-white/[0.06] px-4 py-1.5 text-sm text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.1]"
              }
            >
              {tl(th)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => window.print()}
            className="ms-auto rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.25)]"
          >
            {t.checklistsPrint}
          </button>
        </div>

        <div
          id="checklists-print-root"
          className={`rounded-[2rem] border border-white/[0.1] p-6 sm:p-10 ${tc.panel} ${tc.printRoot}`}
        >
          <div className="mb-8 border-b border-black/[0.08] pb-6 print:border-zinc-300">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">
              Life Decision Engine
            </p>
            <p className="mt-1 text-lg font-semibold">{t.checklistsTitle}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-1">
            {blocks.map((b) => (
              <article
                key={b.id}
                id={b.id}
                className={`rounded-2xl border p-5 sm:p-6 ${tc.card}`}
              >
                <h2 className="text-base font-semibold">{b.title}</h2>
                <ul className="mt-4 list-disc space-y-2 ps-5 text-sm [text-wrap:pretty]">
                  {b.items.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <p>
          <Link
            href="/blog"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            {t.checklistsBlogCta}
          </Link>
        </p>
        <p>
          <Link
            href="/"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            ← Home
          </Link>
        </p>
      </div>
    </MarketingPageShell>
  );
}
