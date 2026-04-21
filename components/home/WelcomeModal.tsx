"use client";

import { useCallback, useEffect, useState } from "react";
import { type AppLocale, isRtlLocale } from "@/lib/i18n/locale";
import { getWelcomeCopy } from "@/lib/i18n/welcome-modal";

const STORAGE_KEY = "lde-welcome-dismissed-v1";

type Props = {
  locale: AppLocale;
};

export default function WelcomeModal({ locale }: Props) {
  const [open, setOpen] = useState<boolean | null>(null);
  const w = getWelcomeCopy(locale);
  const rtl = isRtlLocale(locale);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    try {
      const dismissed = window.localStorage.getItem(STORAGE_KEY);
      setOpen(dismissed !== "1");
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (open !== true) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, dismiss]);

  if (open === null || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label={w.backdropDismissAria}
        onClick={dismiss}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-title"
        dir={rtl ? "rtl" : "ltr"}
        className="relative z-10 max-h-[min(90vh,640px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/[0.14] bg-[rgb(var(--surface-elevated))]/[0.97] p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-8"
        style={
          rtl
            ? { fontFamily: "var(--font-ar), var(--font-noto), sans-serif" }
            : undefined
        }
      >
        <h2
          id="welcome-modal-title"
          className="font-display text-2xl font-semibold tracking-tight text-[rgb(var(--ink))] sm:text-3xl"
        >
          {w.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--ink-soft))] sm:text-base">
          {w.lead}
        </p>
        <p className="mt-5 text-xs font-medium uppercase tracking-wide text-[rgb(var(--ink-soft))]">
          {w.bulletsEyebrow}
        </p>
        <ul className="mt-3 space-y-3 text-sm text-[rgb(var(--ink))] sm:text-[15px]">
          {w.bullets.map((b, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="mt-2 shrink-0 size-1.5 rounded-full bg-[rgb(var(--accent))] shadow-[0_0_10px_rgb(var(--accent)/0.5)]"
                aria-hidden
              />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={dismiss}
          className="mt-8 w-full rounded-xl bg-[rgb(var(--accent))] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 active:scale-[0.99] sm:text-base"
        >
          {w.cta}
        </button>
      </div>
    </div>
  );
}
