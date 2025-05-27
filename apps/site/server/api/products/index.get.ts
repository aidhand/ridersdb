// GET /api/products
// Returns a list of all products
import { brands, collections, products } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async (_event) => {
  const allProducts = await db
    .select({
      id: products.id,
      slug: products.slug,
      name: products.name,
      brand: {
        name: brands.name,
        slug: brands.slug,
      },
      collection: {
        name: collections.name,
        slug: collections.slug,
      },
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    })
    .from(products)
    .leftJoin(brands, eq(products.brand, brands.id))
    .leftJoin(collections, eq(products.collection, collections.id));

  return allProducts;
});
