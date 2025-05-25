import { os } from "@orpc/server";
import { brands } from "@repo/db/schema";
import type { BrandIdentifier } from "@repo/validation";
import {
  brandIdentifierSchema,
  listBrandsSchema,
  newBrandSchema,
  updateBrandSchema,
} from "@repo/validation";
import { identifierSchema } from "@repo/validation/shared";
import type { SQL } from "drizzle-orm";
import { and, asc, desc, eq, ilike } from "drizzle-orm";
import * as v from "valibot";
import { constants } from "../constants";
import { db } from "./db";

/**
 * Creates where clauses for database queries based on identifier
 * @param identifier - The identifier object containing either id or slug
 * @param fields - The database fields to compare against
 * @returns A SQL condition that can be used in a query's where clause
 */
function createBrandWhereClauses(
  identifier: BrandIdentifier,
  fields: { id: typeof brands.id; slug: typeof brands.slug }
): SQL {
  if ("id" in identifier) {
    return eq(fields.id, identifier.id);
  }

  if ("slug" in identifier) {
    return eq(fields.slug, identifier.slug);
  }

  throw new Error("Invalid identifier");
}

/**
 * Creates a combined where clause from multiple conditions
 * @param conditions - Array of SQL conditions
 * @returns A combined SQL condition using AND
 */
function createCombinedWhereClause(conditions: SQL[]): SQL | undefined {
  return conditions.length > 0 ? and(...conditions) : undefined;
}

// List all brands with sorting, pagination, and filtering
export const listBrands = os.input(listBrandsSchema).handler(async (opts) => {
  try {
    const whereClauses = [];
    const { filter } = opts.input;
    if (filter && filter.name) {
      whereClauses.push(ilike(brands.name, `%${filter.name}%`));
    }
    const where = createCombinedWhereClause(whereClauses);

    const orderBy = [];
    if (opts.input.sortBy) {
      const orderFn = opts.input.sortOrder === "desc" ? desc : asc;
      if (opts.input.sortBy === "name") orderBy.push(orderFn(brands.name));
      else if (opts.input.sortBy === "createdAt")
        orderBy.push(orderFn(brands.createdAt));
      else if (opts.input.sortBy === "updatedAt")
        orderBy.push(orderFn(brands.updatedAt));
    }

    const limit = opts.input.limit ?? constants.DEFAULT_LIMIT;
    const offset = opts.input.offset ?? constants.DEFAULT_OFFSET;

    const query = db
      .select()
      .from(brands)
      .where(where)
      .orderBy(...orderBy)
      .limit(limit)
      .offset(offset);

    const allBrands = await query;
    return allBrands;
  } catch (error) {
    console.error("Error in listBrands:", error);
    throw new Error("Failed to list brands");
  }
});

// Get a brand by ID or slug
export const getBrand = os
  .input(brandIdentifierSchema)
  .handler(async (opts) => {
    try {
      const whereClauses = createBrandWhereClauses(opts.input, {
        id: brands.id,
        slug: brands.slug,
      });

      const [brand] = await db.select().from(brands).where(whereClauses);
      return brand ?? null;
    } catch (error) {
      console.error("Error in getBrand:", error);
      throw new Error("Failed to get brand");
    }
  });

// Create a new brand
export const createBrand = os
  .input(v.object({ data: newBrandSchema }))
  .handler(async (opts) => {
    try {
      const [created] = await db
        .insert(brands)
        .values({
          ...opts.input.data,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
      return created;
    } catch (error) {
      console.error("Error in createBrand:", error);
      throw new Error("Failed to create brand");
    }
  });

// Update a brand by ID or slug
export const updateBrand = os
  .input(v.intersect([identifierSchema, v.object({ data: updateBrandSchema })]))
  .handler(async (opts) => {
    try {
      const whereClauses = createBrandWhereClauses(opts.input, {
        id: brands.id,
        slug: brands.slug,
      });

      const [updated] = await db
        .update(brands)
        .set({ ...opts.input.data, updatedAt: new Date() })
        .where(whereClauses)
        .returning();
      return updated ?? null;
    } catch (error) {
      console.error("Error in updateBrand:", error);
      throw new Error("Failed to update brand");
    }
  });

// Delete a brand by ID or slug
export const deleteBrand = os.input(identifierSchema).handler(async (opts) => {
  try {
    const whereClauses = createBrandWhereClauses(opts.input, {
      id: brands.id,
      slug: brands.slug,
    });

    const result = await db.delete(brands).where(whereClauses);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error in deleteBrand:", error);
    throw new Error("Failed to delete brand");
  }
});
