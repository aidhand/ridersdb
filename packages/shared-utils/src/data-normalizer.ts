import { generateSlug, generateUniqueSlug } from "./strings";

/**
 * Generates a URL-friendly slug from a given string
 * @deprecated Use generateSlug or generateUniqueSlug from ./strings.js instead
 */
export function generateSlugLegacy(
  text: string,
  existingSlugs?: Set<string>
): string {
  if (existingSlugs) {
    return generateUniqueSlug(text, existingSlugs, { strict: false });
  }
  return generateSlug(text, { strict: false });
}

/**
 * Normalizes a brand name for consistent storage
 */
export function normalizeBrandName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/[^\w\s&.-]/g, "") // Keep only alphanumeric, spaces, &, ., -
    .replace(/\b\w/g, (l) => l.toUpperCase()); // Title case
}

/**
 * Normalizes a product name for consistent storage
 */
export function normalizeProductName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/[^\w\s&.-]/g, ""); // Keep only alphanumeric, spaces, &, ., -
}

/**
 * Extracts category information from URL path
 */
export function inferCategoryFromUrl(
  url: string
): { name: string; path: string } | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname
      .split("/")
      .filter((part) => part.length > 0);

    // Look for common e-commerce URL patterns
    const categoryIndicators = [
      "collections",
      "category",
      "categories",
      "products",
    ];
    for (let i = 0; i < pathParts.length - 1; i++) {
      const currentPart = pathParts[i];
      const nextPart = pathParts[i + 1];

      if (currentPart && categoryIndicators.includes(currentPart) && nextPart) {
        const categoryName = nextPart
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        return {
          name: categoryName,
          path: nextPart,
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Normalizes a URL by removing tracking parameters and fragments
 */
export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);

    // Remove common tracking parameters
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "ref",
      "source",
    ];
    trackingParams.forEach((param) => {
      urlObj.searchParams.delete(param);
    });

    // Remove fragment
    urlObj.hash = "";

    return urlObj.toString();
  } catch {
    return url;
  }
}

/**
 * Normalizes text for comparison (removes special characters, normalizes case)
 */
export function normalizeTextForComparison(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extracts domain from URL
 */
export function extractDomain(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return null;
  }
}

/**
 * Normalizes phone number format
 */
export function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters except +
  return phone.replace(/[^\d+]/g, "");
}

/**
 * Normalizes email address
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Extracts numeric value from string
 */
export function extractNumericValue(str: string): number | null {
  const match = str.match(/[\d,]+\.?\d*/);
  if (!match) return null;

  const numericString = match[0].replace(/,/g, "");
  const value = parseFloat(numericString);

  return isNaN(value) ? null : value;
}

/**
 * Normalizes file name for safe storage
 */
export function normalizeFileName(fileName: string): string {
  const parts = fileName.split(".");
  const extension = parts.length > 1 ? parts.pop() : "";
  const name = parts.join(".");

  const normalizedName = name
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  return extension ? `${normalizedName}.${extension}` : normalizedName;
}
