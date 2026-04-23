"use client";

import { useEffect } from "react";
import EmailReminderSignup from "@/components/home/EmailReminderSignup";
import type { PostAnalysisCopy } from "@/lib/i18n/post-analysis";
import type { AppLocale } from "@/lib/i18n/locale";

type Props = {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
  pa: PostAnalysisCopy;
  locale: AppLocale;
};

export default function PreAnalysisEmailModal({
  open,
  onClose,
  onComplete,
  pa,
  locale,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pre-analysis-email-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label={pa.emailRemindPreAnalysisCancel}
      />
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/[0.12] bg-[rgb(var(--surface))] p-5 shadow-2xl shadow-black/40 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <h2
            id="pre-analysis-email-title"
            className="text-lg font-semibold leading-snug text-[rgb(var(--ink))] [text-wrap:pretty]"
          >
            {pa.emailRemindPreAnalysisTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-white/10 px-2.5 py-1 text-xs font-medium text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.06]"
          >
            {pa.emailRemindPreAnalysisCancel}
          </button>
        </div>
        <div className="mt-5 max-h-[min(70vh,32rem)] overflow-y-auto pr-1">
          <EmailReminderSignup
            variant="preAnalysis"
            pa={pa}
            locale={locale}
            onPreAnalysisComplete={onComplete}
          />
        </div>
      </div>
    </div>
  );
}
