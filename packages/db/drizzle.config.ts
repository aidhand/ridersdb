import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema",
  out: "./migrations",

  dbCredentials: {
    url: (process.env.NUXT_DATABASE_URL || process.env.DATABASE_URL) as string,
  },
});
