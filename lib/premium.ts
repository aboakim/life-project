import { prisma } from "@/lib/prisma";

const ACTIVE = new Set(["active", "trialing"]);

/**
 * Server-only check: whether an email has an active Premium subscription (per DB, synced from Stripe).
 * Call from API routes — never trust the client for billing state.
 */
export async function isEmailPremiumActive(email: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return false;

  const row = await prisma.premiumSubscription.findFirst({
    where: {
      email: normalized,
      status: { in: [...ACTIVE] },
    },
    orderBy: { updatedAt: "desc" },
  });
  if (!row) return false;
  if (row.currentPeriodEnd && row.currentPeriodEnd < new Date()) {
    return false;
  }
  return true;
}
