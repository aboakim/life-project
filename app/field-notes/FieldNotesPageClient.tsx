"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import PageEducation from "@/components/layout/PageEducation";
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
      <div className="space-y-8">
        <div className="rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-4 sm:px-6 sm:py-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[rgb(var(--accent-warm))]/90">
            {nx.fieldNotesFlowEyebrow}
          </p>
          <ol className="mt-3 list-decimal space-y-2.5 ps-4 text-sm leading-relaxed text-[rgb(var(--ink-soft))]/95 [text-wrap:pretty] marker:font-semibold marker:text-[rgb(var(--accent-2))]">
            <li>{nx.fieldNotesFlow1}</li>
            <li>{nx.fieldNotesFlow2}</li>
            <li>
              {nx.fieldNotesFlow3}{" "}
              <Link
                href="/analyze"
                className="font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                {nx.fieldNotesAnalyzerLink}
              </Link>
            </li>
          </ol>
        </div>

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
          <div className="flex flex-col gap-2">
            <Link
              href="/analyze"
              className="inline-flex text-sm font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              {nx.fieldNotesAnalyzerLink}
            </Link>
            <Link
              href="/"
              className="inline-flex text-sm font-semibold text-[rgb(var(--ink-soft))] underline-offset-2 hover:underline"
            >
              ← {ui.analyzeBackHome}
            </Link>
          </div>
        </aside>
      </div>

      <PageEducation
        intro={
          <>
            <p>
              Field notes is a small browser-only writing lab. Paste a draft,
              a journal entry, the email you are about to send, the
              one-pager you are preparing for a hard conversation — anything
              you want to size up before it leaves your head — and the page
              gives you a calm read-out: how long it would take to read,
              how many distinct words you used, the eight or nine words that
              dominate the piece, and the tokens that are likely to drive
              the rest of the meaning.
            </p>
            <p>
              Nothing leaves your browser. The text you paste is analyzed
              client-side using a small statistics module bundled into the
              page; there is no upload, no API call, no logging. You can
              confirm it by opening the network tab in your browser dev
              tools and watching the request list while you type.
            </p>
          </>
        }
        sections={[
          {
            heading: "What the metrics mean",
            body: (
              <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Reading time
                  </strong>{" "}
                  is computed at roughly 220 words per minute, the average
                  pace for adult silent reading. If your reader is a busy
                  manager, halve it; if it is your grandmother, double it.
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Words and unique tokens
                  </strong>{" "}
                  together hint at vocabulary diversity. A 600-word draft
                  with 80 unique tokens is likely repetitive; the same
                  length with 280 unique tokens probably reads tighter.
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Top words
                  </strong>{" "}
                  is the strongest signal of what the text is actually
                  about. If &ldquo;feel&rdquo;, &ldquo;maybe&rdquo;, and
                  &ldquo;sorry&rdquo; are in your top eight, the reader
                  will hear hesitation more than content. If
                  &ldquo;deadline&rdquo;, &ldquo;number&rdquo;, and
                  &ldquo;decision&rdquo; are there, you have a signal you
                  can build on.
                </li>
              </ul>
            ),
          },
          {
            heading: "Useful workflows",
            body: (
              <ol className="list-decimal space-y-2 ps-5 marker:font-semibold marker:text-[rgb(var(--accent-2))]">
                <li>
                  Before sending a difficult email or message, paste the
                  draft and check whether your top words match what you
                  actually want to say.
                </li>
                <li>
                  When preparing a brief for the analyzer on the homepage,
                  use field notes to make sure your one-paragraph context
                  has enough specificity — fewer than 20 unique tokens
                  usually means the report will be vague too.
                </li>
                <li>
                  For a long journal entry, scan the top words after a few
                  weeks. If the same emotional vocabulary keeps repeating
                  across entries, that is a signal worth bringing to a
                  therapist or coach.
                </li>
              </ol>
            ),
          },
        ]}
      />
      </div>
    </MarketingPageShell>
  );
}
