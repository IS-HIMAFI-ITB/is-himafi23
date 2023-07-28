import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const notifications = await prisma.notification.findMany({
    include: {
      receiver: true,
      readBy: true,
    },
  });

  const userNotifications = notifications.filter((notification) => {
    const returnValue = notification.receiver.filter(
      (receiver) => receiver.id === params.userId
    );

    if (returnValue.length === 0) return;
    return returnValue;
  });

  return NextResponse.json(userNotifications);
}

export async function POST() {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const body: { id: string[] } = await req.json();

  const ids = body.id.map((notificationId) => Number(notificationId));
  console.log("ids", ids);

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

  console.log("notification", notification);

  return NextResponse.json({ success: true, notification });
}

export async function DELETE() {
  return NextResponse.json({ message: "Hello, World!" });
}
