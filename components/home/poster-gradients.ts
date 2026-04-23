/**
 * Typographic “poster” panels: no stock photos — gradient + pattern = the frame
 * for your real copy (title + line). Each index is a distinct mood per section.
 */
export type PosterTone = "overview" | "trust" | "how";

const overview = [
  "from-[#0c1222] via-[#0e7490]/90 to-[#134e4a]",
  "from-[#1e1b4b] via-[#3730a3]/85 to-[#1d4ed8]/80",
  "from-[#422006] via-[#9a3412]/80 to-[#7f1d1d]/75",
] as const;

const trust = [
  "from-[#0f172a] via-[#0369a1]/75 to-[#0c4a6e]",
  "from-[#14532d] via-[#166534]/80 to-[#14532d]",
  "from-[#3b0764] via-[#6b21a8]/70 to-[#4c1d95]",
] as const;

const how = [
  "from-[#172554] via-[#1d4ed8]/70 to-[#312e81]",
  "from-[#134e4a] via-[#0d9488]/75 to-[#115e59]",
  "from-[#4c0519] via-[#9f1239]/70 to-[#831843]",
] as const;

const byTone: Record<PosterTone, readonly string[]> = {
  overview: overview,
  trust,
  how,
};

export function posterGradientClass(tone: PosterTone, index: number): string {
  const row = byTone[tone];
  const cls = row[index % row.length] ?? row[0];
  return `bg-gradient-to-br ${cls}`;
}

/** “What it fixes” strip — same poster idea, own palette. */
const fixes = [
  "from-[#0c0a09] via-[#57534e]/80 to-[#0c0a09]",
  "from-[#0c1e3a] via-[#1d4ed8]/55 to-[#0f172a]",
  "from-[#134e2e] via-[#15803d]/60 to-[#14532d]",
] as const;

export function whatItFixesPosterClass(index: number): string {
  return `bg-gradient-to-br ${fixes[index % fixes.length] ?? fixes[0]}`;
}
