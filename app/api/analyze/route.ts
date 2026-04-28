import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { buildDemoAnalysis } from "@/lib/demo-analysis";
import { getUi } from "@/lib/i18n/ui";
import { parseLocale } from "@/lib/i18n/locale";
import { loadMatchedExperts } from "@/lib/matched-experts";
import { fillDecisionAnalysisGaps } from "@/lib/analysis-gap-fill";
import { analyzeWithOpenAI } from "@/lib/llm-analyze";
import { rateLimitAllow } from "@/lib/rate-limit";
import type { AnalyzeRequestBody, SuggestedDirectoryRole } from "@/lib/types";

export const runtime = "nodejs";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 64;

async function safeLoadMatchedExperts(role: SuggestedDirectoryRole) {
  try {
    return await loadMatchedExperts(role);
  } catch (e) {
    console.error("[analyze] loadMatchedExperts failed", e);
    return [];
  }
}

export async function POST(req: Request) {
  let body: AnalyzeRequestBody;
  try {
    body = (await req.json()) as AnalyzeRequestBody;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const decision = typeof body.decision === "string" ? body.decision : "";
  if (!decision.trim()) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const stakesOpt =
    typeof body.stakesLevel === "number" &&
    body.stakesLevel >= 1 &&
    body.stakesLevel <= 10
      ? { stakesLevel: body.stakesLevel }
      : undefined;

  const demoOpts = {
    ...stakesOpt,
    context: typeof body.context === "string" ? body.context : undefined,
    constraints:
      typeof body.constraints === "string" ? body.constraints : undefined,
  };

  const locale = parseLocale(body.language);
  const ui = getUi(locale);
  const ip = getClientIp(req);

  // On shared/mobile IPs we prefer a graceful fallback report over a hard 429.
  if (!rateLimitAllow(`analyze:${ip}`, RATE_MAX, RATE_WINDOW_MS)) {
    const analysis = fillDecisionAnalysisGaps(
      buildDemoAnalysis(decision.trim(), locale, demoOpts),
      locale,
    );
    const matchedExperts = await safeLoadMatchedExperts(
      analysis.suggestedDirectoryRole ?? "UNSPECIFIED",
    );
    return NextResponse.json({
      analysis,
      mode: "fallback" as const,
      warning: ui.apiAnalysisServiceNotice,
      matchedExperts,
    });
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      const raw = await analyzeWithOpenAI({
        ...body,
        decision: decision.trim(),
        language: locale,
      });
      const analysis = fillDecisionAnalysisGaps(raw, locale);
      const matchedExperts = await safeLoadMatchedExperts(
        analysis.suggestedDirectoryRole ?? "UNSPECIFIED"
      );
      return NextResponse.json({
        analysis,
        mode: "live" as const,
        matchedExperts,
      });
    } catch (e) {
      console.error("[analyze] OpenAI path failed", e);
      const analysis = fillDecisionAnalysisGaps(
        buildDemoAnalysis(decision, locale, demoOpts),
        locale,
      );
      const matchedExperts = await safeLoadMatchedExperts(
        analysis.suggestedDirectoryRole ?? "UNSPECIFIED"
      );
      return NextResponse.json({
        analysis,
        mode: "fallback" as const,
        warning: ui.apiAnalysisServiceNotice,
        matchedExperts,
      });
    }
  }

  const analysis = fillDecisionAnalysisGaps(
    buildDemoAnalysis(decision, locale, demoOpts),
    locale,
  );
  const matchedExperts = await safeLoadMatchedExperts(
    analysis.suggestedDirectoryRole ?? "UNSPECIFIED"
  );
  return NextResponse.json({
    analysis,
    mode: "demo" as const,
    hint: ui.apiHintDemo,
    matchedExperts,
  });
}
