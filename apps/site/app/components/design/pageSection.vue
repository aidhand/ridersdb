<script setup lang="ts">
interface Props {
  id?: string;
  title: string;
  description?: string;
}

withDefaults(defineProps<Props>(), {
  id: undefined,
  description: undefined,
});
</script>

<template>
  <section
    :id="id"
    class="space-y-8"
  >
    <div>
      <h2 class="text-2xl leading-loose font-bold">
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="text-lg text-neutral-600 dark:text-neutral-400"
      >
        {{ description }}
      </p>
    </div>

    <div>
      <slot />
    </div>
  </section>
</template>
