import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Constant-time string equality via SHA-256 (same length digests) — for admin
 * password / secret comparison, reducing timing side channels vs raw ===
 */
export function safeEqualString(a: string, b: string): boolean {
  const da = createHash("sha256").update(a, "utf8").digest();
  const db = createHash("sha256").update(b, "utf8").digest();
  if (da.length !== db.length) {
    return false;
  }
  return timingSafeEqual(da, db);
}
