import { relations } from "drizzle-orm";
import {
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const brands = pgTable("brands", {
  id: uuid("id").primaryKey().defaultRandom(),

  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),

  description: text("description"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));

export const collections = pgTable("collections", {
  id: uuid("id").primaryKey().defaultRandom(),

  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),

  description: text("description"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const collectionsRelations = relations(collections, ({ many }) => ({
  products: many(products),
}));

// Retailers table to track different product sources
export const retailers = pgTable("retailers", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const retailersRelations = relations(retailers, ({ many }) => ({
  prices: many(prices),
}));

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),

  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),

  description: text("description"),

  brand: uuid("brand")
    .notNull()
    .references(() => brands.id),
  collection: uuid("collection")
    .notNull()
    .references(() => collections.id),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brand],
    references: [brands.id],
  }),
  collection: one(collections, {
    fields: [products.collection],
    references: [collections.id],
  }),
  variants: many(variants),
}));

export const variants = pgTable("variants", {
  id: uuid("id").primaryKey().defaultRandom(),

  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),

  size: text("size"),
  color: text("color"),
  metadata: jsonb("metadata"),

  product: uuid("product")
    .notNull()
    .references(() => products.id),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const variantsRelations = relations(variants, ({ one, many }) => ({
  product: one(products, {
    fields: [variants.product],
    references: [products.id],
  }),
  prices: many(prices),
}));

// Price history table to store price changes for each variant at each retailer
export const prices = pgTable("prices", {
  id: uuid("id").primaryKey().defaultRandom(),

  price: numeric("price", { precision: 10, scale: 2 }).notNull(),

  variant: uuid("variant")
    .notNull()
    .references(() => variants.id),
  retailer: uuid("retailer")
    .notNull()
    .references(() => retailers.id),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pricesRelations = relations(prices, ({ one }) => ({
  variant: one(variants, {
    fields: [prices.variant],
    references: [variants.id],
  }),
  retailer: one(retailers, {
    fields: [prices.retailer],
    references: [retailers.id],
  }),
}));
