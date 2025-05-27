// GET /api/products/[slug]
// Returns a single product by slug with brand, collection, and variants
import { brands, collections, products, variants } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, message: "Product slug is required" });
  }
  const result = await db
    .select({
      product: products,
      brand: brands,
      collection: collections,
    })
    .from(products)
    .leftJoin(brands, eq(products.brand, brands.id))
    .leftJoin(collections, eq(products.collection, collections.id))
    .where(eq(products.slug, slug));
  if (!result.length) {
    throw createError({
      statusCode: 404,
      message: `Product with slug '${slug}' not found`,
    });
  }
  const row = result[0];
  if (!row) {
    throw createError({
      statusCode: 404,
      message: `Product with slug '${slug}' not found`,
    });
  }
  const productVariants = await db
    .select()
    .from(variants)
    .where(eq(variants.product, row.product.id));
  return {
    ...row.product,
    brandDetails: row.brand,
    collectionDetails: row.collection,
    variants: productVariants,
  };
});
