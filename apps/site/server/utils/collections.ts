import { os } from "@orpc/server";
import { collections, orm } from "@repo/db";
import { newCollectionSchema } from "@repo/validation";
import { and, asc, desc, eq, ilike } from "drizzle-orm";
import { z } from "zod";

// List all collections with sorting, pagination, and filtering
export const listCollections = os
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
      sortBy: z.enum(["name", "createdAt", "updatedAt"]).optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
      filter: z
        .object({
          name: z.string().optional(),
        })
        .optional(),
    })
  )
  .handler(async (opts) => {
    const whereClauses = [];
    const { filter } = opts.input;
    if (filter && filter.name) {
      whereClauses.push(ilike(collections.name, `%${filter.name}%`));
    }
    const where = whereClauses.length > 0 ? and(...whereClauses) : undefined;

    const orderBy = [];
    if (opts.input.sortBy) {
      const orderFn = opts.input.sortOrder === "desc" ? desc : asc;
      if (opts.input.sortBy === "name") orderBy.push(orderFn(collections.name));
      else if (opts.input.sortBy === "createdAt")
        orderBy.push(orderFn(collections.createdAt));
      else if (opts.input.sortBy === "updatedAt")
        orderBy.push(orderFn(collections.updatedAt));
    }

    const limit = opts.input.limit ?? 40;
    const offset = opts.input.offset ?? 0;

    const query = orm
      .select()
      .from(collections)
      .where(where)
      .orderBy(...orderBy)
      .limit(limit)
      .offset(offset);

    return await query;
  });

// Get a collection by ID or slug
export const getCollection = os
  .input(
    z.union([
      z.object({ id: z.string().uuid() }),
      z.object({ slug: z.string() }),
    ])
  )
  .handler(async (opts) => {
    const identifier = opts.input;
    let where;
    if ("id" in identifier) where = eq(collections.id, identifier.id);
    else if ("slug" in identifier)
      where = eq(collections.slug, identifier.slug);
    const [collection] = await orm.select().from(collections).where(where);
    return collection ?? null;
  });

// Create a new collection
export const createCollection = os
  .input(z.object({ data: newCollectionSchema }))
  .handler(async (opts) => {
    const [created] = await orm
      .insert(collections)
      .values(opts.input.data)
      .returning();
    return created;
  });

// Update a collection by ID or slug
export const updateCollection = os
  .input(
    z
      .union([
        z.object({ id: z.string().uuid() }),
        z.object({ slug: z.string() }),
      ])
      .and(
        z.object({ data: newCollectionSchema.partial().omit({ slug: true }) })
      )
  )
  .handler(async (opts) => {
    const identifier = opts.input;
    let where;
    if ("id" in identifier) where = eq(collections.id, identifier.id);
    else if ("slug" in identifier)
      where = eq(collections.slug, identifier.slug);
    const [updated] = await orm
      .update(collections)
      .set({ ...opts.input.data })
      .where(where)
      .returning();
    return updated ?? null;
  });

// Delete a collection by ID or slug
export const deleteCollection = os
  .input(
    z.object({
      identifier: z.union([
        z.object({ id: z.string().uuid() }),
        z.object({ slug: z.string() }),
      ]),
    })
  )
  .handler(async (opts) => {
    const identifier = opts.input.identifier;
    let where;
    if ("id" in identifier) where = eq(collections.id, identifier.id);
    else if ("slug" in identifier)
      where = eq(collections.slug, identifier.slug);
    const result = await orm.delete(collections).where(where);
    return result.rowCount > 0;
  });
