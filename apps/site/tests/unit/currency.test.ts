import { describe, expect, it } from "vitest";

/**
 * Example unit test for the currency utility
 * Tests the currency formatting functionality in isolation
 */
describe("currency utility", () => {
  it("should format USD currency correctly", () => {
    // This is a placeholder test - replace with actual currency utility tests
    // when the currency.ts file is implemented
    const formatCurrency = (value: number, currency = "USD") => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(value);
    };

    expect(formatCurrency(99.99)).toBe("$99.99");
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("should handle different currencies", () => {
    const formatCurrency = (value: number, currency = "USD") => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(value);
    };

    expect(formatCurrency(99.99, "EUR")).toBe("€99.99");
    expect(formatCurrency(99.99, "GBP")).toBe("£99.99");
  });

  it("should handle edge cases", () => {
    const formatCurrency = (value: number, currency = "USD") => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(value);
    };

    expect(formatCurrency(-50)).toBe("-$50.00");
    expect(formatCurrency(0.1)).toBe("$0.10");
  });
});
