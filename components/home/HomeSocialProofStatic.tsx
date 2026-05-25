import type { AppLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";

/** First rotator line only — server HTML, no interval timer on the critical path. */
export default function HomeSocialProofStatic({ locale }: { locale: AppLocale }) {
  const line = getUi(locale).socialProofRotator[0];
  if (!line) return null;

  return (
    <div
      className="relative z-[20] mx-auto max-w-2xl px-4 pt-2 sm:px-6"
      aria-live="polite"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.1] via-white/[0.04] to-transparent px-4 py-3 shadow-[0_18px_50px_-28px_rgb(var(--accent)/0.45)] backdrop-blur-md">
        <div
          className="home-accent-hairline-breathe pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent))]/80 to-transparent"
          aria-hidden
        />
        <p className="relative text-center text-[12px] font-medium leading-snug tracking-wide text-[rgb(var(--ink))]/95 [text-wrap:pretty] sm:text-[13px]">
          <span
            className="me-1.5 inline-block text-[rgb(var(--accent-2))]/90"
            aria-hidden
          >
            ◇
          </span>
          {line}
        </p>
      </div>
    </div>
  );
}
