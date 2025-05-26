import * as v from "valibot";
import {
  filteringSchema,
  nameField,
  paginationSchema,
  slugField,
  sortingSchema,
  urlValidator,
} from "./utils";

export const newRetailerSchema = v.object({
  ...slugField,
  ...nameField,
  url: urlValidator,
});

export const updateRetailerSchema = v.object({
  ...nameField,
  url: v.optional(urlValidator),
});

const retailerSorting = sortingSchema(["name", "createdAt", "updatedAt"]);
const retailerFilter = filteringSchema({ name: v.optional(v.string()) });

export const listRetailersSchema = v.object({
  ...paginationSchema.entries,
  ...retailerSorting.entries,
  ...retailerFilter.entries,
});
