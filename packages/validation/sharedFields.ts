import * as v from "valibot";

// Using pipe to combine multiple validations
export const idField = {
  id: v.pipe(v.string(), v.uuid("ID must be a valid UUID")),
};
export const slugField = {
  slug: v.pipe(v.string(), v.minLength(1, "Slug cannot be empty")),
};
export const nameField = {
  name: v.pipe(v.string(), v.minLength(1, "Name cannot be empty")),
};
export const descriptionField = {
  description: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(500, "Description must be less than 500 characters")
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
  v.maxLength(2048, "URL is too long")
);

export const identifierSchema = v.union([
  v.object(idField),
  v.object(slugField),
]);
