import NextAuth, {Session} from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import {JWT} from "next-auth/jwt";

export default NextAuth({
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER!,
        }),
    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile }) {
            // Lần đầu đăng nhập: Keycloak trả về token, profile
            // Token Keycloak thường chứa role bên trong `realm_access` hoặc `resource_access`
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            const realmRoles = token.realm_access?.roles || [];
            session.user.roles = realmRoles;
            session.user.id = token.sub || "";
            return session;
        }
    },
});
