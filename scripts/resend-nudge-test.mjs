/**
 * One-off: send the 7-day nudge copy via Resend (same body as lib/email sendDecisionReminderNudge).
 * Usage: node scripts/resend-nudge-test.mjs you@email.com FirstName
 * Loads .env.local or .env from project root (KEY=VALUE lines, no export).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadDotenv(name) {
  const p = path.join(root, name);
  if (!fs.existsSync(p)) return;
  const raw = fs.readFileSync(p, "utf8");
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (!process.env[k]) process.env[k] = v;
  }
}

loadDotenv(".env.local");
loadDotenv(".env");

const to = process.argv[2]?.trim() || "albertakimyan1@gmail.com";
const firstName = process.argv[3]?.trim() || "Albert";
const key = process.env.RESEND_API_KEY?.trim();
const from =
  process.env.RESEND_FROM_EMAIL?.trim() ||
  "Life Decision Engine <onboarding@resend.dev>";
const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://lifedecisions.space")
  .replace(/\/$/, "");

const text = [
  `Hi ${firstName},`,
  ``,
  `What if you're making the wrong decision?`,
  ``,
  `Not right now… but the one that could affect your next few years.`,
  ``,
  `Most people realize it too late.`,
  ``,
  `You have a chance to see it in advance.`,
  ``,
  `Your decision is still here—`,
  `ready to show you what happens next.`,
  ``,
  `Try it now👇`,
  `${base}/`,
  ``,
  `— Life Decision Engine`,
].join("\n");

const subject = `What if you're making the wrong decision? — Life Decision Engine`;

if (!key) {
  console.error(
    "No RESEND_API_KEY in .env.local or .env. Add it, or use Admin → Diagnostics on the deployed site.",
  );
  process.exit(1);
}

const res = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to: [to],
    subject,
    text,
  }),
});

const body = await res.json().catch(() => ({}));
console.log("HTTP", res.status, JSON.stringify(body, null, 2));
const ok = res.ok && (body.data?.id || body.id);
process.exit(ok ? 0 : 1);
