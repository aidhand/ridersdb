import { products } from "@repo/db/schema";
import { newProductSchema } from "@repo/validation";
import slugify from "slugify";
import { parse } from "valibot";
import { db } from "../utils/db";

export default defineEventHandler(async (event) => {
  if (event.method === "POST") {
    const body = await readBody(event);
    const parsed = parse(newProductSchema, {
      slug: slugify(body.name, {
        lower: true,
        strict: true,
      }),
      ...body,
    });

    const [created] = await db
      .insert(products)
      .values({
        ...parsed,
      })
      .returning();
    return created;
  }

  const query = await db.select().from(products);
  return query;
});
