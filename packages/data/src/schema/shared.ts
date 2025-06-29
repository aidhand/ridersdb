import { sql } from "drizzle-orm";
import { integer, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const idColumn = () => {
  return integer("id").primaryKey().notNull();
};

export const slugColumn = () => {
  return varchar("slug", { length: 255 }).notNull().unique();
};

export const nameColumn = () => {
  return varchar("name", { length: 255 }).notNull();
};

export const descriptionColumn = () => {
  return text("description");
};

export const createdAtColumn = () => {
  return timestamp("created_at")
    .notNull()
    .$defaultFn(() => sql`now()`);
};

export const updatedAtColumn = () => {
  return timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date());
};

export const timestamps = () => ({
  createdAt: createdAtColumn(),
  updatedAt: updatedAtColumn(),
});
