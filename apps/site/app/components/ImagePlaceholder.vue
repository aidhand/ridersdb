<script setup lang="ts">
defineProps({
  label: { type: String, default: "" },
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center bg-neutral-500/5 border border-neutral-500/20 rounded-lg aspect-square"
  >
    <Icon
      name="i-tabler-photo"
      class="text-xl text-neutral-500/40 mx-auto"
    />
    <p
      v-if="label"
      class="text-sm mt-2 text-neutral-500/60 text-center"
    >
      {{ label }}
    </p>
  </div>
</template>
