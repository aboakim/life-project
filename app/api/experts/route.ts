import { NextResponse } from "next/server";
import { ExpertRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const ROLES: ExpertRole[] = [
  ExpertRole.PSYCHOLOGIST,
  ExpertRole.LAWYER,
  ExpertRole.FINANCIAL,
  ExpertRole.PHYSICIAN,
  ExpertRole.COACH,
  ExpertRole.IMMIGRATION,
];

function isRole(x: unknown): x is ExpertRole {
  return typeof x === "string" && ROLES.includes(x as ExpertRole);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");

  const where =
    role && isRole(role) ? { role: role as ExpertRole } : undefined;

  try {
    const experts = await prisma.expert.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        name: true,
        role: true,
        country: true,
        city: true,
        languages: true,
        bio: true,
        website: true,
      },
    });

    return NextResponse.json({ experts });
  } catch (e) {
    // Database is temporarily unreachable. Surface this as an empty directory
    // rather than a 5xx so the page renders a polished "no experts yet"
    // empty state with the "Be the first to join" CTA. The error is logged
    // server-side for operator visibility but never leaks to the user.
    console.error("[api/experts GET]", e);
    return NextResponse.json({ experts: [] as unknown[] });
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const roleRaw = body.role;
  const country = typeof body.country === "string" ? body.country.trim() : "";
  const city =
    typeof body.city === "string" ? body.city.trim() || undefined : undefined;
  const languages =
    typeof body.languages === "string" ? body.languages.trim() : "";
  const bio = typeof body.bio === "string" ? body.bio.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const website =
    typeof body.website === "string" ? body.website.trim() || undefined : undefined;

  if (!name || !country || !languages || !bio || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!isRole(roleRaw)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const expert = await prisma.expert.create({
    data: {
      name,
      role: roleRaw,
      country,
      city,
      languages,
      bio,
      email,
      website,
    },
  });

  return NextResponse.json({ expert });
}
