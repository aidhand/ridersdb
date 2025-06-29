<template>
  <BasePageWrapper>
    <DesignPageHeader
      title="Patterns"
      description="Common UI patterns and best practices for building consistent interfaces."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Patterns' },
      ]"
      :navigation-items="[]"
    />
    <div class="">
      <DesignPageSection
        id="empty"
        title="Empty States"
        description="Use clear messaging and visuals to guide users when no data is available."
      >
        <div
          class="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 flex flex-col items-center"
        >
          <UIcon
            name="i-tabler-database-off"
            class="text-4xl text-neutral-400 mb-2"
          />
          <span class="text-neutral-700 dark:text-neutral-300"
            >No data available</span
          >
        </div>
      </DesignPageSection>
      <DesignPageSection
        id="loading"
        title="Loading States"
        description="Show skeleton loaders or spinners to indicate loading."
      >
        <div class="flex gap-4">
          <div
            class="w-32 h-6 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"
          ></div>
          <div
            class="w-16 h-6 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"
          ></div>
        </div>
      </DesignPageSection>
    </div>
  </BasePageWrapper>
</template>

<script setup lang="ts">
// No additional logic needed for static patterns page
</script>
