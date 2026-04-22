"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { appLocaleToSpeechBcp47 } from "@/lib/tts-bcp47";
import type { AppLocale } from "@/lib/i18n/locale";

type Props = {
  text: string;
  locale: AppLocale;
  labels: {
    readAloud: string;
    stop: string;
  };
  disabled?: boolean;
};

function pickVoice(
  lang: string
): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const v = window.speechSynthesis.getVoices();
  if (!v.length) return null;
  const short = lang.split("-")[0] ?? lang;
  const match =
    v.find((x) => x.lang === lang) ||
    v.find((x) => x.lang.toLowerCase().startsWith(`${short.toLowerCase()}-`)) ||
    v.find((x) => x.lang.toLowerCase().startsWith(short.toLowerCase()));
  return match ?? null;
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
  const bcp47 = appLocaleToSpeechBcp47(locale);

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

  const start = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const plain = text.trim();
    if (!plain) return;

    if (speaking) {
      stop();
      return;
    }

    cancelledRef.current = false;
    setSpeaking(true);

    const u = new SpeechSynthesisUtterance(plain);
    u.lang = bcp47;
    const v = pickVoice(bcp47);
    if (v) u.voice = v;
    u.rate = 0.95;
    u.pitch = 1;
    u.onend = () => {
      if (!cancelledRef.current) setSpeaking(false);
    };
    u.onerror = () => {
      setSpeaking(false);
    };

    try {
      window.speechSynthesis.speak(u);
    } catch {
      setSpeaking(false);
    }
  }, [bcp47, speaking, stop, text]);

  useEffect(() => {
    if (typeof window === "undefined") return;
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
      onClick={speaking ? stop : start}
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
