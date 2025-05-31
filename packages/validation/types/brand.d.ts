import { brands } from "@repo/db/schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { InferOutput } from "valibot";
import { newBrandSchema, updateBrandSchema } from "../src/brand";
import { identifierSchema } from "../src/utils";

export type Brand = InferSelectModel<typeof brands>;
export type NewBrand = InferInsertModel<typeof brands>;
export type BrandIdentifier = InferOutput<typeof identifierSchema>;
export type NewBrand = InferOutput<typeof newBrandSchema>;
export type UpdateBrand = InferOutput<typeof updateBrandSchema>;
