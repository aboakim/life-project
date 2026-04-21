/**
 * Fail fast with a clear message if DATABASE_URL is missing (e.g. Vercel env not set).
 * Prisma would otherwise error with P1012 on schema validation.
 */
const v = process.env.DATABASE_URL?.trim();
if (!v) {
  console.error(`
[build] DATABASE_URL is not set.

1) Create a free Postgres DB at https://neon.tech and copy the connection string.
2) In Vercel: Project → Settings → Environment Variables → add DATABASE_URL
   (Production + Preview if you deploy previews).
3) Redeploy.

See docs/DEPLOY_CHECKLIST.md
`);
  process.exit(1);
}
