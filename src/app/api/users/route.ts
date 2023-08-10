import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(req: NextRequest) {
  const url = req.url;
  const result = await prisma.user.findMany({}).catch((err: Error) => {
    return NextResponse.error();
  });

  return NextResponse.json(result, { status: 200 });
}
