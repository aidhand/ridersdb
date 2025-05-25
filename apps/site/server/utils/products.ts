import { os } from "@orpc/server";
import { brands, collections, products } from "@repo/db/schema";
import {
  listProductsSchema,
  newProductSchema,
  productIdentifierSchema,
  updateProductSchema,
} from "@repo/validation";
import { identifierSchema } from "@repo/validation/shared";
import { asc, desc, eq } from "drizzle-orm";
import * as v from "valibot";
import { constants } from "../constants";
import { db } from "./db";
import {
  createBrandFilter,
  createCollectionFilter,
  createCombinedWhereClause,
  createNameFilter,
  createWhereClauses,
  getProductWhereClause,
} from "./whereClause";

// List all products with sorting, pagination, and filtering
export const listProducts = os
  .input(listProductsSchema)
  .handler(async (opts) => {
    try {
      const whereClauses = [];
      const { filter } = opts.input;
      if (filter) {
        if (filter.name) {
          whereClauses.push(createNameFilter(filter.name));
        }
        if (filter.brand) {
          whereClauses.push(createBrandFilter(filter.brand));
        }
        if (filter.collection) {
          whereClauses.push(createCollectionFilter(filter.collection));
        }
      }
      const where = createCombinedWhereClause(whereClauses);

      // Sorting
      const orderBy = [];
      if (opts.input.sortBy) {
        const orderFn = opts.input.sortOrder === "desc" ? desc : asc;
        if (opts.input.sortBy === "name") orderBy.push(orderFn(products.name));
        else if (opts.input.sortBy === "createdAt")
          orderBy.push(orderFn(products.createdAt));
        else if (opts.input.sortBy === "updatedAt")
          orderBy.push(orderFn(products.updatedAt));
      }

      // Pagination
      const limit = opts.input.limit ?? constants.DEFAULT_LIMIT;
      const offset = opts.input.offset ?? constants.DEFAULT_OFFSET;

      const query = db
        .select()
        .from(products)
        .where(where)
        .orderBy(...orderBy)
        .limit(limit)
        .offset(offset);

      const allProducts = await query;
      return allProducts;
    } catch (error) {
      console.error("Error in listProducts:", error);
      throw new Error("Failed to list products");
    }
  });

// Get a product by ID or slug
export const getProduct = os
  .input(productIdentifierSchema)
  .handler(async (opts) => {
    try {
      const whereClause = getProductWhereClause(opts.input);
      if (!whereClause) {
        throw new Error("Invalid identifier");
      }
      const [product] = await db.select().from(products).where(whereClause);
      return product ?? null;
    } catch (error) {
      console.error("Error in getProduct:", error);
      throw new Error("Failed to get product");
    }
  });

// Create a new product
export const createProduct = os
  .input(
    v.object({
      data: newProductSchema,
    })
  )
  .handler(async (opts) => {
    try {
      // Check or create brand
      const brandId = opts.input.data.brand;
      const brand = await db
        .select()
        .from(brands)
        .where(eq(brands.id, brandId));
      if (!brand.length) {
        // Try to create a minimal brand if not found
        await db
          .insert(brands)
          .values({
            id: brandId,
            name: "Unknown",
            slug: brandId,
            description: "",
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .onConflictDoNothing();
      }
      // Check or create collection
      const collectionId = opts.input.data.collection;
      const collection = await db
        .select()
        .from(collections)
        .where(eq(collections.id, collectionId));
      if (!collection.length) {
        // Try to create a minimal collection if not found
        await db
          .insert(collections)
          .values({
            id: collectionId,
            name: "Unknown",
            slug: collectionId,
            description: "",
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .onConflictDoNothing();
      }
      const [created] = await db
        .insert(products)
        .values(opts.input.data)
        .returning();
      return created;
    } catch (error) {
      console.error("Error in createProduct:", error);
      throw new Error("Failed to create product");
    }
  });

// Update a product by ID or slug
export const updateProduct = os
  .input(
    v.intersect([identifierSchema, v.object({ data: updateProductSchema })])
  )
  .handler(async (opts) => {
    try {
      const whereClauses = createWhereClauses(opts.input, {
        id: products.id,
        slug: products.slug,
      });

      const [updated] = await db
        .update(products)
        .set({ ...opts.input.data })
        .where(whereClauses)
        .returning();
      return updated ?? null;
    } catch (error) {
      console.error("Error in updateProduct:", error);
      throw new Error("Failed to update product");
    }
  });

// Delete a product by ID or slug
export const deleteProduct = os
  .input(identifierSchema)
  .handler(async (opts) => {
    try {
      const whereClauses = createWhereClauses(opts.input, {
        id: products.id,
        slug: products.slug,
      });

      const result = await db.delete(products).where(whereClauses);
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      throw new Error("Failed to delete product");
    }
  });
