/**
 * Parse price string to cents
 */
export function parsePriceString(priceString: string): number | null {
  if (!priceString || typeof priceString !== "string") {
    return null;
  }

  // Remove currency symbols, spaces, and commas
  const cleanPrice = priceString
    .replace(/[$£€¥₹₦₪₨₴₡₩¢]/g, "")
    .replace(/[,\s]/g, "")
    .trim();

  const parsed = Number.parseFloat(cleanPrice);
  if (isNaN(parsed)) {
    return null;
  }

  // Convert to cents (assuming 2 decimal places)
  return Math.round(parsed * 100);
}
