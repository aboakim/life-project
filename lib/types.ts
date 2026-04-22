import type { AppLocale } from "./i18n/locale";

/** Matches `ExpertRole` in Prisma; `UNSPECIFIED` = no single directory filter. */
export type SuggestedDirectoryRole =
  | "PSYCHOLOGIST"
  | "LAWYER"
  | "FINANCIAL"
  | "PHYSICIAN"
  | "COACH"
  | "IMMIGRATION"
  | "UNSPECIFIED";

export type MatchedExpertSummary = {
  id: string;
  name: string;
  role: Exclude<SuggestedDirectoryRole, "UNSPECIFIED">;
  country: string;
  city: string | null;
  languages: string;
  bio: string;
};

export type DecisionAnalysis = {
  summary: string;
  /** Which professionals may help, when to seek them; not a substitute for in-person care. */
  professionalGuidance?: string;
  /** Hint for directory lookup — server may return registered experts in this role. */
  suggestedDirectoryRole?: SuggestedDirectoryRole;
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
