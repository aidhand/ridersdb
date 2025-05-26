import * as v from "valibot";
import {
  descriptionField,
  filteringSchema,
  identifierSchema,
  nameField,
  paginationSchema,
  slugField,
  sortingSchema,
  uuidRefValidator,
} from "./utils";

export const newProductSchema = v.object({
  ...slugField,
  ...nameField,
  ...descriptionField,
  brand: uuidRefValidator,
  collection: uuidRefValidator,
});

export const updateProductSchema = v.object({
  ...nameField,
  ...descriptionField,
  brand: v.optional(uuidRefValidator),
  collection: v.optional(uuidRefValidator),
});

// Helper schemas
export const productIdentifierSchema = identifierSchema;

const productSorting = sortingSchema(["name", "createdAt", "updatedAt"]);

const productFilter = filteringSchema({
  name: v.optional(v.string()),
  brand: v.optional(v.pipe(v.string(), v.uuid())),
  collection: v.optional(v.pipe(v.string(), v.uuid())),
});

export const listProductsSchema = v.object({
  ...paginationSchema.entries,
  ...productSorting.entries,
  ...productFilter.entries,
});
