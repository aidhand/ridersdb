import { products } from "@repo/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import type { InferOutput } from "valibot";
import { newProductSchema, updateProductSchema } from "../src/product";
import { identifierSchema } from "../src/utils";

export type Product = InferSelectModel<typeof products>;
export type ProductIdentifier = InferOutput<typeof identifierSchema>;
export type NewProduct = InferOutput<typeof newProductSchema>;
export type UpdateProduct = InferOutput<typeof updateProductSchema>;
