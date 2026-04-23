/**
 * Transactional email via Resend (optional).
 * Without RESEND_API_KEY, notifications are skipped (logged in dev).
 */

export type ContactEmailPayload = {
  expertEmail: string;
  expertName: string;
  clientName: string;
  clientEmail: string;
  message: string;
  locale?: string;
};

export async function sendContactNotifications(
  p: ContactEmailPayload
): Promise<{ expertSent: boolean; clientSent: boolean; skipped: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    "Life Decision Engine <onboarding@resend.dev>";

  if (!key) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        "[email] RESEND_API_KEY not set — skipping expert/client emails"
      );
    }
    return { expertSent: false, clientSent: false, skipped: true };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(key);

  const site =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000";

  const expertText = [
    `New contact request on Life Decision Engine`,
    ``,
    `Expert: ${p.expertName}`,
    `From: ${p.clientName} <${p.clientEmail}>`,
    p.locale ? `Locale: ${p.locale}` : "",
    ``,
    `Message:`,
    p.message,
    ``,
    `— Sent via ${site}`,
  ]
    .filter(Boolean)
    .join("\n");

  const clientText = [
    `Hi ${p.clientName},`,
    ``,
    `We received your message to ${p.expertName}. They may reply to you directly at the email you provided.`,
    ``,
    `Your message:`,
    p.message,
    ``,
    `— Life Decision Engine`,
    site,
  ].join("\n");

  let expertSent = false;
  let clientSent = false;

  try {
    const r1 = await resend.emails.send({
      from,
      to: p.expertEmail,
      subject: `[LDE] New lead from ${p.clientName}`,
      text: expertText,
    });
    expertSent = !r1.error;
    if (r1.error) console.error("[resend expert]", r1.error);
  } catch (e) {
    console.error("[resend expert]", e);
  }

  try {
    const r2 = await resend.emails.send({
      from,
      to: p.clientEmail,
      subject: `We received your message to ${p.expertName}`,
      text: clientText,
    });
    clientSent = !r2.error;
    if (r2.error) console.error("[resend client]", r2.error);
  } catch (e) {
    console.error("[resend client]", e);
  }

  return { expertSent, clientSent, skipped: false };
}

export type ReminderSubscriberEmail = {
  to: string;
  firstName: string;
};

export async function sendDecisionReminderWelcome(
  p: ReminderSubscriberEmail
): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    "Life Decision Engine <onboarding@resend.dev>";
  if (!key) {
    if (process.env.NODE_ENV === "development") {
      console.info("[email] RESEND_API_KEY not set — skipping reminder welcome");
    }
    return false;
  }
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000";
  const text = [
    `Hi ${p.firstName},`,
    ``,
    `Thanks for saving your details for optional reminders from Life Decision Engine.`,
    `We only send email when you’ve explicitly asked: either the optional “come back in about 7 days” choice on the form, or after you pick 3 / 7 / 14 days in the analyzer on this browser. We don’t run a newsletter or bulk promos from this signup.`,
    ``,
    `Open the analyzer: ${site}/analyze`,
    ``,
    `— Life Decision Engine`,
  ].join("\n");
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const r = await resend.emails.send({
      from,
      to: p.to,
      subject: `You’re in — optional decision reminders`,
      text,
    });
    if (r.error) {
      console.error("[resend reminder welcome]", r.error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[resend reminder welcome]", e);
    return false;
  }
}

export async function sendDecisionReminderNudge(
  p: ReminderSubscriberEmail
): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    "Life Decision Engine <onboarding@resend.dev>";
  if (!key) {
    if (process.env.NODE_ENV === "development") {
      console.info("[email] RESEND_API_KEY not set — skipping reminder nudge");
    }
    return false;
  }
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000";
  const text = [
    `Hi ${p.firstName},`,
    ``,
    `You asked for a nudge to revisit a decision. When you're ready, open your workspace and run the analyzer again with an updated brief:`,
    ``,
    `${site}/analyze`,
    ``,
    `— Life Decision Engine`,
  ].join("\n");
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const r = await resend.emails.send({
      from,
      to: p.to,
      subject: `Time for a second look? — Life Decision Engine`,
      text,
    });
    if (r.error) {
      console.error("[resend reminder nudge]", r.error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[resend reminder nudge]", e);
    return false;
  }
}
