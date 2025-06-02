<script setup lang="ts">
const _props = defineProps({
  recentlyViewed: { type: Number, required: true },
  savedSearches: { type: Number, required: true },
});
</script>
<template>
  <UCard class="group hover:shadow-lg transition-shadow">
    <template #header>
      <div class="flex items-center gap-3">
        <div class="p-2 bg-blue-500/10 rounded-lg">
          <UIcon
            name="i-tabler-clock"
            class="text-lg text-blue-500"
          />
        </div>
        <div>
          <h3 class="font-semibold text-neutral-900 dark:text-white">
            Recent Activity
          </h3>
          <p class="text-sm text-neutral-500/70">Your browsing history</p>
        </div>
      </div>
    </template>
    <div class="space-y-4">
      <p class="text-neutral-600 dark:text-neutral-400">
        Quick access to recently viewed items.
      </p>
      <div class="grid grid-cols-2 gap-4 text-center">
        <div>
          <div class="text-xl font-bold text-neutral-900 dark:text-white">
            {{ recentlyViewed }}
          </div>
          <div class="text-xs text-neutral-500/70">Recently Viewed</div>
        </div>
        <div>
          <div class="text-xl font-bold text-neutral-900 dark:text-white">
            {{ savedSearches }}
          </div>
          <div class="text-xs text-neutral-500/70">Saved Searches</div>
        </div>
      </div>
    </div>
    <template #footer>
      <UButton
        to="/user/activity"
        variant="outline"
        color="info"
        icon="i-tabler-clock"
        class="w-full"
      >
        View Activity
      </UButton>
    </template>
  </UCard>
</template>
