import { createHash, randomBytes } from "node:crypto";
import { REFERRAL_CODE_PATTERN } from "@/lib/referral-shared";

export {
  REFERRAL_FREE_HITS,
  REFERRAL_PREMIUM_HITS,
  REFERRAL_VID_COOKIE,
  REFERRAL_CODE_PATTERN,
  normalizeReferralCode,
  type ReferralStatusPayload,
} from "@/lib/referral-shared";

export function generateReferralCode(): string {
  return randomBytes(6).toString("base64url").slice(0, 10);
}

export function hashVisitorKey(ip: string, vid: string): string {
  return createHash("sha256")
    .update(`${vid}|${ip}`)
    .digest("hex")
    .slice(0, 48);
}

/** @deprecated use REFERRAL_CODE_PATTERN from referral-shared — kept for API routes */
export function isValidReferralCodeShape(code: string): boolean {
  return REFERRAL_CODE_PATTERN.test(code);
}
