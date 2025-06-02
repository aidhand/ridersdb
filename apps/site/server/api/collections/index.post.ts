// POST /api/collections
// Creates a new collection
import { collections } from "@repo/db/schema";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body?.name || !body?.slug) {
    throw createError({
      statusCode: 400,
      message: "Collection name and slug are required",
    });
  }
  const [collection] = await db
    .insert(collections)
    .values({ name: body.name, slug: body.slug })
    .returning();
  return collection;
});
