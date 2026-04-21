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
      </div>
    </MarketingPageShell>
  );
}
