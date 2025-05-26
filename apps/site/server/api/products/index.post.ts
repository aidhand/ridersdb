// POST /api/products
// Creates a new product
import { products } from "@repo/db/schema";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.name || !body?.slug) {
    throw createError({
      statusCode: 400,
      message: "Product name and slug are required",
    });
  }
  const [product] = await db.insert(products).values(body).returning();
  return product;
});
