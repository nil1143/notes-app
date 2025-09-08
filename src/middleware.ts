import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Temporarily disable middleware for debugging
  console.log("Middleware: Allowing access for debugging");
  return NextResponse.next();
  
  // TODO: Re-enable this after fixing auth issues
  /*
  // Get the Better Auth session cookie
  const sessionToken = request.cookies.get('better-auth.session_token')?.value;
  
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
  */
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
