"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ROUTES = [
  "/experts",
  "/community",
  "/pricing",
  "/monetize",
  "/privacy",
  "/terms",
  "/about",
  "/contact",
  "/blog",
  "/faq",
  "/field-notes",
  "/editorial-team",
  "/editorial-standards",
  "/experts/register",
] as const;

/**
 * Warm common nav targets after paint so production navigations feel instant.
 * In development, Next may still compile on first visit; pair with route `loading.tsx`.
 */
export default function NavRoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      for (const href of ROUTES) {
        try {
          router.prefetch(href);
        } catch {
          /* ignore */
        }
      }
    };

    const w = typeof window !== "undefined" ? window : undefined;
    let handle: number | ReturnType<typeof setTimeout>;
    if (w && "requestIdleCallback" in w) {
      handle = w.requestIdleCallback(run, { timeout: 2000 });
    } else {
      handle = setTimeout(run, 400);
    }

    return () => {
      cancelled = true;
      if (w && typeof handle === "number" && "cancelIdleCallback" in w) {
        w.cancelIdleCallback(handle as number);
      } else {
        clearTimeout(handle as ReturnType<typeof setTimeout>);
      }
    };
  }, [router]);

  return null;
}
