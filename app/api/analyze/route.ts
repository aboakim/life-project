import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { buildDemoAnalysis } from "@/lib/demo-analysis";
import { getUi } from "@/lib/i18n/ui";
import { parseLocale } from "@/lib/i18n/locale";
import { loadMatchedExperts } from "@/lib/matched-experts";
import { analyzeWithOpenAI } from "@/lib/llm-analyze";
import { rateLimitAllow } from "@/lib/rate-limit";
import type { AnalyzeRequestBody } from "@/lib/types";

export const runtime = "nodejs";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 32;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimitAllow(`analyze:${ip}`, RATE_MAX, RATE_WINDOW_MS)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

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

  const locale = parseLocale(body.language);
  const ui = getUi(locale);

  if (process.env.OPENAI_API_KEY) {
    try {
      const analysis = await analyzeWithOpenAI({
        ...body,
        decision: decision.trim(),
        language: locale,
      });
      const matchedExperts = await loadMatchedExperts(
        analysis.suggestedDirectoryRole ?? "UNSPECIFIED"
      );
      return NextResponse.json({
        analysis,
        mode: "live" as const,
        matchedExperts,
      });
    } catch (e) {
      console.error("[analyze] OpenAI path failed", e);
      const analysis = buildDemoAnalysis(decision, locale);
      const matchedExperts = await loadMatchedExperts(
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

  const analysis = buildDemoAnalysis(decision, locale);
  const matchedExperts = await loadMatchedExperts(
    analysis.suggestedDirectoryRole ?? "UNSPECIFIED"
  );
  return NextResponse.json({
    analysis,
    mode: "demo" as const,
    hint: ui.apiHintDemo,
    matchedExperts,
  });
}
