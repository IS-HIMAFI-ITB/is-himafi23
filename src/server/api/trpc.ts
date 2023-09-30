import { authOptions } from '-/app/api/auth/auth-options';
import { prisma } from '-/prisma';
import { getServerSession, Session } from 'next-auth';
import { ZodError } from 'zod';

import { Role } from '@prisma/client';
import { initTRPC, TRPCError } from '@trpc/server';

import { serializer } from '../serializer';

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export const createTRPCContext = async (opts: CreateContextOptions) => {
  const session = await getServerSession(authOptions);

  return createInnerTRPCContext({
    session,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: serializer,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      session: {
        ...ctx.session,
        user: ctx.session.user,
      },
    },
  });
});

const isAdmin = enforceUserIsAuthed.unstable_pipe(({ ctx, next }) => {
  if (ctx.session.user.role === Role.PESERTA) {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }

  return next();
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
export const adminProcedure = t.procedure.use(isAdmin);
