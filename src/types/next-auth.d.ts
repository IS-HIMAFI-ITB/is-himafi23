import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

import { Role } from '@prisma/client';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends DefaultUser {
    nim: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}
