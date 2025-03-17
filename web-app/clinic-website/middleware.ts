// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login", // nếu chưa đăng nhập, redirect về /login
    },

    callbacks: {
        /**
         * Authorized callback: kiểm tra roles có trong token
         */
        authorized: ({ token }) => {
            // token ở đây chính là JWT đã được NextAuth parse

            // Kiểm tra role "doctor" chẳng hạn
            const roles = token?.realm_access?.roles || [];
            if (!roles.includes("doctor")) {
                // Nếu user không có role doctor, không cho vào
                return false;
            }
            return true;
        },
    },
});

export const config = {
    matcher: ["/doctor/:path*", "/dashboard/:path*"],
};
