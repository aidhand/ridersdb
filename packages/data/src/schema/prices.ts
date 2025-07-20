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

// Time-series price history
export const priceHistory = pgTable(
  "price_history",
  {
    variantId: uuid("variant_id").notNull(),
    variantSlug: text("variant_slug").notNull(),
    retailerId: uuid("retailer_id").notNull(),
    retailerSlug: text("retailer_slug").notNull(),
    listingId: uuid("listing_id").notNull(),
    listingSlug: text("listing_slug").notNull(),

    priceInCents: integer("price_in_cents"),
    currency: text("currency"),

    scrapedAt: createdAtColumn(),
  },
  (table) => [
    foreignKey({
      columns: [table.variantId],
      foreignColumns: [variants.id],
    }),
    foreignKey({
      columns: [table.retailerId],
      foreignColumns: [retailers.id],
    }),
    foreignKey({
      columns: [table.listingId],
      foreignColumns: [listings.id],
    }),
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
    index("price_history_variant_id_idx").on(table.variantId),
    index("price_history_retailer_id_idx").on(table.retailerId),
    index("price_history_listing_id_idx").on(table.listingId),
    index("price_history_variant_slug_idx").on(table.variantSlug),
    index("price_history_retailer_slug_idx").on(table.retailerSlug),
    index("price_history_listing_slug_idx").on(table.listingSlug),
    index("price_history_scraped_at_idx").on(table.scrapedAt),
  ]
);
