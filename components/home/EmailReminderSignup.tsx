"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useCallback, useState } from "react";
import {
  getStoredSubscriberId,
  setStoredSubscriberId,
} from "@/lib/reminder-subscriber-storage";
import type { PostAnalysisCopy } from "@/lib/i18n/post-analysis";
import type { AppLocale } from "@/lib/i18n/locale";

const siteKey = (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim();

type Props = {
  pa: PostAnalysisCopy;
  locale: AppLocale;
  onRegistered?: (subscriberId: string) => void;
};

export default function EmailReminderSignup({ pa, locale, onRegistered }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [consentReminders, setConsentReminders] = useState(false);
  const [returnIn7Days, setReturnIn7Days] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formMsg, setFormMsg] = useState<string | null>(null);

  const needTurnstile = Boolean(siteKey);
  const canSubmit =
    !loading &&
    consentReminders &&
    honeypot === "" &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    (!needTurnstile || Boolean(turnstileToken));

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!canSubmit) return;
      setLoading(true);
      setFormMsg(null);
      try {
        const res = await fetch("/api/reminder-subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            locale,
            consent: true,
            honeypot,
            returnIn7Days,
            turnstileToken: siteKey ? turnstileToken ?? "" : "",
          }),
        });
        const data = (await res.json()) as {
          error?: string;
          subscriberId?: string;
        };
        if (!res.ok) {
          if (data.error === "captcha_failed") {
            setFormMsg(pa.emailRemindCaptchaFailed);
            setTurnstileToken(null);
          } else if (data.error === "consent_required") {
            setFormMsg(pa.emailRemindNeedConsent);
          } else {
            setFormMsg(pa.emailRemindError);
          }
          return;
        }
        if (data.subscriberId) {
          setStoredSubscriberId(data.subscriberId);
          onRegistered?.(data.subscriberId);
        }
        setFormMsg(
          returnIn7Days
            ? pa.emailRemindSuccess7d
            : pa.emailRemindSuccess,
        );
      } catch {
        setFormMsg(pa.emailRemindError);
      } finally {
        setLoading(false);
      }
    },
    [
      canSubmit,
      email,
      firstName,
      honeypot,
      lastName,
      locale,
      onRegistered,
      pa.emailRemindCaptchaFailed,
      pa.emailRemindError,
      pa.emailRemindNeedConsent,
      pa.emailRemindSuccess,
      pa.emailRemindSuccess7d,
      returnIn7Days,
      turnstileToken,
    ],
  );

  return (
    <form onSubmit={onSubmit} className="relative space-y-3">
      <p className="text-xs text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
        {pa.emailRemindSectionLead}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="block text-xs font-medium text-[rgb(var(--ink))]">
          {pa.emailRemindFirstName}
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
            className="mt-1 w-full rounded-xl border border-white/[0.12] bg-black/25 px-3 py-2 text-sm text-[rgb(var(--ink))] outline-none focus:border-[rgb(var(--accent))]/45"
          />
        </label>
        <label className="block text-xs font-medium text-[rgb(var(--ink))]">
          {pa.emailRemindLastName}
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="family-name"
            className="mt-1 w-full rounded-xl border border-white/[0.12] bg-black/25 px-3 py-2 text-sm text-[rgb(var(--ink))] outline-none focus:border-[rgb(var(--accent))]/45"
          />
        </label>
      </div>
      <label className="block text-xs font-medium text-[rgb(var(--ink))]">
        {pa.emailRemindEmail}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-xl border border-white/[0.12] bg-black/25 px-3 py-2 text-sm text-[rgb(var(--ink))] outline-none focus:border-[rgb(var(--accent))]/45"
        />
      </label>
      {/* Honeypot — bots often fill; must stay empty */}
      <div className="absolute start-0 top-0 h-px w-px overflow-hidden opacity-0" aria-hidden>
        <label>
          <span className="sr-only">Company</span>
          <input
            type="text"
            name="company"
            tabIndex={-1}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            autoComplete="off"
          />
        </label>
      </div>
      <label className="flex cursor-pointer items-start gap-2 text-sm text-[rgb(var(--ink))] [text-wrap:pretty]">
        <input
          type="checkbox"
          checked={consentReminders}
          onChange={(e) => setConsentReminders(e.target.checked)}
          className="mt-1 size-4 shrink-0 rounded border-white/20 bg-black/30 accent-[rgb(var(--accent-2))]"
        />
        <span>{pa.emailRemindConsentLabel}</span>
      </label>
      <label className="flex cursor-pointer items-start gap-2 text-sm text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
        <input
          type="checkbox"
          checked={returnIn7Days}
          onChange={(e) => setReturnIn7Days(e.target.checked)}
          className="mt-1 size-4 shrink-0 rounded border-white/20 bg-black/30 accent-[rgb(var(--accent-2))]"
        />
        <span>{pa.emailRemindOptIn7DayLabel}</span>
      </label>
      {siteKey ? (
        <div className="pt-1">
          <Turnstile
            siteKey={siteKey}
            onSuccess={setTurnstileToken}
            onExpire={() => setTurnstileToken(null)}
            onError={() => setTurnstileToken(null)}
            options={{ theme: "auto", size: "normal" }}
          />
        </div>
      ) : (
        <p className="text-[11px] leading-relaxed text-[rgb(var(--ink-soft))]/90 [text-wrap:pretty]">
          {pa.emailRemindFallbackNote}
        </p>
      )}
      <p className="text-[11px] leading-relaxed text-[rgb(var(--ink-soft))]/90 [text-wrap:pretty]">
        {pa.emailRemindPrivacy}
      </p>
      {formMsg ? (
        <p className="text-sm text-emerald-200/95" role="status">
          {formMsg}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-xl border border-[rgb(var(--accent-2))]/40 bg-[rgb(var(--accent-2))]/12 px-4 py-2 text-sm font-semibold text-[rgb(var(--ink))] transition enabled:hover:bg-[rgb(var(--accent-2))]/20 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? pa.emailRemindSubmitting : pa.emailRemindSubmit}
      </button>
      {getStoredSubscriberId() ? (
        <p className="text-[11px] text-[rgb(var(--ink-soft))]">
          {pa.emailRemindIdStored}
        </p>
      ) : null}
    </form>
  );
}
