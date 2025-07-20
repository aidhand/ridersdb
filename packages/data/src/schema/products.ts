import { foreignKey, index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import {
  createdAtColumn,
  descriptionColumn,
  nameColumn,
  slugColumn,
  timestamps,
  updatedAtColumn,
} from "./shared";
import { brands } from "./brands";
import { categories } from "./categories";

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: slugColumn(),
    name: nameColumn(),
    description: descriptionColumn(),

    brandId: uuid("brand_id").notNull(),
    brandSlug: text("brand_slug").notNull(),
    categoryId: uuid("category_id").notNull(),
    categorySlug: text("category_slug").notNull(),

    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    foreignKey({ columns: [table.brandId], foreignColumns: [brands.id] }),
    foreignKey({ columns: [table.brandSlug], foreignColumns: [brands.slug] }),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
    }),
    foreignKey({
      columns: [table.categorySlug],
      foreignColumns: [categories.slug],
    }),
    index("products_slug_idx").on(table.slug),
    index("products_brand_slug_idx").on(table.brandSlug),
    index("products_category_slug_idx").on(table.categorySlug),
  ]
);

export const variants = pgTable(
  "variants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: slugColumn(),
    name: nameColumn(),
    description: descriptionColumn(),

    productId: uuid("product_id"),
    productSlug: text("product_slug"),
    brandId: uuid("brand_id"),
    brandSlug: text("brand_slug"),

    colors: text("colors").array(),
    sizes: text("sizes").array(),
    materials: text("materials").array(),

    ...timestamps(),
  },
  (table) => [
    foreignKey({ columns: [table.productId], foreignColumns: [products.id] }),
    foreignKey({
      columns: [table.productSlug],
      foreignColumns: [products.slug],
    }),
    foreignKey({ columns: [table.brandId], foreignColumns: [brands.id] }),
    foreignKey({ columns: [table.brandSlug], foreignColumns: [brands.slug] }),
    index("variants_slug_idx").on(table.slug),
    index("variants_product_slug_idx").on(table.productSlug),
    index("variants_brand_slug_idx").on(table.brandSlug),
  ]
);
