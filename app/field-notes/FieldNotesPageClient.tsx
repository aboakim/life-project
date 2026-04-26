"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import { analyzeBriefText } from "@/lib/novelty/text-brief-stats";
import { getNoveltyCopy } from "@/lib/i18n/novelty-extras";
import {
  isAppLocale,
  type AppLocale,
} from "@/lib/i18n/locale";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { readLocaleCookieClient } from "@/lib/locale-cookie";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";
import { getUi } from "@/lib/i18n/ui";

const LOCALE_KEY = "lde-locale";

export default function FieldNotesPageClient() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);
  const [text, setText] = useState("");

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

  const nx = getNoveltyCopy(locale);
  const ui = getUi(locale);

  const statsLocale = locale === "hy" ? "hy" : "en";
  const analysis = useMemo(
    () => analyzeBriefText(text, statsLocale),
    [text, statsLocale],
  );

  return (
    <MarketingPageShell
      eyebrow={nx.fieldNotesEyebrow}
      title={nx.fieldNotesTitle}
      subtitle={nx.fieldNotesSubtitle}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <div className="rounded-3xl border border-white/[0.12] bg-[rgb(var(--surface-elevated))]/50 p-5 shadow-xl backdrop-blur-md sm:p-6">
          <label
            htmlFor="field-notes-text"
            className="text-sm font-semibold text-[rgb(var(--ink))]"
          >
            {nx.fieldNotesPasteLabel}
          </label>
          <textarea
            id="field-notes-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={14}
            className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base leading-relaxed text-[rgb(var(--ink))] outline-none transition focus:border-[rgb(var(--accent))]/45"
            spellCheck
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] leading-relaxed text-[rgb(var(--ink-soft))]/80 [text-wrap:pretty]">
              {nx.fieldNotesLocaleHint}
            </p>
            <button
              type="button"
              onClick={() => setText("")}
              className="rounded-xl border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.1]"
            >
              {nx.fieldNotesClear}
            </button>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-transparent p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--accent-2))]">
              {nx.fieldNotesEyebrow}
            </p>
            {text.trim().length === 0 ? (
              <p className="mt-3 text-sm text-[rgb(var(--ink-soft))]">
                {nx.fieldNotesEmpty}
              </p>
            ) : (
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-[11px] font-medium text-[rgb(var(--ink-soft))]">
                    {nx.fieldNotesReading}
                  </dt>
                  <dd className="font-display mt-1 text-2xl font-bold tabular-nums text-[rgb(var(--ink))]">
                    {analysis.readingMinutes} min
                  </dd>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <dt className="text-[11px] font-medium text-[rgb(var(--ink-soft))]">
                      {nx.fieldNotesWords}
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums text-[rgb(var(--ink))]">
                      {analysis.wordCount}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium text-[rgb(var(--ink-soft))]">
                      {nx.fieldNotesUnique}
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums text-[rgb(var(--ink))]">
                      {analysis.uniqueTokens}
                    </dd>
                  </div>
                </div>
                <div>
                  <dt className="text-[11px] font-medium text-[rgb(var(--ink-soft))]">
                    {nx.fieldNotesTop}
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {analysis.topWords.length === 0 ? (
                      <span className="text-sm text-[rgb(var(--ink-soft))]/80">
                        —
                      </span>
                    ) : (
                      analysis.topWords.map(({ word, count }) => (
                        <span
                          key={word}
                          className="rounded-full border border-[rgb(var(--accent))]/30 bg-[rgb(var(--accent))]/10 px-2.5 py-1 text-xs font-medium text-[rgb(var(--ink))]"
                        >
                          {word}
                          <span className="ms-1 tabular-nums text-[rgb(var(--ink-soft))]">
                            ×{count}
                          </span>
                        </span>
                      ))
                    )}
                  </dd>
                </div>
              </dl>
            )}
          </div>
          <Link
            href="/"
            className="inline-flex text-sm font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            ← {ui.analyzeBackHome}
          </Link>
        </aside>
      </div>
    </MarketingPageShell>
  );
}
