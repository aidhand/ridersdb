import {
  foreignKey,
  index,
  integer,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import {
  descriptionColumn,
  nameColumn,
  slugColumn,
  timestamps,
} from "./shared";

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: slugColumn(),
    name: nameColumn(),
    description: descriptionColumn(),

    // Relationship fields
    parentId: uuid("parent_id"),
    parentSlug: text("parent_slug"),

    // Category-specific data
    sortOrder: integer("sort_order"),

    // System fields
    ...timestamps(),
  },
  (table) => [
    foreignKey({ columns: [table.parentId], foreignColumns: [table.id] }),
    foreignKey({ columns: [table.parentSlug], foreignColumns: [table.slug] }),
    index("categories_slug_idx").on(table.slug),
    index("categories_parent_slug_idx").on(table.parentSlug),
  ]
);
