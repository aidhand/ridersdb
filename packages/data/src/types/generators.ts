/**
 * Type alias for any database-like object
 */
export type AnyDatabase = any;

/**
 * Common options for all generators
 */
export interface GeneratorOptions {
  count?: number;
  state?: string;
  db?: AnyDatabase;
  transaction?: any;
  returnData?: boolean;
}
