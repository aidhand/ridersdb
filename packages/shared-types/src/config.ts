/**
 * Configuration types for various parts of the application
 */

/**
 * Environment types
 */
export type Environment = "development" | "test" | "staging" | "production";

/**
 * Log levels
 */
export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

/**
 * Application configuration
 */
export interface AppConfig {
  name: string;
  version: string;
  environment: Environment;
  debug: boolean;
  port?: number;
  host?: string;
  basePath?: string;
  cors?: CorsConfig;
  rateLimit?: RateLimitConfig;
  logging?: LoggingConfig;
  features?: FeatureFlags;
}

/**
 * CORS configuration
 */
export interface CorsConfig {
  enabled: boolean;
  origin: string | string[] | boolean;
  methods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  credentials: boolean;
  maxAge?: number;
}

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  enabled: boolean;
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: string;
  message?: string;
  standardHeaders?: boolean;
  legacyHeaders?: boolean;
}

/**
 * Logging configuration
 */
export interface LoggingConfig {
  level: LogLevel;
  format: "json" | "text" | "pretty";
  destination: "console" | "file" | "both";
  file?: {
    path: string;
    maxSize: string;
    maxFiles: number;
    compress: boolean;
  };
  structured: boolean;
  includeTimestamp: boolean;
  includeLevel: boolean;
  includeContext: boolean;
}

/**
 * Feature flags
 */
export interface FeatureFlags {
  [key: string]: boolean | FeatureFlag;
}

/**
 * Advanced feature flag configuration
 */
export interface FeatureFlag {
  enabled: boolean;
  description?: string;
  rolloutPercentage?: number;
  conditions?: FeatureCondition[];
  metadata?: Record<string, any>;
}

/**
 * Feature flag conditions
 */
export interface FeatureCondition {
  type: "user" | "environment" | "date" | "custom";
  operator: "eq" | "ne" | "in" | "nin" | "gt" | "lt" | "gte" | "lte";
  value: any;
  field?: string;
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  enabled: boolean;
  provider: "memory" | "redis" | "memcached";
  ttl: number;
  maxSize?: number;
  keyPrefix?: string;
  connection?: {
    host: string;
    port: number;
    password?: string;
    database?: number;
  };
}

/**
 * Queue configuration
 */
export interface QueueConfig {
  enabled: boolean;
  provider: "memory" | "redis" | "rabbitmq" | "sqs";
  connection?: {
    host: string;
    port: number;
    username?: string;
    password?: string;
    vhost?: string;
  };
  defaultJobOptions?: {
    attempts: number;
    backoff: {
      type: "fixed" | "exponential";
      delay: number;
    };
    removeOnComplete: number;
    removeOnFail: number;
  };
}

/**
 * Email configuration
 */
export interface EmailConfig {
  enabled: boolean;
  provider: "smtp" | "sendgrid" | "mailgun" | "ses";
  from: {
    name: string;
    email: string;
  };
  smtp?: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  apiKey?: string;
  templates?: {
    path: string;
    engine: "handlebars" | "ejs" | "pug";
  };
}

/**
 * File storage configuration
 */
export interface StorageConfig {
  provider: "local" | "s3" | "gcs" | "azure";
  local?: {
    uploadPath: string;
    maxFileSize: number;
    allowedTypes: string[];
  };
  s3?: {
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    endpoint?: string;
  };
  gcs?: {
    bucket: string;
    projectId: string;
    keyFilename: string;
  };
  azure?: {
    connectionString: string;
    containerName: string;
  };
}

/**
 * Monitoring configuration
 */
export interface MonitoringConfig {
  enabled: boolean;
  metrics?: {
    enabled: boolean;
    endpoint: string;
    interval: number;
  };
  healthCheck?: {
    enabled: boolean;
    endpoint: string;
    dependencies: string[];
  };
  tracing?: {
    enabled: boolean;
    serviceName: string;
    endpoint: string;
    sampleRate: number;
  };
}

/**
 * Security configuration
 */
export interface SecurityConfig {
  headers: {
    hsts: boolean;
    noSniff: boolean;
    frameOptions: string;
    xssProtection: boolean;
    contentSecurityPolicy?: string;
  };
  encryption: {
    algorithm: string;
    keyLength: number;
    saltRounds: number;
  };
  session: {
    secret: string;
    secure: boolean;
    httpOnly: boolean;
    sameSite: "strict" | "lax" | "none";
    maxAge: number;
  };
}
