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

export async function getHadirEvent(nim?: string) {
  const hadir = await prisma.event.findMany({
    where: {
      disabled: false,
      hadir: {
        some: {
          nim: nim,
        },
      },
    },
    include: {
      hadir: {
        where: {
          nim: nim,
        },
      },
      izin: {
        where: {
          user: {
            nim: nim,
          },
        },
      },
    },
  });

  return hadir;
}

export async function getIzinEvent(nim?: string) {
  const izin = await prisma.event.findMany({
    where: {
      disabled: false,
      izin: {
        some: {
          user: {
            nim: nim,
          },
        },
      },
    },
    include: {
      hadir: {
        where: {
          nim: nim,
        },
      },
      izin: {
        where: {
          user: {
            nim: nim,
          },
        },
      },
    },
  });

  return izin;
}

export async function getNoPresenceEvent(nim?: string) {
  const noPresence = await prisma.event
    .findMany({
      where: {
        disabled: false,
        hadir: {
          none: {
            nim: nim,
          },
        },
        izin: {
          none: {
            user: {
              nim: nim,
            },
          },
        },
      },
      include: {
        hadir: {
          where: {
            nim: nim,
          },
        },
        izin: {
          where: {
            user: {
              nim: nim,
            },
          },
        },
      },
    })
    .catch((error) => {
      throw new Error(error);
    });

  return noPresence;
}

// END OF SERVER SIDE METHODS
