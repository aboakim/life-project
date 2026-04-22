import { ExpertRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { MatchedExpertSummary, SuggestedDirectoryRole } from "@/lib/types";

const DIR_TO_PRISMA: Record<
  Exclude<SuggestedDirectoryRole, "UNSPECIFIED">,
  ExpertRole
> = {
  PSYCHOLOGIST: ExpertRole.PSYCHOLOGIST,
  LAWYER: ExpertRole.LAWYER,
  FINANCIAL: ExpertRole.FINANCIAL,
  PHYSICIAN: ExpertRole.PHYSICIAN,
  COACH: ExpertRole.COACH,
  IMMIGRATION: ExpertRole.IMMIGRATION,
};

/**
 * Fetches a few public directory rows when the analysis suggests a role match.
 * Swallows DB errors (same empty-directory behavior as /api/experts).
 */
export async function loadMatchedExperts(
  role: SuggestedDirectoryRole
): Promise<MatchedExpertSummary[]> {
  if (role === "UNSPECIFIED") return [];
  const prismaRole = DIR_TO_PRISMA[role];
  if (!prismaRole) return [];
  try {
    const rows = await prisma.expert.findMany({
      where: { role: prismaRole },
      take: 3,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        role: true,
        country: true,
        city: true,
        languages: true,
        bio: true,
      },
    });
    return rows.map((e) => ({
      id: e.id,
      name: e.name,
      role: e.role as MatchedExpertSummary["role"],
      country: e.country,
      city: e.city,
      languages: e.languages,
      bio: e.bio,
    }));
  } catch (e) {
    console.error("[loadMatchedExperts]", e);
    return [];
  }
}
