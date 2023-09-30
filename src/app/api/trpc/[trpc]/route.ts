import { authOptions } from '-/app/api/auth/auth-options';
import { appRouter } from '-/server/api';
import { createTRPCContext } from '-/server/api/trpc';
import { getServerSession } from 'next-auth';

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    createContext: async () => {
      const session = await getServerSession(authOptions);

      return createTRPCContext({
        session,
      });
    },
  });

export { handler as GET, handler as POST };
