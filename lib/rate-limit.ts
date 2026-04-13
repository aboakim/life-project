/**
 * Fixed-window rate limiter (in-memory). One Node process only — for serverless
 * at scale, use Redis/Upstash. Good enough for SQLite MVP on a single instance.
 */
type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

export function rateLimitAllow(
  key: string,
  max: number,
  windowMs: number
): boolean {
  const now = Date.now();
  if (store.size > 4000) {
    for (const [k, b] of store) {
      if (now >= b.resetAt) store.delete(k);
    }
  }
  let b = store.get(key);
  if (!b || now >= b.resetAt) {
    b = { count: 1, resetAt: now + windowMs };
    store.set(key, b);
    return true;
  }
  if (b.count >= max) return false;
  b.count += 1;
  return true;
}
