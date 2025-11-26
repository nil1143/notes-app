import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Get the Better Auth session cookie
  const sessionToken = request.cookies.get('_Secure-better-auth.session_token')?.value ||
    request.cookies.get('better-auth.session_token')?.value;
  
  console.log("Middleware check:", { 
    path: request.nextUrl.pathname, 
    hasSession: !!sessionToken 
  });
  
  if (!sessionToken) {
    console.log("No session found, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Session found, allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
