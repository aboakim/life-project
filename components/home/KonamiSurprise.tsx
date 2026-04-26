"use client";

import { useEffect, useRef, useState } from "react";
import type { DelightCopy } from "@/lib/i18n/delight-extras";

const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

type Props = { copy: DelightCopy };

function typingTarget(t: EventTarget | null): boolean {
  if (!t || !(t instanceof HTMLElement)) return false;
  return Boolean(
    t.closest("textarea, input, select, [contenteditable=true]"),
  );
}

export default function KonamiSurprise({ copy }: Props) {
  const [open, setOpen] = useState(false);
  const bufRef = useRef<number[]>([]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (typingTarget(e.target)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const next = [...bufRef.current, e.keyCode].slice(-12);
      bufRef.current = next;
      if (next.length < KONAMI.length) return;
      const tail = next.slice(-KONAMI.length);
      if (tail.every((c, i) => c === KONAMI[i])) {
        bufRef.current = [];
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[230] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="konami-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-gradient-to-br from-violet-950/90 via-fuchsia-950/75 to-cyan-950/80 backdrop-blur-sm"
        aria-label={copy.konamiDismiss}
        onClick={() => setOpen(false)}
      />
      <div className="relative max-w-lg rounded-[1.75rem] border border-white/20 bg-black/50 p-8 text-center shadow-[0_0_80px_-20px_rgba(168,85,247,0.55)]">
        <p
          className="text-xs font-bold uppercase tracking-[0.28em] text-fuchsia-200/90"
          aria-hidden
        >
          ↑↑↓↓←→←→BA
        </p>
        <h2
          id="konami-title"
          className="font-display mt-3 text-2xl font-extrabold text-white [text-wrap:balance]"
        >
          {copy.konamiTitle}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/88 [text-wrap:pretty]">
          {copy.konamiBody}
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-8 rounded-2xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/18"
        >
          {copy.konamiDismiss}
        </button>
      </div>
    </div>
  );
}
