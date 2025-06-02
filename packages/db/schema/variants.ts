import { relations } from "drizzle-orm";
import {
  index,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { products } from "./products";
import { retailers } from "./retailers";

export const productVariants = pgTable(
  "product_variants",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),

    size: text("size"),
    color: text("color"),
    metadata: jsonb("metadata"),
    product: uuid("product")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    retailer: uuid("retailer")
      .notNull()
      .references(() => retailers.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index().on(table.slug), index().on(table.product)]
);

// Junction table for many-to-many relationship between product variants and retailers
export const variantRetailers = pgTable(
  "variant_retailers",
  {
    productVariantId: uuid("product_variant_id")
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
  },
  (table) => [index().on(table.productVariantId), index().on(table.retailerId)]
);

// Price history table to store price changes for each product variant at each retailer
export const variantPrices = pgTable(
  "variant_prices",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    productVariant: uuid("product_variant")
      .notNull()
      .references(() => productVariants.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    retailer: uuid("retailer")
      .notNull()
      .references(() => retailers.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [index().on(table.productVariant), index().on(table.retailer)]
);

export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productVariants.product],
      references: [products.id],
    }),
    variantPrices: many(variantPrices),
    retailers: many(variantRetailers),
  })
);

export const variantRetailersRelations = relations(
  variantRetailers,
  ({ one }) => ({
    productVariant: one(productVariants, {
      fields: [variantRetailers.productVariantId],
      references: [productVariants.id],
    }),
    retailer: one(retailers, {
      fields: [variantRetailers.retailerId],
      references: [retailers.id],
    }),
  })
);

export const variantPricesRelations = relations(variantPrices, ({ one }) => ({
  productVariant: one(productVariants, {
    fields: [variantPrices.productVariant],
    references: [productVariants.id],
  }),
  retailer: one(retailers, {
    fields: [variantPrices.retailer],
    references: [retailers.id],
  }),
}));
