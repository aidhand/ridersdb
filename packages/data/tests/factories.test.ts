import { describe, expect, it } from "vitest";
import { createBrands, createCategories } from "../src/generators.js";

describe("Generators", () => {
  it("should generate brand data", async () => {
    const brands = await createBrands({ count: 1, returnData: true });
    const brand = brands[0]!;

    expect(brand).toHaveProperty("name");
    expect(brand).toHaveProperty("slug");
    expect(brand).toHaveProperty("description");
    expect(typeof brand.name).toBe("string");
    expect(typeof brand.slug).toBe("string");
  });

  it("should generate category data", async () => {
    const categories = await createCategories({ count: 1, returnData: true });
    const category = categories[0]!;

    expect(category).toHaveProperty("name");
    expect(category).toHaveProperty("slug");
    expect(category).toHaveProperty("description");
    expect(typeof category.name).toBe("string");
    expect(typeof category.slug).toBe("string");
  });

  it("should generate multiple brands", async () => {
    const brands = await createBrands({ count: 3, returnData: true });

    expect(Array.isArray(brands)).toBe(true);
    expect(brands).toHaveLength(3);

    brands.forEach((brand) => {
      expect(brand).toHaveProperty("name");
      expect(brand).toHaveProperty("slug");
    });
  });

  it("should apply states to brands", async () => {
    const premiumBrands = await createBrands({
      count: 1,
      state: "premium",
      returnData: true,
    });
    const basicBrands = await createBrands({
      count: 1,
      state: "basic",
      returnData: true,
    });

    const premiumBrand = premiumBrands[0]!;
    const basicBrand = basicBrands[0]!;

    // Premium brand should have logo and website
    expect(premiumBrand).toHaveProperty("logo_url");
    expect(premiumBrand).toHaveProperty("website_url");
    expect(premiumBrand.logo_url).not.toBeNull();
    expect(premiumBrand.website_url).not.toBeNull();
    expect(premiumBrand.description).toContain("Premium");

    // Basic brand should not have logo or website
    expect(basicBrand).toHaveProperty("logo_url");
    expect(basicBrand).toHaveProperty("website_url");
    expect(basicBrand.logo_url).toBeNull();
    expect(basicBrand.website_url).toBeNull();
  });
});
