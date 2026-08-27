"use client";

import { useCallback, useEffect, useState } from "react";
import SocialShareModal from "@/components/sharing/SocialShareModal";
import type { PricingCopy } from "@/lib/i18n/pricing-page";
import type { ReferralStatusPayload } from "@/lib/referral-shared";
import {
  buildReferralShareUrl,
  ensureReferralCode,
  fetchReferralStatus,
} from "@/lib/referral-storage";

type Goal = "free" | "premium";

type Props = {
  open: boolean;
  goal: Goal;
  t: PricingCopy;
  onClose: () => void;
  /** Called when the goal unlock is reached. */
  onUnlocked: () => void;
};

export default function ShareToUnlockModal({
  open,
  goal,
  t,
  onClose,
  onUnlocked,
}: Props) {
  const [status, setStatus] = useState<ReferralStatusPayload | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const needed = goal === "free" ? t.shareUnlockFreeNeeded : t.shareUnlockPremiumNeeded;
  const target = goal === "free" ? (status?.freeNeeded ?? 5) : (status?.premiumNeeded ?? 20);
  const unlocked =
    goal === "free"
      ? Boolean(status?.freeUnlocked)
      : Boolean(status?.premiumUnlocked);
  const count = status?.count ?? 0;
  const shareUrl = status
    ? buildReferralShareUrl(status.code)
    : undefined;

  const refresh = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const s = status?.code
        ? await fetchReferralStatus(status.code)
        : await ensureReferralCode();
      if (!s) {
        setError(t.shareUnlockError);
        return;
      }
      setStatus(s);
      const done =
        goal === "free" ? s.freeUnlocked : s.premiumUnlocked;
      if (done) onUnlocked();
    } finally {
      setBusy(false);
    }
  }, [goal, onUnlocked, status?.code, t.shareUnlockError]);

  useEffect(() => {
    if (!open) {
      setShareOpen(false);
      return;
    }
    void refresh();
    const id = window.setInterval(() => {
      void fetchReferralStatus(status?.code ?? null).then((s) => {
        if (!s) return;
        setStatus(s);
        if (goal === "free" ? s.freeUnlocked : s.premiumUnlocked) {
          onUnlocked();
        }
      });
    }, 8000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- poll while open
  }, [open, goal]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[97] flex items-end justify-center p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close share unlock"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />
      <div className="relative z-[98] w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[rgb(var(--surface))]/95 p-5 shadow-2xl shadow-black/45 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgb(var(--accent-2))]">
          {goal === "free" ? t.freeTitle : t.premiumTitle}
        </p>
        <h3 className="mt-2 text-lg font-bold text-[rgb(var(--ink))] [text-wrap:balance]">
          {goal === "free" ? t.shareUnlockFreeTitle : t.shareUnlockPremiumTitle}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
          {goal === "free" ? t.shareUnlockFreeLead : t.shareUnlockPremiumLead}
        </p>

        <div className="mt-5 rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3">
          <p className="text-xs font-medium text-[rgb(var(--ink-soft))]">
            {t.shareUnlockProgress
              .replace("{count}", String(count))
              .replace("{needed}", String(target))}
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] transition-[width]"
              style={{
                width: `${Math.min(100, Math.round((count / Math.max(1, target)) * 100))}%`,
              }}
            />
          </div>
          <p className="mt-2 text-[11px] text-[rgb(var(--ink-soft))]/85">
            {needed}
          </p>
        </div>

        {error ? (
          <p className="mt-3 text-xs text-rose-300" role="alert">
            {error}
          </p>
        ) : null}

        {unlocked ? (
          <p className="mt-4 text-sm font-semibold text-emerald-300" role="status">
            {t.shareUnlockDone}
          </p>
        ) : null}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-magenta))] to-[rgb(var(--accent-2))] px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
          >
            {t.ctaShare}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void refresh()}
            className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/18 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.1] disabled:opacity-60"
          >
            {t.shareUnlockRefresh}
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full text-center text-xs text-[rgb(var(--ink-soft))] underline-offset-2 hover:underline"
        >
          {t.shareUnlockClose}
        </button>
      </div>

      <SocialShareModal
        t={t}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        elevated
        shareUrl={shareUrl}
      />
    </div>
  );
}
