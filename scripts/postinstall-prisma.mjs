/**
 * Skip prisma generate when DATABASE_URL is unset (e.g. local npm ci without .env).
 * Vercel production must set DATABASE_URL — build runs prisma generate again.
 */
import { spawnSync } from "node:child_process";

if (!process.env.DATABASE_URL?.trim()) {
  console.warn(
    "[postinstall] DATABASE_URL unset — skipping prisma generate. Set .env for local dev; Vercel needs DATABASE_URL in project env."
  );
  process.exit(0);
}

const r = spawnSync("npx", ["prisma", "generate"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});
process.exit(r.status === 0 ? 0 : 1);
