import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import {
  descriptionColumn,
  nameColumn,
  slugColumn,
  timestamps,
} from "./shared";

export const brands = pgTable(
  "brands",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: slugColumn(),
    name: nameColumn(),
    description: descriptionColumn(),

    // Brand-specific data
    logo_url: text("logo_url"),
    website_url: text("website_url"),

    // System fields
    ...timestamps(),
  },
  (table) => [index("brands_slug_idx").on(table.slug)]
);
