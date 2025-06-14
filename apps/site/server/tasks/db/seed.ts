import { faker } from "@faker-js/faker";
import { generateUniqueSlug } from "~~/server/utils/strings";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Seed the database with fake data",
  },
  async run({ payload }) {
    const counts = {
      brands: (payload?.brands as number) || 12,
      collections: (payload?.collections as number) || 24,
      categories: (payload?.categories as number) || 8,
      retailers: (payload?.retailers as number) || 6,
      products: (payload?.products as number) || 60,
      variantsPerProduct: (payload?.variantsPerProduct as number) || 4,
      pricesPerVariant: (payload?.pricesPerVariant as number) || 3,
    };

    console.log("🌱 Starting database seeding...");
    console.log(
      `Targeting: ${counts.brands} brands, ${counts.collections} collections, ${counts.categories} categories, ${counts.retailers} retailers, ${counts.products} products`
    );

    // Initialize slug tracking sets (no longer mutated by generateUniqueSlug)
    const usedBrandSlugs = new Set<string>();
    const usedCategorySlugs = new Set<string>();
    const usedRetailerSlugs = new Set<string>();
    const usedProductSlugs = new Set<string>();
    const usedVariantSlugs = new Set<string>();

    // Helper function for seeding logic
    async function runSeed(dbOrTx) {
      // Seed brands
      console.log("Creating brands...");
      const brandsData = Array.from({ length: counts.brands }, () => {
        const name = faker.company.name();
        const slug = generateUniqueSlug(name, usedBrandSlugs);
        usedBrandSlugs.add(slug);
        return {
          slug,
          name,
          description: faker.company.catchPhrase(),
        };
      });
      const createdBrands = await dbOrTx
        .insert(brands)
        .values(brandsData)
        .returning();

      // Seed product categories
      console.log("Creating product categories...");
      const categoriesData = Array.from({ length: counts.categories }, () => {
        const name = faker.commerce.department();
        const slug = generateUniqueSlug(name, usedCategorySlugs);
        usedCategorySlugs.add(slug);
        return {
          slug,
          name,
          description: faker.lorem.sentence(),
        };
      });
      const createdCategories = await dbOrTx
        .insert(productCategories)
        .values(categoriesData)
        .returning();

      // Seed retailers
      console.log("Creating retailers...");
      const retailersData = Array.from({ length: counts.retailers }, () => {
        const name = faker.company.name();
        const slug = generateUniqueSlug(name, usedRetailerSlugs);
        usedRetailerSlugs.add(slug);
        return {
          slug,
          name,
          description: faker.company.catchPhrase(),
          website: faker.internet.url(),
        };
      });
      const createdRetailers = await dbOrTx
        .insert(retailers)
        .values(retailersData)
        .returning();

      // Seed products
      console.log("Creating products...");
      const productsData = Array.from({ length: counts.products }, () => {
        const name = faker.commerce.productName();
        const slug = generateUniqueSlug(name, usedProductSlugs);
        usedProductSlugs.add(slug);
        return {
          slug,
          name,
          description: faker.commerce.productDescription(),
          brandId: faker.helpers.arrayElement(createdBrands).id,
          categoryId: faker.helpers.arrayElement(createdCategories).id,
        };
      });
      const createdProducts = await dbOrTx
        .insert(products)
        .values(productsData)
        .returning();

      // Seed product variants
      console.log("Creating product variants...");
      const variantsData = createdProducts.flatMap((product) =>
        Array.from({ length: counts.variantsPerProduct }, () => {
          const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

          const sku = faker.string.alphanumeric(10).toUpperCase();
          const size = faker.helpers.arrayElement(sizes);
          const color = faker.color.human();

          const variantName = `${product.name} - ${color} ${size}`;

          const slug = generateUniqueSlug(variantName, usedVariantSlugs);
          usedVariantSlugs.add(slug);

          return {
            slug,
            name: variantName,
            description: faker.lorem.sentence(),

            sku,
            size,
            color,

            productId: product.id,
          };
        })
      );
      const createdVariants = await dbOrTx
        .insert(productVariants)
        .values(variantsData)
        .returning();

      console.log("✅ Database seeding completed successfully!");
      console.log(`Created:`);
      console.log(`  - ${createdBrands.length} brands`);
      console.log(`  - ${createdCategories.length} categories`);
      console.log(`  - ${createdRetailers.length} retailers`);
      console.log(`  - ${createdProducts.length} products`);
      console.log(`  - ${createdVariants.length} variants`);
    }

    try {
      try {
        // Attempt to use a transaction
        await db.transaction(async (tx) => {
          await runSeed(tx);
        });
      } catch (txError) {
        console.warn(
          "⚠️ Transaction failed, falling back to non-transactional seed:",
          txError
        );
        await runSeed(db);
      }
    } catch (error) {
      console.error("❌ Error seeding database:", error);
      throw error;
    }

    return {
      result: {
        success: true,
        message: "Database seeded successfully",
      },
    };
  },
});
