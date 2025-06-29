import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { drizzle as drizzleWs } from "drizzle-orm/neon-serverless";
import { drizzle as drizzleBun } from "drizzle-orm/bun-sql";
import type {
  AnyDatabase,
  BatchableQuery,
  DatabaseConfig,
} from "@repo/shared-types";

/**
 * Creates database connections with different drivers
 */
export function createDatabaseConnections(config: DatabaseConfig) {
  const dbConfig = {
    connectionString: config.connectionString,
    options: {
      schema: config.schema,
      ...config.options,
    },
  };

  return {
    wsDb: drizzleWs(dbConfig.connectionString, dbConfig.options),
    httpDb: drizzleHttp(dbConfig.connectionString, dbConfig.options),
    bunDb: drizzleBun(dbConfig.connectionString, dbConfig.options),
  };
}

/**
 * Runs a callback within a database transaction
 * Gracefully falls back to running without a transaction if transactions are not supported
 */
export async function runInTransaction<T>(
  db: AnyDatabase,
  callback: (tx: AnyDatabase) => Promise<T>,
  transaction?: any
): Promise<T> {
  if (transaction) {
    return callback(transaction);
  }

  try {
    return await db.transaction(callback);
  } catch (error: any) {
    // Check if the error is related to transaction support
    const errorMessage = error?.message || String(error);
    if (
      errorMessage.includes("No transactions support") ||
      errorMessage.includes("transactions not supported") ||
      errorMessage.includes("transaction support not available") ||
      errorMessage.includes("neon-http driver")
    ) {
      // Log warning and fall back to running without transaction
      console.warn(
        "⚠️ Database transactions not supported by this connection, running operations without transaction"
      );
      return callback(db);
    }

    // Re-throw any other errors
    throw error;
  }
}

/**
 * Runs multiple queries as a batch operation when supported
 * Gracefully falls back to sequential execution if batch operations are not supported
 */
export async function runBatch<T extends readonly BatchableQuery[]>(
  db: AnyDatabase,
  queries: T,
  transaction?: any
): Promise<any[]> {
  const executor = transaction || db;

  try {
    // Try to run as a batch
    return await executor.batch(queries);
  } catch (error: any) {
    // Check if the error is related to batch support
    const errorMessage = error?.message || String(error);
    if (
      errorMessage.includes("batch not supported") ||
      errorMessage.includes("batch operations not available") ||
      errorMessage.includes("neon-http driver")
    ) {
      // Log warning and fall back to sequential execution
      console.warn(
        "⚠️ Database batch operations not supported by this connection, running queries sequentially"
      );
      const results = [];
      for (const query of queries) {
        const result = await executor.execute(query);
        results.push(result);
      }
      return results;
    }

    // Re-throw any other errors
    throw error;
  }
}

/**
 * Safely executes a database operation with error handling
 */
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  fallbackValue?: T
): Promise<T | undefined> {
  try {
    return await operation();
  } catch (error) {
    console.error("Database operation failed:", error);
    return fallbackValue;
  }
}
