/**
 * Data generation specific utilities
 * These utilities are specific to data generation and seeding operations
 */

import type { AnyDatabase, BatchableQuery } from "@repo/shared-types";

/**
 * Runs multiple queries as a batch operation when supported
 * Gracefully falls back to sequential execution if batch operations are not supported
 *
 * Supported drivers: LibSQL, Neon HTTP, Cloudflare D1
 * Unsupported drivers: Regular PostgreSQL, MySQL (will fallback to sequential)
 *
 * @example
 * ```typescript
 * const queries = [
 *   db.insert(users).values({ name: 'John' }),
 *   db.insert(users).values({ name: 'Jane' }),
 *   db.select().from(users)
 * ];
 *
 * const results = await runInBatch(db, queries);
 * // results[0] - insert result for John
 * // results[1] - insert result for Jane
 * // results[2] - select result with all users
 * ```
 */
export async function runInBatch<T extends readonly BatchableQuery[]>(
  db: AnyDatabase,
  queries: T
): Promise<any[]> {
  // Early return for empty queries array
  if (!queries || queries.length === 0) {
    return [];
  }

  // Check if database has batch method and it's a function
  if (typeof db.batch === "function") {
    try {
      const result = await db.batch(queries);
      logProgress(`Executed ${queries.length} queries in batch`);
      return result;
    } catch (error: any) {
      const errorMessage = error?.message || String(error);

      // Check for batch-related errors
      if (
        errorMessage.includes("batch") ||
        errorMessage.includes("Batch") ||
        errorMessage.includes("not supported") ||
        errorMessage.includes("not available") ||
        errorMessage.includes("not implemented")
      ) {
        // Log warning and fall back to sequential execution
        console.warn(
          "⚠️ Database batch operations not supported by this connection, falling back to sequential execution"
        );
      } else {
        // Re-throw non-batch-related errors
        throw error;
      }
    }
  }

  // Fallback: execute queries sequentially
  logProgress(
    `Executing ${queries.length} queries sequentially (batch not supported)`
  );
  const results = [];

  for (let i = 0; i < queries.length; i++) {
    try {
      const result = await queries[i];
      results.push(result);
    } catch (error: any) {
      // Add context about which query failed
      const enhancedError = new Error(
        `Query ${i + 1} of ${queries.length} failed: ${error.message}`
      );
      enhancedError.cause = error;
      throw enhancedError;
    }
  }

  return results;
}

/**
 * Logs progress with a consistent format
 */
export function logProgress(message: string): void {
  console.log(`🌱 ${message}`);
}

/**
 * Logs success with a consistent format
 */
export function logSuccess(message: string): void {
  console.log(`✅ ${message}`);
}
