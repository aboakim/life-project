import Link from "next/link";
import type { AdminUiCopy } from "@/lib/i18n/admin";

export type AdminNavTab = "requests" | "overview" | "diagnostics";

export default function AdminNav({
  current,
  copy,
}: {
  current: AdminNavTab;
  copy: AdminUiCopy;
}) {
  const base =
    "rounded-lg px-3 py-1.5 text-sm font-medium underline-offset-4 hover:underline";
  const on = "bg-white/10 text-[rgb(var(--ink))] underline";
  const off = "text-[rgb(var(--ink-soft))]";
  return (
    <nav className="flex flex-wrap gap-1 border-b border-white/10 pb-3">
      <Link
        href="/admin"
        className={`${base} ${current === "requests" ? on : off}`}
      >
        {copy.navRequests}
      </Link>
      <Link
        href="/admin/overview"
        className={`${base} ${current === "overview" ? on : off}`}
      >
        {copy.navOverview}
      </Link>
      <Link
        href="/admin/diagnostics"
        className={`${base} ${current === "diagnostics" ? on : off}`}
      >
        {copy.navDiagnostics}
      </Link>
    </nav>
  );
}
