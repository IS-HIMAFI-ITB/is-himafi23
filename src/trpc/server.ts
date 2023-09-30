import { Session } from 'next-auth';
import { prisma } from '-/prisma';
import { appRouter } from '-/server/api';

type TRPCServerOptions = {
  session?: Session | null;
};

export const trpcServer = ({ session }: TRPCServerOptions) => {
  return appRouter.createCaller({
    session: session ?? null,
    prisma,
  });
};
