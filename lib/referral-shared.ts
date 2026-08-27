/** Shared referral constants — safe for client and server bundles. */

export const REFERRAL_FREE_HITS = 5;
export const REFERRAL_PREMIUM_HITS = 20;
export const REFERRAL_VID_COOKIE = "lde-vid";
export const REFERRAL_CODE_PATTERN = /^[a-zA-Z0-9_-]{6,32}$/;

export function normalizeReferralCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const code = raw.trim();
  if (!REFERRAL_CODE_PATTERN.test(code)) return null;
  return code;
}

export type ReferralStatusPayload = {
  code: string;
  count: number;
  freeUnlocked: boolean;
  premiumUnlocked: boolean;
  freeNeeded: number;
  premiumNeeded: number;
};

/** Open package Free/Premium gate (DecisionStudio listens). */
export const PACKAGE_GATE_EVENT = "lde-open-package-gate";
