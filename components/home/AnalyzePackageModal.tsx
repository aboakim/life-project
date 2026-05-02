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
      <div className="relative z-[96] w-full max-w-5xl rounded-3xl border border-white/15 bg-[rgb(var(--surface))]/95 p-5 shadow-2xl shadow-black/45 sm:p-6">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--accent-2))]">
            {t.navPricing}
          </p>
          <h3 className="mt-2 text-xl font-bold text-[rgb(var(--ink))]">
            Choose your package before analysis
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
            Compare both plans fully. Premium includes sharing/referral perks.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-3xl border border-white/12 bg-white/[0.04] p-5">
            <h4 className="text-lg font-semibold text-[rgb(var(--ink))]">
              {t.freeTitle}
            </h4>
            <p className="mt-1 text-3xl font-bold text-[rgb(var(--ink))]">
              {t.freePrice}
              <span className="text-base font-normal text-[rgb(var(--ink-soft))]">
                {" "}
                / {t.freeDesc}
              </span>
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-[rgb(var(--ink-soft))]">
              {t.freeBullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onSelectFree}
              className="mt-6 w-full rounded-2xl border border-white/18 bg-white/[0.05] py-3 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.1]"
            >
              {t.ctaFree}
            </button>
          </section>

          <section className="rounded-3xl border border-[rgb(var(--accent))]/40 bg-gradient-to-br from-[rgb(var(--accent))]/12 to-[rgb(var(--accent-2))]/10 p-5 shadow-[0_20px_70px_-40px_rgb(var(--accent)/0.6)]">
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-lg font-semibold text-[rgb(var(--ink))]">
                {t.premiumTitle}
              </h4>
              <span className="rounded-full border border-amber-400/35 bg-amber-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
                Recommended
              </span>
            </div>
            <p className="mt-1 text-3xl font-bold text-gradient">
              {t.premiumPrice}
              <span className="text-base font-normal text-[rgb(var(--ink-soft))]">
                {" "}
                / {t.premiumDesc}
              </span>
            </p>
            <p className="mt-3 rounded-2xl border border-[rgb(var(--accent-2))]/30 bg-black/15 px-3 py-2 text-sm font-medium leading-relaxed text-[rgb(var(--ink))]">
              {t.premiumReferralDetail}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-[rgb(var(--ink-soft))]">
              {t.premiumBullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-[rgb(var(--accent-2))]">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onSelectPremium}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] py-3 text-sm font-bold text-white transition hover:brightness-110"
            >
              {t.ctaUpgrade} ({t.ctaShare})
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
