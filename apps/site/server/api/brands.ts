import { brands } from "@repo/db/schema";

export default defineEventHandler(async (_) => {
  const query = await db.select().from(brands);

  return query;
});
