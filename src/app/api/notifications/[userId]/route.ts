import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const notifications = await prisma.notification.findMany({
    include: {
      readBy: true,
    },
    where: {
      receiver: {
        some: {
          id: params.userId,
        },
      },
    },
  });

  return NextResponse.json(notifications);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const body: { id: string[] } = await req.json();

  const ids = body.id.map((notificationId) => notificationId);

  const notification = await Promise.all(
    ids.map((notificationId) =>
      prisma.notification.update({
        where: {
          id: notificationId,
        },
        data: {
          readBy: {
            connect: {
              id: params.userId,
            },
          },
        },
      })
    )
  ).catch((error) => {
    throw new Error(error);
  });

  return NextResponse.json({ success: true, notification });
}
