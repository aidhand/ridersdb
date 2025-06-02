<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="i in count"
      :key="i"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse"
    >
      <!-- Product image skeleton -->
      <div class="w-full h-48 bg-gray-300 dark:bg-gray-600" />

      <!-- Product content skeleton -->
      <div class="p-4 space-y-3">
        <!-- Product name -->
        <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />

        <!-- Product description -->
        <div class="space-y-2">
          <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full" />
          <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
        </div>

        <!-- Price and category -->
        <div class="flex justify-between items-center pt-2">
          <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20" />
          <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /** Number of product skeleton items to show */
  count?: number;
}

withDefaults(defineProps<Props>(), {
  count: 6,
});
</script>
