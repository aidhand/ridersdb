<script setup lang="ts">
const _props = defineProps({
  user: { type: Object, required: true },
});
</script>
<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">
        Account Information
      </h2>
    </template>
    <div class="space-y-2 text-sm">
      <div>
        <span class="font-semibold">Name:</span>
        {{ user?.name || "—" }}
      </div>
      <div>
        <span class="font-semibold">Email:</span>
        {{ user?.email || "—" }}
      </div>
      <div>
        <span class="font-semibold">Member Since:</span>
        {{ user?.created_at || "—" }}
      </div>
    </div>
  </UCard>
</template>
