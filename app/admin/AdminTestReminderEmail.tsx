"use client";

import { useState } from "react";
import type { AdminUiCopy } from "@/lib/i18n/admin";

type Props = {
  resend: boolean;
  copy: AdminUiCopy;
};

export default function AdminTestReminderEmail({ resend, copy }: Props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [msg, setMsg] = useState<"idle" | "sending" | "sent" | "failed" | "hint">("idle");
  const [err, setErr] = useState<string | null>(null);

  function reset() {
    setMsg("idle");
    setErr(null);
  }

  async function sendManual() {
    reset();
    if (!resend) {
      setMsg("hint");
      return;
    }
    setMsg("sending");
    try {
      const r = await fetch("/api/admin/test-reminder-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email.trim(),
          firstName: firstName.trim() || "there",
        }),
      });
      const data = (await r.json().catch(() => ({}))) as {
        error?: string;
        detail?: string;
      };
      if (!r.ok) {
        setMsg("failed");
        setErr(
          data.detail
            ? `${data.error ?? "error"}: ${data.detail}`
            : (data.error ?? String(r.status)),
        );
        return;
      }
      setMsg("sent");
    } catch {
      setMsg("failed");
      setErr("network");
    }
  }

  async function sendNudge() {
    reset();
    if (!resend) {
      setMsg("hint");
      return;
    }
    if (!email.trim()) {
      setMsg("failed");
      setErr("no_email");
      return;
    }
    setMsg("sending");
    try {
      const r = await fetch("/api/admin/test-reminder-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email.trim(),
          firstName: firstName.trim() || "there",
          template: "nudge",
        }),
      });
      const data = (await r.json().catch(() => ({}))) as {
        error?: string;
        detail?: string;
      };
      if (!r.ok) {
        setMsg("failed");
        setErr(
          data.detail
            ? `${data.error ?? "error"}: ${data.detail}`
            : (data.error ?? String(r.status)),
        );
        return;
      }
      setMsg("sent");
    } catch {
      setMsg("failed");
      setErr("network");
    }
  }

  async function sendLatest() {
    reset();
    if (!resend) {
      setMsg("hint");
      return;
    }
    setMsg("sending");
    try {
      const r = await fetch("/api/admin/test-reminder-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ useLatestSubscriber: true }),
      });
      const data = (await r.json().catch(() => ({}))) as {
        error?: string;
        detail?: string;
      };
      if (!r.ok) {
        setMsg("failed");
        setErr(
          data.detail
            ? `${data.error ?? "error"}: ${data.detail}`
            : (data.error ?? String(r.status)),
        );
        return;
      }
      setMsg("sent");
    } catch {
      setMsg("failed");
      setErr("network");
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4">
      <h2 className="text-sm font-semibold text-[rgb(var(--ink))]">
        {copy.diagnosticsTestEmailTitle}
      </h2>
      <p className="mt-2 text-sm text-[rgb(var(--ink-soft))]">
        {copy.diagnosticsTestEmailHint}
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="block min-w-[12rem] flex-1 text-xs font-medium text-[rgb(var(--ink))]">
          {copy.diagnosticsTestEmail}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-[rgb(var(--ink))] outline-none focus:border-white/20"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
        <label className="block min-w-[10rem] flex-1 text-xs font-medium text-[rgb(var(--ink))]">
          {copy.diagnosticsTestFirstName}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-[rgb(var(--ink))] outline-none focus:border-white/20"
            placeholder="Name"
            autoComplete="given-name"
          />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={sendManual}
          disabled={msg === "sending" || !email.trim()}
          className="rounded-xl border border-white/12 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-[rgb(var(--ink))] transition hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {msg === "sending" ? copy.diagnosticsTestSending : copy.diagnosticsSendTestWelcome}
        </button>
        <button
          type="button"
          onClick={sendNudge}
          disabled={msg === "sending"}
          className="rounded-xl border border-[rgb(var(--accent-2))]/30 bg-[rgb(var(--accent-2))]/10 px-4 py-2.5 text-sm font-medium text-[rgb(var(--ink))] transition hover:bg-[rgb(var(--accent-2))]/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {msg === "sending" ? copy.diagnosticsTestSending : copy.diagnosticsSendNudge}
        </button>
        <button
          type="button"
          onClick={sendLatest}
          disabled={msg === "sending"}
          className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-[rgb(var(--ink-soft))] transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {msg === "sending" ? copy.diagnosticsTestSending : copy.diagnosticsSendLatest}
        </button>
      </div>
      {msg === "sent" ? (
        <p className="mt-3 text-sm text-emerald-200/90" role="status">
          {copy.diagnosticsTestSent}
        </p>
      ) : null}
      {msg === "failed" ? (
        <p className="mt-3 text-sm text-rose-200/90" role="alert">
          {err === "no_subscriber"
            ? copy.diagnosticsTestNoSubscribers
            : err === "no_email"
              ? copy.diagnosticsTestEmailRequired
              : copy.diagnosticsTestFailed}
          {err && err !== "no_subscriber" && err !== "no_email"
            ? ` (${err})`
            : ""}
        </p>
      ) : null}
      {msg === "hint" ? (
        <p className="mt-3 text-sm text-amber-200/90">{copy.diagnosticsTestNoResend}</p>
      ) : null}
    </div>
  );
}
