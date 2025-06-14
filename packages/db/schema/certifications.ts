import { relations } from "drizzle-orm";
import { index, pgTable } from "drizzle-orm/pg-core";
import {
  baseFields,
  descriptionField,
  nameField,
  slugField,
  timestampFields,
} from "./common";
import { products } from "./products";

export const certifications = pgTable(
  "certifications",
  {
    ...baseFields(),

    ...slugField(),

    ...nameField(),
    ...descriptionField(),

    // Parent relationships
    // - nil
    //
    // Child relationships
    // - nil
    //
    // Many-to-many relationships
    // - products

    ...timestampFields(),
  },
  (table) => [index().on(table.slug)]
);

export const certificationRelations = relations(certifications, ({ many }) => ({
  products: many(products),
}));
