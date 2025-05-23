<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <UTooltip text="Switch theme"
    ><UButton
      color="neutral"
      size="lg"
      variant="outline"
      class="p-2 cursor-pointer"
      @click="toggleDark()"
      ><UIcon
        :name="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
        class="m-[1px] text-lg" /></UButton
  ></UTooltip>
</template>
