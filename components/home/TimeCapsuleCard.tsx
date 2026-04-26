"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "lde-time-capsules-v1";
const MAX_CAPSULES = 3;

export type TimeCapsuleCopy = {
  eyebrow: string;
  title: string;
  explain: string;
  placeholder: string;
  daysLabel: string;
  seal7: string;
  seal14: string;
  seal30: string;
  save: string;
  full: string;
  locked: string;
  reveal: string;
  delete: string;
  listAria: string;
};

type Capsule = {
  id: string;
  message: string;
  openAt: number;
  createdAt: number;
};

function loadCapsules(): Capsule[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const p = JSON.parse(raw) as unknown;
    if (!Array.isArray(p)) return [];
    return p
      .filter(
        (x): x is Capsule =>
          typeof x === "object" &&
          x !== null &&
          typeof (x as Capsule).id === "string" &&
          typeof (x as Capsule).message === "string" &&
          typeof (x as Capsule).openAt === "number",
      )
      .slice(0, MAX_CAPSULES);
  } catch {
    return [];
  }
}

function saveCapsules(list: Capsule[]) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(list.slice(0, MAX_CAPSULES)),
  );
}

type Props = { copy: TimeCapsuleCopy };

export default function TimeCapsuleCard({ copy }: Props) {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [mounted, setMounted] = useState(false);
  const [draft, setDraft] = useState("");
  const [days, setDays] = useState<7 | 14 | 30>(7);

  useEffect(() => {
    setMounted(true);
    setCapsules(loadCapsules());
  }, []);

  const sorted = useMemo(() => {
    return [...capsules].sort((a, b) => a.openAt - b.openAt);
  }, [capsules]);

  const atMax = capsules.length >= MAX_CAPSULES;

  const add = useCallback(() => {
    const msg = draft.trim();
    if (!msg) return;
    const cur = loadCapsules();
    if (cur.length >= MAX_CAPSULES) return;
    const openAt = Date.now() + days * 86400000;
    const next: Capsule = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      message: msg.slice(0, 400),
      openAt,
      createdAt: Date.now(),
    };
    const list = [...cur, next].slice(0, MAX_CAPSULES);
    saveCapsules(list);
    setCapsules(list);
    setDraft("");
  }, [draft, days]);

  const remove = useCallback((id: string) => {
    const list = loadCapsules().filter((c) => c.id !== id);
    saveCapsules(list);
    setCapsules(list);
  }, []);

  if (!mounted) {
    return (
      <div className="mt-4 h-40 rounded-2xl border border-white/[0.08] bg-black/20" />
    );
  }

  return (
    <section
      className="mt-4 rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-500/[0.09] via-black/25 to-violet-950/20 px-4 py-4 shadow-[0_20px_50px_-36px_rgb(251_191_36/0.15)] sm:px-5"
      aria-labelledby="time-capsule-heading"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-amber-200/85">
        {copy.eyebrow}
      </p>
      <h3
        id="time-capsule-heading"
        className="font-display mt-1 text-base font-bold text-[rgb(var(--ink))]"
      >
        {copy.title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-[rgb(var(--ink-soft))]/90 [text-wrap:pretty]">
        {copy.explain}
      </p>

      <div className="mt-4 space-y-2">
        <label className="sr-only" htmlFor="capsule-draft">
          {copy.placeholder}
        </label>
        <textarea
          id="capsule-draft"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={copy.placeholder}
          rows={2}
          maxLength={400}
          disabled={atMax}
          className="w-full resize-y rounded-xl border border-white/12 bg-black/30 px-3 py-2 text-sm text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/55 outline-none transition focus:border-amber-400/40 disabled:opacity-50"
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--ink-soft))]">
              {copy.daysLabel}
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {(
                [
                  [7, copy.seal7],
                  [14, copy.seal14],
                  [30, copy.seal30],
                ] as const
              ).map(([d, label]) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDays(d)}
                  className={
                    days === d
                      ? "rounded-full border border-amber-400/50 bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-50"
                      : "rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-xs text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.09]"
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={add}
            disabled={!draft.trim() || atMax}
            className="shrink-0 rounded-xl border border-amber-400/45 bg-amber-500/20 px-4 py-2 text-sm font-semibold text-[rgb(var(--ink))] transition enabled:hover:bg-amber-500/28 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {copy.save}
          </button>
        </div>
        {atMax ? (
          <p className="text-[11px] text-amber-200/90 [text-wrap:pretty]">
            {copy.full}
          </p>
        ) : null}
      </div>

      {sorted.length > 0 ? (
        <ul
          className="mt-5 space-y-3 border-t border-white/[0.08] pt-4"
          aria-label={copy.listAria}
        >
          {sorted.map((c) => {
            const unlocked = Date.now() >= c.openAt;
            return (
              <li
                key={c.id}
                className="rounded-xl border border-white/[0.08] bg-black/25 px-3 py-3"
              >
                {unlocked ? (
                  <>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300/90">
                      {copy.reveal}
                    </p>
                    <p
                      dir="auto"
                      className="mt-1 text-sm leading-relaxed text-[rgb(var(--ink))] [text-wrap:pretty]"
                    >
                      {c.message}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--ink-soft))]">
                      {copy.locked}
                    </p>
                    <p className="mt-1 font-mono text-xs text-amber-100/90">
                      {new Date(c.openAt).toLocaleString()}
                    </p>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => remove(c.id)}
                  className="mt-2 text-[11px] font-semibold text-rose-300/90 underline-offset-2 hover:underline"
                >
                  {copy.delete}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
