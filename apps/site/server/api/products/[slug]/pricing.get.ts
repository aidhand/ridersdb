// GET /api/products/[slug]/pricing
// Returns pricing and availability information for all variants of a product
import {
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

  // Get product ID from slug
  const product = await db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  if (!product.length) {
    throw createError({
      statusCode: 404,
      message: `Product with slug '${slug}' not found`,
    });
  }

  const productId = product[0]?.id ?? null;

  if (!productId) {
    throw createError({
      statusCode: 404,
      message: `Product with slug '${slug}' not found`,
    });
  }

  // Get all variants for this product
  const variants = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.product, productId));

  // Get all pricing data for these variants
  const pricingData = await db
    .select({
      variantId: variantPrices.productVariant,
      variantSlug: productVariants.slug,
      variantName: productVariants.name,
      variantSize: productVariants.size,
      variantColor: productVariants.color,
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
    .where(eq(productVariants.product, productId))
    .orderBy(desc(variantPrices.createdAt));

  // Group pricing data by variant
  const variantPricing: Record<
    string,
    {
      variant: {
        id: string;
        slug: string;
        name: string;
        size: string | null;
        color: string | null;
      };
      prices: Array<{
        amount: number;
        retailer: {
          id: string;
          slug: string;
          name: string;
          url: string;
        };
        lastUpdated: Date;
      }>;
      priceRange: {
        min: number | null;
        max: number | null;
      };
      availability: {
        inStock: boolean;
        retailerCount: number;
      };
    }
  > = {};

  // Process pricing data
  pricingData.forEach((item) => {
    const variantId = String(item.variantId as unknown as string);

    if (!variantPricing[variantId]) {
      variantPricing[variantId] = {
        variant: {
          id: variantId,
          slug: item.variantSlug,
          name: item.variantName,
          size: item.variantSize,
          color: item.variantColor,
        },
        prices: [],
        priceRange: { min: null, max: null },
        availability: { inStock: false, retailerCount: 0 },
      };
    }

    const price = Number(item.price);
    variantPricing[variantId].prices.push({
      amount: price,
      retailer: {
        id: item.retailer.id,
        slug: item.retailer.slug,
        name: item.retailer.name,
        url: item.retailer.url,
      },
      lastUpdated: item.updatedAt as Date,
    });
  });

  // Calculate price ranges and availability
  Object.values(variantPricing).forEach((variant) => {
    const prices = variant.prices.map((p) => p.amount);
    variant.priceRange.min = prices.length > 0 ? Math.min(...prices) : null;
    variant.priceRange.max = prices.length > 0 ? Math.max(...prices) : null;
    variant.availability.inStock = prices.length > 0;
    variant.availability.retailerCount = variant.prices.length;
  });

  return {
    productSlug: slug,
    variants: Object.values(variantPricing),
    summary: {
      totalVariants: variants.length,
      availableVariants: Object.values(variantPricing).filter(
        (v) => v.availability.inStock
      ).length,
      totalRetailers: new Set(pricingData.map((p) => p.retailer.id)).size,
      priceRange: {
        min:
          pricingData.length > 0 ?
            Math.min(...pricingData.map((p) => Number(p.price)))
          : null,
        max:
          pricingData.length > 0 ?
            Math.max(...pricingData.map((p) => Number(p.price)))
          : null,
      },
    },
  };
});
