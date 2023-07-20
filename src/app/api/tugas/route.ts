import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { prisma } from "@/prisma";

import { authOptions } from "../auth/auth-options";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const result = await prisma.tugas.findMany().catch((err: Error) => {
    throw new Error(err.message);
  });

  return NextResponse.json(result, { status: 200 });
}
