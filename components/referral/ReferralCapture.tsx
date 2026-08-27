"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getStoredReferralCode } from "@/lib/referral-storage";

/**
 * Records ?ref= visits for share-to-unlock, then strips ref from the URL.
 */
export default function ReferralCapture() {
  const searchParams = useSearchParams();
  const pathname = usePathname() || "/";
  const router = useRouter();

  useEffect(() => {
    const ref = searchParams.get("ref")?.trim();
    if (!ref) return;

    const ownerCode = getStoredReferralCode();
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (ownerCode) headers["x-lde-owner-code"] = ownerCode;

    void fetch("/api/referral/hit", {
      method: "POST",
      headers,
      body: JSON.stringify({ code: ref }),
      credentials: "same-origin",
    }).catch(() => {
      /* ignore */
    });

    const next = new URLSearchParams(searchParams.toString());
    next.delete("ref");
    const q = next.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}
