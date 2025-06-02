<script setup lang="ts">
interface Activity {
  id: string;
  action: string;
  item: string;
  date: string;
}

const _props = defineProps<{
  recentActivity: Activity[];
}>();
</script>
<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">
        Recent Activity
      </h2>
    </template>
    <div class="space-y-4">
      <div
        v-for="activity in recentActivity"
        :key="activity.id"
        class="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg"
      >
        <div class="flex items-center gap-3 flex-grow">
          <UIcon
            :name="
              activity.action === 'Viewed' ? 'i-tabler-eye'
              : activity.action === 'Added to Watchlist' ? 'i-tabler-star'
              : activity.action === 'Purchased' ? 'i-tabler-shopping-cart'
              : 'i-tabler-info-circle'
            "
            class="text-lg text-neutral-500"
          />
          <div>
            <p class="text-sm font-medium text-neutral-900 dark:text-white">
              {{ activity.action }}
              <span class="text-neutral-500">{{ activity.item }}</span>
            </p>
            <p class="text-xs text-neutral-500/70">{{ activity.date }}</p>
          </div>
        </div>
        <UButton
          size="sm"
          variant="ghost"
          icon="i-tabler-external-link"
          :to="`/products/${activity.item.toLowerCase().replace(' ', '-')}`"
        />
      </div>
    </div>
  </UCard>
</template>
