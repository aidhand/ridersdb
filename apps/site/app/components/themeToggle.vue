<script setup lang="ts">
import { useDark } from "@vueuse/core";

const isDark = useDark();
</script>

<template>
  <USwitch
    v-model="isDark"
    size="xl"
    color="neutral"
    checked-icon="i-heroicons-moon-solid"
    unchecked-icon="i-heroicons-sun-solid"
    class="text-sm"
    :ui="{
      base: 'data-[state=checked]:bg-neutral-400/20 data-[state=unchecked]:bg-neutral-400/20',
    }"
  />
</template>
