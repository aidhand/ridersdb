<script setup lang="ts">
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

interface Props {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  navigationItems?: NavigationItem[];
}

withDefaults(defineProps<Props>(), {
  description: undefined,
  breadcrumbs: () => [],
  navigationItems: () => [],
});
</script>

<template>
  <div>
    <!-- Header Navigation -->
    <nav
      v-if="breadcrumbs.length > 0"
      class="flex items-center justify-between py-4 border-b border-neutral-200 dark:border-neutral-800"
      aria-label="Page navigation"
    >
      <section class="flex items-center gap-4">
        <UBreadcrumb
          :items="breadcrumbs"
          separator-icon="i-tabler-chevron-right"
        />
      </section>
    </nav>
    <!-- Page Header -->
    <div class="my-12 flex justify-between items-center gap-8">
      <div>
        <h1 class="mb-6 text-5xl font-bold">
          {{ title }}
        </h1>
        <p
          v-if="description"
          class="text-xl text-neutral-600 dark:text-neutral-400"
        >
          {{ description }}
        </p>
      </div>

      <div>
        <slot name="actions" />
        <!-- Default slot for actions -->
      </div>
    </div>
    <!-- Page Navigation -->
    <nav
      v-if="navigationItems.length > 0"
      class="mb-8"
    >
      <div class="flex flex-wrap gap-4">
        <UButton
          v-for="item in navigationItems"
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
  </div>
</template>
