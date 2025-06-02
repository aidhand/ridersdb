<script setup lang="ts">
import type {
  Brand,
  Collection,
  Product,
  Variant,
} from "@repo/validation/types";

interface EnhancedVariant extends Variant {
  latestPrice?: {
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
  } | null;
  allPrices?: Array<{
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
  }>;
  priceRange?: {
    min: number | null;
    max: number | null;
  };
  availability?: {
    inStock: boolean;
    retailerCount: number;
    retailers: Array<{
      name: string;
      slug: string;
      url: string;
      price: number;
      lastUpdated: Date;
    }>;
  };
}

// Define enhanced product type with brand and collection details
interface EnhancedProduct extends Product {
  brandDetails?: Brand;
  collectionDetails?: Collection;
  variants?: EnhancedVariant[];
}

// Get route params
const route = useRoute();
const slug = route.params.slug as string;

// Fetch product details
const {
  data: product,
  pending,
  error,
} = useFetch<EnhancedProduct>(`/api/products/${slug}`);

// Set SEO meta
useSeoMeta({
  title: () =>
    product.value?.name
      ? `${product.value.name} - RidersDB`
      : "Product Details - RidersDB",
  description: () =>
    product.value?.description ||
    "View detailed information about this motorcycle gear product.",
});

// Helper functions for pricing and availability
const getPriceRange = (variants: EnhancedVariant[]) => {
  const allPrices: number[] = [];
  variants.forEach((variant) => {
    if (
      variant.priceRange?.min !== null &&
      variant.priceRange?.min !== undefined
    ) {
      allPrices.push(variant.priceRange.min);
    }
    if (
      variant.priceRange?.max !== null &&
      variant.priceRange?.max !== undefined &&
      variant.priceRange.max !== variant.priceRange.min
    ) {
      allPrices.push(variant.priceRange.max);
    }
  });

  if (allPrices.length === 0) return null;

  return {
    min: Math.min(...allPrices),
    max: Math.max(...allPrices),
  };
};

const getAvailableVariantsCount = (variants: EnhancedVariant[]) => {
  return variants.filter((variant) => variant.availability?.inStock).length;
};

const getTotalRetailersCount = (variants: EnhancedVariant[]) => {
  const allRetailers = new Set<string>();
  variants.forEach((variant) => {
    variant.availability?.retailers?.forEach((retailer) => {
      allRetailers.add(retailer.slug);
    });
  });
  return allRetailers.size;
};
</script>

