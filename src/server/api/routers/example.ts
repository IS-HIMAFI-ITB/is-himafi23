import { prisma } from '-/prisma';
import { z } from 'zod';

import { TRPCError } from '@trpc/server';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.query(async ({ ctx }) => {
    return 'world';
  }),
  protected: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session.user.nim;
  }),
});
