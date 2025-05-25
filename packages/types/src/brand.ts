import { brands } from "@repo/db/schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Brand = InferSelectModel<typeof brands>;
export type NewBrand = InferInsertModel<typeof brands>;
