import { NextRequest, NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string; tugasId: string } }
) {
  const submissions = await prisma.submission
    .findFirst({
      where: {
        userId: params.userId,
        tugasId: Number(params.tugasId),
      },
      orderBy: {
        submittedAt: "desc",
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return NextResponse.json(submissions, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string; tugasId: string } }
) {
  const body = await req.json();
  const submission = await prisma.submission
    .create({
      data: {
        userId: params.userId,
        tugasId: Number(params.tugasId),
        submittedAt: new Date(),
        files: body.files,
      },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return NextResponse.json(submission, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const submission = await prisma.submission
    .update({
      where: {
        id: body.id,
      },
      data: {
        files: body.files,
        submittedAt: new Date(),
      },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return NextResponse.json(submission, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string; tugasId: string } }
) {
  const body = await req.json();
  const submission = await prisma.submission
    .delete({
      where: {
        id: body.id,
      },
    })
    .catch((err) => {
      throw new Error(err);
    });

  // Delete files from storage
  await utapi
    .deleteFiles(submission.files)
    .then((res) => {
      console.log(
        `Delete file ${submission.files} from storage success: `,
        res.success
      );
    })
    .catch((err) => {
      throw new Error(err);
    });

  return NextResponse.json(submission, { status: 200 });
}
