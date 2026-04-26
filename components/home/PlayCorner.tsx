"use client";

import { useCallback, useState } from "react";
import type { DelightCopy } from "@/lib/i18n/delight-extras";

type Coin = "idle" | "spinning" | "yes" | "no";

type Props = { copy: DelightCopy };

export default function PlayCorner({ copy }: Props) {
  const [coin, setCoin] = useState<Coin>("idle");
  const [factIdx, setFactIdx] = useState(0);

  const flipCoin = useCallback(() => {
    setCoin("spinning");
    window.setTimeout(() => {
      setCoin(Math.random() < 0.5 ? "yes" : "no");
    }, 650);
  }, []);

  const nextFact = useCallback(() => {
    setFactIdx((i) => (i + 1) % copy.playFacts.length);
  }, [copy.playFacts.length]);

  const randomFact = useCallback(() => {
    const n = copy.playFacts.length;
    if (n <= 1) return;
    setFactIdx((i) => {
      let j = Math.floor(Math.random() * n);
      if (j === i) j = (j + 1) % n;
      return j;
    });
  }, [copy.playFacts.length]);

  return (
    <details className="group mt-4 rounded-2xl border border-white/[0.08] bg-black/25 px-4 py-3 ring-1 ring-inset ring-white/[0.04] open:border-violet-400/20 open:bg-violet-950/20">
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300/80">
            {copy.playCoinLabel}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={flipCoin}
              disabled={coin === "spinning"}
              className="rounded-xl border border-violet-400/35 bg-violet-500/15 px-4 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/25 disabled:cursor-wait disabled:opacity-70"
            >
              {copy.playCoinFlip}
            </button>
            <span
              className="text-2xl tabular-nums motion-safe:transition-transform"
              aria-live="polite"
              aria-atomic="true"
            >
              {coin === "spinning" ? (
                <span className="inline-block motion-safe:animate-pulse">🪙</span>
              ) : coin === "yes" ? (
                <span className="font-display text-emerald-300">{copy.playCoinYes}</span>
              ) : coin === "no" ? (
                <span className="font-display text-rose-300">{copy.playCoinNo}</span>
              ) : (
                <span className="text-zinc-600">🪙</span>
              )}
            </span>
          </div>
          {coin === "spinning" ? (
            <p className="mt-1 text-[10px] text-zinc-500">{copy.playCoinSpinning}</p>
          ) : null}
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300/80">
            {copy.playFactLabel}
          </p>
          <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-zinc-200/95 [text-wrap:pretty]">
            {copy.playFacts[factIdx]}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={nextFact}
              className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/[0.1]"
            >
              {copy.playFactNext}
            </button>
            <button
              type="button"
              onClick={randomFact}
              className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-100/95 transition hover:bg-cyan-500/18"
            >
              {copy.playFactRandom}
            </button>
          </div>
        </div>
      </div>
    </details>
  );
}
