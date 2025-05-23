import type { InferOutput } from "valibot";
import * as v from "valibot";
import {
  identifierSchema,
  nameField,
  slugField,
  urlValidator,
} from "./sharedFields";

export type RetailerIdentifier = InferOutput<typeof identifierSchema>;

export const newRetailerSchema = v.object({
  ...slugField, // Use shared slug validator
  ...nameField,
  url: urlValidator,
});
export type NewRetailer = InferOutput<typeof newRetailerSchema>;
