import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
export const orm = drizzle(sql, { schema });
export * from "./schema";

console.log("Hello via Bun!");
