/**
 * Cloudflare Turnstile server verification.
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
}

/**
 * Turnstile is only enforceable when the browser can render the widget (public site key)
 * and the server can verify the token (secret). If only the secret is set in production,
 * the client would show no widget and every subscribe would fail — avoid that.
 */
export function isTurnstileEnforced(): boolean {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY?.trim() &&
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim(),
  );
}

export async function verifyTurnstileToken(
  token: string,
  remoteip: string | undefined,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    if (
      process.env.NODE_ENV === "development" &&
      process.env.REMINDER_SKIP_CAPTCHA === "1"
    ) {
      return true;
    }
    /* When Turnstile is off, /api/reminder-subscribe uses consent + honeypot instead. */
    return false;
  }
  if (!token.trim()) {
    return false;
  }
  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteip) body.set("remoteip", remoteip);
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}
