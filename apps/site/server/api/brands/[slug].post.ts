// POST /api/brands/[slug]
// Updates a brand by slug
import { brands } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, message: "Brand slug is required" });
  }
  const body = await readBody(event);
  const [updated] = await db
    .update(brands)
    .set(body)
    .where(eq(brands.slug, slug))
    .returning();
  if (!updated) {
    throw createError({
      statusCode: 404,
      message: `Brand with slug '${slug}' not found`,
    });
  }
  return updated;
});
