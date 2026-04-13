"use client";

import { Analytics } from "@vercel/analytics/react";

/** Avoids dev-only issues with analytics on some setups; production/Vercel still tracked. */
export default function AnalyticsGate() {
  if (process.env.NODE_ENV !== "production") return null;
  return <Analytics />;
}
