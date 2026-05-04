"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import PageEducation from "@/components/layout/PageEducation";
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
    <MarketingPageShell
      title={t.registerTitle}
      subtitle={
        <Fragment>
          <p>{t.registerIntro}</p>
          <ul className="mt-5 list-disc space-y-2 ps-5 text-base leading-relaxed md:text-lg">
            {t.registerPoints.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Fragment>
      }
    >
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

      <PageEducation
        intro={
          <>
            <p>
              Listing on the Life Decision Engine experts directory is open
              to independent licensed professionals — psychologists,
              lawyers, financial planners, immigration counsel, physicians
              and primary-care providers, and certified coaches — who can
              hold a private decision-support conversation with a reader in
              one of the languages the site is published in. Listings are
              free for the first cohort, and we expect to keep them free
              for individual practitioners; the optional paid tier (when it
              exists) will be for verified placement, not for visibility.
            </p>
            <p>
              The form above is the application. We do a light review (your
              public profile, your registration body or licence number,
              and the language of your bio) before the listing goes live;
              expect a reply within five business days. We are not a
              regulator and we do not validate the depth of your expertise
              — that responsibility sits with you and with the readers who
              choose you.
            </p>
          </>
        }
        sections={[
          {
            heading: "Who fits this directory",
            body: (
              <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
                <li>
                  Independent practitioners or small private practices.
                  Large lead-generation agencies, multi-level referral
                  networks, and unregulated &ldquo;life coach&rdquo;
                  resellers are not a fit.
                </li>
                <li>
                  Professionals comfortable with asynchronous, written
                  intakes — most readers will message you before they
                  book a paid session.
                </li>
                <li>
                  At least one of the eight site languages: English,
                  Armenian, Russian, German, French, Spanish, Italian, or
                  Arabic. Bilingual practitioners are particularly useful
                  for cross-border decisions.
                </li>
              </ul>
            ),
          },
          {
            heading: "What the listing shows",
            body: (
              <p>
                Your name, role, country, optional city, languages, a 200
                to 600 character bio in your own words, and an optional
                website link. We do not display fee structures, calendar
                links, or social-media handles in the listing itself — the
                first conversation is for you to negotiate. Avatar photos
                are not shown today; we may add them later with explicit
                consent.
              </p>
            ),
          },
          {
            heading: "What we expect from listed professionals",
            body: (
              <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
                <li>
                  Reply to first messages within five business days, or
                  ask us to pause your listing.
                </li>
                <li>
                  Be transparent about scope: if a question is outside
                  your country or specialty, refer the reader on rather
                  than improvising.
                </li>
                <li>
                  Do not use the directory to harvest leads for unrelated
                  paid programs.
                </li>
                <li>
                  Tell us if your registration status changes (suspension,
                  retirement, change of country) so we can update or
                  remove the listing.
                </li>
              </ul>
            ),
          },
        ]}
        faq={[
          {
            q: "What if my country does not have a formal regulator for my role?",
            a: "Many countries do not regulate, for example, life coaching or some forms of relationship counselling. In that case we ask for the body that issued your training certificate, the year, and a short paragraph about your scope of practice. We list the field; we do not list a registration number that does not exist.",
          },
          {
            q: "Can I list my whole team?",
            a: (
              <>
                The directory is for individuals. If your firm has three
                lawyers each fluent in different languages, register them
                separately so readers can pick the right person. For
                bigger practices, write to{" "}
                <Link
                  href="/contact"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  /contact
                </Link>{" "}
                — we will look at a small group profile.
              </>
            ),
          },
          {
            q: "How do I change or remove my listing?",
            a: "Reply to the welcome email or write to /contact with the change. Self-serve editing is on the roadmap; today, edits go through an editor so the listing quality stays consistent.",
          },
        ]}
        lastReviewed="May 5, 2026"
        lastReviewedISO="2026-05-05"
      />
    </MarketingPageShell>
  );
}
