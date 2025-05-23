import { os } from "@orpc/server";
import { brands, orm } from "@repo/db";
import { newBrandSchema } from "@repo/validation";
import { and, asc, desc, eq, ilike } from "drizzle-orm";
import { z } from "zod";

// List all brands with sorting, pagination, and filtering
export const listBrands = os
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
      whereClauses.push(ilike(brands.name, `%${filter.name}%`));
    }
    const where = whereClauses.length > 0 ? and(...whereClauses) : undefined;

    const orderBy = [];
    if (opts.input.sortBy) {
      const orderFn = opts.input.sortOrder === "desc" ? desc : asc;
      if (opts.input.sortBy === "name") orderBy.push(orderFn(brands.name));
      else if (opts.input.sortBy === "createdAt")
        orderBy.push(orderFn(brands.createdAt));
      else if (opts.input.sortBy === "updatedAt")
        orderBy.push(orderFn(brands.updatedAt));
    }

    const limit = opts.input.limit ?? 40;
    const offset = opts.input.offset ?? 0;

    const query = orm
      .select()
      .from(brands)
      .where(where)
      .orderBy(...orderBy)
      .limit(limit)
      .offset(offset);

    return await query;
  });

// Get a brand by ID or slug
export const getBrand = os
  .input(
    z.union([
      z.object({ id: z.string().uuid() }),
      z.object({ slug: z.string() }),
    ])
  )
  .handler(async (opts) => {
    const identifier = opts.input;
    let where;
    if ("id" in identifier) where = eq(brands.id, identifier.id);
    else if ("slug" in identifier) where = eq(brands.slug, identifier.slug);
    const [brand] = await orm.select().from(brands).where(where);
    return brand ?? null;
  });

// Create a new brand
export const createBrand = os
  .input(z.object({ data: newBrandSchema }))
  .handler(async (opts) => {
    const [created] = await orm
      .insert(brands)
      .values(opts.input.data)
      .returning();
    return created;
  });

// Update a brand by ID or slug
export const updateBrand = os
  .input(
    z
      .union([
        z.object({ id: z.string().uuid() }),
        z.object({ slug: z.string() }),
      ])
      .and(z.object({ data: newBrandSchema.partial().omit({ slug: true }) }))
  )
  .handler(async (opts) => {
    const identifier = opts.input;
    let where;
    if ("id" in identifier) where = eq(brands.id, identifier.id);
    else if ("slug" in identifier) where = eq(brands.slug, identifier.slug);
    const [updated] = await orm
      .update(brands)
      .set({ ...opts.input.data })
      .where(where)
      .returning();
    return updated ?? null;
  });

// Delete a brand by ID or slug
export const deleteBrand = os
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
    if ("id" in identifier) where = eq(brands.id, identifier.id);
    else if ("slug" in identifier) where = eq(brands.slug, identifier.slug);
    const result = await orm.delete(brands).where(where);
    return result.rowCount > 0;
  });
