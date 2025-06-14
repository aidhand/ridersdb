import { pgEnum } from "drizzle-orm/pg-core";

export const themeEnum = pgEnum("theme_enum", ["light", "dark", "system"]);
export const languageEnum = pgEnum("language_enum", ["en"]);
export const regionEnum = pgEnum("region_enum", ["AU", "GB", "US"]);
export const currencyEnum = pgEnum("currency_enum", ["USD", "GBP", "AUD"]);
export const stockStatusEnum = pgEnum("stock_status_enum", [
  "in_stock",
  "out_of_stock",
  "pre_order",
  "backorder",
]);
