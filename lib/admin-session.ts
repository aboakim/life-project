import { cookies } from "next/headers";
import { readAdminSecret } from "@/lib/admin-env";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-cookie";

export type AdminGate = "missing_secret" | "unauthorized" | { ok: true };

export async function getAdminGate(): Promise<AdminGate> {
  const secret = readAdminSecret();
  if (!secret) return "missing_secret";
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminToken(token, secret)) return "unauthorized";
  return { ok: true };
}
