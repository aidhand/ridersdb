import { beforeEach, describe, expect, it } from "vitest";
import {
  extractBaseSlug,
  generateSlug,
  generateTimestampSlug,
  generateUniqueSlug,
  isValidSlug,
} from "@repo/shared-utils";

describe("Slug Utilities", () => {
  describe("generateSlug", () => {
    it("should generate basic slug from text", () => {
      expect(generateSlug("Hello World")).toBe("hello-world");
      expect(generateSlug("Product Name")).toBe("product-name");
      expect(generateSlug("  Trim Me  ")).toBe("trim-me");
    });

    it("should handle special characters in strict mode", () => {
      expect(generateSlug("Hello, World!")).toBe("hello-world");
      expect(generateSlug("Product (New) & Improved")).toBe(
        "product-new-improved"
      );
      expect(generateSlug("Test@Email.com")).toBe("testemailcom");
    });

    it("should handle special characters in lenient mode", () => {
      expect(generateSlug("Hello, World!", { strict: false })).toBe(
        "hello-world"
      );
      expect(generateSlug("Product (New)", { strict: false })).toBe(
        "product-new"
      );
      expect(generateSlug("Test_underscore", { strict: false })).toBe(
        "test-underscore"
      );
    });

    it("should preserve case when requested", () => {
      expect(generateSlug("Hello World", { preserveCase: true })).toBe(
        "Hello-World"
      );
      expect(generateSlug("CamelCase", { preserveCase: true })).toBe(
        "CamelCase"
      );
    });

    it("should use custom replacement character", () => {
      expect(generateSlug("Hello World", { replacement: "_" })).toBe(
        "hello_world"
      );
      expect(generateSlug("Test Product", { replacement: "." })).toBe(
        "test.product"
      );
    });

    it("should handle edge cases", () => {
      expect(generateSlug("123")).toBe("123");
      expect(generateSlug("a")).toBe("a");
      expect(generateSlug("---test---")).toBe("test");
      expect(generateSlug("multiple   spaces")).toBe("multiple-spaces");
    });

    it("should throw error for invalid input", () => {
      expect(() => generateSlug("")).toThrow("Text must be a non-empty string");
      expect(() => generateSlug(null as any)).toThrow(
        "Text must be a non-empty string"
      );
      expect(() => generateSlug(undefined as any)).toThrow(
        "Text must be a non-empty string"
      );
    });

    it("should add timestamp when requested", () => {
      const slug = generateSlug("test", { addTimestamp: true });
      expect(slug).toMatch(/^test-[a-z0-9]+$/);

      const shortSlug = generateSlug("test", {
        addTimestamp: true,
        timestampFormat: "short",
      });
      expect(shortSlug).toMatch(/^test-\d{6}$/);

      const longSlug = generateSlug("test", {
        addTimestamp: true,
        timestampFormat: "long",
      });
      expect(longSlug).toMatch(/^test-\d{13}$/);
    });
  });

  describe("generateUniqueSlug", () => {
    let existingSlugs: Set<string>;

    beforeEach(() => {
      existingSlugs = new Set([
        "hello-world",
        "hello-world-1",
        "hello-world-2",
        "product-name",
        "test-123",
      ]);
    });

    it("should return original slug if unique", () => {
      expect(generateUniqueSlug("New Product", existingSlugs)).toBe(
        "new-product"
      );
    });

    it("should append counter for duplicate slugs", () => {
      expect(generateUniqueSlug("Hello World", existingSlugs)).toBe(
        "hello-world-3"
      );
      expect(generateUniqueSlug("Product Name", existingSlugs)).toBe(
        "product-name-1"
      );
    });

    it("should work with array of existing slugs", () => {
      const existingArray = ["hello-world", "hello-world-1"];
      expect(generateUniqueSlug("Hello World", existingArray)).toBe(
        "hello-world-2"
      );
    });

    it("should handle existing numbered slugs correctly", () => {
      const slug = generateUniqueSlug("Test 123", existingSlugs);
      expect(slug).toBe("test-124"); // Since test-123 exists, next should be test-124
    });

    it("should respect startCounter option", () => {
      const result = generateUniqueSlug("Hello World", existingSlugs, {
        startCounter: 5,
      });
      expect(result).toBe("hello-world-5");
    });

    it("should throw error when maxAttempts exceeded", () => {
      // Create a pathological case where all reasonable slugs are taken
      const manyExistingSlugs = new Set<string>();
      manyExistingSlugs.add("test");
      for (let i = 1; i <= 10; i++) {
        manyExistingSlugs.add(`test-${i}`);
      }

      expect(() => {
        generateUniqueSlug("test", manyExistingSlugs, { maxAttempts: 5 });
      }).toThrow("Could not generate unique slug after 5 attempts");
    });

    it("should work with empty existing slugs", () => {
      expect(generateUniqueSlug("test", new Set())).toBe("test");
      expect(generateUniqueSlug("test", [])).toBe("test");
    });

    it("should preserve slug options", () => {
      const result = generateUniqueSlug("Hello World!", existingSlugs, {
        replacement: "_",
        preserveCase: true,
      });
      expect(result).toMatch(/^Hello_World/);
    });
  });

  describe("generateTimestampSlug", () => {
    it("should generate slug with timestamp", () => {
      const slug = generateTimestampSlug("test product");
      expect(slug).toMatch(/^test-product-[a-z0-9]+$/);
    });

    it("should respect other options", () => {
      const slug = generateTimestampSlug("Test Product", "base36", {
        preserveCase: true,
        replacement: "_",
      });
      expect(slug).toMatch(/^Test_Product_[a-z0-9]+$/);
    });

    it("should generate different timestamps for multiple calls", async () => {
      const slug1 = generateTimestampSlug("test");
      // Add tiny delay to ensure different timestamp + random component
      await new Promise((resolve) => setTimeout(resolve, 1));
      const slug2 = generateTimestampSlug("test");
      expect(slug1).not.toBe(slug2);
    });
  });

  describe("extractBaseSlug", () => {
    it("should extract base from numbered slugs", () => {
      expect(extractBaseSlug("hello-world-123")).toBe("hello-world");
      expect(extractBaseSlug("product-name-1")).toBe("product-name");
      expect(extractBaseSlug("single-999")).toBe("single");
    });

    it("should extract base from timestamp slugs", () => {
      expect(extractBaseSlug("hello-world-abc123")).toBe("hello-world");
      expect(extractBaseSlug("product-name-xyz")).toBe("product-name");
    });

    it("should return original if no suffix found", () => {
      expect(extractBaseSlug("hello-world")).toBe("hello-world");
      expect(extractBaseSlug("nosuffix")).toBe("nosuffix");
      expect(extractBaseSlug("has-dash-but-no-number")).toBe(
        "has-dash-but-no-number"
      );
    });

    it("should handle edge cases", () => {
      expect(extractBaseSlug("a-1")).toBe("a");
      expect(extractBaseSlug("123-456")).toBe("123");
      expect(extractBaseSlug("")).toBe("");
    });
  });

  describe("isValidSlug", () => {
    describe("strict mode", () => {
      it("should validate correct slugs", () => {
        expect(isValidSlug("hello-world")).toBe(true);
        expect(isValidSlug("product123")).toBe(true);
        expect(isValidSlug("test-123-abc")).toBe(true);
        expect(isValidSlug("a")).toBe(true);
        expect(isValidSlug("123")).toBe(true);
      });

      it("should reject invalid slugs", () => {
        expect(isValidSlug("")).toBe(false);
        expect(isValidSlug("-hello")).toBe(false);
        expect(isValidSlug("hello-")).toBe(false);
        expect(isValidSlug("hello_world")).toBe(false);
        expect(isValidSlug("Hello-World")).toBe(false);
        expect(isValidSlug("hello world")).toBe(false);
        expect(isValidSlug("hello@world")).toBe(false);
      });
    });

    describe("lenient mode", () => {
      it("should accept more variations", () => {
        // Note: The new API is strict-only, these would now fail
        expect(isValidSlug("hello-world")).toBe(true);
        expect(isValidSlug("test-123-abc")).toBe(true);
        // These are no longer valid in the strict API
        expect(isValidSlug("Hello-World")).toBe(false);
      });

      it("should still reject clearly invalid slugs", () => {
        expect(isValidSlug("")).toBe(false);
        expect(isValidSlug("hello world")).toBe(false);
        expect(isValidSlug("hello@world")).toBe(false);
      });
    });
  });

  describe("integration tests", () => {
    it("should work end-to-end for typical use cases", () => {
      // Simulate database seeding scenario
      const existingSlugs = new Set<string>();

      // Generate some product slugs
      const products = [
        "Racing Helmet Pro",
        "Racing Helmet Pro", // Duplicate
        "Leather Jacket",
        "Racing Helmet Pro (New Edition)", // Similar to first
      ];

      const generatedSlugs = products.map((name) => {
        const slug = generateUniqueSlug(name, existingSlugs);
        existingSlugs.add(slug);
        return slug;
      });

      expect(generatedSlugs).toEqual([
        "racing-helmet-pro",
        "racing-helmet-pro-1",
        "leather-jacket",
        "racing-helmet-pro-new-edition",
      ]);

      // All slugs should be valid
      generatedSlugs.forEach((slug) => {
        expect(isValidSlug(slug)).toBe(true);
      });
    });

    it("should handle timestamp-based uniqueness for seeding", () => {
      const products = ["Helmet", "Helmet", "Helmet"];
      const timestampSlugs = products.map((name) =>
        generateTimestampSlug(name)
      );

      // All should be different due to timestamps
      expect(new Set(timestampSlugs).size).toBe(3);

      // All should be valid slugs
      timestampSlugs.forEach((slug) => {
        expect(isValidSlug(slug)).toBe(true);
      });
    });

    it("should maintain consistency across different options", () => {
      const text = "Test Product (New)";

      const strictSlug = generateSlug(text, { strict: true });
      const lenientSlug = generateSlug(text, { strict: false });

      expect(strictSlug).toBe("test-product-new");
      expect(lenientSlug).toBe("test-product-new");

      expect(isValidSlug(strictSlug)).toBe(true);
      expect(isValidSlug(lenientSlug)).toBe(true);
    });
  });
});
