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

// UUID reference validator for foreign keys
export const uuidRefValidator = v.pipe(
  v.string(),
  v.uuid("Must be a valid UUID reference")
);

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
