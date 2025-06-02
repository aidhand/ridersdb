import { useNeon } from "@repo/db";

export { and, eq, or, sql } from "drizzle-orm";

const { database } = useRuntimeConfig();
export const db = useNeon(database.url);
