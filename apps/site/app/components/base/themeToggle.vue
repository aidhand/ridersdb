<script setup lang="ts">
import { useCycleList } from "@vueuse/core";

const colorMode = useColorMode();
const { state, next } = useCycleList(["system", "dark", "light"] as const, {
  initialValue: colorMode.preference,
});
</script>

<template>
  <UButton
    aria-label="Switch theme"
    color="neutral"
    variant="outline"
    size="md"
    class="flex items-center gap-2"
    @click="colorMode.preference = next()"
  >
    <span class="sr-only">Switch to {{ state }} mode</span>

    <span
      v-if="colorMode.preference === 'system'"
      class="flex items-center gap-2"
    >
      <UIcon
        name="i-tabler-sun-moon"
        class="text-[1rem]"
      />System
    </span>

    <span
      v-if="colorMode.preference === 'light'"
      class="flex items-center gap-2"
    >
      <UIcon
        name="i-tabler-sun"
        class="text-[1rem]"
      />
      Light
    </span>

    <span
      v-if="colorMode.preference === 'dark'"
      class="flex items-center gap-2"
    >
      <UIcon
        name="i-tabler-moon"
        class="text-[1rem]"
      />
      Dark
    </span>
  </UButton>
</template>
