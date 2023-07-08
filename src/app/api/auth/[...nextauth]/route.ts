import NextAuth from "next-auth";

import { authOptions } from "../auth-options";

//import { PrismaAdapter } from "@next-auth/prisma-adapter";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
