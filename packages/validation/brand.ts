import type { InferOutput } from "valibot";
import * as v from "valibot";
import {
  descriptionField,
  identifierSchema,
  nameField,
  slugField,
} from "./sharedFields";

export type BrandIdentifier = InferOutput<typeof identifierSchema>;

export const newBrandSchema = v.object({
  ...slugField,
  ...nameField,
  ...descriptionField,
});
export type NewBrand = InferOutput<typeof newBrandSchema>;

export const updateBrandSchema = v.object({
  ...nameField,
  ...descriptionField,
});
export type UpdateBrand = InferOutput<typeof updateBrandSchema>;
