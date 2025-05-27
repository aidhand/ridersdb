// GET /api/brands/[slug]
// Returns a single brand by slug
import { brands } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, message: "Brand slug is required" });
  }
  const result = await db.select().from(brands).where(eq(brands.slug, slug));
  if (!result.length) {
    throw createError({
      statusCode: 404,
      message: `Brand with slug '${slug}' not found`,
    });
  }
  return result[0];
});
