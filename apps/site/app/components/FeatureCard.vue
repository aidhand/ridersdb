<script setup lang="ts">
interface Props {
  /** Title of the feature/principle */
  title?: string;
  /** Description text */
  description?: string;
  /** Icon name (e.g., 'i-heroicons-eye') */
  icon?: string;
  /** Icon color variant */
  iconColor?: string;
  /** Icon size */
  iconSize?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Layout variant - controls spacing and alignment */
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  description: "",
  icon: "",
  iconColor: "blue",
  iconSize: "md",
});
</script>

<template>
  <UCard class="mb-4">
    <div class="flex items-start gap-4">
      <DesignIcon
        v-if="props.icon"
        :name="props.icon"
        :color="props.iconColor"
        :size="props.iconSize"
      />
      <div class="flex-1 flex flex-col justify-center">
        <h4 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          {{ props.title }}
        </h4>
        <p
          v-if="props.description"
          class="text-base text-neutral-600 dark:text-neutral-300"
        >
          {{ props.description }}
        </p>
        <slot />
      </div>
    </div>
  </UCard>
</template>
