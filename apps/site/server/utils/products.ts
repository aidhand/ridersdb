import { os } from "@orpc/server";
import { brands, collections, orm, products } from "@repo/db";
import {
  newProductSchema,
  productIdentifierSchema,
  updateProductSchema,
  type ProductIdentifier,
} from "@repo/validation";
import { and, asc, desc, eq, ilike } from "drizzle-orm";
import { z } from "zod";

function getProductWhereClause(identifier: ProductIdentifier) {
  if ("id" in identifier) {
    return eq(products.id, identifier.id);
  }

  if ("slug" in identifier) {
    return eq(products.slug, identifier.slug);
  }
}

// List all products with sorting, pagination, and filtering
export const listProducts = os
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
      sortBy: z.enum(["name", "createdAt", "updatedAt"]).optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
      filter: z
        .object({
          name: z.string().optional(),
          brand: z.string().uuid().optional(),
          collection: z.string().uuid().optional(),
        })
        .optional(),
    })
  )
  .handler(async (opts) => {
    const whereClauses = [];
    const { filter } = opts.input;
    if (filter) {
      if (filter.name) {
        whereClauses.push(ilike(products.name, `%${filter.name}%`));
      }
      if (filter.brand) {
        whereClauses.push(eq(products.brand, filter.brand));
      }
      if (filter.collection) {
        whereClauses.push(eq(products.collection, filter.collection));
      }
    }
    const where = whereClauses.length > 0 ? and(...whereClauses) : undefined;

    // Sorting
    const orderBy: (ReturnType<typeof asc> | ReturnType<typeof desc>)[] = [];

    if (opts.input.sortBy) {
      const orderFn = opts.input.sortOrder === "desc" ? desc : asc;
      if (opts.input.sortBy === "name") orderBy.push(orderFn(products.name));
      else if (opts.input.sortBy === "createdAt")
        orderBy.push(orderFn(products.createdAt));
      else if (opts.input.sortBy === "updatedAt")
        orderBy.push(orderFn(products.updatedAt));
    }

    // Pagination
    const limit = opts.input.limit ?? 40;
    const offset = opts.input.offset ?? 0;

    const query = orm
      .select()
      .from(products)
      .where(where)
      .orderBy(...orderBy)
      .limit(limit)
      .offset(offset);

    const allProducts = await query;
    return allProducts;
  });

// Get a product by ID or slug
export const getProduct = os
  .input(productIdentifierSchema)
  .handler(async (opts) => {
    const whereClause = getProductWhereClause(opts.input);
    const [product] = await orm.select().from(products).where(whereClause);
    return product ?? null;
  });

// Create a new product
export const createProduct = os
  .input(
    z.object({
      data: newProductSchema,
    })
  )
  .handler(async (opts) => {
    // Check or create brand
    const brandId = opts.input.data.brand;
    const brand = await orm.select().from(brands).where(eq(brands.id, brandId));
    if (!brand.length) {
      // Try to create a minimal brand if not found
      await orm
        .insert(brands)
        .values({ id: brandId, name: "Unknown", slug: brandId })
        .onConflictDoNothing();
    }
    // Check or create collection
    const collectionId = opts.input.data.collection;
    const collection = await orm
      .select()
      .from(collections)
      .where(eq(collections.id, collectionId));
    if (!collection.length) {
      // Try to create a minimal collection if not found
      await orm
        .insert(collections)
        .values({ id: collectionId, name: "Unknown", slug: collectionId })
        .onConflictDoNothing();
    }
    const [created] = await orm
      .insert(products)
      .values(opts.input.data)
      .returning();
    return created;
  });

// Update a product by ID or slug
export const updateProduct = os
  .input(productIdentifierSchema.and(z.object({ data: updateProductSchema })))
  .handler(async (opts) => {
    const whereClause = getProductWhereClause(opts.input);
    const [updated] = await orm
      .update(products)
      .set({ ...opts.input.data })
      .where(whereClause)
      .returning();
    return updated ?? null;
  });

// Delete a product by ID or slug
export const deleteProduct = os
  .input(
    z.object({
      identifier: productIdentifierSchema,
    })
  )
  .handler(async (opts) => {
    const whereClause = getProductWhereClause(opts.input.identifier);
    const result = await orm.delete(products).where(whereClause);
    return result.rowCount > 0;
  });
