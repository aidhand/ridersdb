/**
 * String and slug generation utilities
 * Consolidates all string manipulation logic across the application
 */

export interface SlugOptions {
  /** Whether to use strict mode (remove more characters) */
  strict?: boolean;
  /** Whether to trim whitespace */
  trim?: boolean;
  /** Custom replacement character for spaces */
  replacement?: string;
  /** Whether to preserve case (false = lowercase) */
  preserveCase?: boolean;
  /** Whether to add timestamp suffix for uniqueness */
  addTimestamp?: boolean;
  /** Custom timestamp format: 'short' | 'long' | 'base36' */
  timestampFormat?: "short" | "long" | "base36";
}

export interface UniqueSlugOptions extends SlugOptions {
  /** Maximum number of attempts to find unique slug */
  maxAttempts?: number;
  /** Start counter from specific number */
  startCounter?: number;
}

const DEFAULT_OPTIONS: SlugOptions = {
  strict: true,
  trim: true,
  replacement: "-",
  preserveCase: false,
  addTimestamp: false,
  timestampFormat: "base36",
};

const NUMBERED_SLUG_REGEX = /^(.+)-(\d+)$/;
const TIMESTAMP_SLUG_REGEX = /^(.+)-([a-z0-9]{6,})$/;

/**
 * Generates a basic slug from a string
 */
export function generateSlug(text: string, options: SlugOptions = {}): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (!text || typeof text !== "string") {
    return "";
  }

  let result = text;

  // Trim if required
  if (opts.trim) {
    result = result.trim();
  }

  // Convert to lowercase unless preserveCase is true
  if (!opts.preserveCase) {
    result = result.toLowerCase();
  }

  if (opts.strict) {
    // Strict mode: remove more characters
    result = result
      .replace(/[^\w\s-]/g, "") // Remove non-word chars except spaces and hyphens
      .replace(/\s+/g, opts.replacement || "-") // Replace spaces with replacement
      .replace(/-+/g, opts.replacement || "-"); // Replace multiple hyphens
  } else {
    // Less strict: keep more characters
    result = result
      .replace(/[^\w\s&.-]/g, "") // Keep alphanumeric, spaces, &, ., -
      .replace(/\s+/g, opts.replacement || "-") // Replace spaces
      .replace(/-+/g, opts.replacement || "-"); // Replace multiple hyphens
  }

  // Remove leading/trailing replacement characters
  const replacementChar = opts.replacement || "-";
  result = result.replace(
    new RegExp(`^${replacementChar}+|${replacementChar}+$`, "g"),
    ""
  );

  // Add timestamp if requested
  if (opts.addTimestamp) {
    const timestamp = generateTimestamp(opts.timestampFormat);
    result = result ? `${result}-${timestamp}` : timestamp;
  }

  return result;
}

/**
 * Generates a unique slug by checking against existing slugs
 */
export function generateUniqueSlug(
  text: string,
  usedSlugs: Set<string> | string[],
  options: UniqueSlugOptions = {}
): string {
  const opts = { maxAttempts: 1000, startCounter: 1, ...options };
  const slugSet = usedSlugs instanceof Set ? usedSlugs : new Set(usedSlugs);

  let baseSlug = generateSlug(text, options);
  let slug = baseSlug;

  // Check if the baseSlug already ends with a number
  let counter = opts.startCounter;
  const match = baseSlug.match(NUMBERED_SLUG_REGEX);
  if (match && match[1] && match[2]) {
    baseSlug = match[1];
    counter = parseInt(match[2], 10);
    slug = `${baseSlug}-${counter}`;
  }

  // Find the next available slug
  let attempts = 0;
  while (slugSet.has(slug) && attempts < opts.maxAttempts) {
    counter++;
    slug = `${baseSlug}-${counter}`;
    attempts++;
  }

  if (attempts >= opts.maxAttempts) {
    throw new Error(
      `Could not generate unique slug after ${opts.maxAttempts} attempts`
    );
  }

  return slug;
}

/**
 * Generates a timestamp-based slug
 */
export function generateTimestampSlug(
  text: string,
  format: "short" | "long" | "base36" = "base36",
  options: SlugOptions = {}
): string {
  const timestamp = generateTimestamp(format);
  const baseSlug = generateSlug(text, options);
  return baseSlug ? `${baseSlug}-${timestamp}` : timestamp;
}

/**
 * Extracts the base slug from a numbered or timestamp slug
 */
export function extractBaseSlug(slug: string): string {
  // Try numbered pattern first
  const numberedMatch = slug.match(NUMBERED_SLUG_REGEX);
  if (numberedMatch && numberedMatch[1]) {
    return numberedMatch[1];
  }

  // Try timestamp pattern
  const timestampMatch = slug.match(TIMESTAMP_SLUG_REGEX);
  if (timestampMatch && timestampMatch[1]) {
    return timestampMatch[1];
  }

  return slug;
}

/**
 * Validates if a string is a valid slug
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Generates a timestamp in different formats
 */
function generateTimestamp(
  format: "short" | "long" | "base36" = "base36"
): string {
  const now = Date.now();

  switch (format) {
    case "short":
      return Math.floor(now / 1000).toString();
    case "long":
      return now.toString();
    case "base36":
      return now.toString(36);
    default:
      return now.toString(36);
  }
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to title case
 */
export function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Converts a string to camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}

/**
 * Converts a string to PascalCase
 */
export function toPascalCase(str: string): string {
  const camelCase = toCamelCase(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

/**
 * Converts a string to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/**
 * Converts a string to snake_case
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();
}

/**
 * Truncates a string to a maximum length with ellipsis
 */
export function truncate(
  str: string,
  maxLength: number,
  suffix = "..."
): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Removes extra whitespace and normalizes spacing
 */
export function normalizeWhitespace(str: string): string {
  return str.trim().replace(/\s+/g, " ");
}

/**
 * Escapes HTML characters in a string
 */
export function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return str.replace(/[&<>"']/g, (match) => htmlEscapes[match] || match);
}

/**
 * Generates a random string of specified length
 */
export function generateRandomString(
  length = 8,
  charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}
