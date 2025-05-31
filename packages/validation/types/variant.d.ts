import { variants } from "@repo/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type Variant = InferSelectModel<typeof variants>;
