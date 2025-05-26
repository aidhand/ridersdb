<script setup lang="ts">
import type { Product } from "@repo/types";

interface Props {
  /** Grid columns configuration */
  columns?: string;
  /** Card variant */
  cardVariant?: "default" | "elevated" | "subtle";
}

const { columns = "1 sm:2 md:3 xl:4", cardVariant = "default" } =
  defineProps<Props>();

// Fetch products using useFetch composable which handles loading and error states
const products = useFetch<Product[]>("/api/products");

// Use shared search state
const searchQuery = useProductSearch();
const filteredProducts = computed(() => {
  if (!products.data.value) return [];
  if (!searchQuery.value) return products.data.value;

  const query = searchQuery.value.toLowerCase();
  return products.data.value.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
  );
});

const cardClasses = computed(() => [
  "h-full transition-all duration-200",
  {
    "hover:shadow-lg hover:-translate-y-1": cardVariant === "elevated",
    "hover:bg-neutral-500/5": cardVariant === "subtle",
    "hover:shadow-md": cardVariant === "default",
  },
]);
</script>

<template>
  <div class="w-full space-y-6">
    <!-- Loading state -->
    <div
      v-if="products.pending.value"
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <UIcon
        name="i-tabler-loader-2"
        class="animate-spin text-4xl text-primary-500 mb-4"
      />
      <p class="text-lg text-neutral-500/70">Loading products...</p>
    </div>

    <!-- Error state -->
    <div
      v-else-if="products.error.value"
      class="flex flex-col items-center justify-center py-20 text-center bg-red-500/10 border border-red-500/20 rounded-lg"
    >
      <UIcon
        name="i-tabler-alert-triangle"
        class="text-red-500 text-4xl mb-4"
      />
      <h3 class="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
        Failed to load products
      </h3>
      <p class="text-red-600/80 dark:text-red-300/80 mb-4">
        {{ products.error }}
      </p>
      <UButton
        size="md"
        color="primary"
        variant="solid"
        @click="products.refresh()"
      >
        Try Again
      </UButton>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!products.data.value || products.data.value.length === 0"
      class="flex flex-col items-center justify-center py-20 text-center bg-neutral-500/5 border border-neutral-500/10 rounded-lg"
    >
      <UIcon
        name="i-tabler-box"
        class="text-5xl text-neutral-400 mb-4"
      />
      <h3
        class="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
      >
        No products found
      </h3>
      <p class="text-neutral-500/70 mb-6">
        Get started by adding your first product
      </p>
      <UButton
        to="/products/new"
        color="primary"
        size="md"
        icon="i-tabler-plus"
      >
        Add Product
      </UButton>
    </div>

    <!-- No search results -->
    <div
      v-else-if="searchQuery && filteredProducts.length === 0"
      class="flex flex-col items-center justify-center py-16 text-center bg-neutral-500/5 border border-neutral-500/10 rounded-lg"
    >
      <UIcon
        name="i-tabler-search-off"
        class="text-4xl text-neutral-400 mb-4"
      />
      <h3
        class="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
      >
        No matching products
      </h3>
      <p class="text-neutral-500/70 mb-4">Try a different search term</p>
      <UButton
        variant="ghost"
        color="neutral"
        size="sm"
        @click="searchQuery = ''"
      >
        Clear Search
      </UButton>
    </div>

    <!-- Products grid -->
    <BaseGrid
      v-else
      :cols="columns"
      gap="6"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="group"
      >
        <UCard :class="cardClasses">
          <template #header>
            <div class="flex items-center justify-between gap-3">
              <h3
                class="font-semibold text-lg text-neutral-900 dark:text-white truncate"
              >
                {{ product.name }}
              </h3>
              <UBadge
                color="primary"
                variant="soft"
                size="sm"
                class="shrink-0"
              >
                {{ product.id.substring(0, 8) }}...
              </UBadge>
            </div>
          </template>

          <div class="flex-grow">
            <p
              v-if="product.description"
              class="text-sm text-neutral-500/70 line-clamp-3 mb-4"
            >
              {{ product.description }}
            </p>
            <p
              v-else
              class="text-sm text-neutral-400/80 italic mb-4"
            >
              No description available
            </p>
          </div>

          <template #footer>
            <div
              class="flex items-center justify-between pt-4 border-t border-neutral-500/10"
            >
              <span class="text-xs text-neutral-400/80">
                {{ new Date(product.updatedAt).toLocaleDateString() }}
              </span>
              <div class="flex gap-2">
                <UButton
                  :to="`/products/${product.slug}`"
                  variant="soft"
                  color="primary"
                  icon="i-tabler-eye"
                  size="sm"
                  class="opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <UButton
                  :to="`/products/${product.slug}/edit`"
                  variant="soft"
                  color="primary"
                  icon="i-tabler-pencil"
                  size="sm"
                  class="opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </template>
        </UCard>
      </div>
    </BaseGrid>
  </div>
</template>
