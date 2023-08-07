export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/kelas/:path*", "/event/:path*", "/leaderboard/:path*"],
};
