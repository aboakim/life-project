import { llmLanguageLabel } from "@/lib/i18n/locale";
import type {
  AnalyzeRequestBody,
  DecisionAnalysis,
  SuggestedDirectoryRole,
} from "./types";

const JSON_INSTRUCTION = `You must respond with a single JSON object only, no markdown, with this exact shape:
{
  "summary": "string, 2-4 sentences",
  "professionalGuidance": "string, 3-6 sentences: based on the user's question, name which kinds of professionals could help (e.g. licensed psychologist/therapist, attorney, financial planner, immigration adviser, career coach, physician) and in what situations; clarify this software is not a substitute. Do not invent real people's names. Same language as other fields.",
  "suggestedDirectoryRole": "one of exactly: PSYCHOLOGIST, LAWYER, FINANCIAL, PHYSICIAN, COACH, IMMIGRATION, UNSPECIFIED — the single type from our expert directory that best matches who should help; use UNSPECIFIED if no clear fit or mixed",
  "dimensions": {
    "finances": "string",
    "psychology": "string",
    "risks": "string",
    "opportunities": "string"
  },
  "scenarios": {
    "bestCase": "string",
    "worstCase": "string",
    "mostLikely": "string"
  },
  "timeline": {
    "months6": "string",
    "years2": "string",
    "years5": "string"
  },
  "score": number from 0 to 100 (estimated alignment with user's stated goals, not medical/legal advice),
  "scoreRationale": "string explaining the score briefly",
  "digitalTwinNote": "string: what a 'future you' perspective might emphasize, hypothetical, not factual"
}`;

const ALLOWED_ROLES: SuggestedDirectoryRole[] = [
  "PSYCHOLOGIST",
  "LAWYER",
  "FINANCIAL",
  "PHYSICIAN",
  "COACH",
  "IMMIGRATION",
  "UNSPECIFIED",
];

function parseSuggestedRole(v: unknown): SuggestedDirectoryRole {
  if (typeof v !== "string") return "UNSPECIFIED";
  const u = v.trim().toUpperCase() as SuggestedDirectoryRole;
  return ALLOWED_ROLES.includes(u) ? u : "UNSPECIFIED";
}

function normalize(raw: unknown): DecisionAnalysis | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const dims = o.dimensions as Record<string, unknown> | undefined;
  const scen = o.scenarios as Record<string, unknown> | undefined;
  const tl = o.timeline as Record<string, unknown> | undefined;
  if (!dims || !scen || !tl) return null;
  const score = Number(o.score);
  if (Number.isNaN(score)) return null;
  return {
    summary: String(o.summary ?? ""),
    professionalGuidance: String(
      o.professionalGuidance ?? o.professional_guidance ?? "",
    ),
    suggestedDirectoryRole: parseSuggestedRole(
      o.suggestedDirectoryRole ?? o.suggested_directory_role,
    ),
    dimensions: {
      finances: String(dims.finances ?? ""),
      psychology: String(dims.psychology ?? ""),
      risks: String(dims.risks ?? ""),
      opportunities: String(dims.opportunities ?? ""),
    },
    scenarios: {
      bestCase: String(scen.bestCase ?? ""),
      worstCase: String(scen.worstCase ?? ""),
      mostLikely: String(scen.mostLikely ?? ""),
    },
    timeline: {
      months6: String(tl.months6 ?? ""),
      years2: String(tl.years2 ?? ""),
      years5: String(tl.years5 ?? ""),
    },
    score: Math.min(100, Math.max(0, score)),
    scoreRationale: String(o.scoreRationale ?? ""),
    digitalTwinNote: String(o.digitalTwinNote ?? ""),
  };
}

export async function analyzeWithOpenAI(
  body: AnalyzeRequestBody
): Promise<DecisionAnalysis> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error("OPENAI_API_KEY missing");
  }

  const locale = body.language ?? "hy";
  const langName = llmLanguageLabel(locale);

  const w =
    typeof body.stakesLevel === "number" &&
    body.stakesLevel >= 1 &&
    body.stakesLevel <= 10
      ? body.stakesLevel
      : null;

  const userBlock = [
    `Language for ALL user-facing text fields in the JSON: ${langName}.`,
    `Decision / question:\n${body.decision.trim()}`,
    w !== null
      ? `Subjective weight (user slider 1=light, 10=very heavy on their mind): ${w}/10 — factor this into tone and the score rationale; do not treat it as medical anxiety.`
      : "Subjective weight: (not provided)",
    body.context?.trim()
      ? `Extra context:\n${body.context.trim()}`
      : "Extra context: (none)",
    body.constraints?.trim()
      ? `Constraints / values:\n${body.constraints.trim()}`
      : "Constraints / values: (none)",
    "",
    "Rules:",
    "- Be structured, not chatty. No therapy diagnosis; encourage professional help for crisis.",
    "- Acknowledge uncertainty; avoid absolute predictions.",
    "- Score is a heuristic 'alignment / feasibility' estimate, not fate.",
    "- professionalGuidance: practical referral-style guidance (types of pros, not specific names).",
    JSON_INSTRUCTION,
  ].join("\n\n");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a decision analysis engine. You output careful, balanced structured analysis. You are not a lawyer, doctor, or therapist.",
        },
        { role: "user", content: userBlock },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("[OpenAI] request failed", res.status, errText.slice(0, 800));
    throw new Error("openai_request_failed");
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty OpenAI response");

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("Invalid JSON from model");
  }

  const normalized = normalize(parsed);
  if (!normalized) throw new Error("Could not normalize model output");

  return normalized;
}
