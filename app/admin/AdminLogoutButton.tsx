"use client";

export default function AdminLogoutButton({ label }: { label: string }) {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin";
  }

  return (
    <button
      type="button"
      onClick={() => logout()}
      className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-[rgb(var(--ink-soft))] hover:bg-white/5"
    >
      {label}
    </button>
  );
}
