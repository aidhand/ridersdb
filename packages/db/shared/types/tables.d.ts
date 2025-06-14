import type { schema } from "../utils/schema";

export type SelectUser = typeof schema.users.$inferSelect;
export type InsertUser = typeof schema.users.$inferInsert;
