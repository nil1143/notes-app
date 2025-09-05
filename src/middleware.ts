import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Check for Better Auth session cookie
  const sessionCookie = request.cookies.get('better-auth.session_token')?.value ||
                       request.cookies.get('session')?.value ||
                       request.cookies.get('auth-session')?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
