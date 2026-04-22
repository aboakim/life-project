import { NextResponse } from "next/server";
import { appLocaleToWhisperLanguage } from "@/lib/speech/whisper-locale";
import { isAppLocale, type AppLocale } from "@/lib/i18n/locale";

export const runtime = "nodejs";

const MAX_BYTES = 15 * 1024 * 1024;

const MODEL = process.env.OPENAI_TRANSCRIBE_MODEL ?? "whisper-1";

async function openaiTranscribe(
  key: string,
  ab: ArrayBuffer,
  file: File,
  language: string | null
): Promise<Response> {
  const out = new FormData();
  out.append(
    "file",
    new Blob([ab], {
      type: file.type || "application/octet-stream",
    }),
    file.name || "audio.webm"
  );
  out.append("model", MODEL);
  if (language) {
    out.append("language", language);
  }
  out.append("response_format", "json");

  return fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body: out,
  });
}

/**
 * OpenAI Whisper — multipart audio from the browser (e.g. webm from MediaRecorder).
 * Requires OPENAI_API_KEY (same as /api/analyze).
 * If a fixed `language` request fails, retries once with auto language detection.
 */
export async function POST(req: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "transcription_unavailable" },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "invalid_form" }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "missing_file" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "file_too_large" }, { status: 413 });
  }

  const locRaw = form.get("locale");
  const locale: AppLocale = isAppLocale(locRaw) ? locRaw : "en-US";
  const lang = appLocaleToWhisperLanguage(locale);

  const ab = await file.arrayBuffer();
  if (ab.byteLength > MAX_BYTES) {
    return NextResponse.json({ error: "file_too_large" }, { status: 413 });
  }

  let res = await openaiTranscribe(key, ab, file, lang);
  if (!res.ok && lang) {
    const err = await res.text();
    console.warn(
      "[transcribe] OpenAI with language failed, retrying auto",
      res.status,
      err.slice(0, 200)
    );
    res = await openaiTranscribe(key, ab, file, null);
  }

  if (!res.ok) {
    const err = await res.text();
    console.error("[transcribe] OpenAI", res.status, err.slice(0, 500));
    return NextResponse.json(
      { error: "transcription_failed" },
      { status: 502 }
    );
  }

  const data = (await res.json()) as { text?: string };
  const text = typeof data.text === "string" ? data.text.trim() : "";
  if (!text) {
    return NextResponse.json(
      { error: "empty_transcription" },
      { status: 502 }
    );
  }

  return NextResponse.json({ text });
}
