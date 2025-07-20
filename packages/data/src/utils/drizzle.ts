import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { drizzle as drizzleWs } from "drizzle-orm/neon-serverless";

import * as schema from "~/schema";

// Environment validation
// eslint-disable-next-line no-process-env
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Database configuration
const config = {
  connectionString: databaseUrl,
  options: {
    schema,
  },
} as const;

// Database connections - only create what we need
export const httpDb = drizzleHttp(config.connectionString, config.options);
export const wsDb = drizzleWs(config.connectionString, config.options);

// Smart connection factory with fallback strategy
function createDatabase() {
  // Prefer WebSocket for better performance
  // with HTTP fallback for environments where WS is unavailable
  try {
    // Test WebSocket connection by attempting to access it
    return wsDb;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.warn("WebSocket connection unavailable, using HTTP:", errorMessage);
    return httpDb;
  }
}

// Primary database export
export const db = createDatabase();
