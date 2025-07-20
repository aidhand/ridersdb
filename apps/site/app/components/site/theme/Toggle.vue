<script setup lang="ts">
import { useCycleList } from "@vueuse/core";

interface Props {
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "soft" | "ghost" | "link";
  color?:
    | "primary"
    | "error"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "neutral";
  showLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  variant: "outline",
  color: "neutral",
  showLabel: true,
});

const colorMode = useColorMode();
const availableColors = ["system", "light", "dark"];
const { next } = useCycleList(availableColors);

function toggleTheme() {
  colorMode.preference = next();
}

const themeConfig = computed(() => {
  switch (colorMode.preference) {
    case "system":
      return { icon: "i-tabler-sun-moon", label: "System" };
    case "light":
      return { icon: "i-tabler-sun", label: "Light" };
    case "dark":
      return { icon: "i-tabler-moon", label: "Dark" };
    default:
      return { icon: "i-tabler-sun-moon", label: "System" };
  }
});
</script>

<template>
  <BaseButton
    :aria-label="`Switch to ${next()} mode`"
    :color="props.color"
    :variant="props.variant"
    :size="props.size"
    class="flex items-center gap-2"
    @click="toggleTheme"
  >
    <span class="sr-only">Switch to {{ next() }} mode</span>

    <span class="flex items-center gap-2">
      <BaseIcon
        :name="themeConfig.icon"
        class="text-[1rem]"
      />
      <span v-if="props.showLabel">{{ themeConfig.label }}</span>
    </span>
  </BaseButton>
</template>
