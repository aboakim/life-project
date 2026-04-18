/**
 * Per-IP rate limit for Checkout creation.
 *
 * Caveats:
 *  - In-memory (per server instance). For multi-region scale-out, swap
 *    to Redis/Upstash. OK for a single Vercel/Node region MVP.
 *  - Keys derived from forwarded-for + User-Agent hash to reduce
 *    collision across users behind the same NAT.
 *  - Unknown clients (no forwarded headers, no UA) are treated as a
 *    bounded shared bucket with a very low ceiling, rather than one
 *    shared global bucket that any anon could exhaust.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const MAX_UNKNOWN_PER_WINDOW = 3;

const buckets = new Map<string, number[]>();

// Periodically drop stale keys so the map doesn't grow forever on long-running
// serverless containers. Safe no-op if GC never runs before scale-down.
let lastSweepAt = 0;
function sweep(now: number): void {
  if (now - lastSweepAt < WINDOW_MS * 5) return;
  lastSweepAt = now;
  for (const [key, stamps] of buckets) {
    const fresh = stamps.filter((t) => now - t < WINDOW_MS);
    if (fresh.length === 0) buckets.delete(key);
    else buckets.set(key, fresh);
  }
}

function djb2Hash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = (h * 33) ^ input.charCodeAt(i);
  }
  return (h >>> 0).toString(36);
}

export function allowCheckoutRequest(clientKey: string): boolean {
  const now = Date.now();
  sweep(now);

  const prev = buckets.get(clientKey) ?? [];
  const fresh = prev.filter((t) => now - t < WINDOW_MS);

  const isUnknown = clientKey.startsWith("unknown:");
  const ceiling = isUnknown ? MAX_UNKNOWN_PER_WINDOW : MAX_PER_WINDOW;

  if (fresh.length >= ceiling) {
    buckets.set(clientKey, fresh);
    return false;
  }
  fresh.push(now);
  buckets.set(clientKey, fresh);
  return true;
}

/**
 * Extract a best-effort client identity from common proxy headers.
 * Order: x-vercel-forwarded-for (trusted on Vercel) → x-forwarded-for →
 * x-real-ip → hashed User-Agent fallback.
 * "unknown:…" prefix tells the limiter to apply a stricter ceiling.
 */
export function clientKeyFromRequest(req: Request): string {
  const vercel = req.headers.get("x-vercel-forwarded-for");
  if (vercel) return firstIp(vercel);

  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return firstIp(fwd);

  const real = req.headers.get("x-real-ip");
  if (real && real.trim()) return real.trim();

  const ua = req.headers.get("user-agent") ?? "";
  if (ua) return `unknown:ua-${djb2Hash(ua)}`;

  return "unknown:anon";
}

function firstIp(header: string): string {
  const first = header.split(",")[0]?.trim();
  return first && first.length > 0 ? first : "unknown:anon";
}
