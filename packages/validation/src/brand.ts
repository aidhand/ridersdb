import * as v from "valibot";
import {
  descriptionField,
  filteringSchema,
  identifierSchema,
  nameField,
  paginationSchema,
  slugField,
  sortingSchema,
} from "./utils";

export const newBrandSchema = v.object({
  ...slugField,
  ...nameField,
  ...descriptionField,
});

export const updateBrandSchema = v.object({
  ...nameField,
  ...descriptionField,
});

// Helper schemas
export const brandIdentifierSchema = identifierSchema;

const brandSorting = sortingSchema(["name", "createdAt", "updatedAt"]);
const brandFilter = filteringSchema({ name: v.optional(v.string()) });

export const listBrandsSchema = v.object({
  ...paginationSchema.entries,
  ...brandSorting.entries,
  ...brandFilter.entries,
});
