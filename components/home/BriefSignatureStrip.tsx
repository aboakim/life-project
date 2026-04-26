"use client";

import { useMemo } from "react";
import {
  briefMoodIndex,
  briefSignaturePalette,
} from "@/lib/novelty/brief-signature";

type Props = {
  source: string;
  eyebrow: string;
  moodPrefix: string;
  moodNames: readonly string[];
  minLength?: number;
};

export default function BriefSignatureStrip({
  source,
  eyebrow,
  moodPrefix,
  moodNames,
  minLength = 24,
}: Props) {
  const trimmed = source.trim();
  const show = trimmed.length >= minLength;

  const { colors, mood } = useMemo(() => {
    const palette = briefSignaturePalette(trimmed);
    const idx = briefMoodIndex(trimmed, moodNames.length);
    return { colors: palette, mood: moodNames[idx] ?? moodNames[0]! };
  }, [trimmed, moodNames]);

  if (!show) return null;

  return (
    <div
      className="mt-4 rounded-2xl border border-white/[0.1] bg-gradient-to-r from-white/[0.06] via-black/20 to-white/[0.04] px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
      role="region"
      aria-label={eyebrow}
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[rgb(var(--accent-dim))]/90">
        {eyebrow}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <div className="flex gap-1" title={mood}>
          {colors.map((c, i) => (
            <span
              key={i}
              className="size-8 rounded-lg shadow-inner ring-1 ring-white/10 sm:size-9"
              style={{ background: c }}
            />
          ))}
        </div>
        <p className="min-w-0 flex-1 text-sm leading-snug text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
          <span className="font-semibold text-[rgb(var(--ink))]">
            {moodPrefix}:{" "}
          </span>
          <span className="text-[rgb(var(--accent-2))]">{mood}</span>
        </p>
      </div>
    </div>
  );
}
