import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzleNodePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../schema";

export function useNeon(postgresUrl: string) {
  const sql = neon(postgresUrl);
  return drizzleNeon({ client: sql, schema });
}

export function useNodePg(postgresUrl: string) {
  const sql = new Pool({ connectionString: postgresUrl });
  return drizzleNodePg({ client: sql, schema });
}
