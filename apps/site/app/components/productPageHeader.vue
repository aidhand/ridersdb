<script setup lang="ts">
interface Props {
  /** Whether to show the border bottom */
  bordered?: boolean;
  /** Spacing variant */
  spacing?: "sm" | "md" | "lg";
}

const { bordered = true, spacing = "md" } = defineProps<Props>();

const headerClasses = computed(() => [
  bordered && "border-b border-neutral-500/20",
  {
    "pb-4": spacing === "sm",
    "pb-6": spacing === "md",
    "pb-8": spacing === "lg",
  },
]);

const spacingClasses = computed(() => ({
  "gap-4": spacing === "sm",
  "gap-6": spacing === "md",
  "gap-8": spacing === "lg",
}));
</script>

<template>
  <div :class="headerClasses">
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      :class="spacingClasses"
    >
      <!-- Title Section -->
      <div class="space-y-2">
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
          <slot name="title">Products</slot>
        </h1>
        <p class="text-sm text-neutral-500/70 dark:text-neutral-400/80">
          <slot name="subtitle">Manage your product catalog</slot>
        </p>
      </div>

      <!-- Actions Section -->
      <div class="flex items-center gap-3">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>
