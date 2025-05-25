// db.ts
// Utility to export a db instance using useDrizzle
import { useDrizzle } from "@repo/db";
import { env } from "process";

export const db = useDrizzle(env.DATABASE_URL!);
