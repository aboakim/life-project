import type { AppLocale } from "@/lib/i18n/locale";

export type AdminUiCopy = {
  pageTitle: string;
  pageSubtitle: string;
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
};

const enUS: AdminUiCopy = {
  pageTitle: "Contact requests",
  pageSubtitle:
    "Expert leads (latest 200). Emails also sent via Resend when configured.",
  colDate: "Date",
  colExpert: "Expert",
  colFrom: "From",
  colMessage: "Message",
  empty: "No requests yet.",
  secretMissing:
    "Set ADMIN_SECRET in environment (at least 16 characters) and redeploy.",
  loginTitle: "Admin — contact requests",
  loginHint: "Enter the server ADMIN_SECRET.",
  signIn: "Sign in",
  signingIn: "…",
  loginFailed: "Login failed",
  networkError: "Network error",
  unauthorized: "Unauthorized",
  logOut: "Log out",
};

const hy: AdminUiCopy = {
  pageTitle: "Կապի հարցումներ",
  pageSubtitle:
    "Մասնագետների հարցումներ (վերջին 200)։ Նամակները Resend-ով, եթե կարգավորված է։",
  colDate: "Ամսաթիվ",
  colExpert: "Մասնագետ",
  colFrom: "Ումից",
  colMessage: "Հաղորդագրություն",
  empty: "Դեռ հարցումներ չկան։",
  secretMissing:
    "Սահմանեք ADMIN_SECRET միջավայրում (առնվազն 16 նիշ) և նորից deploy արեք։",
  loginTitle: "Ադմին — կապի հարցումներ",
  loginHint: "Մուտքագրեք սերվերի ADMIN_SECRET-ը։",
  signIn: "Մուտք",
  signingIn: "…",
  loginFailed: "Մուտքը ձախողվեց",
  networkError: "Ցանցի սխալ",
  unauthorized: "Մուտքը մերժված է",
  logOut: "Ելք",
};

export function getAdminUi(locale: AppLocale): AdminUiCopy {
  if (locale === "hy") return hy;
  return enUS;
}
