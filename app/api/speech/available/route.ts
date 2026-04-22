import { NextResponse } from "next/server";

/**
 * Tells the client whether server-side speech transcription (Whisper) is configured.
 * Does not reveal secrets — only boolean capability.
 */
export async function GET() {
  return NextResponse.json({
    whisper: Boolean(process.env.OPENAI_API_KEY),
  });
}
