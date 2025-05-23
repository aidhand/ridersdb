import type { InferOutput } from "valibot";
import * as v from "valibot";
import {
  descriptionField,
  identifierSchema,
  nameField,
  slugField,
  uuidRefValidator,
} from "./sharedFields";

export type ProductIdentifier = InferOutput<typeof identifierSchema>;

export const newProductSchema = v.object({
  ...slugField,
  ...nameField,
  ...descriptionField,
  brand: uuidRefValidator,
  collection: uuidRefValidator,
});
export type NewProduct = InferOutput<typeof newProductSchema>;

export const updateProductSchema = v.object({
  ...nameField,
  ...descriptionField,
  brand: v.optional(uuidRefValidator),
  collection: v.optional(uuidRefValidator),
});
export type UpdateProduct = InferOutput<typeof updateProductSchema>;
