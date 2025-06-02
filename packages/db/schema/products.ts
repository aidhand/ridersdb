import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { brands } from "./brands";
import { collections } from "./collections";
import { productVariants } from "./variants";

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),

    description: text("description"),
    brand: uuid("brand")
      .notNull()
      .references(() => brands.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    collection: uuid("collection")
      .notNull()
      .references(() => collections.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index().on(table.slug), index().on(table.name)]
);

export const productsRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brand],
    references: [brands.id],
  }),
  collection: one(collections, {
    fields: [products.collection],
    references: [collections.id],
  }),
  productVariants: many(productVariants),
}));
