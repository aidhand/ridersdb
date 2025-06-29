<template>
  <BasePageWrapper>
    <DesignPageHeader
      title="Layout"
      description="Guidelines for spacing, grid, and responsive design in the RidersDB design system."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Layout' },
      ]"
      :navigation-items="[]"
    />
    <div class="">
      <DesignPageSection
        id="grid"
        title="Grid System"
        description="Use a 12-column grid for desktop layouts and flexible columns for mobile."
      >
        <div
          class="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800"
        >
          <div class="grid grid-cols-12 gap-2">
            <div
              v-for="n in 12"
              :key="n"
              class="h-8 bg-primary-200 dark:bg-primary-800 rounded"
            ></div>
          </div>
        </div>
      </DesignPageSection>
      <DesignPageSection
        id="spacing"
        title="Spacing"
        description="Consistent spacing is achieved using the spacing scale defined in the design system."
      >
        <ul class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <li
            v-for="size in [
              '4px',
              '8px',
              '12px',
              '16px',
              '24px',
              '32px',
              '40px',
              '48px',
            ]"
            :key="size"
            class="flex items-center gap-2"
          >
            <span
              :style="{ width: size, height: '16px' }"
              class="bg-primary-400 dark:bg-primary-600 rounded"
            ></span>
            <span class="text-sm text-neutral-700 dark:text-neutral-300">{{
              size
            }}</span>
          </li>
        </ul>
      </DesignPageSection>
    </div>
  </BasePageWrapper>
</template>

<script setup lang="ts">
// No additional logic needed for static layout page
</script>
