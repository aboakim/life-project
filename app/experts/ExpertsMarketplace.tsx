"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import PageEducation from "@/components/layout/PageEducation";
import PageLocalePicker from "@/components/layout/PageLocalePicker";
import {
  getExpertsCopy,
  roleLabel,
  type ExpertRoleKey,
} from "@/lib/i18n/experts-network";

const EXPERT_ROLES: ExpertRoleKey[] = [
  "PSYCHOLOGIST",
  "LAWYER",
  "FINANCIAL",
  "PHYSICIAN",
  "COACH",
  "IMMIGRATION",
];

function isExpertRoleParam(x: string): x is ExpertRoleKey {
  return (EXPERT_ROLES as readonly string[]).includes(x);
}
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { isAppLocale, type AppLocale } from "@/lib/i18n/locale";
import { syncLocaleCookieClient } from "@/lib/locale-cookie";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";

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
  const searchParams = useSearchParams();
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
    const fromUrl = searchParams.get("q");
    if (fromUrl) setQ(fromUrl);
    const r = searchParams.get("role");
    if (r && isExpertRoleParam(r)) setRole(r);
  }, [searchParams]);

  useEffect(() => {
    const h = searchParams.get("highlight");
    if (h && rawExperts.some((e) => e.id === h)) setOpenId(h);
  }, [searchParams, rawExperts]);

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
                  ["PHYSICIAN", t.filterPhysician],
                  ["COACH", t.filterCoach],
                  ["IMMIGRATION", t.filterImmigration],
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

        <PageEducation
          intro={
            <>
              <p>
                The Life Decision Engine experts directory is a curated index
                of independent professionals — psychologists, lawyers,
                financial planners, immigration counsel, physicians, and
                career coaches — who can review a major life decision with
                you in a private 30 to 60 minute conversation. The directory
                exists for the moments when a structured AI report has taken
                you as far as it can, and what you actually need next is a
                second pair of human eyes from someone with field
                accountability and professional liability.
              </p>
              <p>
                Every listing is added by the professional themselves through
                <Link
                  href="/experts/register"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  {" "}/experts/register
                </Link>
                . We do not buy lead lists, scrape LinkedIn, or auto-generate
                profiles from public databases. Profiles include name,
                country and city, professional role, languages, a short bio
                in their own words, and an optional website. Engagement
                happens directly between you and the professional — Life
                Decision Engine does not take a commission on the first
                conversation, does not see the body of your message after
                you submit it, and does not store the contents of the
                request.
              </p>
            </>
          }
          sections={[
            {
              heading: "Roles in this directory",
              body: (
                <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
                  <li>
                    <strong className="text-[rgb(var(--ink))]">
                      Psychologists & therapists
                    </strong>{" "}
                    — for grief in a separation, decision paralysis, anxiety
                    around a relocation, or processing a job loss. They are
                    not a substitute for emergency mental-health care; if
                    you are in crisis, contact local emergency services
                    first.
                  </li>
                  <li>
                    <strong className="text-[rgb(var(--ink))]">
                      Lawyers
                    </strong>{" "}
                    — civil, family, employment, real-estate or contract
                    questions. Especially helpful when an offer letter,
                    custody agreement, or rental contract needs a careful
                    second read in a language you didn’t grow up writing.
                  </li>
                  <li>
                    <strong className="text-[rgb(var(--ink))]">
                      Financial planners & advisors
                    </strong>{" "}
                    — fee-only or commission-based; the listing notes which.
                    Think runway math before quitting, mortgage versus rent
                    in a new country, taxes when you become a remote
                    employee, or whether a side-business is worth the
                    accounting overhead.
                  </li>
                  <li>
                    <strong className="text-[rgb(var(--ink))]">
                      Immigration & relocation counsel
                    </strong>{" "}
                    — visa categories, employer sponsorship, family
                    reunification, residency timelines, and the practical
                    sequencing of steps when you are moving with kids or a
                    partner who needs work authorization.
                  </li>
                  <li>
                    <strong className="text-[rgb(var(--ink))]">
                      Physicians & medical advisors
                    </strong>{" "}
                    — for second opinions on a diagnosis, decisions about
                    treatment in a country where you are new to the system,
                    or specialist referrals. Not a replacement for primary
                    care.
                  </li>
                  <li>
                    <strong className="text-[rgb(var(--ink))]">
                      Coaches
                    </strong>{" "}
                    — career and life coaching; useful when you have a
                    decision in front of you and want regular accountability
                    over four to twelve weeks rather than a one-off opinion.
                  </li>
                </ul>
              ),
            },
            {
              heading: "When to use a human expert vs. the analyzer",
              body: (
                <p>
                  The structured analyzer at the top of the site is designed
                  to take a vague feeling — “I think I want to leave this
                  job, but I’m not sure” — and turn it into named scenarios,
                  weighted lenses, a timeline, and a score. That alone often
                  unblocks people. Move to a human expert when the decision
                  involves money you can’t afford to lose, legal exposure, a
                  health question, a contract deadline, or when there is a
                  second person whose interests are tangled with yours and
                  the analyzer can only model one perspective. Bring the
                  generated report into the conversation; it shortens the
                  intake by 15 to 25 minutes.
                </p>
              ),
            },
            {
              heading: "How to contact a professional",
              body: (
                <ol className="list-decimal space-y-2 ps-5 marker:font-semibold marker:text-[rgb(var(--accent-2))]">
                  <li>
                    Filter by role, country, or keyword (for example
                    “employment lawyer · Yerevan · English”).
                  </li>
                  <li>
                    Open a profile, read the bio, check the languages they
                    work in.
                  </li>
                  <li>
                    Write a short message: your situation in two or three
                    sentences, the question you want answered, and your
                    timeline (this week / this month / no rush).
                  </li>
                  <li>
                    Submit — the message goes directly to the professional’s
                    contact form. They reply on their own schedule and on
                    their own fee structure. We do not see the contents.
                  </li>
                </ol>
              ),
            },
          ]}
          faq={[
            {
              q: "Are these professionals vetted?",
              a: "Each professional self-attests to their licence, registration body, and country of practice when they register, and the listing is reviewed by an editor before it goes live. We do not, however, perform a full background or licence-board verification — that responsibility sits with you and with the professional. Always check their public registration before paying for a long engagement.",
            },
            {
              q: "Is there a fee to use the directory?",
              a: "There is no fee to browse, contact a professional, or have a first conversation through the contact form. Each professional sets their own fees for ongoing work and bills you directly. Life Decision Engine does not take a commission on these payments.",
            },
            {
              q: "Can I list myself or my practice here?",
              a: (
                <>
                  Yes — independent professionals can apply via{" "}
                  <Link
                    href="/experts/register"
                    className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                  >
                    /experts/register
                  </Link>
                  . Listings are free for the first cohort and will remain
                  free for verified individuals. Lead-generation agencies and
                  multi-level referral networks will be removed.
                </>
              ),
            },
            {
              q: "What about my privacy when I send a message?",
              a: "The professional sees your name, email, and message body. Life Decision Engine receives a record that the contact happened (timestamp, target professional, your IP for abuse protection) but does not store the contents of the message. See the privacy page for full retention details.",
            },
          ]}
          footer={
            <p className="text-xs leading-relaxed text-[rgb(var(--ink-soft))]/85 [text-wrap:pretty]">
              Important: a directory is not legal, medical, or financial
              advice, and Life Decision Engine is not a regulated agency. The
              professional you choose is responsible for the advice they
              give. Always confirm credentials with the relevant licensing
              body before paying for an extended engagement.
            </p>
          }
        />
      </MarketingPageShell>
    </div>
  );
}
