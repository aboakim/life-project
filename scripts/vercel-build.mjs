/**
 * Vercel / CI build: Prisma needs a syntactically valid DATABASE_URL for `prisma generate`
 * even when no DB is reachable. If unset, we use a placeholder and skip `migrate deploy`.
 * When you add a real Neon URL in Vercel → Environment Variables, migrations run on deploy.
 */
import { spawnSync } from "node:child_process";

const PLACEHOLDER =
  "postgresql://build:build@127.0.0.1:5432/build?schema=public";

const raw = process.env.DATABASE_URL?.trim();
const skipMigrate = !raw;

if (skipMigrate) {
  process.env.DATABASE_URL = PLACEHOLDER;
  console.warn(
    "\n[build] DATABASE_URL is not set — using a placeholder for prisma generate only.\n" +
      "    → Skipping prisma migrate deploy. Community/DB features need a real URL.\n" +
      "    → Vercel: Settings → Environment Variables → DATABASE_URL = Neon connection string.\n"
  );
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run("npx", ["prisma", "generate"]);
if (!skipMigrate) {
  run("npx", ["prisma", "migrate", "deploy"]);
}
run("npx", ["next", "build"]);
