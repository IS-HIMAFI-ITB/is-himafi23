import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { authOptions } from "../auth-options";

//import { PrismaAdapter } from "@next-auth/prisma-adapter";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
