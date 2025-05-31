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

export const newCollectionSchema = v.object({
  ...slugField,
  ...nameField,
  ...descriptionField,
});

export const updateCollectionSchema = v.object({
  ...nameField,
  ...descriptionField,
});

// Helper schemas
export const collectionIdentifierSchema = identifierSchema;

const collectionSorting = sortingSchema(["name", "createdAt", "updatedAt"]);
const collectionFilter = filteringSchema({ name: v.optional(v.string()) });

export const listCollectionsSchema = v.object({
  ...paginationSchema.entries,
  ...collectionSorting.entries,
  ...collectionFilter.entries,
});
