import type { AppLocale } from "./i18n/locale";

export type DecisionAnalysis = {
  summary: string;
  dimensions: {
    finances: string;
    psychology: string;
    risks: string;
    opportunities: string;
  };
  scenarios: {
    bestCase: string;
    worstCase: string;
    mostLikely: string;
  };
  timeline: {
    months6: string;
    years2: string;
    years5: string;
  };
  score: number;
  scoreRationale: string;
  digitalTwinNote: string;
};

export type AnalyzeRequestBody = {
  decision: string;
  context?: string;
  constraints?: string;
  language?: AppLocale;
};
