import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-cookie";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const secret = process.env.ADMIN_SECRET;
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;

  if (!verifyAdminToken(token, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      expert: {
        select: {
          name: true,
          email: true,
          country: true,
          role: true,
        },
      },
    },
  });

  return NextResponse.json({ requests: rows });
}
