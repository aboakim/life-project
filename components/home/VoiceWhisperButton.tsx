"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AppLocale } from "@/lib/i18n/locale";

type Labels = {
  start: string;
  stop: string;
  working: string;
  error: string;
  needMic: string;
};

type Props = {
  locale: AppLocale;
  onAppend: (chunk: string) => void;
  disabled?: boolean;
  available: boolean;
  labels: Labels;
};

function pickMime(): string {
  if (typeof window === "undefined" || !window.MediaRecorder) return "";
  if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
    return "audio/webm;codecs=opus";
  }
  if (MediaRecorder.isTypeSupported("audio/webm")) {
    return "audio/webm";
  }
  return "";
}

export default function VoiceWhisperButton({
  locale,
  onAppend,
  disabled,
  available,
  labels,
}: Props) {
  const [phase, setPhase] = useState<"idle" | "rec" | "up">("idle");
  const [err, setErr] = useState<string | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mrRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mimeRef = useRef("");

  const cleanupStream = useCallback(() => {
    try {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    } catch {
      /* ignore */
    }
    streamRef.current = null;
  }, []);

  const postAudio = useCallback(
    async (blob: Blob) => {
      setErr(null);
      setPhase("up");
      const fd = new FormData();
      fd.append("file", blob, "clip.webm");
      fd.append("locale", locale);
      try {
        const res = await fetch("/api/speech/transcribe", { method: "POST", body: fd });
        const data = (await res.json().catch(() => ({}))) as { text?: string };
        if (!res.ok) {
          setErr(labels.error);
          return;
        }
        const t = (data.text ?? "").trim();
        if (t) onAppend(t);
      } catch {
        setErr(labels.error);
      } finally {
        setPhase("idle");
      }
    },
    [labels.error, locale, onAppend]
  );

  const startRec = useCallback(async () => {
    setErr(null);
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setErr(labels.needMic);
      return;
    }
    const mime = pickMime() || "audio/webm";
    if (!window.MediaRecorder) {
      setErr(labels.error);
      return;
    }
    mimeRef.current = mime;
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setErr(labels.needMic);
      return;
    }
    streamRef.current = stream;
    chunksRef.current = [];
    const mr = new MediaRecorder(stream, { mimeType: mime });
    mrRef.current = mr;
    mr.addEventListener("dataavailable", (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    });
    mr.addEventListener("error", () => {
      setPhase("idle");
      setErr(labels.error);
      cleanupStream();
    });
    mr.addEventListener("stop", () => {
      const m = mimeRef.current || "audio/webm";
      const b = new Blob(chunksRef.current, { type: m });
      chunksRef.current = [];
      cleanupStream();
      mrRef.current = null;
      if (b.size < 200) {
        setErr(labels.error);
        setPhase("idle");
        return;
      }
      void postAudio(b);
    });
    mr.start(200);
    setPhase("rec");
  }, [cleanupStream, labels.error, labels.needMic, postAudio]);

  const stopRec = useCallback(() => {
    const mr = mrRef.current;
    if (mr && mr.state !== "inactive") {
      try {
        mr.stop();
      } catch {
        setPhase("idle");
        cleanupStream();
      }
    }
  }, [cleanupStream]);

  const onToggle = useCallback(() => {
    if (disabled || !available) return;
    if (phase === "up") return;
    if (phase === "rec") {
      stopRec();
      return;
    }
    void startRec();
  }, [available, disabled, phase, startRec, stopRec]);

  useEffect(() => {
    return () => {
      try {
        mrRef.current?.stop();
      } catch {
        /* ignore */
      }
      cleanupStream();
    };
  }, [cleanupStream]);

  if (!available) {
    return null;
  }

  return (
    <div className="inline-flex flex-col items-end gap-0.5">
      <button
        type="button"
        disabled={disabled || phase === "up"}
        onClick={onToggle}
        className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/15 px-2.5 py-1 text-xs font-semibold text-sky-50/95 transition hover:bg-sky-500/25 disabled:cursor-not-allowed disabled:opacity-40"
        aria-pressed={phase === "rec"}
        title={phase === "rec" ? labels.stop : labels.start}
      >
        <span
          className="size-2.5 rounded-full"
          style={{
            background:
              phase === "rec"
                ? "radial-gradient(circle, rgb(255 60 60), rgb(200 0 0))"
                : "radial-gradient(circle, rgb(56 189 248), rgb(14 165 233))",
            boxShadow: phase === "rec" ? "0 0 8px rgba(255,50,50,0.5)" : undefined,
          }}
          aria-hidden
        />
        {phase === "up" ? (
          <span className="animate-pulse">{labels.working}</span>
        ) : phase === "rec" ? (
          labels.stop
        ) : (
          labels.start
        )}
      </button>
      {err ? (
        <span
          className="max-w-[14rem] text-[10px] leading-tight text-rose-200/90"
          role="status"
        >
          {err}
        </span>
      ) : null}
    </div>
  );
}
