"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { appLocaleToSpeechBcp47 } from "@/lib/tts-bcp47";
import type { AppLocale } from "@/lib/i18n/locale";

type Props = {
  locale: AppLocale;
  onAppend: (chunk: string) => void;
  disabled?: boolean;
  labels: {
    dictate: string;
    listening: string;
    stop: string;
    notSupported: string;
  };
};

function getRecognitionCtor() {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => object;
    webkitSpeechRecognition?: new () => object;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export default function VoiceDictateButton({
  locale,
  onAppend,
  disabled,
  labels,
}: Props) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  // Web Speech: constructor varies by browser
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null);
  const bcp47 = appLocaleToSpeechBcp47(locale);

  const stop = useCallback(() => {
    try {
      recRef.current?.stop?.();
    } catch {
      /* ignore */
    }
    recRef.current = null;
    setListening(false);
  }, []);

  const start = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      setSupported(false);
      return;
    }
    setSupported(true);
    if (listening) {
      stop();
      return;
    }
    // Browser speech engine has the full API; constructor is weakly typed here.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r: any = new Ctor();
    r.lang = bcp47;
    r.interimResults = false;
    r.continuous = true;
    r.maxAlternatives = 1;

    r.onresult = (ev: Event) => {
      const re = ev as unknown as {
        resultIndex: number;
        results: {
          length: number;
          [i: number]: { isFinal: boolean; 0: { transcript: string } };
        };
      };
      for (let i = re.resultIndex; i < re.results.length; i += 1) {
        const item = re.results[i];
        if (!item?.isFinal) continue;
        const text = (item[0]?.transcript ?? "").trim();
        if (text) onAppend(text);
      }
    };

    r.onend = () => {
      setListening(false);
      recRef.current = null;
    };
    r.onerror = () => {
      setListening(false);
      recRef.current = null;
    };

    recRef.current = r;
    try {
      r.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }, [bcp47, listening, onAppend, stop]);

  useEffect(() => {
    return () => {
      try {
        recRef.current?.stop?.();
      } catch {
        /* ignore */
      }
    };
  }, []);

  if (!supported) {
    return (
      <p className="text-[11px] text-rose-200/80" role="status">
        {labels.notSupported}
      </p>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={listening ? stop : start}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-[rgb(var(--ink))] transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      aria-pressed={listening}
      title={listening ? labels.stop : labels.dictate}
    >
      <span
        className="inline-block size-4 rounded-full"
        style={{
          background: listening
            ? "radial-gradient(circle, rgb(220 50 50), rgb(150 20 20))"
            : "radial-gradient(circle, rgb(var(--accent-2)), rgb(var(--accent)))",
          boxShadow: listening ? "0 0 10px rgba(255,60,60,0.5)" : undefined,
        }}
        aria-hidden
      />
      {listening ? labels.listening : labels.dictate}
    </button>
  );
}
