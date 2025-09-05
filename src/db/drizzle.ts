import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// No dotenv needed - framework handles it
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });