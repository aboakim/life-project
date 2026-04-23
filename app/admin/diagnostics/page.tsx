import { cookies } from "next/headers";
import type { Metadata } from "next";
import Link from "next/link";
import AdminTestReminderEmail from "../AdminTestReminderEmail";
import AdminLogin from "../AdminLogin";
import AdminLogoutButton from "../AdminLogoutButton";
import { getAdminGate } from "@/lib/admin-session";
import type { AdminUiCopy } from "@/lib/i18n/admin";
import { getAdminUi } from "@/lib/i18n/admin";
import {
  LDE_LOCALE_COOKIE_NAME,
  localeFromCookieValue,
} from "@/lib/locale-cookie";

export async function generateMetadata(): Promise<Metadata> {
  const store = await cookies();
  const a = getAdminUi(
    localeFromCookieValue(store.get(LDE_LOCALE_COOKIE_NAME)?.value)
  );
  return {
    title: `${a.diagnosticsTitle} | Life Decision Engine`,
    robots: { index: false, follow: false },
  };
}

function StatusRow({
  label,
  ok,
  copy,
}: {
  label: string;
  ok: boolean;
  copy: AdminUiCopy;
}) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 py-3">
      <span className="text-[rgb(var(--ink))]">{label}</span>
      <span
        className={
          ok
            ? "rounded-lg bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-200/95"
            : "rounded-lg bg-white/[0.06] px-2 py-0.5 text-xs font-medium text-[rgb(var(--ink-soft))]"
        }
      >
        {ok ? copy.diagnosticsConfigured : copy.diagnosticsMissing}
      </span>
    </li>
  );
}

export default async function AdminDiagnosticsPage() {
  const store = await cookies();
  const gate = await getAdminGate();
  const a = getAdminUi(
    localeFromCookieValue(store.get(LDE_LOCALE_COOKIE_NAME)?.value)
  );

  if (gate === "missing_secret") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-sm text-[rgb(var(--ink-soft))]">
        {a.secretMissing}
      </div>
    );
  }

  if (gate === "unauthorized") {
    return <AdminLogin copy={a} />;
  }

  const openAi = Boolean(process.env.OPENAI_API_KEY?.trim());
  const resend = Boolean(process.env.RESEND_API_KEY?.trim());
  const stripe = Boolean(process.env.STRIPE_SECRET_KEY?.trim());
  const database = Boolean(process.env.DATABASE_URL?.trim());

  const logsUrl =
    process.env.VERCEL_DASHBOARD_LOGS_URL?.trim() ||
    process.env.ADMIN_LOGS_URL?.trim() ||
    null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--ink-soft))]">
            {a.diagnosticsSecretLabel}
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[rgb(var(--ink))]">
            {a.diagnosticsTitle}
          </h1>
          <p className="mt-2 text-sm text-[rgb(var(--ink-soft))]">
            {a.diagnosticsSubtitle}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin"
            className="text-sm font-medium text-[rgb(var(--accent-2))] underline-offset-4 hover:underline"
          >
            ← {a.pageTitle}
          </Link>
          <AdminLogoutButton label={a.logOut} />
        </div>
      </div>

      <ul className="mt-8 rounded-2xl border border-white/10 bg-black/25 px-4">
        <StatusRow label={a.diagnosticsOpenAi} ok={openAi} copy={a} />
        <StatusRow label={a.diagnosticsResend} ok={resend} copy={a} />
        <StatusRow label={a.diagnosticsStripe} ok={stripe} copy={a} />
        <StatusRow label={a.diagnosticsDatabase} ok={database} copy={a} />
      </ul>

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-sm text-[rgb(var(--ink-soft))]">{a.diagnosticsLogsHint}</p>
        {logsUrl ? (
          <a
            href={logsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-[rgb(var(--ink))]"
          >
            {a.diagnosticsViewLogs}
          </a>
        ) : (
          <p className="mt-3 text-sm text-[rgb(var(--ink-soft))]">
            {a.diagnosticsNoLogsUrl}
          </p>
        )}
      </div>

      <AdminTestReminderEmail resend={resend} copy={a} />
    </div>
  );
}
