<script setup lang="ts">
import { clsx } from "clsx";
import { computed } from "vue";

interface Props {
  /** Icon name (e.g., 'i-heroicons-eye') */
  name?: string;
  /** Size of the icon container - xs, sm, md, lg, xl */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Color variant - uses both Nuxt UI colors and semantic colors */
  color?:
    | string
    | "blue"
    | "green"
    | "purple"
    | "orange"
    | "red"
    | "yellow"
    | "indigo"
    | "pink"
    | "gray";
  /** Shape of the container - square, rounded, circle */
  shape?: "square" | "rounded" | "circle";
  /** Additional CSS classes for the container */
  class?: string;
  /** Additional CSS classes for the icon */
  iconClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: "i-heroicons-eye",
  size: "md",
  color: "primary",
  shape: "rounded",
  class: "",
  iconClass: "",
});

const containerSizes = {
  xs: "p-2",
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
  xl: "p-6",
};

const iconSizes = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
};

const shapeVariants = {
  square: "rounded-none",
  rounded: "rounded-lg",
  circle: "rounded-full",
};

// Semantic color mappings for design system consistency
const semanticColors = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900",
    text: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900",
    text: "text-green-600 dark:text-green-400",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900",
    text: "text-purple-600 dark:text-purple-400",
  },
  orange: {
    bg: "bg-orange-100 dark:bg-orange-900",
    text: "text-orange-600 dark:text-orange-400",
  },
  red: {
    bg: "bg-red-100 dark:bg-red-900",
    text: "text-red-600 dark:text-red-400",
  },
  yellow: {
    bg: "bg-yellow-100 dark:bg-yellow-900",
    text: "text-yellow-600 dark:text-yellow-400",
  },
  indigo: {
    bg: "bg-indigo-100 dark:bg-indigo-900",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  pink: {
    bg: "bg-pink-100 dark:bg-pink-900",
    text: "text-pink-600 dark:text-pink-400",
  },
  gray: {
    bg: "bg-gray-100 dark:bg-gray-900",
    text: "text-gray-600 dark:text-gray-400",
  },
};

const containerClasses = computed(() => {
  // Check if it's a semantic color
  const semanticColor =
    semanticColors[props.color as keyof typeof semanticColors];

  if (semanticColor) {
    return clsx(
      "flex-shrink-0 flex items-center justify-center",
      containerSizes[props.size],
      shapeVariants[props.shape],
      semanticColor.bg,
      props.class
    );
  }

  // Fall back to Nuxt UI color system
  return clsx(
    "flex-shrink-0 flex items-center justify-center",
    containerSizes[props.size],
    shapeVariants[props.shape],
    props.class,
    // Nuxt UI color classes
    // TODO: tailwind doesn't pick this up
    `bg-${props.color}-400/20 dark:bg-${props.color}-600/20`
  );
});

const iconClasses = computed(() => {
  // Check if it's a semantic color
  const semanticColor =
    semanticColors[props.color as keyof typeof semanticColors];

  if (semanticColor) {
    return clsx(iconSizes[props.size], semanticColor.text, props.iconClass);
  }

  // Fall back to Nuxt UI color system
  return clsx(
    iconSizes[props.size],
    `text-${props.color}-600 dark:text-${props.color}-400`,
    props.iconClass
  );
});
</script>

<template>
  <div :class="containerClasses">
    <UIcon
      :name="props.name"
      :class="iconClasses"
    />
  </div>
</template>
