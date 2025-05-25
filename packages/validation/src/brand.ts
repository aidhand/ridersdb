import type { InferOutput } from "valibot";
import * as v from "valibot";
import {
  descriptionField,
  identifierSchema,
  nameField,
  slugField,
} from "./shared";

export type BrandIdentifier = InferOutput<typeof identifierSchema>;

export const newBrandSchema = v.object({
  ...slugField,
  ...nameField,
  ...descriptionField,
  logoUrl: v.optional(v.string()),
  websiteUrl: v.optional(v.string()),
  createdAt: v.optional(v.date()),
  updatedAt: v.optional(v.date()),
});
export type NewBrand = InferOutput<typeof newBrandSchema>;

export const updateBrandSchema = v.object({
  ...nameField,
  ...descriptionField,
  logoUrl: v.optional(v.string()),
  websiteUrl: v.optional(v.string()),
  updatedAt: v.optional(v.date()),
});
export type UpdateBrand = InferOutput<typeof updateBrandSchema>;

// Helper schemas
export const brandIdentifierSchema = identifierSchema;

export const listBrandsSchema = v.object({
  limit: v.optional(v.number()),
  offset: v.optional(v.number()),
  sortBy: v.optional(
    v.union([v.literal("name"), v.literal("createdAt"), v.literal("updatedAt")])
  ),
  sortOrder: v.optional(v.union([v.literal("asc"), v.literal("desc")])),
  filter: v.optional(
    v.object({
      name: v.optional(v.string()),
    })
  ),
});
