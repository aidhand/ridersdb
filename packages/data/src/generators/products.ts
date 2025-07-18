import { faker } from "@faker-js/faker";
import type { ProductInsert } from "../schema";
import { generateSlug } from "@repo/shared";

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
 * Generates a single product without slug tracking
 */
export async function generateProduct(
  options: {
    brandId?: string;
    brandSlug?: string;
    categoryId?: string;
    categorySlug?: string;
  } = {}
): Promise<ProductInsert> {
  const name = faker.helpers.arrayElement(PRODUCT_NAMES);
  const slug = generateSlug(`${name}-${Date.now()}`);

  // Use provided IDs or generate fake ones for testing
  const brandId = options.brandId ?? faker.string.uuid();
  const brandSlug = options.brandSlug ?? generateSlug(faker.company.name());
  const categoryId = options.categoryId ?? faker.string.uuid();
  const categorySlug =
    options.categorySlug ?? generateSlug(faker.commerce.department());

  const attributes: ProductInsert = {
    slug,
    name,
    description: `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${name.toLowerCase()} for motorcycle riders`,
    brandId,
    brandSlug,
    categoryId,
    categorySlug,
  };

  return attributes;
}

/**
 * Generates multiple products (may have duplicate slugs)
 */
export async function generateProducts(
  count = 8,
  options: {
    brandId?: string;
    brandSlug?: string;
    categoryId?: string;
    categorySlug?: string;
  } = {}
): Promise<ProductInsert[]> {
  const promises = Array.from({ length: count }, () =>
    generateProduct(options)
  );
  return Promise.all(promises);
}

/**
 * Generates multiple products with guaranteed unique slugs
 */
export async function generateUniqueProducts(
  count = 8,
  options: {
    brandId?: string;
    brandSlug?: string;
    categoryId?: string;
    categorySlug?: string;
  } = {}
): Promise<ProductInsert[]> {
  // Track used slugs to avoid duplicates within this generation session
  const usedSlugs = new Set<string>();
  const products: ProductInsert[] = [];
  let totalAttempts = 0;
  const maxAttempts = 1000; // Prevent infinite loops

  while (products.length < count && totalAttempts < maxAttempts) {
    // Generate a batch in parallel (generate extra to account for potential duplicates)
    const batchSize = Math.min(10, (count - products.length) * 2);
    const batchPromises = Array.from({ length: batchSize }, () =>
      generateProduct(options)
    );
    const batchProducts = await Promise.all(batchPromises);

    totalAttempts += batchSize;

    // Filter for unique slugs
    for (const product of batchProducts) {
      if (!usedSlugs.has(product.slug) && products.length < count) {
        usedSlugs.add(product.slug);
        products.push(product);
      }
    }
    // Otherwise throw away the non-unique results and retry
  }

  return products;
}
