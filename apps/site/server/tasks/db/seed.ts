import { faker } from "@faker-js/faker";
import { useNodePg } from "@repo/db";
import {
  brands,
  collections,
  prices,
  products,
  retailers,
  variants,
} from "@repo/db/schema";
import { generateUniqueSlug } from "./helpers";

const { databaseUrl } = useRuntimeConfig();
const db = useNodePg(databaseUrl);

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Seed the database with fake data",
  },
  async run({ payload }) {
    const counts = {
      brands: (payload?.brands as number) || 12,
      collections: (payload?.collections as number) || 24,
      retailers: (payload?.retailers as number) || 6,
      products: (payload?.products as number) || 60,
      variantsPerProduct: (payload?.variantsPerProduct as number) || 4,
      pricesPerVariant: (payload?.pricesPerVariant as number) || 48,
    };

    console.log("🌱 Starting database seeding...");
    console.log(
      `Targeting: ${counts.brands} brands, ${counts.collections} collections, ${counts.retailers} retailers, ${counts.products} products`
    );

    // Initialize slug tracking sets
    const usedBrandSlugs = new Set<string>();
    const usedCollectionSlugs = new Set<string>();
    const usedRetailerSlugs = new Set<string>();
    const usedProductSlugs = new Set<string>();
    const usedVariantSlugs = new Set<string>();

    await db.transaction(async (tx) => {
      try {
        // Clear existing data (optional - uncomment if you want to clear before seeding)
        // await tx.delete(prices);
        // await tx.delete(variants);
        // await tx.delete(products);
        // await tx.delete(retailers);
        // await tx.delete(collections);
        // await tx.delete(brands);        // Seed brands
        console.log("Creating brands...");
        const brandsData = Array.from({ length: counts.brands }, () => {
          const name = faker.company.name();
          return {
            slug: generateUniqueSlug(name, usedBrandSlugs),
            name,
            description: faker.company.catchPhrase(),
          };
        });
        const createdBrands = await tx
          .insert(brands)
          .values(brandsData)
          .returning(); // Seed collections
        console.log("Creating collections...");
        const collectionsData = Array.from(
          { length: counts.collections },
          () => {
            const name = `${faker.word.adjective()} ${faker.word.noun()}`;
            const collectionName = faker.helpers.fake(
              "{{word.adjective}} {{word.noun}}"
            );
            return {
              slug: generateUniqueSlug(name, usedCollectionSlugs),
              name:
                collectionName.charAt(0).toUpperCase() +
                collectionName.slice(1),
              description: faker.lorem.sentence(),
            };
          }
        );
        const createdCollections = await tx
          .insert(collections)
          .values(collectionsData)
          .returning(); // Seed retailers
        console.log("Creating retailers...");
        const retailersData = Array.from({ length: counts.retailers }, () => {
          const name = faker.company.name();
          return {
            slug: generateUniqueSlug(name, usedRetailerSlugs),
            name,
            url: faker.internet.url(),
          };
        });
        const createdRetailers = await tx
          .insert(retailers)
          .values(retailersData)
          .returning(); // Seed products
        console.log("Creating products...");
        const productsData = Array.from({ length: counts.products }, () => {
          const name = faker.commerce.productName();
          return {
            slug: generateUniqueSlug(name, usedProductSlugs),
            name,
            description: faker.commerce.productDescription(),
            brand: faker.helpers.arrayElement(createdBrands).id,
            collection: faker.helpers.arrayElement(createdCollections).id,
          };
        });
        const createdProducts = await tx
          .insert(products)
          .values(productsData)
          .returning(); // Seed variants
        console.log("Creating product variants...");
        const variantsData = createdProducts.flatMap((product) =>
          Array.from({ length: counts.variantsPerProduct }, () => {
            const size = faker.helpers.arrayElement([
              "XS",
              "S",
              "M",
              "L",
              "XL",
              "XXL",
            ]);
            const color = faker.color.human();
            const variantName = `${product.name} - ${color} ${size}`;
            return {
              slug: generateUniqueSlug(variantName, usedVariantSlugs),
              name: variantName,
              size,
              color,
              metadata: {
                material: faker.commerce.productMaterial(),
                weight: `${faker.number.float({ min: 0.1, max: 5.0, fractionDigits: 1 })} kg`,
                features: faker.helpers.arrayElements(
                  [
                    "waterproof",
                    "breathable",
                    "lightweight",
                    "durable",
                    "eco-friendly",
                  ],
                  { min: 1, max: 3 }
                ),
              },
              product: product.id,
            };
          })
        );
        const createdVariants = await tx
          .insert(variants)
          .values(variantsData)
          .returning(); // Seed prices
        console.log("Creating variant prices...");
        const pricesData = createdVariants.flatMap((variant) => {
          const selectedRetailers = faker.helpers.arrayElements(
            createdRetailers,
            {
              min: 1,
              max: Math.min(counts.pricesPerVariant, createdRetailers.length),
            }
          );
          return selectedRetailers.map((retailer) => ({
            price: faker.commerce.price({ min: 20, max: 500, dec: 2 }),
            variant: variant.id,
            retailer: retailer.id,
          }));
        });
        await tx.insert(prices).values(pricesData);

        console.log("✅ Database seeding completed successfully!");
        console.log(`Created:`);
        console.log(`  - ${createdBrands.length} brands`);
        console.log(`  - ${createdCollections.length} collections`);
        console.log(`  - ${createdRetailers.length} retailers`);
        console.log(`  - ${createdProducts.length} products`);
        console.log(`  - ${createdVariants.length} variants`);
        console.log(`  - ${pricesData.length} prices`);
      } catch (error) {
        console.error("❌ Error seeding database:", error);
        tx.rollback();
        throw error;
      }
    });

    return {
      result: {
        success: true,
        message: "Database seeded successfully",
      },
    };
  },
});
