import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/*
 * Middleware: Auth Protection (Whitelist Approach)
 *
 * This middleware protects all routes by default, except for routes explicitly
 * whitelisted as public (e.g., /login, /signup). It checks for the presence
 * of an authentication cookie (`auth_token`) and redirects users accordingly.
 *
 * Features:
 * - Public routes are accessible without authentication.
 * - Authenticated users are redirected away from public routes to `/dashboard`.
 * - All other routes require authentication; unauthenticated users are redirected to `/login`.
 * - Excludes static assets (_next/static, _next/image) and favicon from middleware.
 */

export function proxy(req: NextRequest) {
  const token = req.cookies.get("auth_token"); // your auth cookie/session key
  const { pathname } = req.nextUrl;

  // Allow all public routes
  if (
    ["/login", "/signup", "/api/auth/login", "/api/auth/signup"].some((route) =>
      pathname.startsWith(route),
    )
  ) {
    // If logged in, redirect away from login/signup to dashboard
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // All other routes are protected
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // runs on all routes except static
};
