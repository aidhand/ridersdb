/* GET /api/products/[slug]
 * Returns a single product by slug with brand, collection, variants, and pricing info */
import {
  brands,
  collections,
  productVariants,
  products,
  retailers,
  variantPrices,
} from "@repo/db/schema";
import { desc, eq } from "drizzle-orm";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, message: "Product slug is required" });
  }

  // Get product with brand and collection
  const result = await db
    .select({
      product: products,
      brand: brands,
      collection: collections,
    })
    .from(products)
    .leftJoin(brands, eq(products.brand, brands.id))
    .leftJoin(collections, eq(products.collection, collections.id))
    .where(eq(products.slug, slug));

  if (!result.length) {
    throw createError({
      statusCode: 404,
      message: `Product with slug '${slug}' not found`,
    });
  }

  const row = result[0];
  if (!row) {
    throw createError({
      statusCode: 404,
      message: `Product with slug '${slug}' not found`,
    });
  }

  // Get product variants
  const productVariantsData = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.product, row.product.id));

  // Get latest prices for each variant
  const variantPricesData = await db
    .select({
      variantId: variantPrices.productVariant,
      price: variantPrices.price,
      retailer: retailers,
      updatedAt: variantPrices.createdAt,
    })
    .from(variantPrices)
    .innerJoin(retailers, eq(variantPrices.retailer, retailers.id))
    .innerJoin(
      productVariants,
      eq(variantPrices.productVariant, productVariants.id)
    )
    .where(eq(productVariants.product, row.product.id))
    .orderBy(desc(variantPrices.createdAt));

  // Create a map of latest prices by variant ID
  const variantPricesMap: Record<
    string,
    {
      amount: number;
      retailer: {
        id: string;
        slug: string;
        name: string;
        url: string;
        createdAt: Date;
        updatedAt: Date;
      };
      updatedAt: Date;
    }
  > = {};

  // Group all prices by variant ID and collect all retailer prices
  const variantPricesGrouped: Record<
    string,
    Array<{
      amount: number;
      retailer: {
        id: string;
        slug: string;
        name: string;
        url: string;
        createdAt: Date;
        updatedAt: Date;
      };
      updatedAt: Date;
    }>
  > = {};

  variantPricesData.forEach((priceData) => {
    const variantId = String(priceData.variantId as unknown as string);
    const priceInfo = {
      amount: Number(priceData.price),
      retailer: priceData.retailer,
      updatedAt: priceData.updatedAt as Date,
    };

    // Keep track of the latest price for each variant
    if (
      !variantPricesMap[variantId] ||
      priceInfo.updatedAt > variantPricesMap[variantId].updatedAt
    ) {
      variantPricesMap[variantId] = priceInfo;
    }

    // Group all prices for availability display
    if (!variantPricesGrouped[variantId]) {
      variantPricesGrouped[variantId] = [];
    }
    variantPricesGrouped[variantId].push(priceInfo);
  });

  // Add pricing info to variants
  const variantsWithPricing = productVariantsData.map((variant) => {
    const variantId = String(variant.id as unknown as string);
    const allPrices = variantPricesGrouped[variantId] || [];
    const latestPrice = variantPricesMap[variantId] || null;

    // Calculate price range
    const prices = allPrices.map((p) => p.amount);
    const minPrice = prices.length > 0 ? Math.min(...prices) : null;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : null;

    return {
      ...variant,
      latestPrice,
      allPrices,
      priceRange: {
        min: minPrice,
        max: maxPrice,
      },
      availability: {
        inStock: allPrices.length > 0,
        retailerCount: allPrices.length,
        retailers: allPrices.map((p) => ({
          name: p.retailer.name,
          slug: p.retailer.slug,
          url: p.retailer.url,
          price: p.amount,
          lastUpdated: p.updatedAt,
        })),
      },
    };
  });

  return {
    ...row.product,
    brandDetails: row.brand,
    collectionDetails: row.collection,
    variants: variantsWithPricing,
  };
});
