"use client";

import { useState } from "react";
import type { DecisionBriefCopy } from "@/lib/i18n/decision-brief";

type Props = {
  t: DecisionBriefCopy;
  onApply: (payload: {
    decision: string;
    context: string;
    constraints: string;
  }) => void;
};

export default function DecisionBriefWizard({ t, onApply }: Props) {
  const [open, setOpen] = useState(true);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");

  function apply() {
    const decision = a.trim();
    if (!decision) return;
    onApply({
      decision,
      context: b.trim(),
      constraints: c.trim(),
    });
  }

  function useSpark(text: string) {
    setA(text);
    setOpen(true);
  }

  const input =
    "mt-1.5 w-full rounded-xl border border-white/12 bg-black/30 px-3 py-2 text-sm text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/55 outline-none focus:border-[rgb(var(--accent))]/45";

  return (
    <div className="mb-6 rounded-2xl border border-[rgb(var(--accent))]/25 bg-gradient-to-br from-[rgb(var(--accent))]/[0.08] via-transparent to-[rgb(var(--accent-magenta))]/[0.06] p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-dim))]">
            ✦ {t.cardTitle}
          </p>
          <p className="mt-1 text-sm text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
            {t.cardSubtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="shrink-0 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-[rgb(var(--ink))] transition hover:bg-white/10"
        >
          {open ? t.collapse : t.expand}
        </button>
      </div>

      {open ? (
        <div className="mt-4 space-y-3">
          <label className="block text-sm font-medium text-[rgb(var(--ink))]">
            {t.l1}
            <input
              className={input}
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder={t.ph1}
              maxLength={500}
              autoComplete="off"
            />
          </label>
          <label className="block text-sm font-medium text-[rgb(var(--ink))]">
            {t.l2}
            <textarea
              className={`${input} min-h-[68px] resize-y`}
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder={t.ph2}
              maxLength={2000}
              rows={2}
            />
          </label>
          <label className="block text-sm font-medium text-[rgb(var(--ink))]">
            {t.l3}
            <textarea
              className={`${input} min-h-[68px] resize-y`}
              value={c}
              onChange={(e) => setC(e.target.value)}
              placeholder={t.ph3}
              maxLength={2000}
              rows={2}
            />
          </label>
          <button
            type="button"
            onClick={apply}
            disabled={!a.trim()}
            className="w-full rounded-xl border border-white/15 bg-white/[0.08] py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition enabled:hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-6"
          >
            {t.apply}
          </button>
        </div>
      ) : null}

      <div className="mt-4 border-t border-white/[0.08] pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--ink-soft))]/90">
          {t.sparkTitle}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {t.sparks.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => useSpark(s)}
              className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-left text-xs leading-snug text-[rgb(var(--ink-soft))] transition hover:border-[rgb(var(--accent))]/35 hover:text-[rgb(var(--ink))]"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
