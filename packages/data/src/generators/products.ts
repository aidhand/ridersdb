import { faker } from "@faker-js/faker";
import type { ProductInsert } from "../schema.js";
import {
  generateSlug,
  generateTimestampSlug,
  runInTransaction,
} from "@repo/shared-utils";
import { logProgress, logSuccess } from "../utils/generator-utils.js";
import type {
  AnyDatabase,
  GeneratorOptions,
} from "@repo/shared-types/generators";

// Track used slugs to avoid duplicates
const usedSlugs = new Set<string>();

/**
 * Predefined product names for motorcycle gear
 */
const PRODUCT_NAMES = [
  "Street Fighter Helmet",
  "Racing Jacket Pro",
  "Touring Gloves Elite",
  "Adventure Boots",
  "Sport Riding Pants",
  "Protective Knee Guards",
  "Windproof Jacket",
  "Leather Racing Suit",
  "Touring Helmet",
  "Street Riding Boots",
  "Protective Back Armor",
  "Rain Gear Set",
];

/**
 * Configuration for different product states
 */
const PRODUCT_STATES = {
  premium: (attributes: Partial<ProductInsert>): Partial<ProductInsert> => ({
    ...attributes,
    description: `Premium ${attributes.name?.toLowerCase()} with advanced features and superior materials`,
  }),
  budget: (attributes: Partial<ProductInsert>): Partial<ProductInsert> => ({
    ...attributes,
    description: `Affordable ${attributes.name?.toLowerCase()} offering great value for money`,
  }),
  safety: (attributes: Partial<ProductInsert>): Partial<ProductInsert> => ({
    ...attributes,
    description: `Safety-focused ${attributes.name?.toLowerCase()} with enhanced protection features`,
  }),
};

/**
 * Generates a single product
 */
function generateProductData(
  options: {
    brandId?: string;
    brandSlug?: string;
    categoryId?: string;
    categorySlug?: string;
    state?: keyof typeof PRODUCT_STATES;
  } = {}
): ProductInsert {
  const name = faker.helpers.arrayElement(PRODUCT_NAMES);
  const slug = generateTimestampSlug(name);
  usedSlugs.add(slug);

  // Use provided IDs or generate fake ones for testing
  const brandId = options.brandId ?? faker.string.uuid();
  const brandSlug = options.brandSlug ?? generateSlug(faker.company.name());
  const categoryId = options.categoryId ?? faker.string.uuid();
  const categorySlug =
    options.categorySlug ?? generateSlug(faker.commerce.department());

  let attributes: Partial<ProductInsert> = {
    slug,
    name,
    description: `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${name.toLowerCase()} for motorcycle riders`,
    brandId,
    brandSlug,
    categoryId,
    categorySlug,
  };

  // Apply state if specified
  if (options.state && PRODUCT_STATES[options.state]) {
    attributes = PRODUCT_STATES[options.state](attributes);
  }

  return attributes as ProductInsert;
}

/**
 * Creates products - handles both data generation and database seeding
 */
export async function createProducts(
  options: GeneratorOptions & {
    brandId?: string;
    brandSlug?: string;
    categoryId?: string;
    categorySlug?: string;
    state?: "premium" | "budget" | "safety";
  } = {}
): Promise<ProductInsert[]> {
  const {
    count = 1,
    state,
    brandId,
    brandSlug,
    categoryId,
    categorySlug,
    db,
    transaction,
    returnData = !db,
  } = options;

  // Generate the data
  const products: ProductInsert[] = [];
  for (let i = 0; i < count; i++) {
    products.push(
      generateProductData({
        brandId,
        brandSlug,
        categoryId,
        categorySlug,
        state,
      })
    );
  }

  // If only generating data, return it
  if (returnData) {
    return products;
  }

  // Otherwise, seed the database
  if (!db) {
    throw new Error("Database instance is required for seeding");
  }

  logProgress(`Creating ${count} products${state ? ` (${state})` : ""}...`);

  const result = await runInTransaction(
    db,
    async (tx) => {
      // Import table schema only when needed to avoid circular dependency
      const { products: productsTable } = require("@repo/data");

      // Insert all products at once for better performance
      await tx.insert(productsTable).values(products);

      return products;
    },
    transaction
  );

  logSuccess(`Created ${count} products`);
  return result;
}

/**
 * Seeds products with relationships to existing brands and categories
 */
export async function seedProducts(
  db: AnyDatabase,
  options: { count?: number; transaction?: any } = {}
): Promise<void> {
  const count = options.count || 60;

  await runInTransaction(
    db,
    async (tx) => {
      // Import schemas only when needed to avoid circular dependency
      const { brands, categories } = require("@repo/data");

      // First, get existing brands and categories
      const existingBrands = await tx.select().from(brands);
      const existingCategories = await tx.select().from(categories);

      if (existingBrands.length === 0 || existingCategories.length === 0) {
        throw new Error(
          "Products seeder requires existing brands and categories. Run brandSeeder and categorySeeder first."
        );
      }

      // Create products with random brand/category associations
      for (let i = 0; i < count; i++) {
        const randomBrand =
          existingBrands[Math.floor(Math.random() * existingBrands.length)];
        const randomCategory =
          existingCategories[
            Math.floor(Math.random() * existingCategories.length)
          ];

        // Determine product state based on category and randomness
        let state: "premium" | "budget" | "safety" | undefined;
        if (
          randomCategory.slug?.includes("helmet") ||
          randomCategory.slug?.includes("armor")
        ) {
          state = "safety";
        } else if (Math.random() > 0.7) {
          state = "premium";
        } else if (Math.random() > 0.8) {
          state = "budget";
        }

        await createProducts({
          count: 1,
          brandId: randomBrand.id,
          brandSlug: randomBrand.slug,
          categoryId: randomCategory.id,
          categorySlug: randomCategory.slug,
          state,
          db,
          transaction: tx,
        });
      }
    },
    options.transaction
  );
}
