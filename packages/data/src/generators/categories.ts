import { faker } from "@faker-js/faker";
import type { CategoryInsert } from "../schema.js";
import { generateTimestampSlug, runInTransaction } from "@repo/shared-utils";
import { logProgress, logSuccess } from "../utils/generator-utils.js";
import type {
  AnyDatabase,
  GeneratorOptions,
} from "@repo/shared-types/generators";

// Track used slugs to avoid duplicates
const usedSlugs = new Set<string>();

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
 * Generates a single category
 */
function generateCategoryData(): CategoryInsert {
  const categoryData = faker.helpers.arrayElement(CATEGORY_DATA);
  const slug = generateTimestampSlug(categoryData.name);
  usedSlugs.add(slug);

  return {
    slug,
    name: categoryData.name,
    description: categoryData.description,
  };
}

/**
 * Creates categories - handles both data generation and database seeding
 */
export async function createCategories(
  options: GeneratorOptions = {}
): Promise<CategoryInsert[]> {
  const { count = 1, db, transaction, returnData = !db } = options;

  // Generate the data
  const categories: CategoryInsert[] = [];
  for (let i = 0; i < count; i++) {
    categories.push(generateCategoryData());
  }

  // If only generating data, return it
  if (returnData) {
    return categories;
  }

  // Otherwise, seed the database
  if (!db) {
    throw new Error("Database instance is required for seeding");
  }

  logProgress(`Creating ${count} categories...`);

  const result = await runInTransaction(
    db,
    async (tx) => {
      // Import table schema only when needed to avoid circular dependency
      const { categories: categoriesTable } = require("@repo/data");

      // Insert all categories at once for better performance
      await tx.insert(categoriesTable).values(categories);

      return categories;
    },
    transaction
  );

  logSuccess(`Created ${count} categories`);
  return result;
}

/**
 * Seeds categories with predefined motorcycle gear categories
 */
export async function seedCategories(
  db: AnyDatabase,
  options: { count?: number; transaction?: any } = {}
): Promise<void> {
  const count = Math.min(options.count || 8, CATEGORY_DATA.length);

  await createCategories({
    count,
    db,
    transaction: options.transaction,
  });
}
