<template>
  <div :class="stackClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  createFlexBase,
  createFlexDirectionClass,
  createFlexAlignClass,
  createFlexJustifyClass,
  createFlexWrapClass,
  type FlexDirection,
  type FlexAlign,
  type FlexJustify,
} from "~/utils/layoutUtils";
import { clsx } from "clsx";

interface StackProps {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: boolean;

  class?: string;
}

const props = withDefaults(defineProps<StackProps>(), {
  direction: undefined,
  align: undefined,
  justify: undefined,
  wrap: undefined,

  class: "",
});

// Use the new modular functions to build classes
const stackClasses = computed(() => {
  const classes = [...createFlexBase()];

  // Add optional flex properties
  const directionClass = createFlexDirectionClass(props.direction);
  if (directionClass) classes.push(directionClass);

  const alignClass = createFlexAlignClass(props.align);
  if (alignClass) classes.push(alignClass);

  const justifyClass = createFlexJustifyClass(props.justify);
  if (justifyClass) classes.push(justifyClass);

  const wrapClass = createFlexWrapClass(props.wrap);
  if (wrapClass) classes.push(wrapClass);

  return clsx(classes, props.class);
});
</script>
