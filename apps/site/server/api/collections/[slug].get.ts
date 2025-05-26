// GET /api/collections/[slug]
// Returns a single collection by slug
import { collections } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({
      statusCode: 400,
      message: "Collection slug is required",
    });
  }
  const result = await db
    .select()
    .from(collections)
    .where(eq(collections.slug, slug));
  if (!result.length) {
    throw createError({
      statusCode: 404,
      message: `Collection with slug '${slug}' not found`,
    });
  }
  return result[0];
});
