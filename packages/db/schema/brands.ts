import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "./products";

export const brands = pgTable(
  "brands",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),

    description: text("description"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index().on(table.slug)]
);

export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));
