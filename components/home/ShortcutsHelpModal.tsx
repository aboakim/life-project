"use client";

import type { DelightCopy } from "@/lib/i18n/delight-extras";

type Props = {
  open: boolean;
  onClose: () => void;
  copy: DelightCopy;
};

export default function ShortcutsHelpModal({ open, onClose, copy }: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[220] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label={copy.shortcutsClose}
        onClick={onClose}
      />
      <div className="relative max-h-[min(85vh,32rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-white/15 bg-[rgb(var(--surface))] p-6 shadow-2xl shadow-black/40">
        <h2
          id="shortcuts-title"
          className="font-display text-lg font-bold text-[rgb(var(--ink))]"
        >
          {copy.shortcutsTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
          {copy.shortcutsIntro}
        </p>
        <ul className="mt-4 space-y-3 text-sm">
          {copy.shortcutRows.map((row) => (
            <li
              key={row.d}
              className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5"
            >
              <span className="shrink-0 rounded-lg bg-[rgb(var(--accent))]/20 px-2 py-0.5 font-mono text-xs font-bold text-[rgb(var(--accent-2))]">
                {row.k}
              </span>
              <span className="text-[rgb(var(--ink))] [text-wrap:pretty]">{row.d}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] py-3 text-sm font-semibold text-white"
        >
          {copy.shortcutsClose}
        </button>
      </div>
    </div>
  );
}
