import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-cookie";
import { sendDecisionReminderNudge, sendDecisionReminderWelcome } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type Body = {
  to?: string;
  firstName?: string;
  useLatestSubscriber?: boolean;
  /** @default "welcome" — "nudge" = 7-day copy (`sendDecisionReminderNudge`) */
  template?: "welcome" | "nudge";
};

function validEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export async function POST(req: Request) {
  const secret = process.env.ADMIN_SECRET;
  const store = await cookies();
  const auth = req.headers.get("authorization");
  const bearer =
    auth?.startsWith("Bearer ") ? auth.slice(7).trim() : undefined;
  const token = store.get(ADMIN_COOKIE_NAME)?.value ?? bearer;
  if (!verifyAdminToken(token, secret)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY?.trim()) {
    return NextResponse.json({ error: "resend_not_configured" }, { status: 400 });
  }

  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const base =
    (process.env.NEXT_PUBLIC_SITE_URL ?? "https://lifedecisions.space").replace(
      /\/$/,
      "",
    );

  let to: string | undefined;
  let firstName = (body.firstName?.trim() || "there").slice(0, 80);
  let unsubscribeUrl: string | undefined;

  if (body.useLatestSubscriber) {
    try {
      const row = await prisma.decisionReminderSubscriber.findFirst({
        orderBy: { updatedAt: "desc" },
        select: { email: true, firstName: true, unsubscribeToken: true },
      });
      if (!row) {
        return NextResponse.json({ error: "no_subscriber" }, { status: 400 });
      }
      to = row.email;
      firstName = row.firstName;
      if (row.unsubscribeToken) {
        unsubscribeUrl = `${base}/api/reminder-unsubscribe?t=${encodeURIComponent(row.unsubscribeToken)}`;
      }
    } catch (e) {
      console.error("[test-reminder-email] db", e);
      return NextResponse.json({ error: "db_unavailable" }, { status: 503 });
    }
  } else {
    to = body.to?.trim();
    if (!to || !validEmail(to)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
  }

  const template = body.template === "nudge" ? "nudge" : "welcome";
  const result =
    template === "nudge"
      ? await sendDecisionReminderNudge({ to, firstName, unsubscribeUrl })
      : await sendDecisionReminderWelcome({ to, firstName, unsubscribeUrl });
  if (!result.ok) {
    return NextResponse.json(
      { error: "send_failed", detail: result.error },
      { status: 502 },
    );
  }
  return NextResponse.json({
    ok: true as const,
    template,
    resendId: result.resendId,
  });
}
