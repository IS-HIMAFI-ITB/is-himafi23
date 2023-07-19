import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

import { authOptions } from "../auth/auth-options";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const result = await prisma.user.findMany({}).catch((err: Error) => {
    return NextResponse.json(err, { status: 500 });
  });

  return NextResponse.json(result, { status: 200 });
}
