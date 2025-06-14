import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  numeric,
  pgTable,
  uuid,
} from "drizzle-orm/pg-core";
import { baseFields, timestampFields, urlField } from "./common";
import { currencyEnum, stockStatusEnum } from "./enums";
import { products, productVariants } from "./products";
import { retailers } from "./retailers";

// Table for aggregating metrics across all variants for a given product
export const productMetrics = pgTable(
  "product_metrics",
  {
    ...baseFields(),

    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    // Aggregated price metrics
    minPrice: numeric("min_price", { precision: 10, scale: 2 }),
    maxPrice: numeric("max_price", { precision: 10, scale: 2 }),
    avgPrice: numeric("avg_price", { precision: 10, scale: 2 }),
    currency: currencyEnum("currency").notNull().default("AUD"),

    // Aggregated stock metrics
    totalStock: integer("total_stock"),
    inStockCount: integer("in_stock_count"),
    outOfStockCount: integer("out_of_stock_count"),

    ...timestampFields(),
  },
  (table) => [index().on(table.productId)]
);

export const productMetricsRelations = relations(productMetrics, ({ one }) => ({
  product: one(products, {
    fields: [productMetrics.productId],
    references: [products.id],
  }),
}));

// Table for tracking price and stock changes to variants over time
export const variantMetrics = pgTable(
  "variant_metrics",
  {
    ...baseFields(),

    variantId: uuid("variant_id")
      .notNull()
      .references(() => productVariants.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    retailerId: uuid("retailer_id")
      .notNull()
      .references(() => retailers.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    ...urlField(),

    // Price data
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    salePrice: numeric("sale_price", { precision: 10, scale: 2 }),
    discountAmount: numeric("discount_amount", { precision: 10, scale: 2 }), // TODO: make this a calculated field
    discountPercentage: integer("discount_percentage").notNull().default(0), // TODO: make this a calculated field
    currency: currencyEnum("currency").notNull().default("AUD"),

    // Stock data
    stock: integer("stock").notNull().default(0),
    stockStatus: stockStatusEnum("stock_status").notNull().default("in_stock"),
    deliveryAvailability: boolean("delivery_availability"),
    storeAvailability: boolean("store_availability"),
    backorderAvailability: boolean("backorder_availability"),
    preOrderAvailability: boolean("pre_order_availability"),
    // Parent relationships
    // - variant (many-to-one)
    // - retailer (many-to-one)
    //
    // Child relationships
    // - nil
    //
    // Many-to-many relationships
    // - nil

    ...timestampFields(),
  },
  (table) => [
    index().on(table.variantId),
    index().on(table.retailerId),
    index().on(table.variantId, table.retailerId),
  ]
);

export const variantMetricsRelations = relations(variantMetrics, ({ one }) => ({
  variant: one(productVariants, {
    fields: [variantMetrics.variantId],
    references: [productVariants.id],
  }),
  retailer: one(retailers, {
    fields: [variantMetrics.retailerId],
    references: [retailers.id],
  }),
}));

// Table for aggregating metrics across all variants for a given retailer
export const retailerMetrics = pgTable(
  "retailer_metrics",
  {
    ...baseFields(),

    retailerId: uuid("retailer_id")
      .notNull()
      .references(() => retailers.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    // Aggregated price metrics
    minPrice: numeric("min_price", { precision: 10, scale: 2 }),
    maxPrice: numeric("max_price", { precision: 10, scale: 2 }),
    avgPrice: numeric("avg_price", { precision: 10, scale: 2 }),

    // Aggregated stock metrics
    totalStock: integer("total_stock"),
    inStockCount: integer("in_stock_count"),
    outOfStockCount: integer("out_of_stock_count"),

    currency: currencyEnum("currency").notNull().default("AUD"),

    ...timestampFields(),
  },
  (table) => [index().on(table.retailerId)]
);

export const retailerMetricsRelations = relations(
  retailerMetrics,
  ({ one }) => ({
    retailer: one(retailers, {
      fields: [retailerMetrics.retailerId],
      references: [retailers.id],
    }),
  })
);
