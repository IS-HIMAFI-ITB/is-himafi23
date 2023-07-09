import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";
import { Contents } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const content = await prisma.contents
    .findUnique({
      where: {
        id: Number(params.id),
      },
    })
    .catch((err) => {
      return NextResponse.json(err, { status: 500 });
    });

  if (!content) {
    return NextResponse.json({ error: "Not Found!" }, { status: 404 });
  }

  return NextResponse.json(content as Contents, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const body: Contents = await req.json().catch((err: Error) => {
    return NextResponse.json({ error: err.message }, { status: 500 });
  });

  if (!body) {
    return NextResponse.json({ error: "Not Found!" }, { status: 404 });
  }

  const content = await prisma.contents
    .update({
      where: {
        id: Number(params.id),
      },
      data: {
        content: body.content,
      },
    })
    .catch((err: Error) => {
      return NextResponse.json({ error: err.message }, { status: 500 });
    });

  if (!content) {
    return NextResponse.json({ error: "Not Found!" }, { status: 404 });
  }

  return NextResponse.json(content, { status: 200 });
}
