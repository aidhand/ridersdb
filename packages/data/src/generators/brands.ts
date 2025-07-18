import { faker } from "@faker-js/faker";
import type { BrandInsert } from "../schema";
import { generateSlug } from "@repo/shared";

/**
 * Generates a single brand without slug tracking
 */
export async function generateBrand(): Promise<BrandInsert> {
  const name = faker.company.name();
  const slug = generateSlug(name);

  const attributes: Partial<BrandInsert> = {
    slug,
    name,
    description: faker.company.catchPhrase(),
    logo_url: faker.datatype.boolean() ? faker.image.avatar() : null,
    website_url: faker.datatype.boolean() ? faker.internet.url() : null,
  };

  return attributes as BrandInsert;
}

/**
 * Generates multiple brands (may have duplicate slugs)
 */
export async function generateBrands(count = 8): Promise<BrandInsert[]> {
  const promises = Array.from({ length: count }, () => generateBrand());
  return Promise.all(promises);
}

/**
 * Generates multiple brands with guaranteed unique slugs
 */
export async function generateUniqueBrands(count = 8): Promise<BrandInsert[]> {
  // Track used slugs to avoid duplicates within this generation session
  const usedSlugs = new Set<string>();
  const brands: BrandInsert[] = [];
  let totalAttempts = 0;
  const maxAttempts = 1000; // Prevent infinite loops

  while (brands.length < count && totalAttempts < maxAttempts) {
    // Generate a batch in parallel (generate extra to account for potential duplicates)
    const batchSize = Math.min(10, (count - brands.length) * 2);
    const batchPromises = Array.from({ length: batchSize }, () =>
      generateBrand()
    );
    const batchBrands = await Promise.all(batchPromises);

    totalAttempts += batchSize;

    // Filter for unique slugs
    for (const brand of batchBrands) {
      if (!usedSlugs.has(brand.slug) && brands.length < count) {
        usedSlugs.add(brand.slug);
        brands.push(brand);
      }
    }
    // Otherwise throw away the non-unique results and retry
  }

  return brands;
}
