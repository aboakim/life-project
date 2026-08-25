"use client";

import { LOCALE_OPTIONS, type AppLocale } from "@/lib/i18n/locale";
import LocaleFlag from "@/components/LocaleFlag";
import { getUi } from "@/lib/i18n/ui";
import { applyClientLocaleChange } from "@/lib/locale-sync";

type Props = {
  locale: AppLocale;
  onChange: (locale: AppLocale) => void;
  className?: string;
};

export default function PageLocalePicker({
  locale,
  onChange,
  className = "",
}: Props) {
  const t = getUi(locale);

  return (
    <nav
      className={`rounded-2xl border border-white/[0.1] bg-gradient-to-br from-black/40 to-black/25 p-4 shadow-lg sm:p-5 ${className}`}
      aria-label={t.langLabel}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[rgb(var(--ink-soft))]">
        {t.langLabel}{" "}
        <span className="text-[rgb(var(--ink))]/90">
          ({LOCALE_OPTIONS.length})
        </span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {LOCALE_OPTIONS.map((opt) => {
          const active = locale === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                applyClientLocaleChange(opt.value);
                onChange(opt.value);
              }}
              className={
                active
                  ? "rounded-xl border border-[rgb(var(--accent))]/50 bg-gradient-to-r from-[rgb(var(--accent))]/25 to-[rgb(var(--accent-2))]/18 px-3 py-2 text-sm font-semibold text-white shadow-[0_0_24px_-8px_rgb(var(--accent))]"
                  : "rounded-xl border border-white/12 bg-black/35 px-3 py-2 text-sm text-[rgb(var(--ink-soft))] transition hover:border-amber-400/25 hover:bg-white/[0.05] hover:text-[rgb(var(--ink))]"
              }
            >
              <LocaleFlag
                flagCode={opt.flagCode}
                className="me-1.5 h-3.5 w-5 opacity-90"
              />
              {opt.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
