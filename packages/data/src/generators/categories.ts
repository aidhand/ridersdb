import { faker } from "@faker-js/faker";
import type { CategoryInsert } from "../schema";
import { generateSlug } from "@repo/shared";

/**
 * Predefined category data for motorcycle gear
 */
const CATEGORY_DATA = [
  { name: "Helmets", description: "Protective headgear for motorcycle safety" },
  { name: "Jackets", description: "Protective outerwear for riding" },
  { name: "Gloves", description: "Hand protection and grip enhancement" },
  { name: "Boots", description: "Foot and ankle protection for riders" },
  { name: "Pants", description: "Lower body protection for motorcyclists" },
  { name: "Armor", description: "Body armor and protective gear" },
  { name: "Rain Gear", description: "Weather protection for wet conditions" },
  {
    name: "Accessories",
    description: "Additional motorcycle riding accessories",
  },
];

/**
 * Generates a single category without slug tracking
 */
export async function generateCategory(): Promise<CategoryInsert> {
  const categoryData = faker.helpers.arrayElement(CATEGORY_DATA);
  const slug = generateSlug(`${categoryData.name}-${Date.now()}`);

  return {
    slug,
    name: categoryData.name,
    description: categoryData.description,
  };
}

/**
 * Generates multiple categories (may have duplicate slugs)
 */
export async function generateCategories(count = 8): Promise<CategoryInsert[]> {
  const maxCount = Math.min(count, CATEGORY_DATA.length);
  const promises = Array.from({ length: maxCount }, () => generateCategory());
  return Promise.all(promises);
}

/**
 * Generates multiple categories with guaranteed unique slugs
 */
export async function generateUniqueCategories(
  count = 8
): Promise<CategoryInsert[]> {
  // Track used slugs to avoid duplicates within this generation session
  const usedSlugs = new Set<string>();
  const categories: CategoryInsert[] = [];
  const maxCount = Math.min(count, CATEGORY_DATA.length);
  let totalAttempts = 0;
  const maxAttempts = 1000; // Prevent infinite loops

  while (categories.length < maxCount && totalAttempts < maxAttempts) {
    // Generate a batch in parallel (generate extra to account for potential duplicates)
    const batchSize = Math.min(10, (maxCount - categories.length) * 2);
    const batchPromises = Array.from({ length: batchSize }, () =>
      generateCategory()
    );
    const batchCategories = await Promise.all(batchPromises);

    totalAttempts += batchSize;

    // Filter for unique slugs
    for (const category of batchCategories) {
      if (!usedSlugs.has(category.slug) && categories.length < maxCount) {
        usedSlugs.add(category.slug);
        categories.push(category);
      }
    }
    // Otherwise throw away the non-unique results and retry
  }

  return categories;
}
