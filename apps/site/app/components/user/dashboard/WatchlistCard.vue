<script setup lang="ts">
const _props = defineProps({
  watchlistItems: { type: Number, required: true },
});
</script>
<template>
  <UCard class="group hover:shadow-lg transition-shadow">
    <template #header>
      <div class="flex items-center gap-3">
        <div class="p-2 bg-green-500/10 rounded-lg">
          <UIcon
            name="i-tabler-list-check"
            class="text-lg text-green-500"
          />
        </div>
        <div>
          <h3 class="font-semibold text-neutral-900 dark:text-white">
            Watchlist
          </h3>
          <p class="text-sm text-neutral-500/70">Saved items</p>
        </div>
      </div>
    </template>
    <div class="space-y-4">
      <p class="text-neutral-600 dark:text-neutral-400">
        Keep track of products you're interested in.
      </p>
      <div class="text-center py-4">
        <div class="text-2xl font-bold text-neutral-900 dark:text-white">
          {{ watchlistItems }}
        </div>
        <div class="text-sm text-neutral-500/70">Items in watchlist</div>
      </div>
    </div>
    <template #footer>
      <UButton
        to="/user/watchlist"
        variant="outline"
        color="success"
        icon="i-tabler-list-check"
        class="w-full"
      >
        View Watchlist
      </UButton>
    </template>
  </UCard>
</template>
