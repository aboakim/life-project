import { NextResponse } from "next/server";
import { buildDemoAnalysis } from "@/lib/demo-analysis";
import { getUi } from "@/lib/i18n/ui";
import { parseLocale } from "@/lib/i18n/locale";
import { analyzeWithOpenAI } from "@/lib/llm-analyze";
import type { AnalyzeRequestBody } from "@/lib/types";

export const runtime = "nodejs";

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

  const locale = parseLocale(body.language);
  const ui = getUi(locale);

  if (process.env.OPENAI_API_KEY) {
    try {
      const analysis = await analyzeWithOpenAI({
        ...body,
        decision: decision.trim(),
        language: locale,
      });
      return NextResponse.json({
        analysis,
        mode: "live" as const,
      });
    } catch (e) {
      console.error("[analyze] OpenAI path failed", e);
      const analysis = buildDemoAnalysis(decision, locale);
      return NextResponse.json({
        analysis,
        mode: "fallback" as const,
        warning: ui.apiAnalysisServiceNotice,
      });
    }
  }

  const analysis = buildDemoAnalysis(decision, locale);
  return NextResponse.json({
    analysis,
    mode: "demo" as const,
    hint: ui.apiHintDemo,
  });
}
