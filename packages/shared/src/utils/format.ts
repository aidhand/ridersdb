import slugify from "slugify";

/**
 * Formats bytes to human readable string
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
  );
}

/**
 * Format price in cents to currency string
 */
export function formatPrice(
  priceInCents: number,
  currency = "USD",
  locale = "en-US"
): string {
  const price = priceInCents / 100;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(price);
}

/**
 * Generate a URL-friendly slug from text
 */
export function generateSlug(text: string): string {
  if (!text || typeof text !== "string") {
    throw new Error("Text must be a non-empty string");
  }

  return slugify(text, {
    replacement: "-",
    lower: true,
    strict: true,
    locale: "en",
    trim: true,
  });
}

/**
 * Normalize text for consistent comparison
 */
export function normalizeText(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Normalize phone number format
 */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Generate a unique slug by appending numbers to avoid duplicates
 */
export function generateUniqueSlug(
  baseName: string,
  usedSlugs: Set<string>
): string {
  const baseSlug = generateSlug(baseName);
  let slug = baseSlug;
  let counter = 1;

  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  usedSlugs.add(slug);
  return slug;
}
