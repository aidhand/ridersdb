import { faker } from "@faker-js/faker";
import {
  brands,
  collections,
  prices,
  products,
  retailers,
  variants,
} from "@repo/db/schema";
import slugify from "slugify";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Seed the database with fake data",
  },
  async run({ payload }) {
    const counts = {
      brands: (payload?.brands as number) || 10,
      collections: (payload?.collections as number) || 15,
      retailers: (payload?.retailers as number) || 5,
      products: (payload?.products as number) || 50,
      variantsPerProduct: (payload?.variantsPerProduct as number) || 3,
      pricesPerVariant: (payload?.pricesPerVariant as number) || 2,
    };

    console.log("🌱 Starting database seeding...");
    console.log(
      `Targeting: ${counts.brands} brands, ${counts.collections} collections, ${counts.retailers} retailers, ${counts.products} products`
    );

    try {
      // Clear existing data (optional - uncomment if you want to clear before seeding)
      // await db.delete(prices);
      // await db.delete(variants);
      // await db.delete(products);
      // await db.delete(retailers);
      // await db.delete(collections);
      // await db.delete(brands);

      // Seed brands
      console.log("Creating brands...");
      const createdBrands = [];
      for (let i = 0; i < counts.brands; i++) {
        const name = faker.company.name();
        const brand = {
          slug: slugify(name, { lower: true, strict: true }),
          name,
          description: faker.company.catchPhrase(),
        };
        const [inserted] = await db.insert(brands).values(brand).returning();
        createdBrands.push(inserted);
      }

      // Seed collections
      console.log("Creating collections...");
      const createdCollections = [];
      for (let i = 0; i < counts.collections; i++) {
        const name = `${faker.word.adjective()} ${faker.word.noun()}`;
        const collection = {
          slug: slugify(name, { lower: true, strict: true }),
          name: faker.helpers.fake(
            "{{word.adjective}} {{word.noun}} Collection"
          ),
          description: faker.lorem.sentence(),
        };
        const [inserted] = await db
          .insert(collections)
          .values(collection)
          .returning();
        createdCollections.push(inserted);
      }

      // Seed retailers
      console.log("Creating retailers...");
      const createdRetailers = [];
      for (let i = 0; i < counts.retailers; i++) {
        const name = faker.company.name();
        const retailer = {
          slug: slugify(name, { lower: true, strict: true }),
          name,
          url: faker.internet.url(),
        };
        const [inserted] = await db
          .insert(retailers)
          .values(retailer)
          .returning();
        createdRetailers.push(inserted);
      }

      // Seed products
      console.log("Creating products...");
      const createdProducts = [];
      for (let i = 0; i < counts.products; i++) {
        const name = faker.commerce.productName();
        const product = {
          slug: slugify(name, { lower: true, strict: true }),
          name,
          description: faker.commerce.productDescription(),
          brand: faker.helpers.arrayElement(createdBrands).id,
          collection: faker.helpers.arrayElement(createdCollections).id,
        };
        const [inserted] = await db
          .insert(products)
          .values(product)
          .returning();
        createdProducts.push(inserted);
      }

      // Seed variants
      console.log("Creating product variants...");
      const createdVariants = [];
      for (const product of createdProducts) {
        for (let j = 0; j < counts.variantsPerProduct; j++) {
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

          const variant = {
            slug: slugify(variantName, { lower: true, strict: true }),
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
          const [inserted] = await db
            .insert(variants)
            .values(variant)
            .returning();
          createdVariants.push(inserted);
        }
      }

      // Seed prices
      console.log("Creating variant prices...");
      let priceCount = 0;
      for (const variant of createdVariants) {
        const selectedRetailers = faker.helpers.arrayElements(
          createdRetailers,
          {
            min: 1,
            max: Math.min(counts.pricesPerVariant, createdRetailers.length),
          }
        );

        for (const retailer of selectedRetailers) {
          const price = {
            price: faker.commerce.price({ min: 20, max: 500, dec: 2 }),
            variant: variant.id,
            retailer: retailer.id,
          };
          await db.insert(prices).values(price);
          priceCount++;
        }
      }

      console.log("✅ Database seeding completed successfully!");
      console.log(`Created:`);
      console.log(`  - ${createdBrands.length} brands`);
      console.log(`  - ${createdCollections.length} collections`);
      console.log(`  - ${createdRetailers.length} retailers`);
      console.log(`  - ${createdProducts.length} products`);
      console.log(`  - ${createdVariants.length} variants`);
      console.log(`  - ${priceCount} prices`);
      return {
        result: {
          success: true,
          counts: {
            brands: createdBrands.length,
            collections: createdCollections.length,
            retailers: createdRetailers.length,
            products: createdProducts.length,
            variants: createdVariants.length,
            prices: priceCount,
          },
        },
      };
    } catch (error) {
      console.error("❌ Error seeding database:", error);
      throw error;
    }
  },
});
