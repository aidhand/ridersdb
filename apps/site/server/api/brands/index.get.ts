// GET /api/brands
// Returns a list of all brands
import { brands } from "@repo/db/schema";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async () => {
  const allBrands = await db.select().from(brands);
  return allBrands;
});
