<script setup lang="ts">
const route = useRoute();

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
];

const isActiveRoute = (href: string) => {
  if (href === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(href);
};
</script>

<template>
  <div class="flex flex-1 items-center justify-between gap-8">
    <!-- Main Navigation -->
    <nav class="flex gap-6">
      <NuxtLink
        v-for="item in navigationItems"
        :key="item.href"
        :href="item.href"
        :class="[
          'text-sm font-medium transition-colors',
          isActiveRoute(item.href) ?
            'text-neutral-900 dark:text-white'
          : 'text-neutral-500/70 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white',
        ]"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>

    <!-- Secondary Actions -->
    <div class="flex items-center gap-2">
      <ThemeToggle />
    </div>
  </div>
</template>
