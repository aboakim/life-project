"use client";

import { useEffect, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import PageLocalePicker from "@/components/layout/PageLocalePicker";
import {
  getExpertsCopy,
  type ExpertRoleKey,
} from "@/lib/i18n/experts-network";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { isAppLocale, type AppLocale } from "@/lib/i18n/locale";
import { syncLocaleCookieClient } from "@/lib/locale-cookie";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";

const LOCALE_KEY = "lde-locale";

export default function RegisterExpertForm() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);
  const t = getExpertsCopy(locale);
  const [name, setName] = useState("");
  const [role, setRole] = useState<ExpertRoleKey>("PSYCHOLOGIST");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [languages, setLanguages] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(LOCALE_KEY);
    if (raw === null) {
      localStorage.setItem(LOCALE_KEY, DEFAULT_LOCALE);
      setLocale(DEFAULT_LOCALE);
    } else if (isAppLocale(raw)) setLocale(raw);
  }, []);

  useEffect(() => {
    function syncFromNav() {
      const raw = localStorage.getItem(LOCALE_KEY);
      if (raw && isAppLocale(raw)) setLocale(raw);
    }
    window.addEventListener(LOCALE_CHANGE_EVENT, syncFromNav);
    return () => window.removeEventListener(LOCALE_CHANGE_EVENT, syncFromNav);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
    syncLocaleCookieClient(locale);
  }, [locale]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(false);
    try {
      const res = await fetch("/api/experts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role,
          country,
          city: city || undefined,
          languages,
          bio,
          email,
          website: website || undefined,
        }),
      });
      if (!res.ok) {
        setErr(true);
        setMsg(t.regError);
        return;
      }
      setMsg(t.regSuccess);
      setName("");
      setCountry("");
      setCity("");
      setLanguages("");
      setBio("");
      setEmail("");
      setWebsite("");
    } catch {
      setErr(true);
      setMsg(t.regError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MarketingPageShell title={t.registerTitle} subtitle={t.registerSubtitle}>
      <PageLocalePicker
        locale={locale}
        onChange={setLocale}
        className="mb-10 max-w-3xl"
      />

      <form
        onSubmit={onSubmit}
        className="glass card-glow mx-auto max-w-xl space-y-4 rounded-3xl border border-white/[0.1] p-6 sm:p-8"
      >
        <div>
          <label className="text-xs font-medium text-[rgb(var(--ink-soft))]">
            {t.regName}
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[rgb(var(--ink-soft))]">
            {t.regRole}
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as ExpertRoleKey)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm"
          >
            <option value="PSYCHOLOGIST">{t.filterPsych}</option>
            <option value="LAWYER">{t.filterLaw}</option>
            <option value="FINANCIAL">{t.filterFinance}</option>
            <option value="PHYSICIAN">{t.filterPhysician}</option>
            <option value="COACH">{t.filterCoach}</option>
            <option value="IMMIGRATION">{t.filterImmigration}</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-[rgb(var(--ink-soft))]">
            {t.regCountry}
          </label>
          <input
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[rgb(var(--ink-soft))]">
            {t.regCity}
          </label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[rgb(var(--ink-soft))]">
            {t.regLanguages}
          </label>
          <input
            required
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[rgb(var(--ink-soft))]">
            {t.regBio}
          </label>
          <textarea
            required
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[rgb(var(--ink-soft))]">
            {t.regEmail}
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[rgb(var(--ink-soft))]">
            {t.regWebsite}
          </label>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm"
          />
        </div>

        {msg ? (
          <p
            className={
              err ? "text-sm text-rose-300" : "text-sm text-emerald-200/90"
            }
          >
            {msg}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] py-3 text-sm font-semibold text-white shadow-lg shadow-[rgb(124_92_255/0.2)] disabled:opacity-50"
        >
          {loading ? "…" : t.regSubmit}
        </button>
      </form>
    </MarketingPageShell>
  );
}
