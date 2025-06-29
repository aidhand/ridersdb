/**
 * Price parsing and formatting utilities
 */

export interface ParsedPrice {
  priceInCents: number;
  currency: string;
}

/**
 * Parses price strings and converts them to cents
 */
export function parsePrice(priceString: string): ParsedPrice {
  if (!priceString || typeof priceString !== "string") {
    return { priceInCents: 0, currency: "AUD" };
  }

  // Remove whitespace and common price prefixes/suffixes
  const cleaned = priceString
    .trim()
    .replace(/^(from|starting|price:?)\s*/i, "");

  // Extract currency symbol or code
  const currencyMatch = cleaned.match(/([A-Z]{3})|([£$€¥₹₪₽¢₩₦₡₨₴₵₸₺₼₾])/);
  let currency = "AUD"; // Default currency

  if (currencyMatch) {
    const symbol = currencyMatch[0];
    // Map common symbols to currency codes
    const symbolMap: Record<string, string> = {
      "$": "AUD", // Assuming Australian context
      "£": "GBP",
      "€": "EUR",
      "¥": "JPY",
      "₹": "INR",
    };
    currency = symbolMap[symbol] || currencyMatch[0];
  }

  // Extract numeric value
  const numericMatch = cleaned.match(/[\d,]+\.?\d*/);
  if (!numericMatch) {
    return { priceInCents: 0, currency };
  }

  // Parse the number
  const numericString = numericMatch[0].replace(/,/g, "");
  const price = parseFloat(numericString);

  if (isNaN(price)) {
    return { priceInCents: 0, currency };
  }

  // Convert to cents (multiply by 100 and round to handle floating point precision)
  const priceInCents = Math.round(price * 100);

  return { priceInCents, currency };
}

/**
 * Formats price in cents back to a readable string
 */
export function formatPrice(
  priceInCents: number,
  currency = "AUD",
  options: {
    showCurrency?: boolean;
    locale?: string;
  } = {}
): string {
  const { showCurrency = true, locale = "en-AU" } = options;
  const price = priceInCents / 100;

  if (showCurrency) {
    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(price);
    } catch {
      // Fallback if currency code is not supported
      return formatPriceWithSymbol(priceInCents, currency);
    }
  }

  return price.toFixed(2);
}

/**
 * Formats price with currency symbol (fallback method)
 */
function formatPriceWithSymbol(priceInCents: number, currency: string): string {
  const price = priceInCents / 100;

  const currencySymbols: Record<string, string> = {
    AUD: "$",
    USD: "$",
    GBP: "£",
    EUR: "€",
    JPY: "¥",
    INR: "₹",
  };

  const symbol = currencySymbols[currency] || currency;
  return `${symbol}${price.toFixed(2)}`;
}

/**
 * Validates if a price seems reasonable (basic sanity check)
 */
export function isValidPrice(priceInCents: number): boolean {
  // Price should be positive and less than $100,000
  return priceInCents > 0 && priceInCents < 10000000;
}

/**
 * Calculates percentage discount between RRP and current price
 */
export function calculateDiscount(
  currentPriceInCents: number,
  rrpInCents: number
): number {
  if (rrpInCents <= 0 || currentPriceInCents <= 0) {
    return 0;
  }

  if (currentPriceInCents >= rrpInCents) {
    return 0;
  }

  return Math.round(((rrpInCents - currentPriceInCents) / rrpInCents) * 100);
}

/**
 * Calculates tax amount from a price
 */
export function calculateTax(
  priceInCents: number,
  taxRate: number,
  inclusive = true
): number {
  if (inclusive) {
    // Tax is included in the price
    return Math.round((priceInCents * taxRate) / (1 + taxRate));
  } else {
    // Tax is added to the price
    return Math.round(priceInCents * taxRate);
  }
}

/**
 * Calculates price before tax from a tax-inclusive price
 */
export function calculatePriceBeforeTax(
  taxInclusivePriceInCents: number,
  taxRate: number
): number {
  return Math.round(taxInclusivePriceInCents / (1 + taxRate));
}

/**
 * Calculates price after tax from a tax-exclusive price
 */
export function calculatePriceAfterTax(
  taxExclusivePriceInCents: number,
  taxRate: number
): number {
  return Math.round(taxExclusivePriceInCents * (1 + taxRate));
}

/**
 * Converts price between currencies (requires exchange rate)
 */
export function convertCurrency(
  priceInCents: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number
): ParsedPrice {
  const convertedPriceInCents = Math.round(priceInCents * exchangeRate);
  return {
    priceInCents: convertedPriceInCents,
    currency: toCurrency,
  };
}

/**
 * Compares two prices and returns the difference
 */
export function comparePrices(
  price1InCents: number,
  price2InCents: number
): {
  difference: number;
  percentage: number;
  isHigher: boolean;
} {
  const difference = price1InCents - price2InCents;
  const percentage =
    price2InCents > 0 ? Math.round((difference / price2InCents) * 100) : 0;

  return {
    difference: Math.abs(difference),
    percentage: Math.abs(percentage),
    isHigher: difference > 0,
  };
}

/**
 * Rounds price to common pricing patterns (e.g., .99, .95)
 */
export function roundToCommonPrice(
  priceInCents: number,
  pattern: "99" | "95" | "00" = "99"
): number {
  const dollars = Math.floor(priceInCents / 100);
  const patternCents = parseInt(pattern);
  return dollars * 100 + patternCents;
}