<template>
  <BasePageWrapper>
    <!-- Page Header Navigation -->
    <LayoutHeaderNav
      :breadcrumbs="[
        { label: 'Products', to: '/products', icon: 'i-tabler-package' },
        { label: product?.name || 'Product Details' },
      ]"
    >
      <template #actions>
        <BaseBackButton />
        <UButton
          icon="i-tabler-heart"
          color="neutral"
          variant="outline"
        >
          Save
        </UButton>
        <UButton
          icon="i-tabler-edit"
          color="neutral"
          variant="outline"
          :href="`/products/edit/${product?.slug}`"
        >
          Edit
        </UButton>
      </template>
    </LayoutHeaderNav>
    <!-- Loading State -->
    <BaseLoadingState
      v-if="pending"
      title="Loading product details..."
      description="Please wait while we fetch the product information"
    />

    <!-- Error State -->
    <BaseErrorState
      v-else-if="error"
      title="Failed to load product"
      :message="
        typeof error === 'string' ? error : (
          'An error occurred while loading the product details.'
        )
      "
      action-text="Return to Products"
      @action="$router.push('/products')"
    />
    <!-- Product Content -->
    <div
      v-else-if="product"
      class="space-y-8"
    >
      <!-- Two Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column: Product Images -->
        <div class="space-y-4">
          <!-- Main Product Image -->
          <ImagePlaceholder label="Product Image" />
          <!-- Thumbnail Gallery -->
          <div class="grid grid-cols-4 gap-4">
            <ImagePlaceholder
              v-for="i in 4"
              :key="i"
            />
          </div>
        </div>

        <!-- Right Column: Product Information -->
        <div class="space-y-4">
          <!-- Product Header -->
          <div
            class="bg-neutral-500/5 border border-neutral-500/20 rounded-lg p-6"
          >
            <div class="space-y-4">
              <div class="flex items-start justify-between gap-4">
                <div class="space-y-3 flex-1">
                  <h1 class="text-3xl font-bold">
                    {{ product.name }}
                  </h1>
                  <p
                    v-if="product.description"
                    class="text-lg"
                  >
                    {{ product.description }}
                  </p>
                </div>
                <div
                  class="shrink-0 px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-lg"
                >
                  <span class="text-sm font-medium text-primary-500/80">
                    {{ product.id.substring(0, 8) }}...
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Brand and Collection Information Grid -->
          <BaseGrid
            cols="1 sm:2"
            gap="4"
          >
            <!-- Brand Information -->
            <div
              class="bg-neutral-500/5 border border-neutral-500/20 rounded-lg"
            >
              <div class="border-b border-neutral-500/20 p-4">
                <div class="flex items-center gap-2">
                  <Icon
                    name="tabler:building"
                    class="w-5 h-5"
                  />
                  <h3 class="text-lg font-semibold">Brand</h3>
                </div>
              </div>
              <div class="p-4 space-y-3">
                <div>
                  <h4 class="font-semibold">
                    {{ product?.brandDetails?.name || "Unknown Brand" }}
                  </h4>
                  <p
                    v-if="product?.brandDetails?.description"
                    class="text-sm mt-1"
                  >
                    {{ product.brandDetails.description }}
                  </p>
                  <p
                    v-else
                    class="text-sm italic mt-1"
                  >
                    No brand description available
                  </p>
                </div>
              </div>
            </div>

            <!-- Collection Information -->
            <div
              class="bg-neutral-500/5 border border-neutral-500/20 rounded-lg"
            >
              <div class="border-b border-neutral-500/20 p-4">
                <div class="flex items-center gap-2">
                  <Icon
                    name="tabler:folder"
                    class="w-5 h-5"
                  />
                  <h3 class="text-lg font-semibold">Collection</h3>
                </div>
              </div>
              <div class="p-4 space-y-3">
                <div>
                  <h4 class="font-semibold">
                    {{ product?.collectionDetails?.name || "No Collection" }}
                  </h4>
                  <p
                    v-if="product?.collectionDetails?.description"
                    class="text-sm mt-1"
                  >
                    {{ product.collectionDetails.description }}
                  </p>
                  <p
                    v-else
                    class="text-sm italic mt-1"
                  >
                    This product is not part of a collection
                  </p>
                </div>
              </div>
            </div>
          </BaseGrid>

          <!-- Pricing Summary -->
          <div
            v-if="product.variants && product.variants.length > 0"
            class="bg-neutral-500/5 border border-neutral-500/20 rounded-lg"
          >
            <div class="border-b border-neutral-500/20 p-4">
              <div class="flex items-center gap-2">
                <Icon
                  name="tabler:currency-dollar"
                  class="w-5 h-5"
                />
                <h3 class="text-lg font-semibold">Pricing & Availability</h3>
              </div>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <!-- Overall Price Range -->
                <div class="space-y-2">
                  <p class="text-sm font-medium">Price Range</p>
                  <div class="space-y-1">
                    <template v-if="getPriceRange(product.variants)">
                      <p class="text-lg font-bold text-green-600">
                        ${{
                          getPriceRange(product.variants)?.min?.toFixed(2)
                        }}
                        - ${{
                          getPriceRange(product.variants)?.max?.toFixed(2)
                        }}
                      </p>
                    </template>
                    <template v-else>
                      <p class="text-gray-500">No pricing data</p>
                    </template>
                  </div>
                </div>

                <!-- Availability Status -->
                <div class="space-y-2">
                  <p class="text-sm font-medium">Availability</p>
                  <div class="space-y-1">
                    <p class="text-sm">
                      {{ getAvailableVariantsCount(product.variants) }} of
                      {{ product.variants.length }} variants in stock
                    </p>
                    <div class="flex items-center gap-2">
                      <div
                        :class="
                          getAvailableVariantsCount(product.variants) > 0 ?
                            'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        "
                        class="px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {{
                          getAvailableVariantsCount(product.variants) > 0 ?
                            "Available"
                          : "Out of Stock"
                        }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Retailer Count -->
                <div class="space-y-2">
                  <p class="text-sm font-medium">Retailers</p>
                  <div class="space-y-1">
                    <p class="text-lg font-bold">
                      {{ getTotalRetailersCount(product.variants) }}
                    </p>
                    <p class="text-sm text-gray-500">
                      retailers offering this product
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Metadata -->
          <div class="bg-neutral-500/5 border border-neutral-500/20 rounded-lg">
            <div class="border-b border-neutral-500/20 p-4">
              <div class="flex items-center gap-2">
                <Icon
                  name="tabler:info-circle"
                  class="w-5 h-5"
                />
                <h3 class="text-lg font-semibold">Product Details</h3>
              </div>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium">Product ID</p>
                  <p class="text-sm font-mono">
                    {{ product.id }}
                  </p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium">Slug</p>
                  <p class="text-sm font-mono">
                    {{ product.slug }}
                  </p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium">Created</p>
                  <p class="text-sm">
                    {{ new Date(product.createdAt).toLocaleDateString() }}
                  </p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium">Last Updated</p>
                  <p class="text-sm">
                    {{ new Date(product.updatedAt).toLocaleDateString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Variants Section (Full Width Below Two Columns) -->
      <div
        v-if="product.variants && product.variants.length > 0"
        class="bg-neutral-500/5 border border-neutral-500/20 rounded-lg"
      >
        <div class="border-b border-neutral-500/20 p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Icon
                name="tabler:versions"
                class="w-5 h-5"
              />
              <h3 class="text-lg font-semibold">Product Variants</h3>
            </div>
            <div
              class="px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-lg"
            >
              <span class="text-sm font-medium text-primary-500/80">
                {{ product.variants.length }}
                {{ product.variants.length === 1 ? "variant" : "variants" }}
              </span>
            </div>
          </div>
        </div>
        <div class="p-6">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-neutral-500/20">
                  <th
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Variant
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Size
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Color
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Price Range
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Availability
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Retailers
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-500/20">
                <tr
                  v-for="variant in product.variants"
                  :key="variant.id"
                  class="hover:bg-neutral-500/5 transition-colors"
                >
                  <td class="px-4 py-3 text-sm">
                    <div class="space-y-1">
                      <p class="font-medium">{{ variant.name }}</p>
                      <p class="text-xs text-gray-500 font-mono">
                        {{ variant.slug }}
                      </p>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <span
                      v-if="variant.size"
                      class="px-2 py-1 bg-neutral-500/10 border border-neutral-500/20 rounded text-xs"
                    >
                      {{ variant.size }}
                    </span>
                    <span v-else>—</span>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div
                      v-if="variant.color"
                      class="flex items-center gap-2"
                    >
                      <div
                        v-if="variant.color.startsWith('#')"
                        class="w-3 h-3 rounded-full border border-neutral-500/20"
                        :style="{ backgroundColor: variant.color }"
                      ></div>
                      {{ variant.color }}
                    </div>
                    <span v-else>—</span>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div
                      v-if="
                        variant.priceRange &&
                        (variant.priceRange.min || variant.priceRange.max)
                      "
                    >
                      <div
                        v-if="variant.priceRange.min === variant.priceRange.max"
                        class="font-medium"
                      >
                        ${{ variant.priceRange.min?.toFixed(2) }}
                      </div>
                      <div
                        v-else
                        class="font-medium"
                      >
                        ${{ variant.priceRange.min?.toFixed(2) }} - ${{
                          variant.priceRange.max?.toFixed(2)
                        }}
                      </div>
                      <div
                        v-if="variant.latestPrice"
                        class="text-xs text-gray-500"
                      >
                        Latest: ${{ variant.latestPrice.amount.toFixed(2) }}
                      </div>
                    </div>
                    <div
                      v-else
                      class="text-gray-500"
                    >
                      No pricing data
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div v-if="variant.availability">
                      <div class="flex items-center gap-2">
                        <div
                          :class="
                            variant.availability.inStock ?
                              'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          "
                          class="px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {{
                            variant.availability.inStock ?
                              "In Stock"
                            : "Out of Stock"
                          }}
                        </div>
                      </div>
                      <div
                        v-if="variant.availability.inStock"
                        class="text-xs text-gray-500 mt-1"
                      >
                        {{ variant.availability.retailerCount }}
                        {{
                          variant.availability.retailerCount === 1 ?
                            "retailer"
                          : "retailers"
                        }}
                      </div>
                    </div>
                    <div
                      v-else
                      class="text-gray-500"
                    >
                      Unknown
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div
                      v-if="
                        variant.availability &&
                        variant.availability.retailers.length > 0
                      "
                    >
                      <ProductPricing
                        :retailers="variant.availability.retailers"
                        :variant-name="variant.name"
                      />
                    </div>
                    <div
                      v-else
                      class="text-gray-500"
                    >
                      None available
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- No Variants State (Full Width Below Two Columns) -->
      <div
        v-else
        class="bg-neutral-500/5 border border-neutral-500/20 rounded-lg"
      >
        <div class="border-b border-neutral-500/20 p-4">
          <div class="flex items-center gap-2">
            <Icon
              name="tabler:versions"
              class="w-5 h-5"
            />
            <h3 class="text-lg font-semibold">Product Variants</h3>
          </div>
        </div>
        <div class="p-12 text-center">
          <Icon
            name="tabler:packages"
            class="w-12 h-12 mx-auto mb-3"
          />
          <p>No variants available for this product</p>
          <button
            v-if="product"
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-primary-500/80 bg-primary-500/10 border border-primary-500/20 rounded-lg hover:bg-primary-500/20 transition-colors"
            @click="$router.push(`/products/${product.slug}/variants/new`)"
          >
            <Icon
              name="tabler:plus"
              class="w-4 h-4"
            />
            Add Variant
          </button>
        </div>
      </div>

      <!-- Actions (Full Width Below Everything) -->
      <div
        class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-neutral-500/20"
      >
        <button
          type="button"
          class="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-primary-500 border border-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
          @click="$router.push(`/products/${product.slug}/edit`)"
        >
          <Icon
            name="tabler:pencil"
            class="w-4 h-4"
          />
          Edit Product
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-neutral-500/90 bg-neutral-500/10 border border-neutral-500/20 rounded-lg hover:bg-neutral-500/20 transition-colors"
          @click="$router.push('/products')"
        >
          <Icon
            name="tabler:arrow-left"
            class="w-4 h-4"
          />
          Back to Products
        </button>
      </div>
    </div>
  </BasePageWrapper>
</template>
