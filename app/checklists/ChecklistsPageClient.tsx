"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import PageEducation from "@/components/layout/PageEducation";
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

        <PageEducation
          intro={
            <>
              <p>
                Three printable checklists live on this page: relocation, a
                job offer, and a relationship-or-cohabitation conversation.
                Each one is a tight one-pager that you can print, save as a
                PDF, or screenshot — whichever way you actually keep
                paperwork. They are the kind of lists you will not regret
                running through before you sign a lease, accept an offer,
                or have the conversation you have been postponing.
              </p>
              <p>
                The checklists are deliberately readable in two minutes.
                They are not exhaustive — that is the point. A 200-item
                relocation checklist is comforting to write and useless to
                actually use; the 18 items on this page are the ones that
                most often go wrong when people skip them.
              </p>
            </>
          }
          sections={[
            {
              heading: "How to use the checklists",
              body: (
                <ol className="list-decimal space-y-2 ps-5 marker:font-semibold marker:text-[rgb(var(--accent-2))]">
                  <li>
                    Pick the theme (Dark glass / Paper / Ink) that prints
                    best on your printer or reads best on your screen, then
                    tap <em>Print</em>. Modern browsers let you save as PDF
                    from the same dialog.
                  </li>
                  <li>
                    Walk through the items as questions, not chores. Each
                    one ends in something concrete — a number, a name, a
                    date, a yes/no — so you can tell whether you really
                    have the answer.
                  </li>
                  <li>
                    For items that turn into a real worry, drop the worry
                    into the analyzer on the homepage as a question, or ask
                    the community. The checklist surfaces the question; the
                    rest of the site helps you decide.
                  </li>
                </ol>
              ),
            },
            {
              heading: "Why a small checklist beats a long one",
              body: (
                <p>
                  Decision researchers have a polite term for the long
                  version: completionism. The longer the list, the more it
                  invites scanning instead of doing. We picked the items by
                  reading our blog archive plus the published checklists of
                  major airlines, relocation firms, and family-law clinics,
                  then keeping only the items that were either expensive to
                  miss (visa categories, deposit clauses) or emotionally
                  expensive to revisit (the conversation that does not
                  happen). Everything else is in longer reading on the
                  blog.
                </p>
              ),
            },
            {
              heading: "Combining checklists with the analyzer",
              body: (
                <p>
                  A checklist is excellent at making sure you have not
                  missed a category. It is bad at telling you which option
                  is actually right for your particular trade-offs. That
                  is the analyzer&apos;s job. Run the checklist first to
                  surface the items you cannot answer, then take the two
                  or three open questions into the analyzer or the experts
                  directory.
                </p>
              ),
            },
          ]}
          faq={[
            {
              q: "Can I print the checklists?",
              a: "Yes. Each page has a Print button that opens your browser's print dialog. From there you can send to a paper printer or save as a PDF — both produce a clean one-pager without the site chrome.",
            },
            {
              q: "Are these checklists translated?",
              a: "Yes. The labels and items follow the same eight-language localization as the rest of the site (English, Armenian, Russian, German, French, Spanish, Italian, Arabic). Switch language in the header and the printable view follows.",
            },
            {
              q: "Can I edit a checklist before printing?",
              a: "There is no built-in editor; the items are picked deliberately and we don't want to invite drift. If you need to add a personal item, print to PDF and annotate it with a free PDF reader (Preview, Adobe Reader, or any browser).",
            },
            {
              q: "Why these three checklists and not more?",
              a: "Relocation, a job offer, and a relationship-or-cohabitation conversation cover the three decisions that most often arrive with a hard deadline and a paper trail. Other decisions (kids, health, retirement) deserve longer essays rather than checklists, and live on the blog.",
            },
          ]}
          lastReviewed="May 5, 2026"
          lastReviewedISO="2026-05-05"
        />
      </div>
    </MarketingPageShell>
  );
}
