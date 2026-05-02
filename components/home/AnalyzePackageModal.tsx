"use client";

import type { PricingCopy } from "@/lib/i18n/pricing-page";

type Props = {
  open: boolean;
  t: PricingCopy;
  onClose: () => void;
  onSelectFree: () => void;
  onSelectPremium: () => void;
};

export default function AnalyzePackageModal({
  open,
  t,
  onClose,
  onSelectFree,
  onSelectPremium,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close package modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />
      <div className="relative z-[96] w-full max-w-md rounded-3xl border border-white/15 bg-[rgb(var(--surface))]/95 p-5 shadow-2xl shadow-black/45 sm:p-6">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--accent-2))]">
            {t.navPricing}
          </p>
          <h3 className="mt-2 text-xl font-bold text-[rgb(var(--ink))]">
            Choose your package
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
            Select a package before opening the analysis workspace.
          </p>
        </div>
        <div className="space-y-3">
          <button
            type="button"
            onClick={onSelectFree}
            className="w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-left transition hover:bg-white/[0.1]"
          >
            <p className="text-base font-semibold text-[rgb(var(--ink))]">
              {t.freeTitle} - {t.freePrice}
            </p>
            <p className="mt-1 text-xs text-[rgb(var(--ink-soft))]">
              {t.freeDesc}
            </p>
          </button>
          <button
            type="button"
            onClick={onSelectPremium}
            className="w-full rounded-2xl border border-[rgb(var(--accent))]/40 bg-gradient-to-r from-[rgb(var(--accent))]/15 to-[rgb(var(--accent-2))]/15 px-4 py-3 text-left transition hover:brightness-110"
          >
            <p className="text-base font-semibold text-[rgb(var(--ink))]">
              {t.premiumTitle} - {t.premiumPrice}
            </p>
            <p className="mt-1 text-xs text-[rgb(var(--ink-soft))]">
              {t.premiumDesc}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
