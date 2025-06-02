<script setup lang="ts">
const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
];
</script>

<template>
  <div class="flex flex-1 items-center justify-between gap-8">
    <!-- Main Navigation -->
    <nav class="flex gap-6">
      <NuxtLink
        v-for="item in navigationItems"
        :key="item.href"
        :href="item.href"
        class="text-sm font-medium transition-colors text-neutral-500/70 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        active-class="text-neutral-900 dark:text-white"
        exact
      >
        {{ item.label }}
      </NuxtLink>
    </nav>

    <!-- Secondary Actions -->
    <div class="flex items-center gap-2">
      <BaseThemeToggle />
      <UserDropdown />
    </div>
  </div>
</template>
