<template>
  <component
    :is="as"
    :class="textClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { clsx } from "clsx";

interface TextProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "primary" | "secondary" | "muted" | "error" | "success" | "warning";
  truncate?: boolean;
  lines?: number; // For line clamping
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  class?: string;
}

const props = withDefaults(defineProps<TextProps>(), {
  size: "md",
  weight: "normal",
  color: "primary",
  truncate: false,
  lines: undefined,
  as: "p",
  class: "",
});

const textClasses = computed(() =>
  clsx(
    "text",
    sizeClasses.value,
    weightClasses.value,
    colorClasses.value,
    props.truncate && "truncate",
    props.lines && `line-clamp-${props.lines}`,
    props.class
  )
);

const sizeClasses = computed(() => {
  const sizeMap = {
    "xs": "text-xs",
    "sm": "text-sm",
    "md": "text-base",
    "lg": "text-lg",
    "xl": "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  };
  return sizeMap[props.size];
});

const weightClasses = computed(() => {
  const weightMap = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };
  return weightMap[props.weight];
});

const colorClasses = computed(() => {
  const colorMap = {
    primary: "text-gray-900 dark:text-white",
    secondary: "text-gray-600 dark:text-gray-300",
    muted: "text-gray-500 dark:text-gray-400",
    error: "text-error-600 dark:text-error-400",
    success: "text-success-600 dark:text-success-400",
    warning: "text-warning-600 dark:text-warning-400",
  };
  return colorMap[props.color];
});
</script>
