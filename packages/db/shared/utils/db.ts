import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { schema } from "../utils/tables";

const { database } = useRuntimeConfig();

const sql = neon(database.url);
export const db = drizzle(sql, { schema });

export { and, eq, or, sql } from "drizzle-orm";
