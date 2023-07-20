import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { prisma } from "@/prisma";

import { authOptions } from "../auth/auth-options";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const contents = await prisma.contents.findMany({}).catch((err) => {
    return NextResponse.json(err, { status: 500 });
  });
  return NextResponse.json(contents, { status: 200 });
}
