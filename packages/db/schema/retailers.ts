import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { productVariants, variantPrices } from "./variants";

// Retailers table to track different product sources
export const retailers = pgTable(
  "retailers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index().on(table.slug)]
);

export const retailersRelations = relations(retailers, ({ many }) => ({
  variantPrices: many(variantPrices),
  productVariants: many(productVariants),
}));
