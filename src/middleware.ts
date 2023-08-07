import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      !process.env.ACCESS_TOKEN_SECRET &&
      req.nextUrl.pathname.startsWith("/api")
    ) {
      return new NextResponse("Access token secret is not defined", {
        status: 500,
      });
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
          params.req.nextUrl.pathname.startsWith("/profile")
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
