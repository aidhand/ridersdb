import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema",
  out: "./src/schema/migrations",

  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
