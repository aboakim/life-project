"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { resolvePageTheme } from "@/lib/page-theme";

/** Keeps `data-page-theme` on <html> in sync during client navigations. */
export default function PageThemeBridge() {
  const pathname = usePathname();

  useEffect(() => {
    const theme = resolvePageTheme(pathname);
    document.documentElement.setAttribute("data-page-theme", theme);
  }, [pathname]);

  return null;
}
