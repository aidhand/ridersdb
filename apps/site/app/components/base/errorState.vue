<template>
  <div class="flex flex-col items-center justify-center p-8 min-h-[200px]">
    <Icon
      :name="icon"
      class="w-12 h-12 text-red-500 mb-4"
    />
    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
      {{ title }}
    </h3>
    <p
      class="text-sm text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md"
    >
      {{ message }}
    </p>
    <div class="flex gap-3">
      <button
        v-if="showRetry"
        :disabled="retrying"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="$emit('retry')"
      >
        <Icon
          v-if="retrying"
          name="lucide:loader-2"
          class="w-4 h-4 mr-2 animate-spin"
        />
        <Icon
          v-else
          name="lucide:refresh-cw"
          class="w-4 h-4 mr-2"
        />
        {{ retryText }}
      </button>
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /** Error title */
  title?: string;
  /** Error message to display */
  message?: string;
  /** Icon name for the error icon */
  icon?: string;
  /** Whether to show the retry button */
  showRetry?: boolean;
  /** Text for the retry button */
  retryText?: string;
  /** Whether retry is in progress */
  retrying?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: "Something went wrong",
  message: "An error occurred while loading this content. Please try again.",
  icon: "lucide:alert-circle",
  showRetry: true,
  retryText: "Try again",
  retrying: false,
});

defineEmits<{
  retry: [];
}>();
</script>
