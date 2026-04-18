"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import PageLocalePicker from "@/components/layout/PageLocalePicker";
import {
  getExpertsCopy,
  roleLabel,
  type ExpertRoleKey,
} from "@/lib/i18n/experts-network";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { isAppLocale, type AppLocale } from "@/lib/i18n/locale";
import { syncLocaleCookieClient } from "@/lib/locale-cookie";

const LOCALE_KEY = "lde-locale";

export type ExpertPublic = {
  id: string;
  createdAt: string;
  name: string;
  role: ExpertRoleKey;
  country: string;
  city: string | null;
  languages: string;
  bio: string;
  website: string | null;
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function ExpertsMarketplace() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);
  const t = getExpertsCopy(locale);
  const [rawExperts, setRawExperts] = useState<ExpertPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"" | ExpertRoleKey>("");
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [formNote, setFormNote] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(LOCALE_KEY);
    if (raw === null) {
      localStorage.setItem(LOCALE_KEY, DEFAULT_LOCALE);
      setLocale(DEFAULT_LOCALE);
    } else if (isAppLocale(raw)) setLocale(raw);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
    syncLocaleCookieClient(locale);
  }, [locale]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL("/api/experts", window.location.origin);
      if (role) url.searchParams.set("role", role);
      const res = await fetch(url.toString());
      // Treat both successful responses and transient errors as "empty
      // directory" from the user's perspective — the rendered empty state
      // (with "Be the first to join" CTA) is cleaner than a red error box.
      if (!res.ok) {
        setRawExperts([]);
        return;
      }
      const data = (await res.json().catch(() => ({ experts: [] }))) as {
        experts?: ExpertPublic[];
      };
      setRawExperts(data.experts ?? []);
    } catch {
      setRawExperts([]);
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    load();
  }, [load]);

  const experts = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return rawExperts;
    return rawExperts.filter((e) => {
      const hay = `${e.name} ${e.country} ${e.city ?? ""} ${e.languages} ${e.bio}`.toLowerCase();
      return hay.includes(qq);
    });
  }, [rawExperts, q]);

  async function sendContact(expertId: string) {
    if (!formName.trim() || !formEmail.trim() || !formMsg.trim()) {
      setFormNote(t.contactError);
      return;
    }
    setSending(true);
    setFormNote(null);
    try {
      const res = await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expertId,
          clientName: formName,
          clientEmail: formEmail,
          message: formMsg,
          locale,
        }),
      });
      if (!res.ok) {
        setFormNote(t.contactError);
        return;
      }
      setFormNote(t.contactSuccess);
      setFormName("");
      setFormEmail("");
      setFormMsg("");
    } catch {
      setFormNote(t.contactError);
    } finally {
      setSending(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/12 bg-black/35 px-3 py-2.5 text-sm text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/55 outline-none transition focus:border-[rgb(var(--accent))]/45 focus:ring-2 focus:ring-[rgb(var(--accent))]/12";

  return (
    <div className="font-sans antialiased">
      <MarketingPageShell
        eyebrow={t.pageEyebrow}
        title={t.pageTitle}
        subtitle={t.pageSubtitle}
      >
        <PageLocalePicker
          locale={locale}
          onChange={setLocale}
          className="mb-10 max-w-3xl"
        />

        <section
          className="glass card-glow rounded-[1.75rem] border border-white/[0.1] p-5 sm:p-6"
          aria-label={t.filtersSectionLabel}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgb(var(--ink-soft))]">
            {t.filtersSectionLabel}
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["", t.filterAll],
                  ["PSYCHOLOGIST", t.filterPsych],
                  ["LAWYER", t.filterLaw],
                  ["FINANCIAL", t.filterFinance],
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val || "all"}
                  type="button"
                  onClick={() => setRole(val)}
                  className={
                    role === val
                      ? "rounded-xl border border-[rgb(var(--accent))]/50 bg-gradient-to-r from-[rgb(var(--accent))]/25 to-[rgb(var(--accent-2))]/15 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_-8px_rgb(var(--accent))]"
                      : "rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 text-sm font-medium text-[rgb(var(--ink-soft))] transition hover:border-white/20 hover:bg-white/[0.04] hover:text-[rgb(var(--ink))]"
                  }
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="relative lg:ms-auto lg:max-w-md lg:flex-1">
              <span
                className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[rgb(var(--ink-soft))]/70"
                aria-hidden
              >
                ⌕
              </span>
              <label className="sr-only" htmlFor="ex-search">
                {t.searchPlaceholder}
              </label>
              <input
                id="ex-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`${inputClass} ps-10`}
              />
            </div>
          </div>
        </section>

        <p className="mt-6 rounded-2xl border border-amber-500/25 bg-gradient-to-r from-amber-500/[0.08] to-transparent px-4 py-3 text-xs leading-relaxed text-amber-100/90 [text-wrap:pretty]">
          {t.disclaimerExperts}
        </p>

        {loading ? (
          <div
            className="mt-10 space-y-4"
            role="status"
            aria-live="polite"
            aria-label={t.loadingLabel}
          >
            <div className="flex items-center gap-3 text-sm text-[rgb(var(--ink-soft))]">
              <div className="size-5 animate-spin rounded-full border-2 border-[rgb(var(--accent))]/30 border-t-[rgb(var(--accent))]" />
              {t.loadingLabel}
            </div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.04]"
              />
            ))}
          </div>
        ) : null}

        {!loading && experts.length === 0 ? (
          <div className="mt-10 rounded-[1.75rem] border border-dashed border-white/15 bg-white/[0.03] px-6 py-14 text-center">
            <p className="text-base font-medium text-[rgb(var(--ink))]">
              {t.empty}
            </p>
            <Link
              href="/experts/register"
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgb(124_92_255/0.2)] transition hover:brightness-110"
            >
              {t.emptyCta}
            </Link>
          </div>
        ) : null}

        {!loading && experts.length > 0 ? (
          <ul className="mt-10 space-y-5">
            {experts.map((e) => (
              <li
                key={e.id}
                className="glass card-glow overflow-hidden rounded-[1.75rem] border border-white/[0.1] transition hover:border-[rgb(var(--accent))]/20"
              >
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:gap-6 sm:p-6">
                  <div
                    className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(var(--accent))]/35 to-[rgb(var(--accent-2))]/20 text-lg font-bold tracking-tight text-white shadow-inner ring-1 ring-white/10"
                    aria-hidden
                  >
                    {initials(e.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-lg font-semibold tracking-tight text-[rgb(var(--ink))]">
                          {e.name}
                        </h2>
                        <span className="mt-2 inline-flex rounded-full border border-[rgb(var(--accent))]/30 bg-[rgb(var(--accent))]/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[rgb(var(--accent-2))]">
                          {roleLabel(locale, e.role)}
                        </span>
                      </div>
                      <p className="text-sm text-[rgb(var(--ink-soft))] sm:text-end">
                        <span className="text-[rgb(var(--ink))]/80">📍 </span>
                        {e.country}
                        {e.city ? ` · ${e.city}` : ""}
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                      {e.bio}
                    </p>
                    <p className="mt-3 text-xs text-[rgb(var(--ink-soft))]/90">
                      <span className="font-medium text-[rgb(var(--accent-dim))]">
                        {t.cardLanguages}:
                      </span>{" "}
                      {e.languages}
                    </p>
                    {e.website ? (
                      <a
                        href={
                          e.website.startsWith("http")
                            ? e.website
                            : `https://${e.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                      >
                        {e.website}
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="border-t border-white/[0.06] bg-black/20 px-5 py-4 sm:px-6">
                  {openId === e.id ? (
                    <div className="rounded-2xl border border-white/10 bg-[rgb(var(--surface-2))]/50 p-4 backdrop-blur-sm">
                      <h3 className="text-sm font-semibold text-[rgb(var(--ink))]">
                        {t.contactTitle}
                      </h3>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <input
                          value={formName}
                          onChange={(ev) => setFormName(ev.target.value)}
                          placeholder={t.yourName}
                          className={inputClass}
                        />
                        <input
                          type="email"
                          value={formEmail}
                          onChange={(ev) => setFormEmail(ev.target.value)}
                          placeholder={t.yourEmail}
                          className={inputClass}
                        />
                      </div>
                      <textarea
                        value={formMsg}
                        onChange={(ev) => setFormMsg(ev.target.value)}
                        placeholder={t.yourMessage}
                        rows={3}
                        className={`${inputClass} mt-3 resize-y`}
                      />
                      {formNote ? (
                        <p className="mt-2 text-xs text-emerald-200/90">
                          {formNote}
                        </p>
                      ) : null}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={sending}
                          onClick={() => sendContact(e.id)}
                          className="rounded-xl bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[rgb(124_92_255/0.2)] disabled:opacity-50"
                        >
                          {sending ? t.sending : t.sendRequest}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOpenId(null);
                            setFormNote(null);
                          }}
                          className="rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.08]"
                        >
                          {t.contactCancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setOpenId(e.id);
                        setFormNote(null);
                      }}
                      className="w-full rounded-xl border border-[rgb(var(--accent))]/40 bg-gradient-to-r from-[rgb(var(--accent))]/15 to-[rgb(var(--accent-2))]/10 py-3 text-sm font-semibold text-[rgb(var(--ink))] transition hover:border-[rgb(var(--accent))]/55 hover:from-[rgb(var(--accent))]/25 sm:w-auto sm:px-8"
                    >
                      {t.contactCta}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </MarketingPageShell>
    </div>
  );
}
