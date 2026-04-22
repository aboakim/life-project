"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isEnglishAppLocale } from "@/lib/i18n/locale";
import type { AppLocale } from "@/lib/i18n/locale";
import {
  TTS_EN_VOICE_BCP,
  appLocaleToSpeechBcp47,
  speechBcp47CandidatesForTts,
} from "@/lib/tts-bcp47";

/** Slightly below 1.0: clearer than default browser TTS (1.0 is often rushed). */
const READ_ALOUD_RATE = 0.78;

type Props = {
  text: string;
  locale: AppLocale;
  labels: {
    readAloud: string;
    stop: string;
  };
  disabled?: boolean;
};

function pickVoiceForLang(lang: string): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const v = window.speechSynthesis.getVoices();
  if (!v.length) return null;
  const short = lang.split("-")[0] ?? lang;
  const match =
    v.find((x) => x.lang === lang) ||
    v.find((x) =>
      x.lang.toLowerCase().startsWith(`${short.toLowerCase()}-`)
    ) ||
    v.find((x) => x.lang.toLowerCase().startsWith(short.toLowerCase()));
  return match ?? null;
}

function pickVoiceForCandidates(
  candidates: string[]
): SpeechSynthesisVoice | null {
  for (const c of candidates) {
    const found = pickVoiceForLang(c);
    if (found) {
      return found;
    }
  }
  return null;
}

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  for (const b of TTS_EN_VOICE_BCP) {
    const v = pickVoiceForLang(b);
    if (v) {
      return v;
    }
  }
  return null;
}

export default function ReadAloudReportButton({
  text,
  locale,
  labels,
  disabled,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const cancelledRef = useRef(false);
  const primaryBcp = appLocaleToSpeechBcp47(locale);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
    }
    setSpeaking(false);
  }, []);

  const start = useCallback(async () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }
    const plain = text.trim();
    if (!plain) {
      return;
    }

    if (speaking) {
      stop();
      return;
    }

    cancelledRef.current = false;
    setSpeaking(true);

    const ttsCandidates = speechBcp47CandidatesForTts(locale);
    let voice = pickVoiceForCandidates(ttsCandidates);
    let utterLang = primaryBcp;
    let speakText = plain;

    if (!voice) {
      const enV = pickEnglishVoice();
      if (enV) {
        voice = enV;
        if (isEnglishAppLocale(locale)) {
          utterLang = "en-US";
        } else {
          try {
            const r = await fetch("/api/speech/tts-translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: plain, locale }),
            });
            if (r.ok) {
              const j = (await r.json()) as { text?: string };
              if (j.text?.trim()) {
                speakText = j.text.trim();
                utterLang = "en-US";
              } else {
                speakText = plain;
                utterLang = primaryBcp;
                voice = null;
              }
            } else {
              speakText = plain;
              utterLang = primaryBcp;
              voice = null;
            }
          } catch {
            speakText = plain;
            utterLang = primaryBcp;
            voice = null;
          }
        }
      } else {
        speakText = plain;
        utterLang = primaryBcp;
      }
    } else {
      utterLang = primaryBcp;
    }

    const u = new SpeechSynthesisUtterance(speakText);
    u.lang = utterLang;
    if (voice) {
      u.voice = voice;
    }
    u.rate = READ_ALOUD_RATE;
    u.pitch = 1;
    u.onend = () => {
      if (!cancelledRef.current) {
        setSpeaking(false);
      }
    };
    u.onerror = () => {
      setSpeaking(false);
    };

    try {
      window.speechSynthesis.speak(u);
    } catch {
      setSpeaking(false);
    }
  }, [locale, primaryBcp, speaking, stop, text]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const s = window.speechSynthesis;
    const onVoices = () => {
      s.getVoices();
    };
    s.addEventListener("voiceschanged", onVoices);
    onVoices();
    return () => {
      s.removeEventListener("voiceschanged", onVoices);
      stop();
    };
  }, [stop]);

  if (!mounted || !window.speechSynthesis) {
    return null;
  }

  return (
    <button
      type="button"
      disabled={disabled || !text.trim()}
      onClick={speaking ? stop : () => void start()}
      className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-500/15 px-4 py-2.5 text-sm font-semibold text-cyan-50/95 transition hover:bg-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-40"
      aria-pressed={speaking}
    >
      <span className="text-base" aria-hidden>
        {speaking ? "⏹" : "▶"}
      </span>
      {speaking ? labels.stop : labels.readAloud}
    </button>
  );
}
