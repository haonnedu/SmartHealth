import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;            // thêm trường id
            name?: string | null;
            email?: string | null;
            image?: string | null;
            roles?: string[] | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        realm_access?: {
            roles?: string[];
        };
        resource_access?: {
            [key: string]: {
                roles?: string[];
            };
        };
        sub?: string;
        // ... thêm các trường nếu Keycloak có
    }
}
