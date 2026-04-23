import type { AppLocale } from "@/lib/i18n/locale";

export type AdminUiCopy = {
  pageTitle: string;
  pageSubtitle: string;
  navDiagnostics: string;
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
  diagnosticsTestSending: string;
  diagnosticsTestSent: string;
  diagnosticsTestFailed: string;
  diagnosticsTestNoResend: string;
  diagnosticsTestNoSubscribers: string;
};

const enUS: AdminUiCopy = {
  pageTitle: "Contact requests",
  pageSubtitle:
    "Expert leads (latest 200). Emails also sent via Resend when configured.",
  navDiagnostics: "Diagnostics",
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
  secretMissing:
    "Set ADMIN_SECRET in your host (at least 16 characters), save it, then redeploy Production. If you already added it, open Vercel → Deployments → your latest Production deployment → Redeploy.",
  loginTitle: "Admin — contact requests",
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
  diagnosticsTestSending: "Sending…",
  diagnosticsTestSent: "Sent. Check the inbox (and spam).",
  diagnosticsTestFailed: "Failed — see server logs. Is Resend configured?",
  diagnosticsTestNoResend: "Resend is not configured — set RESEND_API_KEY first.",
  diagnosticsTestNoSubscribers: "No rows in decision reminder table.",
};

const hy: AdminUiCopy = {
  pageTitle: "Կապի հարցումներ",
  pageSubtitle:
    "Մասնագետների հարցումներ (վերջին 200)։ Նամակները Resend-ով, եթե կարգավորված է։",
  navDiagnostics: "Դիագնոստիկա",
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
  secretMissing:
    "Սահմանեք ADMIN_SECRET հոսթում (առնվազն 16 նիշ), պահեք, ապա Production-ը նորից deploy արեք։ Եթե արդեն եք ավելացրել՝ Vercel → Deployments → վերջին Production deploy → Redeploy։",
  loginTitle: "Ադմին — կապի հարցումներ",
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
  diagnosticsTestSending: "Ուղարկում…",
  diagnosticsTestSent: "Ուղարկվեց։ Ստուգի inbox-ը (և spam)։",
  diagnosticsTestFailed: "Չստացվեց — նայիր սերվերի լոգեր։ Resend-ը կարգավորվա՞ծ է։",
  diagnosticsTestNoResend: "Resend-ը չի կարգավորված — ավելացրու RESEND_API_KEY։",
  diagnosticsTestNoSubscribers: "Հիշեցման աղյուսակում տող չկա։",
};

export function getAdminUi(locale: AppLocale): AdminUiCopy {
  if (locale === "hy") return hy;
  return enUS;
}
