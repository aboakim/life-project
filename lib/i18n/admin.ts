import type { AppLocale } from "@/lib/i18n/locale";

export type AdminUiCopy = {
  pageTitle: string;
  pageSubtitle: string;
  navRequests: string;
  navOverview: string;
  navDiagnostics: string;
  overviewTitle: string;
  overviewSubtitle: string;
  overviewDisclaimer: string;
  overviewStatContacts: string;
  overviewStatSubs: string;
  overviewStatSubsMiles: string;
  overviewStatQuestions: string;
  overviewVisitorsTitle: string;
  overviewVisitorsEmpty: string;
  overviewAccessLogError: string;
  overviewSubsTitle: string;
  overviewSubsHint: string;
  overviewSubsEmpty: string;
  colPathShort: string;
  colCountry: string;
  colReferer: string;
  colUa: string;
  colSubCreated: string;
  colSubName: string;
  colSubEmail: string;
  colSubMiles: string;
  colSubLocale: string;
  colSubNudge: string;
  subOptOut: string;
  diagnosticsTitle: string;
  diagnosticsSubtitle: string;
  diagnosticsSecretLabel: string;
  diagnosticsLogsHint: string;
  diagnosticsViewLogs: string;
  diagnosticsNoLogsUrl: string;
  diagnosticsOpenAi: string;
  diagnosticsResend: string;
  diagnosticsStripe: string;
  diagnosticsDatabase: string;
  diagnosticsConfigured: string;
  diagnosticsMissing: string;
  colDate: string;
  colExpert: string;
  colFrom: string;
  colMessage: string;
  empty: string;
  adminDataError: string;
  secretMissing: string;
  loginTitle: string;
  loginHint: string;
  signIn: string;
  signingIn: string;
  loginFailed: string;
  networkError: string;
  unauthorized: string;
  logOut: string;
  diagnosticsTestEmailTitle: string;
  diagnosticsTestEmailHint: string;
  diagnosticsTestEmail: string;
  diagnosticsTestFirstName: string;
  diagnosticsSendTestWelcome: string;
  diagnosticsSendLatest: string;
  diagnosticsSendNudge: string;
  diagnosticsTestSending: string;
  diagnosticsTestSent: string;
  diagnosticsTestFailed: string;
  diagnosticsTestNoResend: string;
  diagnosticsTestNoSubscribers: string;
  diagnosticsTestEmailRequired: string;
};

