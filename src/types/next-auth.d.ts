import NextAuth, { DefaultSession } from "next-auth";

import { Role } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      role: Role;
      nim: string;
      createdAt: Date;
      updatedAt: Date;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: Role;
    nim: string;
    createdAt: Date;
    updatedAt: Date;
  }
}
