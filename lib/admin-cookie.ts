import { createHmac, timingSafeEqual } from "node:crypto";

const PAYLOAD = "lde-admin-v1";
const COOKIE = "lde_admin_token";

export { COOKIE as ADMIN_COOKIE_NAME };

export function signAdminToken(adminSecret: string): string {
  return createHmac("sha256", adminSecret).update(PAYLOAD).digest("hex");
}

export function verifyAdminToken(
  token: string | undefined,
  adminSecret: string | undefined
): boolean {
  if (!token || !adminSecret) return false;
  const a = signAdminToken(adminSecret);
  if (a.length !== token.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a, "utf8"), Buffer.from(token, "utf8"));
  } catch {
    return false;
  }
}
