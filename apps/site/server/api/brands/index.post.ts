// POST /api/brands
// Creates a new brand
import { brands } from "@repo/db/schema";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.name || !body?.slug) {
    throw createError({
      statusCode: 400,
      message: "Brand name and slug are required",
    });
  }
  const [brand] = await db
    .insert(brands)
    .values({ name: body.name, slug: body.slug })
    .returning();
  return brand;
});
