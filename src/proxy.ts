import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "testxl_auth";

// Only these paths require the passcode. The marketing homepage ("/") and
// the gate/verification routes stay public on purpose.
const PROTECTED_PREFIXES = ["/demo", "/api/analyze", "/api/feedback"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) {
    return NextResponse.next();
  }

  const authed = request.cookies.get(AUTH_COOKIE)?.value === "1";
  if (!authed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }
    const gateUrl = new URL("/gate", request.url);
    return NextResponse.redirect(gateUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
