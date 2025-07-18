<script setup lang="ts">
import { BaseStack } from "#components";

interface BreadcrumbItem {
  label: string;
  to?: string;
  icon?: string;
}

interface NavigationItem {
  label: string;
  hash: string;
  description?: string;
  icon?: string;
}

interface HeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  navigationItems?: NavigationItem[];
}

const props = withDefaults(defineProps<HeaderProps>(), {
  description: undefined,

  breadcrumbs: () => [],
  navigationItems: () => [],

  class: "",
});
</script>

<template>
  <BaseStack
    direction="vertical"
    class="gap-4"
  >
    <!-- Header Navigation -->
    <nav
      v-if="props.breadcrumbs.length > 0"
      class="flex items-center justify-between py-4 mb-6 border-b border-neutral-200 dark:border-neutral-800"
      aria-label="Page navigation"
    >
      <section class="flex items-center gap-4">
        <UBreadcrumb
          :items="props.breadcrumbs"
          separator-icon="i-tabler-chevron-right"
        />
      </section>
    </nav>

    <BaseHeader
      :title="props.title"
      :description="props.description"
      :level="1"
    />

    <slot />

    <!-- Page Navigation -->
    <nav v-if="props.navigationItems.length > 0">
      <div class="flex flex-wrap gap-4">
        <UButton
          v-for="item in props.navigationItems"
          :key="item.hash"
          :to="{ hash: item.hash }"
          variant="soft"
          size="sm"
          :title="item.description"
          :icon="item.icon"
        >
          {{ item.label }}
        </UButton>
      </div>
    </nav>
  </BaseStack>
</template>
