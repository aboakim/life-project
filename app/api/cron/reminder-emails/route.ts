import { NextResponse } from "next/server";
import { sendDecisionReminderNudge } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Send due nudge emails. Call from Vercel Cron (GET) or manually with
 * `Authorization: Bearer <CRON_SECRET>`.
 */
export async function GET(req: Request) {
  const isVercelCron = req.headers.get("x-vercel-cron") === "1";
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET?.trim();
  const bearerOk =
    secret && auth === `Bearer ${secret}`;
  if (!isVercelCron && !bearerOk) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const due = await prisma.decisionReminderSubscriber.findMany({
    where: {
      nextNudgeAt: { lte: now },
    },
    take: 50,
    orderBy: { nextNudgeAt: "asc" },
  });

  let sent = 0;
  for (const row of due) {
    const result = await sendDecisionReminderNudge({
      to: row.email,
      firstName: row.firstName,
    });
    if (result.ok) {
      await prisma.decisionReminderSubscriber.update({
        where: { id: row.id },
        data: { nextNudgeAt: null },
      });
      sent += 1;
    } else {
      console.error(
        "[cron reminder-emails] nudge failed for",
        row.email,
        result.error,
      );
    }
  }

  return NextResponse.json({ ok: true, processed: due.length, sent });
}
