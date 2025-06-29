/**
 * Check if a value is defined and not null
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Check if a value is not null and not undefined and not empty string
 */
export function isNotEmpty<T>(value: T | null | undefined | ""): value is T {
  return isDefined(value) && value !== "";
}

/**
 * Validates email format using a basic regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates if a string is a valid slug (URL-friendly)
 */
export function isValidSlugBasic(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Validates if a price seems reasonable (basic sanity check)
 */
export function isValidPriceBasic(priceInCents: number): boolean {
  // Price should be positive and less than $100,000
  return priceInCents > 0 && priceInCents < 10000000;
}

/**
 * Validates if a string contains only alphanumeric characters and spaces
 */
export function isAlphanumericWithSpaces(str: string): boolean {
  const regex = /^[a-zA-Z0-9\s]+$/;
  return regex.test(str);
}

/**
 * Validates if a string is a valid UUID
 */
export function isValidUuid(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validates if a number is within a specific range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validates if an array has a minimum number of items
 */
export function hasMinLength<T>(array: T[], minLength: number): boolean {
  return Array.isArray(array) && array.length >= minLength;
}

/**
 * Type guard for checking if an object has a specific property
 */
export function hasProperty<T extends object, K extends PropertyKey>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> {
  return prop in obj;
}

/**
 * Validates if a string matches a specific pattern
 */
export function matchesPattern(str: string, pattern: RegExp): boolean {
  return pattern.test(str);
}

/**
 * Generic validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Creates a validation result
 */
export function createValidationResult(
  isValid: boolean,
  errors: string[] = []
): ValidationResult {
  return { isValid, errors };
}

/**
 * Combines multiple validation results
 */
export function combineValidationResults(
  ...results: ValidationResult[]
): ValidationResult {
  const isValid = results.every((result) => result.isValid);
  const errors = results.flatMap((result) => result.errors);
  return { isValid, errors };
}
