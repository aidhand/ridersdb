/**
 * Common API types and interfaces
 */

/**
 * Standard API response structure
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: ApiMetadata;
}

/**
 * API error structure
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string;
  timestamp: string;
}

/**
 * API metadata for pagination, timing, etc.
 */
export interface ApiMetadata {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  timing?: {
    requestTime: string;
    processingTime: number;
  };
  version?: string;
  deprecation?: {
    deprecated: boolean;
    sunsetDate?: string;
    migrationGuide?: string;
  };
}

/**
 * HTTP methods
 */
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

/**
 * HTTP status codes
 */
export type HttpStatusCode =
  | 200
  | 201
  | 202
  | 204
  | 400
  | 401
  | 403
  | 404
  | 409
  | 422
  | 429
  | 500
  | 502
  | 503
  | 504;

/**
 * Request context
 */
export interface RequestContext {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  params: Record<string, string>;
  body?: any;
  user?: any;
  timestamp: Date;
  requestId: string;
}

/**
 * Response context
 */
export interface ResponseContext {
  statusCode: HttpStatusCode;
  headers: Record<string, string>;
  body?: any;
  timestamp: Date;
  processingTime: number;
}

/**
 * API endpoint definition
 */
export interface ApiEndpoint {
  method: HttpMethod;
  path: string;
  description?: string;
  tags?: string[];
  parameters?: ApiParameter[];
  requestBody?: ApiRequestBody;
  responses?: Record<HttpStatusCode, ApiResponse>;
  deprecated?: boolean;
}

/**
 * API parameter definition
 */
export interface ApiParameter {
  name: string;
  in: "query" | "path" | "header" | "cookie";
  required?: boolean;
  type: string;
  description?: string;
  example?: any;
  default?: any;
}

/**
 * API request body definition
 */
export interface ApiRequestBody {
  required?: boolean;
  contentType: string;
  schema: any;
  example?: any;
}

/**
 * Rate limiting information
 */
export interface RateLimit {
  limit: number;
  remaining: number;
  reset: Date;
  window: number;
}

/**
 * API client configuration
 */
export interface ApiClientConfig {
  baseUrl: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
  auth?: {
    type: "bearer" | "basic" | "apiKey";
    token?: string;
    username?: string;
    password?: string;
    apiKey?: string;
    apiKeyHeader?: string;
  };
}

/**
 * API versioning
 */
export interface ApiVersion {
  version: string;
  deprecated?: boolean;
  sunsetDate?: Date;
  migrationGuide?: string;
}

/**
 * Webhook payload
 */
export interface WebhookPayload<T = any> {
  event: string;
  data: T;
  timestamp: Date;
  id: string;
  version: string;
}

/**
 * Webhook configuration
 */
export interface WebhookConfig {
  url: string;
  events: string[];
  secret?: string;
  headers?: Record<string, string>;
  enabled: boolean;
  retries?: number;
  timeout?: number;
}