const enUS: AdminUiCopy = {
  pageTitle: "Contact requests",
  pageSubtitle:
    "Expert leads (latest 200). Emails also sent via Resend when configured.",
  navRequests: "Expert leads",
  navOverview: "Overview",
  navDiagnostics: "Diagnostics",
  overviewTitle: "Site overview",
  overviewSubtitle:
    "Counts from your database, reminder subscribers (with miles), and recent page GETs when access logging is enabled.",
  overviewDisclaimer:
    "Access rows are written from Edge middleware using Vercel’s x-vercel-ip-country (when present), path, referer, and a short User-Agent. Set SITE_ACCESS_LOG_SECRET (≥16 chars) on the host to enable logging; without it, no rows are stored. Prune old SiteAccessLog rows periodically if traffic is high.",
  overviewStatContacts: "Contact requests (all time)",
  overviewStatSubs: "Reminder subscribers",
  overviewStatSubsMiles: "Subscribers with miles saved",
  overviewStatQuestions: "Community questions (visible)",
  overviewVisitorsTitle: "Recent visits (latest 400)",
  overviewVisitorsEmpty:
    "No access rows yet. After deploy, set SITE_ACCESS_LOG_SECRET and redeploy; new document GETs will appear here (not prefetch/RSC fetches).",
  overviewAccessLogError:
    "Visit log query failed — run `prisma migrate deploy` on this database (SiteAccessLog table) or check DATABASE_URL.",
  overviewSubsTitle: "Reminder subscribers (latest 150)",
  overviewSubsHint:
    "PII — keep ADMIN_SECRET private. nextNudgeAt shows the scheduled optional email time when set.",
  overviewSubsEmpty: "No reminder subscribers yet.",
  colPathShort: "Path",
  colCountry: "Country",
  colReferer: "Referer",
  colUa: "User-Agent",
  colSubCreated: "Created",
  colSubName: "Name",
  colSubEmail: "Email",
  colSubMiles: "Miles",
  colSubLocale: "Locale",
  colSubNudge: "Next nudge / opt-out",
  subOptOut: "opted out",
  diagnosticsTitle: "Integration status",
  diagnosticsSubtitle:
    "Booleans only — API keys and secrets are never shown. Full stack traces and provider errors appear in your deployment logs.",
  diagnosticsSecretLabel: "Environment",
  diagnosticsLogsHint:
    "Set VERCEL_DASHBOARD_LOGS_URL or ADMIN_LOGS_URL to a direct link to this project’s runtime logs (Vercel / other host).",
  diagnosticsViewLogs: "Open deployment logs",
  diagnosticsNoLogsUrl:
    "No logs URL configured. Add VERCEL_DASHBOARD_LOGS_URL or ADMIN_LOGS_URL in environment variables.",
  diagnosticsOpenAi: "OpenAI (analysis)",
  diagnosticsResend: "Resend (expert contact email)",
  diagnosticsStripe: "Stripe (billing webhook)",
  diagnosticsDatabase: "Database (Prisma)",
  diagnosticsConfigured: "Configured",
  diagnosticsMissing: "Not set",
  colDate: "Date",
  colExpert: "Expert",
  colFrom: "From",
  colMessage: "Message",
  empty: "No requests yet.",
  adminDataError:
    "Could not load contact requests from the database. Check DATABASE_URL, run migrations, and see deployment logs.",
  secretMissing:
    "Set ADMIN_SECRET in your host (at least 16 characters), save it, then redeploy Production. If you already added it, open Vercel → Deployments → your latest Production deployment → Redeploy.",
  loginTitle: "Admin sign-in",
  loginHint: "Enter the server ADMIN_SECRET.",
  signIn: "Sign in",
  signingIn: "…",
  loginFailed: "Login failed",
  networkError: "Network error",
  unauthorized: "Unauthorized",
  logOut: "Log out",
  diagnosticsTestEmailTitle: "Send a test reminder email (Resend)",
  diagnosticsTestEmailHint:
    "Sends the same “welcome / optional reminders” message users get when they subscribe. Confirm RESEND_API_KEY and RESEND_FROM_EMAIL on the host.",
  diagnosticsTestEmail: "Recipient email",
  diagnosticsTestFirstName: "First name (salutation)",
  diagnosticsSendTestWelcome: "Send test email",
  diagnosticsSendLatest: "Send to latest DB subscriber",
  diagnosticsSendNudge: "Send 7-day nudge (current copy)",
  diagnosticsTestSending: "Sending…",
  diagnosticsTestSent: "Sent. Check the inbox (and spam).",
  diagnosticsTestFailed: "Failed — see server logs. Is Resend configured?",
  diagnosticsTestNoResend: "Resend is not configured — set RESEND_API_KEY first.",
  diagnosticsTestNoSubscribers: "No rows in decision reminder table.",
  diagnosticsTestEmailRequired: "Enter a recipient email first.",
};

