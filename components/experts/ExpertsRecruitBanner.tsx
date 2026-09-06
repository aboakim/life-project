"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getExpertsRecruitCopy } from "@/lib/i18n/experts-recruit";
import type { AppLocale } from "@/lib/i18n/locale";
import { getSiteUrlString } from "@/lib/site-url";

type Props = {
  locale: AppLocale;
  /** Large home/experts hero strip vs compact inline. */
  variant?: "hero" | "compact";
  className?: string;
};

export default function ExpertsRecruitBanner({
  locale,
  variant = "hero",
  className = "",
}: Props) {
  const t = getExpertsRecruitCopy(locale);
  const [copied, setCopied] = useState(false);
  const [registerUrl, setRegisterUrl] = useState(
    () => `${getSiteUrlString().replace(/\/$/, "")}/experts/register`,
  );

  useEffect(() => {
    setRegisterUrl(`${window.location.origin}/experts/register`);
  }, []);

  const onShare = useCallback(async () => {
    const text = `${t.shareBlurb} ${registerUrl}`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: t.ctaRegister,
          text: t.shareBlurb,
          url: registerUrl,
        });
        return;
      }
    } catch {
      /* fall through to copy */
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  }, [registerUrl, t.ctaRegister, t.shareBlurb]);

  if (variant === "compact") {
    return (
      <aside
        className={`relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/[0.16] via-[rgb(var(--accent))]/[0.1] to-transparent p-4 sm:p-5 ${className}`.trim()}
        aria-label={t.eyebrow}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/90">
          {t.eyebrow}
        </p>
        <p className="mt-1.5 text-sm font-semibold leading-snug text-[rgb(var(--ink))] [text-wrap:pretty]">
          {t.title}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
          {t.body}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/experts/register"
            className="inline-flex rounded-xl bg-gradient-to-r from-cyan-500 via-[rgb(var(--accent))] to-[rgb(var(--accent-magenta))] px-4 py-2.5 text-xs font-bold text-white shadow-lg transition hover:brightness-110"
          >
            {t.ctaRegister}
          </Link>
          <button
            type="button"
            onClick={() => void onShare()}
            className="inline-flex rounded-xl border border-white/20 bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.1]"
          >
            {copied ? t.shareCopied : t.ctaShare}
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`relative mx-auto max-w-6xl overflow-hidden rounded-[1.85rem] border border-cyan-400/35 bg-gradient-to-br from-cyan-500/[0.18] via-[rgb(var(--accent))]/[0.12] to-[rgb(var(--accent-magenta))]/[0.1] px-5 py-7 shadow-[0_28px_80px_-48px_rgb(34_211_238/0.55)] ring-1 ring-inset ring-white/[0.08] sm:px-8 sm:py-9 ${className}`.trim()}
      aria-label={t.eyebrow}
    >
      <div
        className="pointer-events-none absolute -end-16 -top-20 size-56 rounded-full bg-cyan-400/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -start-10 bottom-0 size-40 rounded-full bg-[rgb(var(--accent-magenta))]/20 blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="min-w-0 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100/95">
            {t.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance] sm:text-3xl">
            {t.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] sm:text-[0.9375rem]">
            {t.body}
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2.5 sm:max-w-xs">
          <Link
            href="/experts/register"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-[rgb(var(--accent))] to-[rgb(var(--accent-magenta))] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_40px_-18px_rgb(34_211_238/0.7)] ring-1 ring-white/25 transition hover:brightness-110 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]"
          >
            {t.ctaRegister}
          </Link>
          <button
            type="button"
            onClick={() => void onShare()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-white/20 bg-black/25 px-5 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] backdrop-blur transition hover:bg-white/[0.08]"
          >
            {copied ? t.shareCopied : t.ctaShare}
          </button>
        </div>
      </div>
    </aside>
  );
}
