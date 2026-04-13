import type { NextRequest } from "next/server";

export function getClientIp(req: Request | NextRequest): string {
  const h = req.headers;
  const xf = h.get("x-forwarded-for");
  if (xf) {
    const first = xf.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = h.get("x-real-ip");
  if (real?.trim()) return real.trim();
  return "unknown";
}
