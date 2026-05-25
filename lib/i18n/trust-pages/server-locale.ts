import { cookies } from "next/headers";
import {
  LDE_LOCALE_COOKIE_NAME,
  localeFromCookieValue,
} from "@/lib/locale-cookie";
import type { AppLocale } from "../locale";

export async function getServerPageLocale(): Promise<AppLocale> {
  const jar = await cookies();
  return localeFromCookieValue(jar.get(LDE_LOCALE_COOKIE_NAME)?.value);
}
