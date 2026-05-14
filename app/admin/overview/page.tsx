import { cookies } from "next/headers";
import type { Metadata } from "next";
import Link from "next/link";
import AdminLogin from "../AdminLogin";
import AdminLogoutButton from "../AdminLogoutButton";
import AdminNav from "../AdminNav";
import { getAdminGate } from "@/lib/admin-session";
import { getAdminUi } from "@/lib/i18n/admin";
import {
  LDE_LOCALE_COOKIE_NAME,
  localeFromCookieValue,
} from "@/lib/locale-cookie";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const store = await cookies();
  const a = getAdminUi(
    localeFromCookieValue(store.get(LDE_LOCALE_COOKIE_NAME)?.value)
  );
  return {
    title: `${a.overviewTitle} | Life Decision Engine`,
    robots: { index: false, follow: false },
  };
}

export default async function AdminOverviewPage() {
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

  let contactCount: number | null = 0;
  let subscriberCount: number | null = 0;
  let subscriberWithMiles: number | null = 0;
  let questionVisibleCount: number | null = 0;
  let reminderRows: {
    id: string;
    createdAt: Date;
    firstName: string;
    lastName: string;
    email: string;
    miles: number | null;
    locale: string | null;
    nextNudgeAt: Date | null;
    emailOptOutAt: Date | null;
  }[] = [];
  let overviewDataError: string | null = null;

  try {
    const [c, sc, swm, qvc, rr] = await Promise.all([
      prisma.contactRequest.count(),
      prisma.decisionReminderSubscriber.count(),
      prisma.decisionReminderSubscriber.count({
        where: { miles: { not: null } },
      }),
      prisma.communityQuestion.count({ where: { status: "visible" } }),
      prisma.decisionReminderSubscriber.findMany({
        orderBy: { createdAt: "desc" },
        take: 150,
        select: {
          id: true,
          createdAt: true,
          firstName: true,
          lastName: true,
          email: true,
          miles: true,
          locale: true,
          nextNudgeAt: true,
          emailOptOutAt: true,
        },
      }),
    ]);
    contactCount = c;
    subscriberCount = sc;
    subscriberWithMiles = swm;
    questionVisibleCount = qvc;
    reminderRows = rr;
  } catch (e) {
    console.error("[admin/overview] stats", e);
    overviewDataError = a.overviewDataError;
    contactCount = null;
    subscriberCount = null;
    subscriberWithMiles = null;
    questionVisibleCount = null;
    reminderRows = [];
  }

  let accessRows: {
    id: string;
    createdAt: Date;
    path: string;
    country: string | null;
    referer: string | null;
    ua: string | null;
  }[] = [];
  let accessLogQueryFailed = false;
  try {
    accessRows = await prisma.siteAccessLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 400,
      select: {
        id: true,
        createdAt: true,
        path: true,
        country: true,
        referer: true,
        ua: true,
      },
    });
  } catch {
    accessLogQueryFailed = true;
    accessRows = [];
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--ink))]">
            {a.overviewTitle}
          </h1>
          <p className="mt-1 text-sm text-[rgb(var(--ink-soft))]">
            {a.overviewSubtitle}
          </p>
        </div>
        <AdminLogoutButton label={a.logOut} />
      </div>

      <div className="mt-6">
        <AdminNav current="overview" copy={a} />
      </div>

      {overviewDataError ? (
        <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100/95">
          {overviewDataError}
        </p>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-[rgb(var(--ink-soft))]">
        {a.overviewDisclaimer}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={a.overviewStatContacts} value={contactCount} />
        <StatCard label={a.overviewStatSubs} value={subscriberCount} />
        <StatCard label={a.overviewStatSubsMiles} value={subscriberWithMiles} />
        <StatCard label={a.overviewStatQuestions} value={questionVisibleCount} />
      </div>

      <h2 className="mt-10 text-lg font-semibold text-[rgb(var(--ink))]">
        {a.overviewVisitorsTitle}
      </h2>
      {accessLogQueryFailed ? (
        <p className="mt-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/95">
          {a.overviewAccessLogError}
        </p>
      ) : null}
      <div className="mt-3 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-white/10 bg-black/30">
            <tr>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colDate}
              </th>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colCountry}
              </th>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colPathShort}
              </th>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colReferer}
              </th>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colUa}
              </th>
            </tr>
          </thead>
          <tbody>
            {accessRows.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-[rgb(var(--ink-soft))]">
                  {a.overviewVisitorsEmpty}
                </td>
              </tr>
            ) : (
              accessRows.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-white/5 align-top text-[rgb(var(--ink))]"
                >
                  <td className="p-3 whitespace-nowrap text-xs text-[rgb(var(--ink-soft))]">
                    {r.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="p-3 text-xs">{r.country ?? "—"}</td>
                  <td className="p-3 font-mono text-xs">{r.path}</td>
                  <td className="p-3 max-w-[200px] truncate text-xs text-[rgb(var(--ink-soft))]">
                    {r.referer ?? "—"}
                  </td>
                  <td className="p-3 max-w-[220px] truncate text-xs text-[rgb(var(--ink-soft))]">
                    {r.ua ?? "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-lg font-semibold text-[rgb(var(--ink))]">
        {a.overviewSubsTitle}
      </h2>
      <p className="mt-1 text-xs text-[rgb(var(--ink-soft))]">
        <Link
          href="/privacy"
          className="text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
        >
          Privacy
        </Link>
        {" · "}
        {a.overviewSubsHint}
      </p>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-b border-white/10 bg-black/30">
            <tr>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colSubCreated}
              </th>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colSubName}
              </th>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colSubEmail}
              </th>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colSubMiles}
              </th>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colSubLocale}
              </th>
              <th className="p-3 font-medium text-[rgb(var(--ink-soft))]">
                {a.colSubNudge}
              </th>
            </tr>
          </thead>
          <tbody>
            {reminderRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-[rgb(var(--ink-soft))]">
                  {a.overviewSubsEmpty}
                </td>
              </tr>
            ) : (
              reminderRows.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-white/5 align-top text-[rgb(var(--ink))]"
                >
                  <td className="p-3 whitespace-nowrap text-xs text-[rgb(var(--ink-soft))]">
                    {r.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="p-3">
                    {r.firstName} {r.lastName}
                  </td>
                  <td className="p-3 text-xs">{r.email}</td>
                  <td className="p-3 text-xs">
                    {r.miles != null ? r.miles.toLocaleString("en-US") : "—"}
                  </td>
                  <td className="p-3 text-xs">{r.locale ?? "—"}</td>
                  <td className="p-3 text-xs text-[rgb(var(--ink-soft))]">
                    {r.emailOptOutAt
                      ? a.subOptOut
                      : r.nextNudgeAt
                        ? r.nextNudgeAt
                            .toISOString()
                            .slice(0, 16)
                            .replace("T", " ")
                        : "—"}
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

function StatCard({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-[rgb(var(--ink-soft))]">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-[rgb(var(--ink))]">
        {value === null ? "—" : value}
      </p>
    </div>
  );
}
