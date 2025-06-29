/**
 * Type guard utilities for runtime type checking
 */

import type { NonEmptyArray } from "@repo/shared-types";

/**
 * Type guard for checking if value is not null or undefined
 */
export function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Type guard for checking if value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Type guard for checking if value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

/**
 * Type guard for checking if value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Type guard for checking if value is an object
 */
export function isObject(value: unknown): value is object {
  return value !== null && typeof value === "object";
}

/**
 * Type guard for checking if value is a plain object
 */
export function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    isObject(value) &&
    value.constructor === Object &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

/**
 * Type guard for checking if value is an array
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 * Type guard for checking if value is a function
 */
export function isFunction(
  value: unknown
): value is (...args: unknown[]) => unknown {
  return typeof value === "function";
}

/**
 * Type guard for checking if value is a Date
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Type guard for checking if value is a Promise
 */
export function isPromise<T>(value: unknown): value is Promise<T> {
  return (
    isObject(value) &&
    typeof (value as any).then === "function" &&
    typeof (value as any).catch === "function"
  );
}

/**
 * Type guard for checking if value is an Error
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Type guard for non-empty array
 */
export function isNonEmptyArray<T>(value: T[]): value is NonEmptyArray<T> {
  return value.length > 0;
}

/**
 * Asserts that a value is defined (throws if not)
 */
export function assertDefined<T>(
  value: T | null | undefined,
  message = "Value is null or undefined"
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}

/**
 * Asserts that a condition is true (throws if not)
 */
export function assert(
  condition: unknown,
  message = "Assertion failed"
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Creates a type predicate function
 */
export function createTypePredicate<T>(
  predicate: (value: unknown) => boolean
): (value: unknown) => value is T {
  return (value: unknown): value is T => predicate(value);
}
