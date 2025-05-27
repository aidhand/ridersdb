import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../schema";

export function useSql(postgresUrl: string) {
  return neon(postgresUrl);
}

export function useDrizzle(postgresUrl: string) {
  const sql = useSql(postgresUrl);
  return drizzle(sql, { schema });
}
