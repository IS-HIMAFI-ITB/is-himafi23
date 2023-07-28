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

  console.log("notifications", notifications);
  const userNotifications = notifications.filter((notification) => {
    const returnValue = notification.receiver.filter(
      (receiver) => receiver.id === params.userId
    );

    if (returnValue.length === 0) return;
    console.log("returnValue", returnValue);
    return returnValue;
  });

  console.log("userNotifications", userNotifications);
  return NextResponse.json(userNotifications);
}

export async function POST() {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body: { id: string[] } = await req.json();

  const ids = body.id.map((notificationId) => Number(notificationId));

  const notification = await Promise.all(
    ids.map((notificationId) =>
      prisma.notification.update({
        where: {
          id: notificationId,
        },
        data: {
          readBy: {
            connect: {
              id: params.id,
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

export async function DELETE() {
  return NextResponse.json({ message: "Hello, World!" });
}
