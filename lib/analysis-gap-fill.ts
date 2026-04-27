import { getUi } from "@/lib/i18n/ui";
import type { AppLocale } from "@/lib/i18n/locale";
import type { DecisionAnalysis } from "@/lib/types";

function filled(s: string): boolean {
  return s.trim().length > 0;
}

/**
 * Ensures structured fields are never blank — matches UI fallbacks so API clients and
 * edge model outputs never return empty shells.
 */
export function fillDecisionAnalysisGaps(
  a: DecisionAnalysis,
  locale: AppLocale,
): DecisionAnalysis {
  const fb = getUi(locale).analysisEmptyDetail;
  const gap = (s: string) => (filled(s) ? s : fb);

  return {
    ...a,
    summary: gap(a.summary),
    dimensions: {
      finances: gap(a.dimensions.finances),
      psychology: gap(a.dimensions.psychology),
      risks: gap(a.dimensions.risks),
      opportunities: gap(a.dimensions.opportunities),
    },
    scenarios: {
      bestCase: gap(a.scenarios.bestCase),
      worstCase: gap(a.scenarios.worstCase),
      mostLikely: gap(a.scenarios.mostLikely),
    },
    timeline: {
      months6: gap(a.timeline.months6),
      years2: gap(a.timeline.years2),
      years5: gap(a.timeline.years5),
    },
    scoreRationale: gap(a.scoreRationale),
    digitalTwinNote: gap(a.digitalTwinNote),
  };
}
