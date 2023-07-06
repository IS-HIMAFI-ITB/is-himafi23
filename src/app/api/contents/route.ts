import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";
import { Contents } from "@prisma/client";

export async function GET() {
  const contents = await prisma.contents.findMany({}).catch((err) => {
    return NextResponse.json(err, { status: 500 });
  });
  return NextResponse.json(contents, { status: 200 });
}
