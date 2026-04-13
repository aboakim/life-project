"use client";

import { useState } from "react";
import type { AdminUiCopy } from "@/lib/i18n/admin";

export default function AdminLogin({ copy }: { copy: AdminUiCopy }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const d = (await res.json()) as { error?: string };
        if (res.status === 401) {
          setError(copy.unauthorized);
          return;
        }
        setError(d.error ?? copy.loginFailed);
        return;
      }
      window.location.reload();
    } catch {
      setError(copy.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="text-xl font-semibold text-[rgb(var(--ink))]">
        {copy.loginTitle}
      </h1>
      <p className="mt-2 text-sm text-[rgb(var(--ink-soft))]">{copy.loginHint}</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm"
          autoComplete="current-password"
        />
        {error ? (
          <p className="text-sm text-rose-300" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loading ? copy.signingIn : copy.signIn}
        </button>
      </form>
    </div>
  );
}
