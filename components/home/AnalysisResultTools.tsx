"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { DecisionAnalysis } from "@/lib/types";
import {
  appendJournalEntry,
  buildMarkdownSummary,
  buildShareLimitedText,
  clearHistory,
  clearReminder,
  getReminderDueIso,
  loadHistory,
  setReminderWeeks,
  type HistorySnapshot,
} from "@/lib/analysis-local";
import type { PostAnalysisCopy } from "@/lib/i18n/post-analysis";

type Props = {
  analysis: DecisionAnalysis;
  decision: string;
  context: string;
  constraints: string;
  mode: "live" | "demo" | "fallback";
  pa: PostAnalysisCopy;
  expertsSearchHref: string;
};

export default function AnalysisResultTools({
  analysis,
  decision,
  context,
  constraints,
  mode,
  pa,
  expertsSearchHref,
}: Props) {
  const [flash, setFlash] = useState<string | null>(null);
  const [history, setHistory] = useState<HistorySnapshot[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, [analysis, decision, context, constraints, mode]);

  const md = useMemo(
    () =>
      buildMarkdownSummary(decision, context, constraints, analysis, {
        decision: pa.mdDecision,
        context: pa.mdContext,
        constraints: pa.mdConstraints,
        summary: pa.mdSummary,
        dimensions: pa.mdDimensions,
        scenarios: pa.mdScenarios,
        timeline: pa.mdTimeline,
        score: pa.mdScore,
        twin: pa.mdTwin,
      }),
    [analysis, decision, context, constraints, pa],
  );

  const shareText = useMemo(
    () => buildShareLimitedText(decision, analysis.summary, pa.shareFooter),
    [decision, analysis.summary, pa.shareFooter],
  );

  const onCopy = useCallback(async (text: string, msg: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setFlash(msg);
      window.setTimeout(() => setFlash(null), 2000);
    } catch {
      setFlash("Copy failed");
    }
  }, []);

  const onJournal = useCallback(() => {
    appendJournalEntry(md.slice(0, 12000));
    setFlash(pa.savedToJournal);
    window.setTimeout(() => setFlash(null), 2500);
  }, [md, pa.savedToJournal]);

  const onPrint = useCallback(() => {
    window.print();
  }, []);

  const onClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  const onRemind = useCallback(() => {
    setReminderWeeks(2);
    setFlash(pa.remindActive);
    window.setTimeout(() => setFlash(null), 2500);
  }, [pa.remindActive]);

  const onClearRemind = useCallback(() => {
    clearReminder();
  }, []);

  const reminderIso = typeof window !== "undefined" ? getReminderDueIso() : null;

  return (
    <>
      <section className="glass animate-fade-up no-print rounded-3xl p-6 sm:p-7">
        <h2 className="text-lg font-semibold text-[rgb(var(--ink))]">{pa.actionsTitle}</h2>
        {flash ? (
          <p className="mt-2 text-sm text-emerald-200/95" role="status">
            {flash}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onCopy(md, pa.copied)}
            className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-[rgb(var(--ink))] transition hover:bg-white/[0.1]"
          >
            {pa.copyMarkdown}
          </button>
          <button
            type="button"
            onClick={onJournal}
            className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-[rgb(var(--ink))] transition hover:bg-white/[0.1]"
          >
            {pa.saveToJournal}
          </button>
          <button
            type="button"
            onClick={() => onCopy(shareText, pa.copied)}
            className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-[rgb(var(--ink))] transition hover:bg-white/[0.1]"
          >
            {pa.shareLimited}
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-[rgb(var(--ink))] transition hover:bg-white/[0.1]"
          >
            {pa.printSummary}
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <Link
            href={expertsSearchHref}
            className="font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            {pa.expertsCta} →
          </Link>
          <Link
            href="/playbooks"
            className="font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            {pa.playbooksCta} →
          </Link>
          <Link
            href="/community/guidelines"
            className="font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            {pa.guidelinesCta} →
          </Link>
          <Link href="/journal" className="font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline">
            Journal →
          </Link>
        </div>
        <div className="mt-6 border-t border-white/[0.08] pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgb(var(--accent-dim))]">
            {pa.remindLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onRemind}
              className="rounded-xl border border-[rgb(var(--accent-2))]/35 bg-[rgb(var(--accent-2))]/10 px-4 py-2 text-sm font-medium text-[rgb(var(--ink))]"
            >
              {pa.remindSet}
            </button>
            {reminderIso ? (
              <button
                type="button"
                onClick={onClearRemind}
                className="rounded-xl border border-white/12 px-4 py-2 text-sm text-[rgb(var(--ink-soft))]"
              >
                {pa.remindClear}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="glass animate-fade-up no-print rounded-3xl p-6 sm:p-7">
        <h2 className="text-lg font-semibold text-[rgb(var(--ink))]">{pa.followUpTitle}</h2>
        <ol className="mt-4 list-decimal space-y-2 ps-5 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
          {pa.followUpQuestions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      </section>

      <section className="glass animate-fade-up no-print rounded-3xl p-6 sm:p-7">
        <h2 className="text-lg font-semibold text-[rgb(var(--ink))]">{pa.assumptionsTitle}</h2>
        <ul className="mt-4 list-disc space-y-2 ps-5 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
          {pa.assumptionBullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="glass animate-fade-up no-print rounded-3xl p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-[rgb(var(--ink))]">{pa.historyTitle}</h2>
          {history.length > 0 ? (
            <button
              type="button"
              onClick={onClearHistory}
              className="text-xs font-medium text-rose-300/90 hover:underline"
            >
              {pa.clearHistory}
            </button>
          ) : null}
        </div>
        {history.length === 0 ? (
          <p className="mt-3 text-sm text-[rgb(var(--ink-soft))]">{pa.historyEmpty}</p>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {history.map((h) => (
              <li
                key={h.id}
                className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2 text-[rgb(var(--ink-soft))]"
              >
                <span className="text-xs text-[rgb(var(--ink-soft))]/70">
                  {new Date(h.at).toLocaleString()}
                </span>
                <p className="mt-1 font-medium text-[rgb(var(--ink))]">{h.decision.slice(0, 140)}{h.decision.length > 140 ? "…" : ""}</p>
                <p className="mt-1 text-xs">Score {h.analysis.score}%</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div id="analysis-print-area" className="hidden print:!block">
        <div className="p-8 text-black">
          <h1 className="text-xl font-bold">Life Decision Engine</h1>
          <p className="mt-4 text-sm whitespace-pre-wrap">{md}</p>
        </div>
      </div>
    </>
  );
}
