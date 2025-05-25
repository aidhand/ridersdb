import { products } from "@repo/db/schema";
import type { ProductIdentifier } from "@repo/validation";
import type { SQL } from "drizzle-orm";
import { and, eq, ilike } from "drizzle-orm";

/**
 * Creates SQL where clauses for querying by ID or slug
 * @param identifier Object containing either an ID or slug property
 * @returns SQL condition for querying
 */
export function getProductWhereClause(
  identifier: ProductIdentifier
): SQL | undefined {
  if ("id" in identifier) {
    return eq(products.id, identifier.id);
  }

  if ("slug" in identifier) {
    return eq(products.slug, identifier.slug);
  }

  return undefined;
}

/**
 * Creates where clauses for database queries based on identifier
 * @param identifier - The identifier object containing either id or slug
 * @param fields - The database fields to compare against
 * @returns A SQL condition that can be used in a query's where clause
 */
export function createWhereClauses(
  identifier: ProductIdentifier,
  fields: { id: typeof products.id; slug: typeof products.slug }
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
 * Creates a where clause for filtering by name
 * @param name - The name to filter by
 * @returns A SQL condition for ilike filtering
 */
export function createNameFilter(name: string): SQL {
  return ilike(products.name, `%${name}%`);
}

/**
 * Creates a where clause for filtering by brand
 * @param brandId - The brand ID to filter by
 * @returns A SQL condition for brand filtering
 */
export function createBrandFilter(brandId: string): SQL {
  return eq(products.brand, brandId);
}

/**
 * Creates a where clause for filtering by collection
 * @param collectionId - The collection ID to filter by
 * @returns A SQL condition for collection filtering
 */
export function createCollectionFilter(collectionId: string): SQL {
  return eq(products.collection, collectionId);
}

/**
 * Creates a combined where clause from multiple conditions
 * @param conditions - Array of SQL conditions
 * @returns A combined SQL condition using AND
 */
export function createCombinedWhereClause(conditions: SQL[]): SQL | undefined {
  return conditions.length > 0 ? and(...conditions) : undefined;
}
