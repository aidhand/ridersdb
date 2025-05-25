import type { InferOutput } from "valibot";
import * as v from "valibot";
import {
  descriptionField,
  identifierSchema,
  nameField,
  slugField,
} from "./shared";

export type CollectionIdentifier = InferOutput<typeof identifierSchema>;

export const newCollectionSchema = v.object({
  ...slugField,
  ...nameField,
  ...descriptionField,
  imageUrl: v.optional(v.string()),
  createdAt: v.optional(v.date()),
  updatedAt: v.optional(v.date()),
});
export type NewCollection = InferOutput<typeof newCollectionSchema>;

export const updateCollectionSchema = v.object({
  ...nameField,
  ...descriptionField,
  imageUrl: v.optional(v.string()),
  updatedAt: v.optional(v.date()),
});
export type UpdateCollection = InferOutput<typeof updateCollectionSchema>;

// Helper schemas
export const collectionIdentifierSchema = identifierSchema;

export const listCollectionsSchema = v.object({
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
