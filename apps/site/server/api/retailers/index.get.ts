// GET /api/retailers
// Returns a list of all retailers
import { retailers } from "@repo/db/schema";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async () => {
  const allRetailers = await db.select().from(retailers);
  return allRetailers;
});
