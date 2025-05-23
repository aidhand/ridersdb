import type { InferOutput } from "valibot";
import * as v from "valibot";
import {
  descriptionField,
  identifierSchema,
  nameField,
  slugField,
} from "./sharedFields";

export type CollectionIdentifier = InferOutput<typeof identifierSchema>;

export const newCollectionSchema = v.object({
  ...slugField,
  ...nameField,
  ...descriptionField,
});
export type NewCollection = InferOutput<typeof newCollectionSchema>;

export const updateCollectionSchema = v.object({
  ...nameField,
  ...descriptionField,
});
export type UpdateCollection = InferOutput<typeof updateCollectionSchema>;
