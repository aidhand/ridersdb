<template>
  <div class="flex flex-col items-center justify-center p-8 min-h-[200px]">
    <Icon
      :name="icon"
      class="w-16 h-16 text-gray-400 mb-4"
    />
    <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
      {{ title }}
    </h3>
    <p
      class="text-sm text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md"
    >
      {{ description }}
    </p>
    <div class="flex gap-3">
      <button
        v-if="actionText"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        @click="$emit('action')"
      >
        <Icon
          v-if="actionIcon"
          :name="actionIcon"
          class="w-4 h-4 mr-2"
        />
        {{ actionText }}
      </button>
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /** Empty state title */
  title?: string;
  /** Empty state description */
  description?: string;
  /** Icon name for the empty state */
  icon?: string;
  /** Text for the primary action button */
  actionText?: string;
  /** Icon for the action button */
  actionIcon?: string;
}

withDefaults(defineProps<Props>(), {
  title: "No data available",
  description: "There is no content to display at the moment.",
  icon: "lucide:inbox",
  actionText: undefined,
  actionIcon: undefined,
});

defineEmits<{
  action: [];
}>();
</script>
