import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },

  callbacks: {},
});

export const config = {
  matcher: ["/doctor/:path*", "/dashboard/:path*"],
};
