import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/auth-options";
import { prisma } from "@/prisma";
import { Role } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { args: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  if (params.args === "peserta") {
    const pesertaCount = await prisma.user.count({
      where: {
        role: Role.PESERTA,
      },
    });

    return NextResponse.json(pesertaCount);
  }

  return NextResponse.json(
    { message: "Please provide a params" },
    { status: 404 }
  );
}
