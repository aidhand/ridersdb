<script setup lang="ts">
// Fetch products using useFetch composable which handles loading and error states
const products = useFetch("/api/products");
const _searchQuery = useProductSearch();
</script>

<template>
  <div class="space-y-8">
    <!-- Error state -->
    <div
      v-if="products.error.value"
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
        color="primary"
        variant="solid"
        @click="products.refresh()"
      >
        Try Again
      </UButton>
    </div>

    <!-- Loading state -->
    <div
      v-else-if="products.pending.value"
      class="flex flex-wrap gap-8 space-y-8"
    >
      <div
        v-for="n in 12"
        :key="n"
        class="flex-1 min-w-72 min-h-56 flex flex-col gap-4"
      >
        <div class="w-full min-h-48">
          <USkeleton class="flex-1 min-w-72 min-h-48 bg-neutral-500/10" />
        </div>

        <div class="flex align-top justify-between">
          <div>
            <USkeleton class="min-w-32 min-h-4 bg-neutral-500/40" />
          </div>
          <div>
            <USkeleton class="min-w-12 min-h-4 bg-neutral-500/20" />
          </div>
        </div>
      </div>
    </div>

    <!-- Products grid -->
    <div
      v-else-if="products.data.value?.length"
      class="flex flex-wrap gap-8 space-y-8"
    >
      <NuxtLink
        v-for="product in products.data.value"
        :key="product.id"
        :href="`/products/${product.slug}`"
        class="flex-1 min-w-72 min-h-56 flex flex-col gap-4"
      >
        <div class="w-full min-h-48 bg-neutral-400/5">image</div>
        <div class="flex align-top justify-between">
          <div class="font-medium">{{ product.name }}</div>
          <div class="text-sm text-neutral-500">price</div>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty state -->
    <div
      v-else
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
        icon="i-tabler-plus"
      >
        Add Product
      </UButton>
    </div>
  </div>
</template>
