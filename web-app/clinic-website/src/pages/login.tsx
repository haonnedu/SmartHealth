// pages/login.tsx
import { signIn } from "next-auth/react";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-2xl font-bold">Login with Keycloak</h1>
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => signIn("keycloak")}
            >
                Sign in
            </button>
        </div>
    );
}
