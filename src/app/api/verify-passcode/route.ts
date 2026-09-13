import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "testxl_auth";

export async function POST(request: NextRequest) {
  const correctPasscode = process.env.BETAUSERS;

  if (!correctPasscode) {
    return NextResponse.json(
      { error: "BETAUSERS is not configured on the server." },
      { status: 500 }
    );
  }

  const { passcode } = await request.json();

  if (passcode !== correctPasscode) {
    return NextResponse.json({ error: "Incorrect passcode." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, "1", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return response;
}
