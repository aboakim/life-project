import type { DecisionAnalysis, MatchedExpertSummary } from "@/lib/types";
import type { UIStrings } from "@/lib/i18n/ui";
import { roleLabel, type ExpertRoleKey } from "@/lib/i18n/experts-network";
import type { AppLocale } from "@/lib/i18n/locale";

/**
 * Plain text for speech synthesis — one continuous narration (no HTML).
 * Kept under ~20k chars for engine limits.
 */
export function buildAnalysisSpeechText(
  a: DecisionAnalysis,
  t: UIStrings,
  locale: AppLocale,
  options?: {
    professionalGuidance?: string;
    experts?: MatchedExpertSummary[];
  }
): string {
  const pro = (
    options?.professionalGuidance ?? a.professionalGuidance ?? ""
  ).trim();
  const experts = options?.experts ?? [];

  const lines: string[] = [
    t.sectionSummary,
    a.summary,
    t.sectionDimensions,
    t.dimFinances,
    a.dimensions.finances,
    t.dimPsychology,
    a.dimensions.psychology,
    t.dimRisks,
    a.dimensions.risks,
    t.dimOpportunities,
    a.dimensions.opportunities,
    t.sectionScenarios,
    t.scenBest,
    a.scenarios.bestCase,
    t.scenWorst,
    a.scenarios.worstCase,
    t.scenLikely,
    a.scenarios.mostLikely,
    t.sectionTimeline,
    t.timeM6,
    a.timeline.months6,
    t.timeY2,
    a.timeline.years2,
    t.timeY5,
    a.timeline.years5,
    t.sectionScore,
    String(a.score),
    t.scoreSublabel,
    a.scoreRationale,
    t.sectionTwin,
    a.digitalTwinNote,
  ];

  if (pro) {
    lines.push(t.sectionProfessional, pro);
  }

  if (experts.length > 0) {
    lines.push(t.sectionDirectoryExperts);
    for (const e of experts) {
      const role = roleLabel(locale, e.role as ExpertRoleKey);
      lines.push(`${e.name}, ${role}, ${e.country}. ${e.bio.slice(0, 400)}`);
    }
  }

  return lines
    .filter((x) => (typeof x === "string" ? x.trim().length > 0 : true))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 20_000);
}
