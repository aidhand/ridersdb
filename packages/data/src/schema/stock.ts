import {
  foreignKey,
  index,
  integer,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { variants } from "./products";
import { listings, retailers } from "./retailers";
import { createdAtColumn } from "./shared";

// Time-series stock history
export const stockHistory = pgTable(
  "stock_history",
  {
    variantId: uuid("variant_id").notNull(),
    retailerId: uuid("retailer_id").notNull(),
    listingId: uuid("listing_id").notNull(),
    variantSlug: text("variant_slug").notNull(),
    retailerSlug: text("retailer_slug").notNull(),
    listingSlug: text("listing_slug").notNull(),

    stockLevel: integer("stock_level"),
    stockStatus: text("stock_status"),

    scrapedAt: createdAtColumn(),
  },
  (table) => [
    foreignKey({ columns: [table.variantId], foreignColumns: [variants.id] }),
    foreignKey({ columns: [table.retailerId], foreignColumns: [retailers.id] }),
    foreignKey({ columns: [table.listingId], foreignColumns: [listings.id] }),
    foreignKey({
      columns: [table.variantSlug],
      foreignColumns: [variants.slug],
    }),
    foreignKey({
      columns: [table.retailerSlug],
      foreignColumns: [retailers.slug],
    }),
    foreignKey({
      columns: [table.listingSlug],
      foreignColumns: [listings.slug],
    }),
    index("stock_history_variant_id_idx").on(table.variantId),
    index("stock_history_retailer_id_idx").on(table.retailerId),
    index("stock_history_listing_id_idx").on(table.listingId),
    index("stock_history_variant_slug_idx").on(table.variantSlug),
    index("stock_history_retailer_slug_idx").on(table.retailerSlug),
    index("stock_history_listing_slug_idx").on(table.listingSlug),
    index("stock_history_scraped_at_idx").on(table.scrapedAt),
  ]
);
