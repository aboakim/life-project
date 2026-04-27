/**
 * Load `adsbygoogle.js` once (client-only). Removes the need for a global
 * render-blocking/ad-heavy script tag on pages that never show ads.
 */

const SCRIPT_MARK = "data-lde-adsbygoogle-loader";

export function scheduleIdle(
  callback: () => void,
  opts?: { idleTimeoutMs?: number; fallbackDelayMs?: number },
): void {
  if (typeof window === "undefined") return;
  const idleTimeoutMs = opts?.idleTimeoutMs ?? 2800;
  const fallbackDelayMs = opts?.fallbackDelayMs ?? 1200;
  const w = window as Window &
    typeof globalThis & {
      requestIdleCallback?: (
        cb: IdleRequestCallback,
        opts?: IdleRequestOptions,
      ) => number;
    };
  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(() => callback(), { timeout: idleTimeoutMs });
    return;
  }
  window.setTimeout(callback, fallbackDelayMs);
}

export function ensureAdsbygoogleScript(clientId: string): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();

  const already =
    document.querySelector(`script[${SCRIPT_MARK}]`) ??
    document.querySelector(
      'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]',
    );
  if (already) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.setAttribute(SCRIPT_MARK, "1");
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
    s.onload = () => resolve();
    s.onerror = () =>
      reject(new Error("Could not load Google AdSense script."));
    document.head.appendChild(s);
  });
}
