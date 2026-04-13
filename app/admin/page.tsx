import { cookies } from "next/headers";
import type { Metadata } from "next";
import type { ExpertRole } from "@prisma/client";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-cookie";
import { getAdminUi } from "@/lib/i18n/admin";
import {
  LDE_LOCALE_COOKIE_NAME,
  localeFromCookieValue,
} from "@/lib/locale-cookie";
import { prisma } from "@/lib/prisma";
import AdminLogin from "./AdminLogin";
import AdminLogoutButton from "./AdminLogoutButton";

export async function generateMetadata(): Promise<Metadata> {
  const store = await cookies();
  const a = getAdminUi(
    localeFromCookieValue(store.get(LDE_LOCALE_COOKIE_NAME)?.value)
  );
  return {
    title: `${a.pageTitle} | Life Decision Engine`,
    robots: { index: false, follow: false },
  };
}

type Row = {
  id: string;
  createdAt: Date;
  clientName: string;
  clientEmail: string;
  message: string;
  locale: string | null;
  expert: {
    name: string;
    email: string;
    country: string;
    role: ExpertRole;
  };
};

export default async function AdminPage() {
  const secret = process.env.ADMIN_SECRET;
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  const a = getAdminUi(
    localeFromCookieValue(store.get(LDE_LOCALE_COOKIE_NAME)?.value)
  );

  if (!secret || secret.length < 16) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-sm text-amber-200/90">
        {a.secretMissing}
      </div>
    );
  }

  if (!verifyAdminToken(token, secret)) {
    return <AdminLogin copy={a} />;
  }

  const requests = (await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      expert: {
        select: {
          name: true,
          email: true,
          country: true,
          role: true,
        },
      },
    },
  })) as Row[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--ink))]">
            {a.pageTitle}
          </h1>
          <p className="mt-1 text-sm text-[rgb(var(--ink-soft))]">
            {a.pageSubtitle}
          </p>
        </div>
        <AdminLogoutButton label={a.logOut} />
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/10 bg-black/30">
            <tr>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colDate}
              </th>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colExpert}
              </th>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colFrom}
              </th>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colMessage}
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-[rgb(var(--ink-soft))]"
                >
                  {a.empty}
                </td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-white/5 align-top text-[rgb(var(--ink))]"
                >
                  <td className="p-3 whitespace-nowrap text-xs text-[rgb(var(--ink-soft))]">
                    {r.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="p-3">
                    <div className="font-medium">{r.expert.name}</div>
                    <div className="text-xs text-[rgb(var(--ink-soft))]">
                      {r.expert.email}
                    </div>
                    <div className="text-xs text-[rgb(var(--ink-soft))]">
                      {r.expert.country} · {r.expert.role}
                    </div>
                  </td>
                  <td className="p-3">
                    <div>{r.clientName}</div>
                    <div className="text-xs text-[rgb(var(--ink-soft))]">
                      {r.clientEmail}
                    </div>
                  </td>
                  <td className="p-3 max-w-md text-[rgb(var(--ink-soft))]">
                    {r.message}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
