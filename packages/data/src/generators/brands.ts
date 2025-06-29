import { faker } from "@faker-js/faker";
import type { BrandInsert } from "../schema.js";
import { generateTimestampSlug, runInTransaction } from "@repo/shared-utils";
import { logProgress, logSuccess } from "../utils/generator-utils.js";
import type {
  AnyDatabase,
  GeneratorOptions,
} from "@repo/shared-types/generators";

// Track used slugs to avoid duplicates
const usedSlugs = new Set<string>();

/**
 * Configuration for different brand states
 */
const BRAND_STATES = {
  premium: (attributes: Partial<BrandInsert>): Partial<BrandInsert> => ({
    ...attributes,
    logo_url: faker.image.avatar(),
    website_url: faker.internet.url(),
    description: `Premium ${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} products`,
  }),
  basic: (attributes: Partial<BrandInsert>): Partial<BrandInsert> => ({
    ...attributes,
    logo_url: null,
    website_url: null,
  }),
};

/**
 * Generates a single brand with optional state
 */
function generateBrandData(state?: keyof typeof BRAND_STATES): BrandInsert {
  const name = faker.company.name();
  const slug = generateTimestampSlug(name);
  usedSlugs.add(slug);

  let attributes: Partial<BrandInsert> = {
    slug,
    name,
    description: faker.company.catchPhrase(),
    logo_url: faker.datatype.boolean() ? faker.image.avatar() : null,
    website_url: faker.datatype.boolean() ? faker.internet.url() : null,
  };

  // Apply state if specified
  if (state && BRAND_STATES[state]) {
    attributes = BRAND_STATES[state](attributes);
  }

  return attributes as BrandInsert;
}

/**
 * Creates brands - handles both data generation and database seeding
 */
export async function createBrands(
  options: GeneratorOptions & {
    state?: "premium" | "basic";
  } = {}
): Promise<BrandInsert[]> {
  const { count = 1, state, db, transaction, returnData = !db } = options;

  // Generate the data
  const brands: BrandInsert[] = [];
  for (let i = 0; i < count; i++) {
    brands.push(generateBrandData(state));
  }

  // If only generating data, return it
  if (returnData) {
    return brands;
  }

  // Otherwise, seed the database
  if (!db) {
    throw new Error("Database instance is required for seeding");
  }

  logProgress(`Creating ${count} brands${state ? ` (${state})` : ""}...`);

  const result = await runInTransaction(
    db,
    async (tx) => {
      // Import table schema only when needed to avoid circular dependency
      const { brands: brandsTable } = require("@repo/data");

      // Insert all brands at once for better performance
      await tx.insert(brandsTable).values(brands);

      return brands;
    },
    transaction
  );

  logSuccess(`Created ${count} brands`);
  return result;
}

/**
 * Seeds brands with a mix of premium and basic types
 */
export async function seedBrands(
  db: AnyDatabase,
  options: { count?: number; transaction?: any } = {}
): Promise<void> {
  const count = options.count || 12;
  const premiumCount = Math.floor(count * 0.3);
  const basicCount = count - premiumCount;

  await runInTransaction(
    db,
    async (tx) => {
      // Create premium brands
      if (premiumCount > 0) {
        await createBrands({
          count: premiumCount,
          state: "premium",
          db,
          transaction: tx,
        });
      }

      // Create basic brands
      if (basicCount > 0) {
        await createBrands({
          count: basicCount,
          state: "basic",
          db,
          transaction: tx,
        });
      }
    },
    options.transaction
  );
}
