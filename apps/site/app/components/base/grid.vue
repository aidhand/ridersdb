<script setup lang="ts">
interface Props {
  /** Number of columns for different breakpoints */
  cols?: string;
  /** Gap between grid items */
  gap?: "2" | "4" | "6" | "8" | "12";
  /** Grid container class overrides */
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  cols: "1 md:2 lg:3",
  gap: "6",
  class: "",
});

const gridClasses = computed(() => [
  "grid",
  `grid-cols-${props.cols}`,
  `gap-${props.gap}`,
  props.class,
]);
</script>

<template>
  <div
    :class="gridClasses"
    role="list"
  >
    <slot />
  </div>
</template>
