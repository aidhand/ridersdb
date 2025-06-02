<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Watchlist",
  description: "Manage your watchlist of products.",
});

// Fetch watchlist data
const { data, pending, error, refresh } = useFetch("/api/user/watchlist") as {
  data: Ref<Product[] | null>;
  pending: Ref<boolean>;
  error: Ref<FetchError | null>;
  refresh: () => void;
};

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

// Change page
const goToPage = (newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    page.value = newPage;
  }
};
</script>

<template>
  <BasePageWrapper>
    <!-- Page Header Navigation -->
    <LayoutHeaderNav
      :breadcrumbs="[
        { label: 'User', icon: 'i-tabler-user' },
        { label: 'Watchlist' },
      ]"
    />

    <!-- Page Title -->
    <div class="space-y-2 mb-8">
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
        Watchlist
      </h1>
      <p class="text-neutral-500/70">Manage your list of favorite products.</p>
    </div>

    <!-- Watchlist Content -->
    <div class="space-y-8">
      <!-- Error state -->
      <BaseErrorState
        v-if="error"
        title="Failed to load watchlist"
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
        <!-- Grid view -->
        <div class="flex flex-wrap gap-8">
          <NuxtLink
            v-for="product in paginatedProducts"
            :key="product.id"
            :href="`/products/${product.slug}`"
            class="flex-1 min-w-72 min-h-56 flex flex-col gap-4"
          >
            <div>
              <ImagePlaceholder />
            </div>
            <div class="flex align-top justify-between">
              <div class="font-medium">{{ product.name }}</div>
              <div class="text-sm text-neutral-500">
                {{ product.price }} USD
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
        title="No products in watchlist"
        description="Add products to your watchlist to keep track of them."
        icon="lucide:heart"
        action-text="Browse Products"
        action-icon="lucide:search"
        @action="$router.push('/products')"
      />
    </div>
  </BasePageWrapper>
</template>
