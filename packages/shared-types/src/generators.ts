import type { AnyDatabase } from "./database";

// Re-export AnyDatabase for convenience
export type { AnyDatabase };

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

/**
 * Generator result type
 */
export interface GeneratorResult<T = any> {
  success: boolean;
  data?: T[];
  error?: string;
  count: number;
}

/**
 * Generator status
 */
export type GeneratorStatus = "idle" | "running" | "completed" | "failed";

/**
 * Generator context
 */
export interface GeneratorContext {
  state: string;
  total: number;
  completed: number;
  failed: number;
  startTime: Date;
  endTime?: Date;
}

/**
 * Data generation strategy
 */
export type GenerationStrategy = "sequential" | "batch" | "parallel";

/**
 * Generator configuration
 */
export interface GeneratorConfig {
  name: string;
  strategy: GenerationStrategy;
  batchSize?: number;
  maxConcurrency?: number;
  dependencies?: string[];
  enabled?: boolean;
}

/**
 * Factory function type for data generation
 */
export type FactoryFunction<T> = (context: GeneratorContext) => T | Promise<T>;

/**
 * Seed data template
 */
export interface SeedTemplate<T = any> {
  name: string;
  factory: FactoryFunction<T>;
  count: number;
  dependencies?: string[];
}

/**
 * Validation rule for generated data
 */
export interface ValidationRule<T = any> {
  field: keyof T;
  validator: (value: any) => boolean;
  message: string;
}

/**
 * Data generation constraints
 */
export interface GenerationConstraints {
  maxItems?: number;
  minItems?: number;
  uniqueFields?: string[];
  validationRules?: ValidationRule[];
}

/**
 * Generator execution plan
 */
export interface ExecutionPlan {
  generators: Array<{
    name: string;
    config: GeneratorConfig;
    dependencies: string[];
    order: number;
  }>;
  totalSteps: number;
  estimatedDuration?: number;
}
