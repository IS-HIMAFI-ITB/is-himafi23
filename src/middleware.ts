import { withAuth } from "next-auth/middleware";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { Role } from "@prisma/client";

export default withAuth(
  function middleware(req) {
    if (
      !process.env.ACCESS_TOKEN_SECRET &&
      req.nextUrl.pathname.startsWith("/api")
    )
      return new NextResponse("Unauthorized!", {
        status: 500,
      });

    const url = req.nextUrl.clone();
    if (req.nextUrl.pathname.startsWith("/login/verify")) {
      if (!req.nextauth.token?.user.lastPasswordChange) {
        url.pathname = "/login/continue";
        return NextResponse.redirect(url);
      }

      if (req.nextauth.token.user.role === Role.PESERTA) {
        url.pathname = "/kelas";
        return NextResponse.redirect(url);
      }

      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        if (
          params.req.nextUrl.pathname.startsWith("/kelas") ||
          params.req.nextUrl.pathname.startsWith("/event") ||
          params.req.nextUrl.pathname.startsWith("/leaderboard") ||
          params.req.nextUrl.pathname.startsWith("/profile") ||
          (params.req.nextUrl.pathname.startsWith("/api") &&
            !params.req.nextUrl.pathname.startsWith("/api/auth"))
        ) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/:path*"],
};
