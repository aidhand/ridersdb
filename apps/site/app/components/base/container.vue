<script setup lang="ts">
interface Props {
  /** Container max width */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Disable horizontal padding */
  noPadding?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "xl",
  noPadding: false,
});

const containerClasses = computed(() => [
  "mx-auto",
  !props.noPadding && "px-4 sm:px-6 lg:px-8",
  {
    "max-w-sm": props.size === "sm",
    "max-w-4xl": props.size === "md",
    "max-w-6xl": props.size === "lg",
    "max-w-7xl": props.size === "xl",
    "max-w-none": props.size === "full",
  },
]);
</script>

<template>
  <div
    :class="containerClasses"
    role="region"
  >
    <slot />
  </div>
</template>
