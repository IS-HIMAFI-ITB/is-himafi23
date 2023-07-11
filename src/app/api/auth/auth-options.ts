import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
// import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";

// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { Adapter } from "next-auth/adapters";
import { prisma } from "@/prisma";
import { Role } from "@prisma/client";

export const authOptions: AuthOptions = {
  //adapter: PrismaAdapter(prisma) as Adapter<boolean>,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days (default)
  },
  providers: [
    // OAuth authentication providers...
    // Auth0Provider({
    //   clientId: process.env.AUTH0_CLIENT_ID!,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      type: "credentials",
      name: "NIM",
      credentials: {
        nim: { label: "NIM", type: "text", placeholder: "NIM" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { nim, password } = credentials as {
          nim: string;
          password: string;
        };

        if (!nim || !password) throw new Error("Please enter all fields");

        const user = await prisma.user
          .findUnique({
            where: { nim: nim },
          })
          .catch(() => null);

        if (!user) throw new Error(`We cant find user with nim ${nim}`);
        if (!user.passwordHash) throw new Error("User has no password");

        // validate password
        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) throw new Error("Invalid credentials");

        return user as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as {
        nim: string;
        email: string;
        role: Role;
        image: string;
        name: string;
      };
      return {
        ...session,
        user: {
          nim: session.user.nim,
          email: session.user.email,
          role: session.user.role,
          image: session.user.image,
          name: session.user.name,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
