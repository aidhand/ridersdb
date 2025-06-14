import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./packages/db/schema",
  out: "./packages/db/migrations",

  dbCredentials: {
    url: process.env.DATABASE_URL_POOLER || process.env.DATABASE_URL || "",
  },
});
