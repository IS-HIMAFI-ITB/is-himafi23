import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    // OAuth authentication providers...
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };