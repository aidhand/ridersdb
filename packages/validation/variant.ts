import type { InferOutput } from "valibot";
import * as v from "valibot";
import { identifierSchema, uuidRefValidator } from "./sharedFields";

export type VariantIdentifier = InferOutput<typeof identifierSchema>;

export const newVariantSchema = v.object({
  product: uuidRefValidator, // Using shared UUID validator
  size: v.optional(v.string()),
  color: v.optional(v.string()),
  material: v.optional(v.string()),
  metadata: v.optional(v.any()),
});
export type NewVariant = InferOutput<typeof newVariantSchema>;
