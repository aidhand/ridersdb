import { relations } from "drizzle-orm";
import { index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { brands } from "./brands";
import { certifications } from "./certifications";
import {
  baseFields,
  descriptionField,
  nameField,
  slugField,
  timestampFields,
} from "./common";
import { retailers } from "./retailers";

// Product Categories
export const productCategories = pgTable(
  "product_categories",
  {
    ...baseFields(),

    ...slugField(),

    ...nameField(),
    ...descriptionField(),

    // Parent relationships
    // - nil
    //
    // Child relationships
    // - products (one-to-many)
    //
    // Many-to-many relationships
    // - nil

    ...timestampFields(),
  },
  (table) => [index().on(table.slug), index().on(table.name)]
);

export const productCategoryRelations = relations(
  productCategories,
  ({ many }) => ({
    products: many(products),
  })
);

// Product Variants
export const productVariants = pgTable("product_variants", {
  ...baseFields(),

  // Parent relationships
  // - product (many-to-one)
  //
  // Child relationships
  // - images (one-to-many)
  // - prices (via priceHistory, one-to-many)
  // - stock (via stockHistory, one-to-many)
  //
  // Many-to-many relationships
  // - retailers
  productId: uuid("product_id").notNull(),
  sku: varchar("sku", { length: 100 }).notNull(),
  size: varchar("size", { length: 50 }),
  color: varchar("color", { length: 50 }),

  ...timestampFields(),
});

export const productVariantRelations = relations(
  productVariants,
  ({ one }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    // images, prices, stock, retailers relations to be defined in their respective files
  })
);

// Product Tags
export const productTags = pgTable(
  "product_tags",
  {
    ...baseFields(),

    ...slugField(),

    ...nameField(),

    // Parent relationships
    // - nil
    //
    // Child relationships
    // - nil
    //
    // Many-to-many relationships
    // - products

    ...timestampFields(),
  },
  (table) => [index().on(table.slug)]
);

export const productTagRelations = relations(productTags, ({ many }) => ({
  products: many(products),
}));

export const products = pgTable(
  "products",
  {
    ...baseFields(),

    ...slugField(),

    ...nameField(),
    ...descriptionField(),

    // Foreign keys
    brandId: uuid("brand_id")
      .notNull()
      .references(() => brands.id),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => productCategories.id),

    // Parent relationships
    // - brand (many-to-one)
    // - category (many-to-one)
    //
    // Child relationships
    // - variants (one-to-many)
    // - images (one-to-many)
    // - recalls (one-to-many)
    // - reviews (one-to-many)
    //
    // Many-to-many relationships
    // - tags
    // - lists
    // - retailers
    // - certifications

    ...timestampFields(),
  },
  (table) => [
    index().on(table.slug),
    index().on(table.brandId),
    index().on(table.categoryId),
    index().on(table.name),
  ]
);

export const productRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  category: one(productCategories, {
    fields: [products.categoryId],
    references: [productCategories.id],
  }),
  variants: many(productVariants),
  // images, recalls, reviews, tags, lists, retailers, certifications relations to be defined in their respective files
}));

// Junction table for products and tags (many-to-many)
export const productTagsJunction = pgTable(
  "product_tags_junction",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => productTags.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => [
    index().on(table.productId),
    index().on(table.tagId),
    index().on(table.productId, table.tagId),
  ]
);

// Junction table for products and retailers (many-to-many)
export const productRetailersJunction = pgTable(
  "product_retailers_junction",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, {
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
  (table) => [
    index().on(table.productId),
    index().on(table.retailerId),
    index().on(table.productId, table.retailerId),
  ]
);

// Junction table for products and certifications (many-to-many)
export const productCertificationsJunction = pgTable(
  "product_certifications_junction",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    certificationId: uuid("certification_id")
      .notNull()
      .references(() => certifications.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => [
    index().on(table.productId),
    index().on(table.certificationId),
    index().on(table.productId, table.certificationId),
  ]
);
