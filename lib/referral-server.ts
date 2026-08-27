import { prisma } from "@/lib/prisma";
import {
  REFERRAL_FREE_HITS,
  REFERRAL_PREMIUM_HITS,
  type ReferralStatusPayload,
} from "@/lib/referral";

export async function getReferralStatus(
  code: string,
): Promise<ReferralStatusPayload | null> {
  const owner = await prisma.referralOwner.findUnique({
    where: { code },
    include: { _count: { select: { hits: true } } },
  });
  if (!owner) return null;

  const count = owner._count.hits;
  const now = new Date();
  let freeUnlockedAt = owner.freeUnlockedAt;
  let premiumUnlockedAt = owner.premiumUnlockedAt;

  const patch: {
    freeUnlockedAt?: Date;
    premiumUnlockedAt?: Date;
  } = {};
  if (!freeUnlockedAt && count >= REFERRAL_FREE_HITS) {
    freeUnlockedAt = now;
    patch.freeUnlockedAt = now;
  }
  if (!premiumUnlockedAt && count >= REFERRAL_PREMIUM_HITS) {
    premiumUnlockedAt = now;
    patch.premiumUnlockedAt = now;
  }
  if (Object.keys(patch).length > 0) {
    await prisma.referralOwner.update({
      where: { code },
      data: patch,
    });
  }

  return {
    code,
    count,
    freeUnlocked: Boolean(freeUnlockedAt),
    premiumUnlocked: Boolean(premiumUnlockedAt),
    freeNeeded: REFERRAL_FREE_HITS,
    premiumNeeded: REFERRAL_PREMIUM_HITS,
  };
}
