"use client";

import { useEffect, useState } from "react";
import SocialShareModal from "@/components/sharing/SocialShareModal";
import type { PricingCopy } from "@/lib/i18n/pricing-page";
import {
  buildReferralShareUrl,
  ensureReferralCode,
  getStoredReferralCode,
} from "@/lib/referral-storage";

type Props = {
  open: boolean;
  t: PricingCopy;
  onClose: () => void;
  onSelectFree: () => void;
  onSelectPremium: () => void;
  /** Opens share-to-unlock for Premium (20 hits) without going to Stripe. */
  onSelectPremiumShare: () => void;
};

export default function AnalyzePackageModal({
  open,
  t,
  onClose,
  onSelectFree,
  onSelectPremium,
  onSelectPremiumShare,
}: Props) {
  const [shareOpen, setShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | undefined>();

  useEffect(() => {
    if (!open) {
      setShareOpen(false);
      return;
    }
    void ensureReferralCode().then((s) => {
      const code = s?.code ?? getStoredReferralCode();
      if (code) setShareUrl(buildReferralShareUrl(code));
    });
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-end justify-center p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close package modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />
      <div className="relative z-[96] max-h-[min(100dvh-0.75rem,920px)] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-[rgb(var(--surface))]/95 p-3 shadow-2xl shadow-black/45 sm:max-h-[min(92vh,900px)] sm:rounded-3xl sm:p-5 md:p-6">
        <div className="mb-3 sm:mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--accent-2))] sm:text-xs sm:tracking-[0.16em]">
            {t.navPricing}
          </p>
          <h3 className="mt-1 text-base font-bold leading-snug text-[rgb(var(--ink))] sm:mt-2 sm:text-xl">
            {t.packageModalTitle}
          </h3>
          <p className="mt-1 text-xs leading-snug text-[rgb(var(--ink-soft))] sm:mt-2 sm:text-sm sm:leading-relaxed">
            {t.packageModalLead}
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          <section className="rounded-2xl border border-white/12 bg-white/[0.04] p-3.5 sm:rounded-3xl sm:p-5">
            <h4 className="text-base font-semibold text-[rgb(var(--ink))] sm:text-lg">
              {t.freeTitle}
            </h4>
            <p className="mt-0.5 text-2xl font-bold text-[rgb(var(--ink))] sm:mt-1 sm:text-3xl">
              {t.freePrice}
              <span className="text-sm font-normal text-[rgb(var(--ink-soft))] sm:text-base">
                {" "}
                / {t.freeDesc}
              </span>
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-[rgb(var(--ink-soft))] sm:mt-5 sm:space-y-2.5 sm:text-sm">
              {t.freeBullets.map((b) => (
                <li key={b} className="flex gap-1.5 sm:gap-2">
                  <span className="shrink-0 text-emerald-400">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onSelectFree}
              className="mt-4 w-full rounded-xl border border-white/18 bg-white/[0.05] py-2.5 text-xs font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.1] sm:mt-6 sm:rounded-2xl sm:py-3 sm:text-sm"
            >
              {t.ctaFree}
            </button>
          </section>

          <section className="rounded-2xl border border-[rgb(var(--accent))]/40 bg-gradient-to-br from-[rgb(var(--accent))]/12 to-[rgb(var(--accent-2))]/10 p-3.5 shadow-[0_20px_70px_-40px_rgb(var(--accent)/0.6)] sm:rounded-3xl sm:p-5">
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <h4 className="text-base font-semibold text-[rgb(var(--ink))] sm:text-lg">
                {t.premiumTitle}
              </h4>
              <span className="shrink-0 rounded-full border border-amber-400/35 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-200 sm:px-2 sm:py-1 sm:text-[10px]">
                Recommended
              </span>
            </div>
            <p className="mt-0.5 text-2xl font-bold text-gradient sm:mt-1 sm:text-3xl">
              {t.premiumPrice}
              <span className="text-sm font-normal text-[rgb(var(--ink-soft))] sm:text-base">
                {" "}
                / {t.premiumDesc}
              </span>
            </p>
            <p className="mt-2 rounded-xl border border-[rgb(var(--accent-2))]/30 bg-black/15 px-2.5 py-1.5 text-xs font-medium leading-snug text-[rgb(var(--ink))] sm:mt-3 sm:rounded-2xl sm:px-3 sm:py-2 sm:text-sm sm:leading-relaxed">
              {t.premiumReferralDetail}
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-[rgb(var(--ink-soft))] sm:mt-5 sm:space-y-2.5 sm:text-sm">
              {t.premiumBullets.map((b) => (
                <li key={b} className="flex gap-1.5 sm:gap-2">
                  <span className="shrink-0 text-[rgb(var(--accent-2))]">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-1.5 sm:mt-6 sm:gap-2">
              <button
                type="button"
                onClick={onSelectPremium}
                className="w-full rounded-xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-magenta))] to-[rgb(var(--accent-2))] px-1 py-2.5 text-[11px] font-bold leading-tight text-white shadow-[0_14px_40px_-18px_rgb(var(--accent)/0.9)] transition hover:brightness-110 sm:rounded-2xl sm:px-3 sm:py-3 sm:text-sm"
              >
                {t.ctaUpgrade}
              </button>
              <button
                type="button"
                onClick={onSelectPremiumShare}
                className="inline-flex w-full items-center justify-center gap-1 rounded-xl border border-pink-300/40 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-1 py-2.5 text-[11px] font-bold leading-tight text-white shadow-[0_16px_44px_-20px_rgba(236,72,153,0.85)] transition hover:brightness-110 sm:gap-2 sm:rounded-2xl sm:px-3 sm:py-3 sm:text-sm"
              >
                <span aria-hidden className="text-sm sm:text-base">
                  ↗
                </span>
                {t.ctaShare}
              </button>
            </div>
          </section>
        </div>
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
