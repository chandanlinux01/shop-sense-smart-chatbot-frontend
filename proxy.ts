import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. PUBLIC PATHS (Only pages that can be opened without login)
  // We use startsWith so routes like 'reset-password/123' are also covered
  const authRoutes = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/verify-otp",
  ];
  const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));
  console.log("token", token);
  console.log("isAuthPage", isAuthPage);

  // 2. STATIC ASSETS CHECK (Ignore images, fonts, etc.)s   
  // This is needed so middleware does not run unnecessarily
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // matches files like favicon.ico, logo.png, etc.
  ) {
    return NextResponse.next();
  }

  // LOGIC: If the user is logged in, redirect them away from auth pages
  // (like Login or Forgot Password)
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // LOGIC: If the user is NOT logged in and is not on an auth page
  // This means they are trying to access a protected page
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Keep the matcher broad, logic is handled inside
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
