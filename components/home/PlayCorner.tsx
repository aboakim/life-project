"use client";

import { useCallback, useState } from "react";
import type { DelightCopy } from "@/lib/i18n/delight-extras";

type Props = { copy: DelightCopy };

function useCycler(length: number) {
  const [idx, setIdx] = useState(0);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % length);
  }, [length]);

  const shuffle = useCallback(() => {
    if (length <= 1) return;
    setIdx((i) => {
      let j = Math.floor(Math.random() * length);
      if (j === i) j = (j + 1) % length;
      return j;
    });
  }, [length]);

  return { idx, next, shuffle };
}

export default function PlayCorner({ copy }: Props) {
  const frames = useCycler(copy.cornerFrames.length);
  const facts = useCycler(copy.playFacts.length);
  const words = useCycler(copy.cornerWords.length);

  return (
    <details className="group mt-4 rounded-2xl border border-white/[0.08] bg-black/25 px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-inset ring-white/[0.04] transition-[border-color,box-shadow,background-color] duration-300 open:border-violet-400/25 open:bg-violet-950/25 open:shadow-[0_20px_48px_-28px_rgb(var(--accent)/0.22),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-xs font-semibold tracking-wide text-zinc-300/95 [&::-webkit-details-marker]:hidden">
        <span className="[text-wrap:pretty]">{copy.playCornerSummary}</span>
        <span
          className="shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        >
          ▾
        </span>
      </summary>
      <p className="mt-2 text-[10px] leading-relaxed text-zinc-500 [text-wrap:pretty]">
        {copy.playCornerDisclaimer}
      </p>
      <div className="mt-4 grid gap-5 border-t border-white/[0.06] pt-4 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-200/85">
            {copy.cornerFrameLabel}
          </p>
          <p className="mt-2 min-h-[3.25rem] text-sm leading-relaxed text-zinc-200/95 [text-wrap:pretty]">
            {copy.cornerFrames[frames.idx]}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={frames.next}
              className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/[0.1]"
            >
              {copy.cornerFrameNext}
            </button>
            <button
              type="button"
              onClick={frames.shuffle}
              className="rounded-lg border border-amber-400/25 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-100/95 transition hover:bg-amber-500/18"
            >
              {copy.cornerFrameSurprise}
            </button>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300/80">
            {copy.playFactLabel}
          </p>
          <p className="mt-2 min-h-[3.25rem] text-sm leading-relaxed text-zinc-200/95 [text-wrap:pretty]">
            {copy.playFacts[facts.idx]}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={facts.next}
              className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/[0.1]"
            >
              {copy.playFactNext}
            </button>
            <button
              type="button"
              onClick={facts.shuffle}
              className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-100/95 transition hover:bg-cyan-500/18"
            >
              {copy.playFactRandom}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 border-t border-white/[0.06] pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300/80">
          {copy.cornerWordLabel}
        </p>
        <p className="mt-2 min-h-[2.75rem] text-sm leading-relaxed text-zinc-200/95 [text-wrap:pretty]">
          {copy.cornerWords[words.idx]}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={words.next}
            className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/[0.1]"
          >
            {copy.cornerWordNext}
          </button>
          <button
            type="button"
            onClick={words.shuffle}
            className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-100/95 transition hover:bg-emerald-500/18"
          >
            {copy.cornerWordSurprise}
          </button>
        </div>
      </div>
    </details>
  );
}
