import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  
  const cookieName =
  process.env.NODE_ENV === "production"
    ? "_Secure-better-auth.session_token"
    : "better-auth.session_token";

const sessionToken = request.cookies.get(cookieName)?.value;
  
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
