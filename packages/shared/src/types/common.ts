/**
 * Common utility types used across the application
 */

/**
 * Makes all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Makes all properties required recursively
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Makes specified keys optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Makes specified keys required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/**
 * Extracts the type of array elements
 */
export type ArrayElement<T> = T extends Array<infer U> ? U : never;

/**
 * Non-empty array type
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Pretty print type (improves IDE display)
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Creates a type with nullable values
 */
export type Nullable<T> = T | null;

/**
 * Creates a type with optional values
 */
export type Optional<T> = T | undefined;

/**
 * Creates a type that can be null, undefined, or the original type
 */
export type Maybe<T> = T | null | undefined;

/**
 * JSON-serializable types
 */
export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [Key in string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

/**
 * Event handler type
 */
export type EventHandler<T = unknown> = (event: T) => void | Promise<void>;

/**
 * Async function type
 */
export type AsyncFunction<TArgs extends any[] = any[], TReturn = any> = (
  ...args: TArgs
) => Promise<TReturn>;

/**
 * Constructor type
 */
export type Constructor<T = object> = new (...args: unknown[]) => T;

/**
 * Abstract constructor type
 */
export type AbstractConstructor<T = object> = abstract new (
  ...args: unknown[]
) => T;

/**
 * Timestamp fields that are common across entities
 */
export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Soft delete fields
 */
export interface SoftDelete {
  deletedAt: Date | null;
}

/**
 * Base entity with common fields
 */
export interface BaseEntity extends Timestamps {
  id: string;
}

/**
 * Base entity with soft delete
 */
export interface SoftDeleteEntity extends BaseEntity, SoftDelete {}

/**
 * Audit fields for tracking changes
 */
export interface AuditFields extends Timestamps {
  createdBy?: string;
  updatedBy?: string;
}

/**
 * Versioning fields
 */
export interface Versioned {
  version: number;
}

/**
 * Status enumeration
 */
export type Status =
  | "active"
  | "inactive"
  | "pending"
  | "suspended"
  | "archived";

/**
 * Priority levels
 */
export type Priority = "low" | "medium" | "high" | "urgent" | "critical";

/**
 * Common response patterns
 */
export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    statusCode: number;
    timestamp: string;
    details?: Record<string, any>;
    field?: string;
  };
}

export type ApiResult<T = any> = SuccessResponse<T> | ErrorResponse;

/**
 * File information
 */
export interface FileInfo {
  name: string;
  size: number;
  type: string;
  url: string;
  path?: string;
  hash?: string;
  uploadedAt: Date;
  uploadedBy?: string;
}

/**
 * Geolocation data
 */
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

/**
 * Contact information
 */
export interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  socialMedia?: Record<string, string>;
}

/**
 * Money/currency representation
 */
export interface Money {
  amount: number; // Amount in cents/smallest currency unit
  currency: string; // ISO 4217 currency code
}

/**
 * Date range
 */
export interface DateRange {
  start: Date;
  end: Date;
}

/**
 * Time period
 */
export interface TimePeriod {
  duration: number; // Duration in milliseconds
  unit:
    | "milliseconds"
    | "seconds"
    | "minutes"
    | "hours"
    | "days"
    | "weeks"
    | "months"
    | "years";
}

/**
 * Search and filtering
 */
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  sort?: Array<{
    field: string;
    direction: "asc" | "desc";
  }>;
  pagination?: {
    page: number;
    limit: number;
  };
}

/**
 * Metadata container
 */
export interface WithMetadata<T = Record<string, any>> {
  metadata: T;
}

/**
 * Tagged entity
 */
export interface Tagged {
  tags: string[];
}

/**
 * Categorized entity
 */
export interface Categorized {
  category: string;
  subcategory?: string;
}

/**
 * Slug-enabled entity
 */
export interface Slugged {
  slug: string;
}

/**
 * SEO fields
 */
export interface SeoFields {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

/**
 * Publication status
 */
export type PublicationStatus =
  | "draft"
  | "published"
  | "scheduled"
  | "archived";

/**
 * Published entity
 */
export interface Published {
  status: PublicationStatus;
  publishedAt?: Date;
  scheduledAt?: Date;
}

/**
 * Translatable content
 */
export interface Translatable {
  language: string;
  translations?: Record<string, any>;
}

/**
 * Rate limited resource
 */
export interface RateLimited {
  rateLimit: {
    limit: number;
    remaining: number;
    resetAt: Date;
  };
}

/**
 * Cacheable resource
 */
export interface Cacheable {
  cacheKey: string;
  cacheExpiry: Date;
  etag?: string;
}

/**
 * Event data
 */
export interface Event<T = any> {
  id: string;
  type: string;
  data: T;
  timestamp: Date;
  source: string;
  version: string;
  metadata?: Record<string, any>;
}

/**
 * Notification data
 */
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  recipient: string;
  read: boolean;
  createdAt: Date;
  readAt?: Date;
  metadata?: Record<string, any>;
}
