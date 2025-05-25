import { variants } from "@repo/db/schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Variant = InferSelectModel<typeof variants>;
export type NewVariant = InferInsertModel<typeof variants>;
