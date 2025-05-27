// POST /api/products/[slug]
// Updates a product by slug
import { products } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, message: "Product slug is required" });
  }
  const body = await readBody(event);
  const [updated] = await db
    .update(products)
    .set(body)
    .where(eq(products.slug, slug))
    .returning();
  if (!updated) {
    throw createError({
      statusCode: 404,
      message: `Product with slug '${slug}' not found`,
    });
  }
  return updated;
});
