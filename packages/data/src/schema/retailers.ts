import { foreignKey, index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import {
  descriptionColumn,
  nameColumn,
  slugColumn,
  timestamps,
} from "./shared";
import { variants } from "./products";

export const retailers = pgTable(
  "retailers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: slugColumn(),
    name: nameColumn(),
    description: descriptionColumn(),
    domain: text("domain"),

    ...timestamps(),
  },
  (table) => [index("retailers_slug_idx").on(table.slug)]
);

export const listings = pgTable(
  "listings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: nameColumn(),
    url: text("url").notNull(),
    slug: slugColumn(),

    retailerId: uuid("retailer_id").notNull(),
    retailerSlug: text("retailer_slug").notNull(),
    variantId: uuid("variant_id").notNull(),
    variantSlug: text("variant_slug").notNull(),

    sku: text("sku"),

    ...timestamps(),
  },
  (table) => [
    foreignKey({ columns: [table.retailerId], foreignColumns: [retailers.id] }),
    foreignKey({ columns: [table.variantId], foreignColumns: [variants.id] }),
    index("listings_retailer_id_idx").on(table.retailerId),
    index("listings_variant_id_idx").on(table.variantId),
    index("listings_slug_idx").on(table.slug),
  ]
);
