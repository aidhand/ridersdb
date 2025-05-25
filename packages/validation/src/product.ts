import type { InferOutput } from "valibot";
import * as v from "valibot";
import {
  descriptionField,
  identifierSchema,
  nameField,
  slugField,
  uuidRefValidator,
} from "./shared";

export type ProductIdentifier = InferOutput<typeof identifierSchema>;

export const newProductSchema = v.object({
  ...slugField,
  ...nameField,
  ...descriptionField,
  brand: uuidRefValidator,
  collection: uuidRefValidator,
  price: v.optional(v.number()),
  currency: v.optional(v.string()),
  sku: v.optional(v.string()),
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
export type NewProduct = InferOutput<typeof newProductSchema>;

export const updateProductSchema = v.object({
  ...nameField,
  ...descriptionField,
  brand: v.optional(uuidRefValidator),
  collection: v.optional(uuidRefValidator),
  price: v.optional(v.number()),
  currency: v.optional(v.string()),
  sku: v.optional(v.string()),
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
export type UpdateProduct = InferOutput<typeof updateProductSchema>;

// Helper schemas
export const productIdentifierSchema = identifierSchema;

export const listProductsSchema = v.object({
  limit: v.optional(v.number()),
  offset: v.optional(v.number()),
  sortBy: v.optional(
    v.union([
      v.literal("name"),
      v.literal("createdAt"),
      v.literal("updatedAt"),
      v.literal("price"),
    ])
  ),
  sortOrder: v.optional(v.union([v.literal("asc"), v.literal("desc")])),
  filter: v.optional(
    v.object({
      name: v.optional(v.string()),
      brand: v.optional(v.pipe(v.string(), v.uuid())),
      collection: v.optional(v.pipe(v.string(), v.uuid())),
      priceMin: v.optional(v.number()),
      priceMax: v.optional(v.number()),
      inStock: v.optional(v.boolean()),
    })
  ),
});
