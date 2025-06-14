import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const { database } = useRuntimeConfig();

const sql = neon(database.url);
const db = drizzle(sql, { schema });

export { and, eq, or, sql } from "drizzle-orm";
export { db };

