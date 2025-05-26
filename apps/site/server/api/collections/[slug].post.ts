// POST /api/collections/[slug]
// Updates a collection by slug
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
  const body = await readBody(event);
  const [updated] = await db
    .update(collections)
    .set(body)
    .where(eq(collections.slug, slug))
    .returning();
  if (!updated) {
    throw createError({
      statusCode: 404,
      message: `Collection with slug '${slug}' not found`,
    });
  }
  return updated;
});
