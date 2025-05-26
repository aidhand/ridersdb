import { collections } from "@repo/db/schema";
import { db } from "../utils/db";

export default defineEventHandler(async (_) => {
  const query = await db.select().from(collections);
  return query;
});
