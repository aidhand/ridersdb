import { faker } from "@faker-js/faker";
import type { RetailerInsert } from "../schema.js";
import { generateTimestampSlug, runInTransaction } from "@repo/shared-utils";
import { logProgress, logSuccess } from "../utils/generator-utils.js";
import type {
  AnyDatabase,
  GeneratorOptions,
} from "@repo/shared-types/generators";

// Track used slugs to avoid duplicates
const usedSlugs = new Set<string>();

/**
 * Predefined retailer types for variety
 */
const RETAILER_TYPES = [
  "Online Store",
  "Motorcycle Dealership",
  "Gear Specialist",
  "Department Store",
  "Discount Retailer",
];

/**
 * Generates a single retailer
 */
function generateRetailerData(): RetailerInsert {
  const name = faker.company.name();
  const slug = generateTimestampSlug(name);
  usedSlugs.add(slug);

  return {
    slug,
    name,
    description: `${faker.helpers.arrayElement(RETAILER_TYPES)} specializing in motorcycle gear and accessories`,
    domain: faker.internet.domainName(),
  };
}

/**
 * Creates retailers - handles both data generation and database seeding
 */
export async function createRetailers(
  options: GeneratorOptions = {}
): Promise<RetailerInsert[]> {
  const { count = 1, db, transaction, returnData = !db } = options;

  // Generate the data
  const retailers: RetailerInsert[] = [];
  for (let i = 0; i < count; i++) {
    retailers.push(generateRetailerData());
  }

  // If only generating data, return it
  if (returnData) {
    return retailers;
  }

  // Otherwise, seed the database
  if (!db) {
    throw new Error("Database instance is required for seeding");
  }

  logProgress(`Creating ${count} retailers...`);

  const result = await runInTransaction(
    db,
    async (tx) => {
      // Import table schema only when needed to avoid circular dependency
      const { retailers: retailersTable } = require("@repo/data");

      // Insert all retailers at once for better performance
      await tx.insert(retailersTable).values(retailers);

      return retailers;
    },
    transaction
  );

  logSuccess(`Created ${count} retailers`);
  return result;
}

/**
 * Seeds retailers
 */
export async function seedRetailers(
  db: AnyDatabase,
  options: { count?: number; transaction?: any } = {}
): Promise<void> {
  const count = options.count || 6;

  await createRetailers({
    count,
    db,
    transaction: options.transaction,
  });
}
