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

export async function getTugasAssigned(nim: string) {
  const tugasAssigned = await prisma.tugas.findMany({
    where: {
      NOT: {
        submissions: {
          some: {
            user: {
              nim: nim,
            },
          },
        },
      },
    },
    orderBy: {
      dueDate: "asc",
    },
  });

  return tugasAssigned;
}

export async function getTugasDone(nim: string) {
  const tugasDone = await prisma.tugas.findMany({
    where: {
      submissions: {
        some: {
          user: {
            nim: nim,
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return tugasDone;
}

export async function getEventHadir(nim: string) {
  const eventHadir = await prisma.event.findMany({
    where: {
      disabled: false,
      AND: [
        {
          hadir: {
            some: {
              nim: nim,
            },
          },
        },
        {
          OR: [
            {
              izin: {
                none: {
                  user: {
                    nim: nim,
                  },
                },
              },
            },
            {
              izin: {
                some: {
                  AND: [
                    {
                      user: {
                        nim: nim,
                      },
                    },
                    {
                      status: "DITOLAK",
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    include: {
      hadir: {
        where: {
          nim: nim,
        },
      },
      izin: {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          user: {
            nim: nim,
          },
        },
      },
    },
  });

  return eventHadir;
}

export async function getEventIzin(nim: string) {
  const eventIzin = await prisma.event.findMany({
    where: {
      disabled: false,
      izin: {
        some: {
          AND: [
            {
              user: {
                nim: nim,
              },
            },
            {
              OR: [
                {
                  status: "DITERIMA",
                },
                {
                  status: "MENUNGGU",
                },
              ],
            },
          ],
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
        orderBy: {
          createdAt: "desc",
        },
        where: {
          user: {
            nim: nim,
          },
        },
      },
    },
  });

  return eventIzin;
}

export async function getEventNoPresence(nim: string) {
  const eventNoPresence = await prisma.event.findMany({
    where: {
      disabled: false,
      hadir: {
        none: {
          nim: nim,
        },
      },
      OR: [
        {
          izin: {
            some: {
              AND: [
                {
                  user: {
                    nim: nim,
                  },
                },
                {
                  status: "DITOLAK",
                },
              ],
            },
          },
        },
        {
          izin: {
            none: {
              user: {
                nim: nim,
              },
            },
          },
        },
      ],
    },
    include: {
      hadir: {
        where: {
          nim: nim,
        },
      },
      izin: {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          user: {
            nim: nim,
          },
        },
      },
    },
  });

  return eventNoPresence;
}

// END OF SERVER SIDE METHODS
