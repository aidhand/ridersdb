<script setup lang="ts">
const _props = defineProps({
  preferences: { type: Object, required: true },
});
</script>
<template>
  <UCard class="group hover:shadow-lg transition-shadow">
    <template #header>
      <div class="flex items-center gap-3">
        <div class="p-2 bg-primary-500/10 rounded-lg">
          <UIcon
            name="i-tabler-settings"
            class="text-lg text-primary-500"
          />
        </div>
        <div>
          <h3 class="font-semibold text-neutral-900 dark:text-white">
            Preferences
          </h3>
          <p class="text-sm text-neutral-500/70">Preferences & account</p>
        </div>
      </div>
    </template>
    <div class="space-y-4">
      <p class="text-neutral-600 dark:text-neutral-400">
        Customize your experience and manage your preferences.
      </p>
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="text-neutral-500/70">View Mode:</span>
          <UBadge
            variant="soft"
            color="primary"
          >
            {{ preferences.state.value.view === "grid" ? "Grid" : "List" }}
          </UBadge>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-neutral-500/70">Currency:</span>
          <UBadge
            variant="soft"
            color="success"
          >
            {{ preferences.state.value.currency }}
          </UBadge>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-neutral-500/70">Region:</span>
          <UBadge
            variant="soft"
            color="secondary"
          >
            {{ preferences.state.value.region }}
          </UBadge>
        </div>
      </div>
    </div>
    <template #footer>
      <UButton
        to="/user/settings"
        variant="solid"
        color="primary"
        icon="i-tabler-settings"
        class="w-full"
      >
        Manage Settings
      </UButton>
    </template>
  </UCard>
</template>
