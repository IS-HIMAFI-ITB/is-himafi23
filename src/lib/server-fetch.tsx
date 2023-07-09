// SERVER SIDE METHODS

import { prisma } from "@/prisma";

export async function getAnalytics() {
  const userCount = await prisma.user.count().catch((e: Error) => e.message);
  const postCount = await prisma.contents
    .count()
    .catch((e: Error) => e.message);

  return { userCount, postCount };
}

export async function getUser(take?: number) {
  const result = await prisma.user.findMany({
    take: take || 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
}

// END OF SERVER SIDE METHODS
