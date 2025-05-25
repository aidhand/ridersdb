import { os } from "@orpc/server";
import { collections } from "@repo/db/schema";
import type { CollectionIdentifier } from "@repo/validation";
import {
  collectionIdentifierSchema,
  listCollectionsSchema,
  newCollectionSchema,
  updateCollectionSchema,
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
function createCollectionWhereClauses(
  identifier: CollectionIdentifier,
  fields: { id: typeof collections.id; slug: typeof collections.slug }
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

// List all collections with sorting, pagination, and filtering
export const listCollections = os
  .input(listCollectionsSchema)
  .handler(async (opts) => {
    try {
      const whereClauses = [];
      const { filter } = opts.input;
      if (filter && filter.name) {
        whereClauses.push(ilike(collections.name, `%${filter.name}%`));
      }
      const where = createCombinedWhereClause(whereClauses);

      const orderBy = [];
      if (opts.input.sortBy) {
        const orderFn = opts.input.sortOrder === "desc" ? desc : asc;
        if (opts.input.sortBy === "name")
          orderBy.push(orderFn(collections.name));
        else if (opts.input.sortBy === "createdAt")
          orderBy.push(orderFn(collections.createdAt));
        else if (opts.input.sortBy === "updatedAt")
          orderBy.push(orderFn(collections.updatedAt));
      }

      const limit = opts.input.limit ?? constants.DEFAULT_LIMIT;
      const offset = opts.input.offset ?? constants.DEFAULT_OFFSET;

      const query = db
        .select()
        .from(collections)
        .where(where)
        .orderBy(...orderBy)
        .limit(limit)
        .offset(offset);

      const allCollections = await query;
      return allCollections;
    } catch (error) {
      console.error("Error in listCollections:", error);
      throw new Error("Failed to list collections");
    }
  });

// Get a collection by ID or slug
export const getCollection = os
  .input(collectionIdentifierSchema)
  .handler(async (opts) => {
    try {
      const whereClauses = createCollectionWhereClauses(opts.input, {
        id: collections.id,
        slug: collections.slug,
      });

      const [collection] = await db
        .select()
        .from(collections)
        .where(whereClauses);
      return collection ?? null;
    } catch (error) {
      console.error("Error in getCollection:", error);
      throw new Error("Failed to get collection");
    }
  });

// Create a new collection
export const createCollection = os
  .input(v.object({ data: newCollectionSchema }))
  .handler(async (opts) => {
    try {
      const [created] = await db
        .insert(collections)
        .values({
          ...opts.input.data,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
      return created;
    } catch (error) {
      console.error("Error in createCollection:", error);
      throw new Error("Failed to create collection");
    }
  });

// Update a collection by ID or slug
export const updateCollection = os
  .input(
    v.intersect([identifierSchema, v.object({ data: updateCollectionSchema })])
  )
  .handler(async (opts) => {
    try {
      const whereClauses = createCollectionWhereClauses(opts.input, {
        id: collections.id,
        slug: collections.slug,
      });

      const [updated] = await db
        .update(collections)
        .set({ ...opts.input.data, updatedAt: new Date() })
        .where(whereClauses)
        .returning();
      return updated ?? null;
    } catch (error) {
      console.error("Error in updateCollection:", error);
      throw new Error("Failed to update collection");
    }
  });

// Delete a collection by ID or slug
export const deleteCollection = os
  .input(identifierSchema)
  .handler(async (opts) => {
    try {
      const whereClauses = createCollectionWhereClauses(opts.input, {
        id: collections.id,
        slug: collections.slug,
      });

      const result = await db.delete(collections).where(whereClauses);
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error in deleteCollection:", error);
      throw new Error("Failed to delete collection");
    }
  });
