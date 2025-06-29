import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { drizzle as drizzleWs } from "drizzle-orm/neon-serverless";
import { drizzle as drizzleBun } from "drizzle-orm/bun-sql";

import * as schema from "~/schema.js";

const config = {
  connectionString: process.env.DATABASE_URL!,
  options: {
    schema,
    // Additional options can be added here if needed
  },
};

export const wsDb = drizzleWs(config.connectionString, config.options);
export const httpDb = drizzleHttp(config.connectionString, config.options);
export const bunDb = drizzleBun(config.connectionString, config.options);
export const db = wsDb;
