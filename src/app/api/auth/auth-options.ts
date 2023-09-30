import { prisma } from '-/prisma';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { Role } from '@prisma/client';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        nim: { label: 'NIM', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { nim, password } = credentials as {
          nim: string;
          password: string;
        };

        if (!nim || !password) throw new Error('Harap masukkan semua data.');

        const user = await prisma.user.findUnique({
          where: {
            nim,
          },
        });

        if (!user)
          throw new Error(`Tidak dapat menemukan akun dengan username ${nim}`);

        if (user.password !== password) throw new Error(`Password salah!`);

        // We have to return as any because of a bug in next-auth
        return {
          id: user.id,
          name: user.name,
          nim: user.nim,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        } as any;
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
      const user = token.user as {
        id: string;
        nim: string;
        name: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
      };

      session.user = user;

      return session;
    },
  },
};
