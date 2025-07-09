import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define paths that don't require authentication
const publicPaths = [
  "/",
  "/booking",
  "/login",
  "/register",
  "/forgot-password",
];

// Define role-based path patterns
const adminPathPattern = /^\/admin.*/; // Matches any path starting with /admin
const patientPathPattern = /^\/patient.*/; // Matches any path starting with /patient

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // // Allow access to public paths
  // if (publicPaths.includes(pathname)) {
  //   return NextResponse.next();
  // }

  // // Get the token from the cookies
  // const token = request.cookies.get("token")?.value;

  // // If no token is present, redirect to login
  // if (!token) {
  //   const url = new URL("/login", request.url);
  //   url.searchParams.set("callbackUrl", pathname);
  //   return NextResponse.redirect(url);
  // }

  // try {
  //   // Get user role from the token (you'll need to implement this based on your token structure)
  //   const userRole = getUserRoleFromToken(token);

  //   // Check admin routes
  //   if (adminPathPattern.test(pathname) && userRole !== "admin") {
  //     return NextResponse.redirect(new URL("/unauthorized", request.url));
  //   }

  //   // Check patient routes
  //   if (patientPathPattern.test(pathname) && userRole !== "patient") {
  //     return NextResponse.redirect(new URL("/unauthorized", request.url));
  //   }

  //   return NextResponse.next();
  // } catch (error) {
  //   // If token is invalid, redirect to login
  //   const url = new URL("/login", request.url);
  //   url.searchParams.set("callbackUrl", pathname);
  //   return NextResponse.redirect(url);
  // }
}

// Helper function to extract role from JWT token
function getUserRoleFromToken(token: string): string {
  try {
    const base64Payloads = token.split(".");
    for (const base64Payload of base64Payloads) {
      const payload = JSON.parse(
        Buffer.from(base64Payload, "base64").toString()
      );
      // Check realm_access roles first
      if (payload.realm_access?.roles?.includes("admin")) {
        return "admin";
      }

      // Check resource_access roles
      if (
        payload.resource_access?.["realm-management"]?.roles?.includes(
          "realm-admin"
        )
      ) {
        return "admin";
      }
    }

    return "patient"; // Default to PATIENT if no admin role found
  } catch {
    return "patient";
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside public)
     * 4. /icons (inside public)
     * 5. /images (inside public)
     * 6. all root files inside public (e.g. /favicon.ico)
     */
    "/((?!api|_next|fonts|icons|images|[\\w-]+\\.\\w+).*)",
  ],
};
