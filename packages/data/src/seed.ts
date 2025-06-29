import type { db } from "./utils/drizzle.js";

export interface SeedCounts {
  brands: number;
  categories: number;
  retailers: number;
  products: number;
}

export interface SeedOptions {
  minimal?: boolean;
  full?: boolean;
}

export const SEED_PRESETS = {
  minimal: { brands: 5, categories: 4, retailers: 3, products: 20 },
  default: { brands: 12, categories: 8, retailers: 6, products: 60 },
  full: { brands: 25, categories: 15, retailers: 10, products: 150 },
} as const;

/**
 * Determines the appropriate seed counts based on options
 */
export function getSeedCounts(options: SeedOptions = {}): SeedCounts {
  if (options.minimal) {
    return SEED_PRESETS.minimal;
  }

  if (options.full) {
    return SEED_PRESETS.full;
  }

  return SEED_PRESETS.default;
}

/**
 * Runs the complete database seeding process
 */
export async function seedDatabase(
  database: typeof db,
  options: SeedOptions = {}
): Promise<void> {
  const { seedBrands, seedCategories, seedProducts, seedRetailers } =
    await import("./generators.js");

  const counts = getSeedCounts(options);

  console.log("🌱 Starting database seeding...");
  console.log(`📊 Seed counts:`, counts);

  // Run seeders in order to respect dependencies
  await seedBrands(database, { count: counts.brands });
  await seedCategories(database, { count: counts.categories });
  await seedRetailers(database, { count: counts.retailers });
  await seedProducts(database, { count: counts.products });

  console.log("✅ Database seeding completed successfully!");
}

/**
 * Tests factory generation
 */
export async function testFactories(): Promise<void> {
  const { createBrands } = await import("./generators.js");

  console.log("🏭 Testing factory generation...");

  const testBrands = await createBrands({ count: 1, returnData: true });
  console.log("Generated brand:", testBrands[0]);

  console.log("✅ Factory test completed!");
}
