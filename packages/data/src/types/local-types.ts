/**
 * Local types specific to the data package
 * These are types that don't belong in shared-types because they're specific to data generation
 */

// Re-export specific database types from the original files for compatibility
import type * as schema from "../schema.js";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { NeonDatabase } from "drizzle-orm/neon-serverless";

// Database instance specific to this package's schema
export type DataDatabaseInstance =
  | NeonDatabase<typeof schema>
  | NeonHttpDatabase<typeof schema>
  | Parameters<Parameters<NeonDatabase<typeof schema>["transaction"]>[0]>[0]
  | Parameters<
      Parameters<NeonHttpDatabase<typeof schema>["transaction"]>[0]
    >[0];

// Legacy aliases for backward compatibility (the shared types are preferred)
export type { SeederOptions } from "@repo/shared-types/database";
export type { GeneratorOptions } from "@repo/shared-types/generators";
