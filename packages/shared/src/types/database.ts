import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { NeonDatabase } from "drizzle-orm/neon-serverless";

/**
 * Generic database type that can be any database instance
 */
export type AnyDatabase = any;

/**
 * Database instance type that supports multiple Drizzle drivers
 */
export type DatabaseInstance<
  TSchema extends Record<string, unknown> = Record<string, unknown>,
> =
  | NeonDatabase<TSchema>
  | NeonHttpDatabase<TSchema>
  | Parameters<Parameters<NeonDatabase<TSchema>["transaction"]>[0]>[0]
  | Parameters<Parameters<NeonHttpDatabase<TSchema>["transaction"]>[0]>[0];

/**
 * Database configuration options
 */
export interface DatabaseConfig {
  connectionString: string;
  schema?: any;
  options?: Record<string, any>;
}

/**
 * Database connection options
 */
export interface ConnectionOptions {
  pooling?: boolean;
  ssl?: boolean;
  timeout?: number;
  retries?: number;
}

/**
 * Transaction callback type
 */
export type TransactionCallback<T> = (tx: AnyDatabase) => Promise<T>;

/**
 * Batch query type
 */
export type BatchableQuery = any;

/**
 * Database operation result
 */
export interface DatabaseResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  affectedRows?: number;
}

/**
 * Pagination options
 */
export interface PaginationOptions {
  page?: number;
  limit?: number;
  offset?: number;
}

/**
 * Pagination result
 */
export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Sorting options
 */
export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

/**
 * Filter options
 */
export interface FilterOptions {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "like" | "in" | "nin";
  value: any;
}

/**
 * Query options
 */
export interface QueryOptions {
  pagination?: PaginationOptions;
  sort?: SortOptions[];
  filters?: FilterOptions[];
  include?: string[];
  exclude?: string[];
}

/**
 * Seeder options
 */
export interface SeederOptions {
  count?: number;
  transaction?: any;
  state?: string;
  returnData?: boolean;
}

/**
 * Migration status
 */
export type MigrationStatus = "pending" | "running" | "completed" | "failed";

/**
 * Migration info
 */
export interface MigrationInfo {
  id: string;
  name: string;
  status: MigrationStatus;
  appliedAt?: Date;
  error?: string;
}
