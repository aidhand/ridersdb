import type { ErrorResponse } from "@repo/shared-types";

/**
 * Base error class for application errors
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code = "UNKNOWN_ERROR",
    statusCode = 500,
    isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Error for validation failures
 */
export class ValidationError extends AppError {
  public readonly field?: string;

  constructor(message: string, field?: string) {
    super(message, "VALIDATION_ERROR", 400);
    this.field = field;
  }
}

/**
 * Error for not found resources
 */
export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string) {
    const message =
      identifier ?
        `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;
    super(message, "NOT_FOUND", 404);
  }
}

/**
 * Error for duplicate resources
 */
export class DuplicateError extends AppError {
  constructor(resource: string, identifier?: string) {
    const message =
      identifier ?
        `${resource} with identifier '${identifier}' already exists`
      : `${resource} already exists`;
    super(message, "DUPLICATE_ERROR", 409);
  }
}

/**
 * Error for database operations
 */
export class DatabaseError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(message, "DATABASE_ERROR", 500);
    if (originalError) {
      this.stack = originalError.stack;
    }
  }
}

/**
 * Error for external API failures
 */
export class ExternalApiError extends AppError {
  public readonly service: string;

  constructor(service: string, message: string, statusCode = 502) {
    super(`${service} API error: ${message}`, "EXTERNAL_API_ERROR", statusCode);
    this.service = service;
  }
}

/**
 * Error for rate limiting
 */
export class RateLimitError extends AppError {
  constructor(message = "Too many requests") {
    super(message, "RATE_LIMIT_ERROR", 429);
  }
}

/**
 * Error for authentication failures
 */
export class AuthenticationError extends AppError {
  constructor(message = "Authentication failed") {
    super(message, "AUTHENTICATION_ERROR", 401);
  }
}

/**
 * Error for authorization failures
 */
export class AuthorizationError extends AppError {
  constructor(message = "Insufficient permissions") {
    super(message, "AUTHORIZATION_ERROR", 403);
  }
}

/**
 * Type guard to check if an error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Safely extracts error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred";
}

/**
 * Safely extracts error code from unknown error
 */
export function getErrorCode(error: unknown): string {
  if (isAppError(error)) {
    return error.code;
  }
  return "UNKNOWN_ERROR";
}

/**
 * Creates a standardized error response object
 */
export function createErrorResponse(error: unknown): ErrorResponse {
  if (isAppError(error)) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        statusCode: error.statusCode,
        timestamp: new Date().toISOString(),
        ...(error instanceof ValidationError &&
          error.field && { field: error.field }),
      },
    };
  }

  return {
    success: false,
    error: {
      code: "UNKNOWN_ERROR",
      message: getErrorMessage(error),
      statusCode: 500,
      timestamp: new Date().toISOString(),
    },
  };
}
