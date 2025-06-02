<template>
  <div class="flex flex-col items-center justify-center p-8 min-h-[200px]">
    <Icon
      :name="icon"
      class="w-8 h-8 animate-spin text-primary mb-4"
    />
    <p class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
      {{ title }}
    </p>
    <p
      v-if="description"
      class="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md"
    >
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /** Title text to display */
  title?: string;
  /** Optional description text */
  description?: string;
  /** Icon name for the loading spinner */
  icon?: string;
}

withDefaults(defineProps<Props>(), {
  title: "Loading...",
  description: undefined,
  icon: "lucide:loader-2",
});
</script>
