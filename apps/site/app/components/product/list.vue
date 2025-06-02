<script setup lang="ts">
// Define product type
interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  brand: { name: string; slug: string } | null;
  collection: { name: string; slug: string } | null;
  createdAt: Date;
  updatedAt: Date;
}

// Define error type
interface FetchError {
  message: string;
}

// Fetch products using useFetch composable which handles loading and error states
const { data, pending, error, refresh } = useFetch("/api/products") as {
  data: Ref<Product[] | null>;
  pending: Ref<boolean>;
  error: Ref<FetchError | null>;
  refresh: () => void;
};

// Pagination state
const page = ref(1);
const pageSize = ref(12);
const totalProducts = computed(() => data.value?.length || 0);
const totalPages = computed(() =>
  Math.ceil(totalProducts.value / pageSize.value)
);
const paginatedProducts = computed(() => {
  if (!data.value) return [];
  const start = (page.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return data.value.slice(start, end);
});

// Integrate view mode from preferences
const preferences = usePreferences();

// Change page
const goToPage = (newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    page.value = newPage;
  }
};
</script>

<template>
  <div class="space-y-8">
    <!-- Error state -->
    <BaseErrorState
      v-if="error"
      title="Failed to load products"
      :message="error.message"
      @retry="refresh()"
    />

    <!-- Loading state -->
    <BaseProductSkeleton
      v-else-if="pending"
      :count="12"
    />

    <!-- Products list/grid -->
    <div v-else-if="paginatedProducts.length">
      <!-- List view -->
      <div
        v-if="preferences.state.value.view === 'list'"
        class="space-y-4"
      >
        <NuxtLink
          v-for="product in paginatedProducts"
          :key="product.id"
          :href="`/products/${product.slug}`"
          class="flex items-center gap-4 p-4 border-b rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <div class="w-16 h-16">
            <BaseImagePlaceholder />
          </div>
          <div class="flex-grow font-medium">{{ product.name }}</div>
          <div class="text-sm text-neutral-500">
            {{ product.price }} {{ preferences.state.value.currency }}
          </div>
        </NuxtLink>
      </div>

      <!-- Grid view -->
      <div
        v-else
        class="flex flex-wrap gap-8"
      >
        <NuxtLink
          v-for="product in paginatedProducts"
          :key="product.id"
          :href="`/products/${product.slug}`"
          class="flex-1 min-w-72 min-h-56 flex flex-col gap-4"
        >
          <div>
            <BaseImagePlaceholder />
          </div>
          <div class="flex align-top justify-between">
            <div class="font-medium">{{ product.name }}</div>
            <div class="text-sm text-neutral-500">
              {{ product.price }} {{ preferences.state.value.currency }}
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-8">
        <div>
          Showing {{ (page - 1) * pageSize + 1 }} -
          {{ Math.min(page * pageSize, totalProducts) }} of
          {{ totalProducts }} products
        </div>
        <div class="flex items-center gap-4">
          <UButton
            :disabled="page === 1"
            icon="i-tabler-chevron-left"
            variant="outline"
            @click="goToPage(page - 1)"
          />
          <div>Page {{ page }} of {{ totalPages }}</div>
          <UButton
            :disabled="page === totalPages"
            icon="i-tabler-chevron-right"
            variant="outline"
            @click="goToPage(page + 1)"
          />
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <BaseEmptyState
      v-else
      title="No products found"
      description="Get started by adding your first product"
      icon="lucide:package"
      action-text="Add Product"
      action-icon="lucide:plus"
      @action="$router.push('/products/new')"
    />
  </div>
</template>
