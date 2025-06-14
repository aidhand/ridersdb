import { relations } from "drizzle-orm";
import { index, pgTable, varchar } from "drizzle-orm/pg-core";
import {
  baseFields,
  descriptionField,
  nameField,
  slugField,
  timestampFields,
} from "./common";
import { products, productVariants } from "./products";

export const retailers = pgTable(
  "retailers",
  {
    ...baseFields(),

    ...slugField(),

    ...nameField(),
    ...descriptionField(),

    website: varchar("website", { length: 255 }).notNull(),

    // Parent relationships
    // - nil
    //
    // Child relationships
    // - nil
    //
    // Many-to-many relationships
    // - products
    // - variants

    ...timestampFields(),
  },
  (table) => [
    index().on(table.slug),
    index().on(table.name),
    index().on(table.website),
  ]
);

export const retailerRelations = relations(retailers, ({ many }) => ({
  products: many(products),
  variants: many(productVariants),
}));
