import type { InferOutput } from "valibot";
import * as v from "valibot";
import { identifierSchema, nameField, slugField, urlValidator } from "./shared";

export type RetailerIdentifier = InferOutput<typeof identifierSchema>;

export const newRetailerSchema = v.object({
  ...slugField,
  ...nameField,
  url: urlValidator,
  logoUrl: v.optional(v.string()),
  contactEmail: v.optional(v.string()),
  contactPhone: v.optional(v.string()),
  address: v.optional(v.string()),
  city: v.optional(v.string()),
  state: v.optional(v.string()),
  postalCode: v.optional(v.string()),
  country: v.optional(v.string()),
  createdAt: v.optional(v.date()),
  updatedAt: v.optional(v.date()),
});
export type NewRetailer = InferOutput<typeof newRetailerSchema>;

export const updateRetailerSchema = v.object({
  ...nameField,
  url: v.optional(urlValidator),
  logoUrl: v.optional(v.string()),
  contactEmail: v.optional(v.string()),
  contactPhone: v.optional(v.string()),
  address: v.optional(v.string()),
  city: v.optional(v.string()),
  state: v.optional(v.string()),
  postalCode: v.optional(v.string()),
  country: v.optional(v.string()),
  updatedAt: v.optional(v.date()),
});
export type UpdateRetailer = InferOutput<typeof updateRetailerSchema>;
