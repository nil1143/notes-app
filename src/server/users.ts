"use server";

import { auth } from "@/lib/auth";

export const signInUser = async (email: string, password: string) => {
  try {
    console.log("Attempting sign in for email:", email);
    console.log("Better Auth URL:", process.env.BETTER_AUTH_URL);
    console.log("Database URL exists:", !!process.env.DATABASE_URL);
    
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    console.log("Sign in successful:", result);
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    const e = error as Error;
    console.error("Sign in error:", {
      message: e.message,
      stack: e.stack,
      name: e.name
    });
    return { success: false, message: e.message || "Failed to sign in" };
  }
};

export const signUpUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    return { success: true, message: "Signed up successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Failed to sign up" };
  }
};
