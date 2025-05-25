import type { InferOutput } from "valibot";
import * as v from "valibot";
import { identifierSchema, uuidRefValidator } from "./shared";

export type VariantIdentifier = InferOutput<typeof identifierSchema>;

export const newVariantSchema = v.object({
  product: uuidRefValidator,
  size: v.optional(v.string()),
  color: v.optional(v.string()),
  material: v.optional(v.string()),
  sku: v.optional(v.string()),
  price: v.optional(v.number()),
  stock: v.optional(v.number()),
  weight: v.optional(v.number()),
  dimensions: v.optional(
    v.object({
      length: v.optional(v.number()),
      width: v.optional(v.number()),
      height: v.optional(v.number()),
    })
  ),
  createdAt: v.optional(v.date()),
  updatedAt: v.optional(v.date()),
});
export type NewVariant = InferOutput<typeof newVariantSchema>;

export const updateVariantSchema = v.object({
  size: v.optional(v.string()),
  color: v.optional(v.string()),
  material: v.optional(v.string()),
  sku: v.optional(v.string()),
  price: v.optional(v.number()),
  stock: v.optional(v.number()),
  weight: v.optional(v.number()),
  dimensions: v.optional(
    v.object({
      length: v.optional(v.number()),
      width: v.optional(v.number()),
      height: v.optional(v.number()),
    })
  ),
  updatedAt: v.optional(v.date()),
});
export type UpdateVariant = InferOutput<typeof updateVariantSchema>;
