import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

import { authOptions } from "@/app/api/auth/auth-options";
import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string; tugasId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  if (params.userId === "all-users") {
    const submissions = await prisma.submission.findMany({
      where: {
        tugasId: Number(params.tugasId),
      },
      orderBy: {
        submittedAt: "desc",
      },
      include: {
        user: true,
        tugas: {
          select: {
            dueDate: true,
          },
        },
      },
    });
    return NextResponse.json(submissions, { status: 200 });
  }

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
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const body = await req.json();
  const submission = await prisma.submission
    .create({
      data: {
        userId: params.userId,
        tugasId: Number(params.tugasId),
        submittedAt: new Date(),
        files: body.files ?? null,
        links: body.links ?? null,
      },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return NextResponse.json(submission, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const body = await req.json();

  const submission = await prisma.submission
    .update({
      where: {
        id: body.id,
      },
      data: {
        files: body.files ?? null,
        links: body.links ?? null,
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
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
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

  if (!submission.files) return NextResponse.json(submission, { status: 200 });

  await utapi.deleteFiles(submission.files).then((res) => {
    console.log("delete file", res.success);
  });

  return NextResponse.json(submission, { status: 200 });

  // if (!submission.files) return NextResponse.json(submission, { status: 200 });
  // // Delete files from storage
  // const deleteFile = await utapi.deleteFiles(submission.files).catch((err) => {
  //   throw new Error(err);
  // });

  // Promise.all([submission, deleteFile])
  //   .then((values) => {
  //     return NextResponse.json(values[0], { status: 200 });
  //   })
  //   .catch((err) => {
  //     throw new Error(err);
  //   });
}
