import { createHash, randomBytes } from "node:crypto";

export const REFERRAL_FREE_HITS = 5;
export const REFERRAL_PREMIUM_HITS = 20;
export const REFERRAL_VID_COOKIE = "lde-vid";
export const REFERRAL_CODE_PATTERN = /^[a-zA-Z0-9_-]{6,32}$/;

export function generateReferralCode(): string {
  return randomBytes(6).toString("base64url").slice(0, 10);
}

export function normalizeReferralCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const code = raw.trim();
  if (!REFERRAL_CODE_PATTERN.test(code)) return null;
  return code;
}

export function hashVisitorKey(ip: string, vid: string): string {
  return createHash("sha256")
    .update(`${vid}|${ip}`)
    .digest("hex")
    .slice(0, 48);
}

export type ReferralStatusPayload = {
  code: string;
  count: number;
  freeUnlocked: boolean;
  premiumUnlocked: boolean;
  freeNeeded: number;
  premiumNeeded: number;
};
