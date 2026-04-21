import { llmLanguageLabel } from "@/lib/i18n/locale";
import type { AnalyzeRequestBody, DecisionAnalysis } from "./types";

const JSON_INSTRUCTION = `You must respond with a single JSON object only, no markdown, with this exact shape:
{
  "summary": "string, 2-4 sentences",
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

  const userBlock = [
    `Language for ALL user-facing text fields in the JSON: ${langName}.`,
    `Decision / question:\n${body.decision.trim()}`,
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
