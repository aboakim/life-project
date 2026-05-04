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
const STORAGE_KEY = "lde-decision-journal-entries";

type Entry = { id: string; text: string; createdAt: string };

function loadEntries(): Entry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (e): e is Entry =>
          typeof e === "object" &&
          e !== null &&
          typeof (e as Entry).id === "string" &&
          typeof (e as Entry).text === "string"
      )
      .map((e) => ({
        ...e,
        createdAt:
          typeof e.createdAt === "string" ? e.createdAt : new Date().toISOString(),
      }));
  } catch {
    return [];
  }
}

export default function JournalPageClient() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [savedFlash, setSavedFlash] = useState(false);

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

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const t = getSiteExtras(locale);

  function persist(next: Entry[]) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setEntries(next);
  }

  function addEntry(e: React.FormEvent) {
    e.preventDefault();
    const text = note.trim();
    if (!text) return;
    const entry: Entry = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
    };
    persist([entry, ...entries]);
    setNote("");
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 2000);
  }

  function remove(id: string) {
    persist(entries.filter((x) => x.id !== id));
  }

  return (
    <MarketingPageShell
      eyebrow={t.navJournal}
      title={t.journalTitle}
      subtitle={<p>{t.journalSubtitle}</p>}
    >
      <div className="max-w-2xl space-y-8 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))]">
        <p className="text-sm text-emerald-200/90">{t.journalPrivacy}</p>

        <form
          onSubmit={addEntry}
          className="glass card-glow rounded-3xl p-5 sm:p-6"
        >
          <label className="block text-sm font-medium text-[rgb(var(--ink))]">
            {t.journalPlaceholder}
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              maxLength={2000}
              className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-[rgb(var(--ink))] outline-none focus:border-[rgb(var(--accent))]/45"
            />
          </label>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.25)]"
            >
              {t.journalSave}
            </button>
            {savedFlash ? (
              <span className="text-sm text-emerald-200/95">{t.journalSaved}</span>
            ) : null}
          </div>
        </form>

        <section aria-label={t.journalTitle}>
          {entries.length === 0 ? (
            <p className="mt-4 text-sm">{t.journalEmpty}</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {entries.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-3 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <p className="text-xs text-[rgb(var(--ink-soft))]/80">
                      {new Date(e.createdAt).toLocaleString()}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-[rgb(var(--ink))]">
                      {e.text}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(e.id)}
                    className="shrink-0 text-sm font-medium text-rose-300/95 hover:underline"
                  >
                    {t.journalRemove}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

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
                A decision journal is a deliberately small habit: one or two
                lines, captured at the moment a real choice is in front of
                you, written before you know how it turned out. Done over
                weeks and months, it becomes the single most useful artefact
                you can have when you face the next hard call — because it
                shows you, in your own handwriting, how your past predictions
                actually compared to reality.
              </p>
              <p>
                This page is intentionally minimal: a textarea and a list.
                Nothing is sent to a server. Entries are stored only in your
                browser&apos;s localStorage on this device. If you clear your
                browser data, the journal goes with it; if you switch
                devices, it does not follow. That trade-off is on purpose —
                the smaller the surface that can leak, the more honestly
                most people write.
              </p>
            </>
          }
          sections={[
            {
              heading: "Why keep a decision journal",
              body: (
                <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
                  <li>
                    It separates <em>process quality</em> from{" "}
                    <em>outcome quality</em>. Good decisions can have bad
                    outcomes; bad decisions can get lucky. A journal lets you
                    judge the reasoning, not just the result.
                  </li>
                  <li>
                    It defeats hindsight bias. Six months from now, you will
                    feel certain you &quot;always knew&quot; the answer. The
                    journal is your honest record that you didn&apos;t.
                  </li>
                  <li>
                    It makes patterns legible. After ten or twenty entries
                    you start seeing your repeated mistakes — being too
                    optimistic about timelines, anchoring on sunk cost,
                    deferring conflict — and you can address the pattern
                    instead of the next instance.
                  </li>
                </ul>
              ),
            },
            {
              heading: "What to actually write",
              body: (
                <>
                  <p>
                    A useful entry has four pieces and fits in two short
                    sentences:
                  </p>
                  <ol className="list-decimal space-y-2 ps-5 marker:font-semibold marker:text-[rgb(var(--accent-2))]">
                    <li>
                      <strong className="text-[rgb(var(--ink))]">
                        The decision in plain words.
                      </strong>{" "}
                      &quot;Going to accept the Berlin offer over staying in
                      the current role.&quot;
                    </li>
                    <li>
                      <strong className="text-[rgb(var(--ink))]">
                        Your prediction.
                      </strong>{" "}
                      &quot;I expect to be glad I moved within six months;
                      worried about the salary cut.&quot;
                    </li>
                    <li>
                      <strong className="text-[rgb(var(--ink))]">
                        Your confidence.
                      </strong>{" "}
                      A rough percentage, e.g. &quot;70 percent.&quot;
                    </li>
                    <li>
                      <strong className="text-[rgb(var(--ink))]">
                        What you would update on.
                      </strong>{" "}
                      &quot;If I am still anxious about the language at
                      month four, I will reconsider.&quot;
                    </li>
                  </ol>
                </>
              ),
            },
            {
              heading: "How this pairs with the analyzer",
              body: (
                <p>
                  When you run a decision through the analyzer on the
                  homepage, copy the headline from the report — the score,
                  or the single sentence that captures the recommendation —
                  into a journal entry as your prediction. Months later,
                  open the same entry, write a one-liner about how it
                  actually played out, and you have a closed feedback loop
                  for the AI&apos;s reasoning as well as your own.
                </p>
              ),
            },
          ]}
          faq={[
            {
              q: "Is there a way to back up entries?",
              a: "Not yet inside the page itself. As a workaround you can copy the entries you want to keep into a plain text file or a notes app. We are evaluating an export-to-JSON button for a future release.",
            },
            {
              q: "Will entries sync between my phone and laptop?",
              a: "No — localStorage is per-device, per-browser. That is a privacy choice, not an oversight. If a device-spanning history matters to you, write the entries in a notes app you already trust (Apple Notes, Google Keep, Obsidian) and use this page only for one-line captures during a session.",
            },
            {
              q: "How long should I keep doing it?",
              a: "Most of the value shows up between entry 10 and entry 30. If after a month you have written nothing, the page is honest feedback that the format is not your style — try a paper notebook or a recurring weekly note instead.",
            },
          ]}
          lastReviewed="May 5, 2026"
          lastReviewedISO="2026-05-05"
        />
      </div>
    </MarketingPageShell>
  );
}
