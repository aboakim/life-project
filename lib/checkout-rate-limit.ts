/**
 * Simple in-memory rate limit for Checkout creation (per server instance).
 * Production at scale: use Redis / Upstash or edge middleware with shared store.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

const buckets = new Map<string, number[]>();

export function allowCheckoutRequest(clientKey: string): boolean {
  const now = Date.now();
  const prev = buckets.get(clientKey) ?? [];
  const fresh = prev.filter((t) => now - t < WINDOW_MS);
  if (fresh.length >= MAX_PER_WINDOW) {
    buckets.set(clientKey, fresh);
    return false;
  }
  fresh.push(now);
  buckets.set(clientKey, fresh);
  return true;
}

export function clientKeyFromRequest(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}
