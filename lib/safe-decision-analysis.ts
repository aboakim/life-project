import type { DecisionAnalysis, SuggestedDirectoryRole } from "@/lib/types";

const ALLOWED: SuggestedDirectoryRole[] = [
  "PSYCHOLOGIST",
  "LAWYER",
  "FINANCIAL",
  "PHYSICIAN",
  "COACH",
  "IMMIGRATION",
  "UNSPECIFIED",
];

function parseRole(v: unknown): SuggestedDirectoryRole | undefined {
  if (typeof v !== "string") return undefined;
  const u = v.trim().toUpperCase() as SuggestedDirectoryRole;
  return ALLOWED.includes(u) ? u : "UNSPECIFIED";
}

/**
 * Coerces API / cache payloads into a full `DecisionAnalysis` so UI code never
 * throws on `a.dimensions.*` (mobile Safari + partial JSON = white error page).
 */
export function safeDecisionAnalysis(input: unknown): DecisionAnalysis {
  const base: DecisionAnalysis = {
    summary: "",
    dimensions: {
      finances: "",
      psychology: "",
      risks: "",
      opportunities: "",
    },
    scenarios: {
      bestCase: "",
      worstCase: "",
      mostLikely: "",
    },
    timeline: {
      months6: "",
      years2: "",
      years5: "",
    },
    score: 0,
    scoreRationale: "",
    digitalTwinNote: "",
  };
  if (!input || typeof input !== "object") return base;
  const a = input as Record<string, unknown>;
  const dims =
    a.dimensions && typeof a.dimensions === "object"
      ? (a.dimensions as Record<string, unknown>)
      : {};
  const scen =
    a.scenarios && typeof a.scenarios === "object"
      ? (a.scenarios as Record<string, unknown>)
      : {};
  const tl =
    a.timeline && typeof a.timeline === "object"
      ? (a.timeline as Record<string, unknown>)
      : {};
  const scoreN = Number(a.score);
  const pro = a.professionalGuidance ?? a.professional_guidance;
  const role = parseRole(
    a.suggestedDirectoryRole ?? a.suggested_directory_role,
  );
  return {
    summary: String(a.summary ?? ""),
    professionalGuidance:
      pro !== undefined && pro !== null ? String(pro).trim() || undefined : undefined,
    suggestedDirectoryRole: role,
    dimensions: {
      finances: String(dims.finances ?? ""),
      psychology: String(dims.psychology ?? ""),
      risks: String(dims.risks ?? ""),
      opportunities: String(dims.opportunities ?? ""),
    },
    scenarios: {
      bestCase: String(scen.bestCase ?? scen.best_case ?? ""),
      worstCase: String(scen.worstCase ?? scen.worst_case ?? ""),
      mostLikely: String(scen.mostLikely ?? scen.most_likely ?? ""),
    },
    timeline: {
      months6: String(tl.months6 ?? tl.months_6 ?? ""),
      years2: String(tl.years2 ?? tl.years_2 ?? ""),
      years5: String(tl.years5 ?? tl.years_5 ?? ""),
    },
    score: Number.isFinite(scoreN) ? Math.min(100, Math.max(0, scoreN)) : 0,
    scoreRationale: String(a.scoreRationale ?? a.score_rationale ?? ""),
    digitalTwinNote: String(a.digitalTwinNote ?? a.digital_twin_note ?? ""),
  };
}
