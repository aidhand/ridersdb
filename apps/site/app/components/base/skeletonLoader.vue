<template>
  <div class="space-y-4">
    <!-- Card skeleton -->
    <div
      v-for="i in count"
      :key="i"
      class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 animate-pulse"
    >
      <div class="flex items-start space-x-4">
        <!-- Avatar/Image skeleton -->
        <div
          v-if="showAvatar"
          class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0"
        />

        <div class="flex-1 space-y-3">
          <!-- Title skeleton -->
          <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />

          <!-- Content lines -->
          <div
            v-for="line in lines"
            :key="line"
            class="h-3 bg-gray-300 dark:bg-gray-600 rounded"
            :style="{ width: `${Math.random() * 40 + 60}%` }"
          />

          <!-- Action buttons skeleton -->
          <div
            v-if="showActions"
            class="flex space-x-2 pt-2"
          >
            <div class="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
            <div class="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /** Number of skeleton items to show */
  count?: number;
  /** Number of content lines per item */
  lines?: number;
  /** Whether to show avatar/image placeholder */
  showAvatar?: boolean;
  /** Whether to show action buttons skeleton */
  showActions?: boolean;
}

withDefaults(defineProps<Props>(), {
  count: 3,
  lines: 2,
  showAvatar: true,
  showActions: false,
});
</script>
