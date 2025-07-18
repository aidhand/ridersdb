import { faker } from "@faker-js/faker";
import type { RetailerInsert } from "../schema";
import { generateSlug } from "@repo/shared";

/**
 * Generates a single retailer without slug tracking
 */
export async function generateRetailer(): Promise<RetailerInsert> {
  const name = faker.company.name();
  const slug = generateSlug(`${name}-${Date.now()}`);

  return {
    slug,
    name,
    domain: faker.internet.domainName(),
  };
}

/**
 * Generates multiple retailers (may have duplicate slugs)
 */
export async function generateRetailers(count = 8): Promise<RetailerInsert[]> {
  const promises = Array.from({ length: count }, () => generateRetailer());
  return Promise.all(promises);
}

/**
 * Generates multiple retailers with guaranteed unique slugs
 */
export async function generateUniqueRetailers(
  count = 8
): Promise<RetailerInsert[]> {
  // Track used slugs to avoid duplicates within this generation session
  const usedSlugs = new Set<string>();
  const retailers: RetailerInsert[] = [];
  let totalAttempts = 0;
  const maxAttempts = 1000; // Prevent infinite loops

  while (retailers.length < count && totalAttempts < maxAttempts) {
    // Generate a batch in parallel (generate extra to account for potential duplicates)
    const batchSize = Math.min(10, (count - retailers.length) * 2);
    const batchPromises = Array.from({ length: batchSize }, () =>
      generateRetailer()
    );
    const batchRetailers = await Promise.all(batchPromises);

    totalAttempts += batchSize;

    // Filter for unique slugs
    for (const retailer of batchRetailers) {
      if (!usedSlugs.has(retailer.slug) && retailers.length < count) {
        usedSlugs.add(retailer.slug);
        retailers.push(retailer);
      }
    }
    // Otherwise throw away the non-unique result and retry
  }

  return retailers;
}
