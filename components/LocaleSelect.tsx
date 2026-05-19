"use client";

import { useEffect, useRef, useState } from "react";
import LocaleFlag from "@/components/LocaleFlag";
import { LOCALE_OPTIONS } from "@/lib/i18n/locale";

type Props = {
  value: string;
  onChange: (value: string) => void;
  "aria-label": string;
  className?: string;
  triggerClassName?: string;
  listClassName?: string;
  /** First list item without a flag (e.g. community “all languages”). */
  allOption?: { value: string; label: string };
};

export default function LocaleSelect({
  value,
  onChange,
  "aria-label": ariaLabel,
  className = "",
  triggerClassName = "",
  listClassName = "",
  allOption,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedLocale = LOCALE_OPTIONS.find((o) => o.value === value);
  const selectedAll =
    allOption && value === allOption.value ? allOption : null;
  const selected = selectedAll
    ? null
    : (selectedLocale ?? LOCALE_OPTIONS[0]);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (rootRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-white/[0.12] bg-black/35 px-2.5 py-2 text-sm font-medium text-[rgb(var(--ink))] outline-none transition hover:border-white/20 focus:border-[rgb(var(--accent))]/45 ${triggerClassName}`}
      >
        {selected ? (
          <LocaleFlag flagCode={selected.flagCode} />
        ) : (
          <span
            className="flex h-3.5 w-5 shrink-0 items-center justify-center rounded-[2px] bg-white/10 text-[0.55rem] font-bold text-[rgb(var(--ink-soft))]"
            aria-hidden
          >
            …
          </span>
        )}
        <span className="min-w-0 flex-1 truncate text-start">
          {selectedAll?.label ?? selected?.label ?? value}
        </span>
        <span className="shrink-0 text-[0.65em] opacity-70" aria-hidden>
          ▾
        </span>
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className={`absolute end-0 top-full z-[250] mt-1 max-h-[min(70vh,20rem)] min-w-full overflow-y-auto rounded-xl border border-white/[0.14] bg-[rgb(var(--surface-elevated))] py-1 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.75)] backdrop-blur-xl ${listClassName}`}
        >
          {allOption ? (
            <li role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === allOption.value}
                onClick={() => {
                  onChange(allOption.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-start text-sm transition ${
                  value === allOption.value
                    ? "bg-[rgb(var(--accent))]/20 font-semibold text-[rgb(var(--ink))]"
                    : "text-[rgb(var(--ink-soft))] hover:bg-white/[0.08] hover:text-[rgb(var(--ink))]"
                }`}
              >
                <span
                  className="flex h-3.5 w-5 shrink-0 items-center justify-center rounded-[2px] bg-white/10 text-[0.55rem] font-bold text-[rgb(var(--ink-soft))]"
                  aria-hidden
                >
                  …
                </span>
                <span className="min-w-0">{allOption.label}</span>
              </button>
            </li>
          ) : null}
          {LOCALE_OPTIONS.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-start text-sm transition ${
                    active
                      ? "bg-[rgb(var(--accent))]/20 font-semibold text-[rgb(var(--ink))]"
                      : "text-[rgb(var(--ink-soft))] hover:bg-white/[0.08] hover:text-[rgb(var(--ink))]"
                  }`}
                >
                  <LocaleFlag flagCode={opt.flagCode} />
                  <span className="min-w-0">{opt.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
