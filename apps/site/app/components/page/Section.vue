<script setup lang="ts">
import { computed } from "vue";
import { clsx } from "clsx";

interface SectionProps {
  title?: string;
  description?: string;
  class?: string;
}

const props = withDefaults(defineProps<SectionProps>(), {
  title: undefined,
  description: undefined,
  class: "",
});

const containerClasses = computed(() =>
  clsx("page-section space-y-8", props.class)
);
</script>

<template>
  <section :class="containerClasses">
    <BaseHeader
      :title="title"
      :description="description"
      :level="2"
      class="section-header"
    />
    <div class="section-content space-y-12">
      <slot />
    </div>
  </section>
</template>
