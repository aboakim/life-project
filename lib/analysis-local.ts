import type { DecisionAnalysis } from "@/lib/types";

export const JOURNAL_STORAGE_KEY = "lde-decision-journal-entries";
export const HISTORY_STORAGE_KEY = "lde-analysis-history";
export const REMINDER_STORAGE_KEY = "lde-decision-reminder";

const MAX_HISTORY = 5;

export type HistorySnapshot = {
  id: string;
  at: string;
  decision: string;
  context: string;
  constraints: string;
  /** 1–10: how heavy the decision felt; optional for older saved entries */
  stakesLevel?: number;
  analysis: DecisionAnalysis;
  mode: "live" | "demo" | "fallback";
};

export function loadHistory(): HistorySnapshot[] {
  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is HistorySnapshot =>
        typeof x === "object" &&
        x !== null &&
        typeof (x as HistorySnapshot).id === "string" &&
        typeof (x as HistorySnapshot).at === "string" &&
        typeof (x as HistorySnapshot).analysis === "object",
    );
  } catch {
    return [];
  }
}

export function pushHistory(snapshot: Omit<HistorySnapshot, "id" | "at"> & { id?: string; at?: string }): void {
  const id = snapshot.id ?? crypto.randomUUID();
  const at = snapshot.at ?? new Date().toISOString();
  const next: HistorySnapshot = {
    id,
    at,
    decision: snapshot.decision,
    context: snapshot.context,
    constraints: snapshot.constraints,
    analysis: snapshot.analysis,
    mode: snapshot.mode,
    stakesLevel: snapshot.stakesLevel,
  };
  const prev = loadHistory().filter((h) => h.id !== id);
  const merged = [next, ...prev].slice(0, MAX_HISTORY);
  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(merged));
}

export function clearHistory(): void {
  window.localStorage.removeItem(HISTORY_STORAGE_KEY);
}

export function appendJournalEntry(text: string): void {
  try {
    const raw = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    const arr = Array.isArray(list) ? list : [];
    const entry = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
    };
    arr.unshift(entry);
    window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(arr));
  } catch {
    /* ignore */
  }
}

/** Store a one-time “revisit” reminder, `days` from now (capped 1–365). */
export function setReminderInDays(days: number): void {
  const d = Math.max(1, Math.min(365, Math.floor(Number(days) || 0)));
  const due = new Date();
  due.setDate(due.getDate() + d);
  window.localStorage.setItem(REMINDER_STORAGE_KEY, due.toISOString());
}

export function setReminderWeeks(weeks: number): void {
  setReminderInDays(Math.max(0, weeks) * 7);
}

export function clearReminder(): void {
  window.localStorage.removeItem(REMINDER_STORAGE_KEY);
}

export function getReminderDueIso(): string | null {
  return window.localStorage.getItem(REMINDER_STORAGE_KEY);
}

export function isReminderDue(): boolean {
  const iso = getReminderDueIso();
  if (!iso) return false;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return false;
  return Date.now() >= t;
}

export function buildMarkdownSummary(
  decision: string,
  context: string,
  constraints: string,
  a: DecisionAnalysis,
  headings: {
    decision: string;
    context: string;
    constraints: string;
    summary: string;
    professional: string;
    dimensions: string;
    scenarios: string;
    timeline: string;
    score: string;
    twin: string;
    stakes: string;
  },
  options?: { stakesLevel?: number },
): string {
  const pro = (a.professionalGuidance ?? "").trim();
  const w = options?.stakesLevel;
  const stakesBlock =
    typeof w === "number" && w >= 1 && w <= 10
      ? [
          `## ${headings.stakes}`,
          `${w}/10`,
          "",
        ]
      : [];
  const lines = [
    `# ${headings.decision}`,
    decision.trim(),
    "",
    `## ${headings.context}`,
    context.trim() || "—",
    "",
    `## ${headings.constraints}`,
    constraints.trim() || "—",
    "",
    ...stakesBlock,
    `## ${headings.summary}`,
    a.summary,
    "",
    ...(pro
      ? [`## ${headings.professional}`, pro, ""]
      : []),
    `## ${headings.dimensions}`,
    `- ${a.dimensions.finances}`,
    `- ${a.dimensions.psychology}`,
    `- ${a.dimensions.risks}`,
    `- ${a.dimensions.opportunities}`,
    "",
    `## ${headings.scenarios}`,
    `- Best: ${a.scenarios.bestCase}`,
    `- Worst: ${a.scenarios.worstCase}`,
    `- Likely: ${a.scenarios.mostLikely}`,
    "",
    `## ${headings.timeline}`,
    `- 6m: ${a.timeline.months6}`,
    `- 2y: ${a.timeline.years2}`,
    `- 5y: ${a.timeline.years5}`,
    "",
    `## ${headings.score}`,
    `${a.score}% — ${a.scoreRationale}`,
    "",
    `## ${headings.twin}`,
    a.digitalTwinNote,
    "",
  ];
  return lines.join("\n");
}

export function buildShareLimitedText(
  decision: string,
  summary: string,
  footer: string,
  maxLen = 480,
): string {
  const head = decision.trim().slice(0, 160);
  const rest = summary.trim().slice(0, maxLen);
  const block = `${head}\n\n${rest}${summary.length > maxLen ? "…" : ""}\n\n${footer}`;
  return block.slice(0, maxLen + 200);
}

/** Ready-to-paste social hook — keep honest; snippet is truncated summary, not fabricated stats */
export function buildShareViralText(summary: string, footer: string): string {
  const gist = summary.trim().slice(0, 260);
  return [
    "I ran a real-life fork through Life Decision Engine — here’s the gist 👀",
    "",
    gist + (summary.trim().length > 260 ? "…" : ""),
    "",
    footer.trim(),
  ].join("\n");
}