const hy: AdminUiCopy = {
  pageTitle: "Կապի հարցումներ",
  pageSubtitle:
    "Մասնագետների հարցումներ (վերջին 200)։ Նամակները Resend-ով, եթե կարգավորված է։",
  navRequests: "Մասնագետների հարցումներ",
  navOverview: "Ընդհանուր",
  navDiagnostics: "Դիագնոստիկա",
  overviewTitle: "Կայքի ընդհանուր պատկեր",
  overviewSubtitle:
    "Թվեր տվյալների բազայից, հիշեցման բաժանորդներ (մայլերով) և վերջին page GET-երը, երբ մուտքերի գրանցումը միացված է։",
  overviewDisclaimer:
    "Մուտքերի տողերը գրում է Edge middleware-ը՝ օգտագործելով Vercel-ի x-vercel-ip-country (երբ կա), path, referer և կարճ User-Agent։ HOST-ում սահմանեք SITE_ACCESS_LOG_SECRET (≥16 նիշ)՝ գրանցումը միացնելու համար, առանց դրա տողեր չեն պահվում։ Բարձր տրաֆիկի դեպքում պարբերաբար մաքրեք հին SiteAccessLog տողերը։",
  overviewStatContacts: "Կապի հարցումներ (ընդամենը)",
  overviewStatSubs: "Հիշեցման բաժանորդներ",
  overviewStatSubsMiles: "Մայլ պահած բաժանորդներ",
  overviewStatQuestions: "Համայնքի հարցեր (տեսանելի)",
  overviewVisitorsTitle: "Վերջին այցելություններ (400)",
  overviewVisitorsEmpty:
    "Դեռ մուտքի տող չկա։ Deploy-ից հետո ավելացրեք SITE_ACCESS_LOG_SECRET և նորից deploy — նոր document GET-երը կերևան (ոչ prefetch/RSC)։",
  overviewAccessLogError:
    "Մուտքերի աղյուսակը չի բացվել — գործարկեք prisma migrate deploy այս տվյալների բազայում (SiteAccessLog) կամ ստուգեք DATABASE_URL։",
  overviewSubsTitle: "Հիշեցման բաժանորդներ (150)",
  overviewSubsHint:
    "Անձնական տվյալներ — ADMIN_SECRET-ը գաղտնի պահեք։ nextNudgeAt-ը՝ հաջորդ ընտրովի նամակի ժամ, եթե կա։",
  overviewSubsEmpty: "Դեռ բաժանորդներ չկան։",
  colPathShort: "Ճանապարհ",
  colCountry: "Երկիր",
  colReferer: "Referer",
  colUa: "User-Agent",
  colSubCreated: "Ստեղծված",
  colSubName: "Անուն",
  colSubEmail: "Էլ. փոստ",
  colSubMiles: "Մայլ",
  colSubLocale: "Լոկալ",
  colSubNudge: "Հաջորդ nudge / opt-out",
  subOptOut: "հրաժարված",
  diagnosticsTitle: "Ինտեգրացիայի կարգավիճակ",
  diagnosticsSubtitle:
    "Միայն այո/ոչ — API բանալիները երբեք ցուցադրվում չեն։ Մանրամասն սխալները՝ deployment լոգերում։",
  diagnosticsSecretLabel: "Միջավայր",
  diagnosticsLogsHint:
    "Ավելացրեք VERCEL_DASHBOARD_LOGS_URL կամ ADMIN_LOGS_URL՝ ուղիղ հղում դեպի runtime լոգեր (Vercel կամ այլ հոսթ)։",
  diagnosticsViewLogs: "Բացել deployment լոգերը",
  diagnosticsNoLogsUrl:
    "Լոգերի հղում չկա։ Ավելացրեք VERCEL_DASHBOARD_LOGS_URL կամ ADMIN_LOGS_URL։",
  diagnosticsOpenAi: "OpenAI (վերլուծություն)",
  diagnosticsResend: "Resend (մասնագետի նամակ)",
  diagnosticsStripe: "Stripe (ապառիչ)",
  diagnosticsDatabase: "Տվյալների բազա (Prisma)",
  diagnosticsConfigured: "Կա",
  diagnosticsMissing: "Չկա",
  colDate: "Ամսաթիվ",
  colExpert: "Մասնագետ",
  colFrom: "Ումից",
  colMessage: "Հաղորդագրություն",
  empty: "Դեռ հարցումներ չկան։",
  adminDataError:
    "Կապի հարցումները չեն բացվել տվյալների բազայից։ Ստուգեք DATABASE_URL, migration-ները և deployment լոգերը։",
  secretMissing:
    "Սահմանեք ADMIN_SECRET հոսթում (առնվազն 16 նիշ), պահեք, ապա Production-ը նորից deploy արեք։ Եթե արդեն եք ավելացրել՝ Vercel → Deployments → վերջին Production deploy → Redeploy։",
  loginTitle: "Ադմին մուտք",
  loginHint: "Մուտքագրեք սերվերի ADMIN_SECRET-ը։",
  signIn: "Մուտք",
  signingIn: "…",
  loginFailed: "Մուտքը ձախողվեց",
  networkError: "Ցանցի սխալ",
  unauthorized: "Մուտքը մերժված է",
  logOut: "Ելք",
  diagnosticsTestEmailTitle: "Թեստ նամակ (Resend)",
  diagnosticsTestEmailHint:
    "Ուղարկում է user-ին հասանելի «welcome / optional reminders» հաղորդագրությունը։ Վստահ եղեք, որ RESEND_API_KEY և RESEND_FROM_EMAIL կան հոսթում։",
  diagnosticsTestEmail: "Ստացողի էլ. փոստ",
  diagnosticsTestFirstName: "Անուն (դիմելու համար)",
  diagnosticsSendTestWelcome: "Ուղարկել թեստ նամակ",
  diagnosticsSendLatest: "Ուղարկել վերջին գրանցվածին (DB)",
  diagnosticsSendNudge: "Ուղարկել 7օրյա nudge (ներկա տեքստ)",
  diagnosticsTestSending: "Ուղարկում…",
  diagnosticsTestSent: "Ուղարկվեց։ Ստուգի inbox-ը (և spam)։",
  diagnosticsTestFailed: "Չստացվեց — նայիր սերվերի լոգեր։ Resend-ը կարգավորվա՞ծ է։",
  diagnosticsTestNoResend: "Resend-ը չի կարգավորված — ավելացրու RESEND_API_KEY։",
  diagnosticsTestNoSubscribers: "Հիշեցման աղյուսակում տող չկա։",
  diagnosticsTestEmailRequired: "Նախ լրացրու ստացողի էլ․ փոստը։",
};

export function getAdminUi(locale: AppLocale): AdminUiCopy {
  if (locale === "hy") return hy;
  return enUS;
}
