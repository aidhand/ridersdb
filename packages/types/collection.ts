import { collections } from "@repo/db";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Collection = InferSelectModel<typeof collections>;
export type NewCollection = InferInsertModel<typeof collections>;
