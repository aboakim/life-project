import { NextResponse } from "next/server";
import { isEnglishAppLocale, parseLocale, type AppLocale } from "@/lib/i18n/locale";

export const runtime = "nodejs";

const MAX_CHARS = 24_000;
const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

/**
 * Translates report text to English for browser TTS when the OS has no voice
 * for the page language (e.g. Armenian on Windows). Same key as /api/analyze.
 */
export async function POST(req: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  let body: { text?: unknown; locale?: unknown };
  try {
    body = (await req.json()) as { text?: unknown; locale?: unknown };
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (text.length > MAX_CHARS) {
    return NextResponse.json({ error: "too_long" }, { status: 413 });
  }

  const locale: AppLocale = parseLocale(body.locale);
  if (isEnglishAppLocale(locale)) {
    return NextResponse.json({ text });
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      max_tokens: Math.min(16000, Math.ceil(text.length / 3) + 400),
      messages: [
        {
          role: "system",
          content:
            "Translate the user’s text into clear English for text-to-speech. Output only the English translation, no title or quotes. Preserve paragraph breaks. Keep it readable aloud.",
        },
        {
          role: "user",
          content: `Page locale: ${locale}.\n\n${text}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[tts-translate] OpenAI", res.status, err.slice(0, 400));
    return NextResponse.json({ error: "translate_failed" }, { status: 502 });
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const out = data.choices?.[0]?.message?.content;
  if (typeof out !== "string" || !out.trim()) {
    return NextResponse.json({ error: "empty" }, { status: 502 });
  }

  return NextResponse.json({ text: out.trim() });
}
