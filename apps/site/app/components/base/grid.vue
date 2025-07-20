<template>
  <div :class="gridClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  createGridBase,
  createGridColumns,
  createGapClasses,
  type ResponsiveColumns,
} from "~/utils/layoutUtils";
import { clsx } from "clsx";

interface GridProps {
  cols: number | ResponsiveColumns;

  spacing?: number | string;
  class?: string;
}

const props = withDefaults(defineProps<GridProps>(), {
  spacing: 6, // Default spacing
  class: "",
});

// Use the new modular functions to build classes
const gridClasses = computed(() => {
  return clsx(
    ...createGridBase(),
    ...createGridColumns(props.cols),
    ...createGapClasses(props.spacing),
    props.class
  );
});
</script>
