import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "testxl_auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAllowedWithoutAuth =
    pathname.startsWith("/gate") ||
    pathname.startsWith("/api/verify-passcode") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon");

  if (isAllowedWithoutAuth) {
    return NextResponse.next();
  }

  const authed = request.cookies.get(AUTH_COOKIE)?.value === "1";
  if (!authed) {
    const gateUrl = new URL("/gate", request.url);
    return NextResponse.redirect(gateUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
