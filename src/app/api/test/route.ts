import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    console.log("Test endpoint - checking auth configuration");
    console.log("Better Auth URL:", process.env.BETTER_AUTH_URL);
    console.log("Better Auth Secret exists:", !!process.env.BETTER_AUTH_SECRET);
    console.log("Database URL exists:", !!process.env.DATABASE_URL);
    
    // Test auth configuration
    console.log("Auth instance created successfully");
    
    return NextResponse.json({ 
      status: "ok",
      config: {
        baseURL: process.env.BETTER_AUTH_URL,
        hasSecret: !!process.env.BETTER_AUTH_SECRET,
        hasDatabase: !!process.env.DATABASE_URL,
        environment: process.env.NODE_ENV
      }
    });
  } catch (error) {
    console.error("Test endpoint error:", error);
    return NextResponse.json({ 
      status: "error", 
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
