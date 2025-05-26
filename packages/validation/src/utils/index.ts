import * as v from "valibot";

// Define constants for validation
const constants = {
  DESCRIPTION_MAX_LENGTH: 500,
  URL_MAX_LENGTH: 2048,
  SLUG_MIN_LENGTH: 1,
  NAME_MIN_LENGTH: 1,
} as const;

// Using pipe to combine multiple validations
export const idField = {
  id: v.pipe(v.string(), v.uuid("ID must be a valid UUID")),
};

export const slugField = {
  slug: v.pipe(
    v.string(),
    v.minLength(constants.SLUG_MIN_LENGTH, "Slug cannot be empty")
  ),
};

export const nameField = {
  name: v.pipe(
    v.string(),
    v.minLength(constants.NAME_MIN_LENGTH, "Name cannot be empty")
  ),
};

export const descriptionField = {
  description: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(
        constants.DESCRIPTION_MAX_LENGTH,
        "Description must be less than 500 characters"
      )
    )
  ),
};

// URL validator
export const urlValidator = v.pipe(
  v.string(),
  v.url("Must be a valid URL"),
  v.maxLength(constants.URL_MAX_LENGTH, "URL is too long")
);

export const identifierSchema = v.union([
  v.object(idField),
  v.object(slugField),
]);

// UUID reference validator for foreign keys
export const uuidRefValidator = v.pipe(
  v.string(),
  v.uuid("Must be a valid UUID reference")
);

// Pagination schema
export const paginationSchema = v.object({
  limit: v.optional(v.number()),
  offset: v.optional(v.number()),
});

// Sorting schema (generic, can be extended per-entity)
export function sortingSchema(fields: string[]) {
  return v.object({
    sortBy: v.optional(v.union(fields.map((f) => v.literal(f)))),
    sortOrder: v.optional(v.union([v.literal("asc"), v.literal("desc")])),
  });
}

// Filtering schema (generic, accepts a filter object schema)
export function filteringSchema(filterObject: v.ObjectEntries) {
  return v.object({
    filter: v.optional(v.object(filterObject)),
  });
}
