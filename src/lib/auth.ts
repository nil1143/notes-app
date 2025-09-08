// import PasswordResetEmail from "@/components/emails/reset-email";
import PasswordResetEmail from "@/components/emails/reset-email";
import VerificationEmail from "@/components/emails/verification-email";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      attributes: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      try {
        console.log("Sending verification email to:", user.email);
        console.log("Verification URL:", url);
        
        const result = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: [user.email],
          subject: "Verify your email address",
          react: VerificationEmail({ userName: user.name, verificationUrl: url }),
        });
        
        console.log("Email sent successfully:", result);
      } catch (error) {
        console.error("Failed to send verification email:", error);
        throw error;
      }
    },
    sendOnSignUp: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      try {
        console.log("Sending password reset email to:", user.email);
        
        const result = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: [user.email],
          subject: "Reset your password",
          react: PasswordResetEmail({
            userName: user.name,
            resetUrl: url,
            requestTime: new Date().toLocaleString(),
          }),
        });
        
        console.log("Password reset email sent successfully:", result);
      } catch (error) {
        console.error("Failed to send password reset email:", error);
        throw error;
      }
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [nextCookies()],
});
