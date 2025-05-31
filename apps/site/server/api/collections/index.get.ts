// GET /api/collections
// Returns a list of all collections
import { collections } from "@repo/db/schema";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async (_event) => {
  const allCollections = await db.select().from(collections);
  return allCollections;
});
