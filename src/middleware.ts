export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/spaces/:path*"],
};
