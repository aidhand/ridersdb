<template>
  <header :class="headerClasses">
    <h1
      v-if="level === 1"
      class="text-4xl font-bold"
    >
      {{ title }}
    </h1>
    <h2
      v-else-if="level === 2"
      class="text-3xl font-bold"
    >
      {{ title }}
    </h2>
    <h3
      v-else-if="level === 3"
      class="text-2xl font-bold"
    >
      {{ title }}
    </h3>
    <h4
      v-else-if="level === 4"
      class="text-xl font-bold"
    >
      {{ title }}
    </h4>
    <h5
      v-else-if="level === 5"
      class="text-lg font-bold"
    >
      {{ title }}
    </h5>
    <h6
      v-else
      class="text-base font-bold"
    >
      {{ title }}
    </h6>

    <p
      v-if="description"
      class="mt-2 text-neutral-600 dark:text-neutral-400"
    >
      {{ description }}
    </p>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { clsx } from "clsx";

interface BaseHeaderProps {
  title?: string;
  description?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  class?: string;
}

const props = withDefaults(defineProps<BaseHeaderProps>(), {
  title: "",
  description: "",
  level: 2,
  class: "",
});

const headerClasses = computed(() => clsx("header", props.class));
</script>
