<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: "Design System",
  description: "A system for clear, consistent, and accessible experiences.",
});

const sections = [
  {
    title: "Philosophy",
    description: "Our design philosophy and core values",
    items: [
      {
        name: "Brand",
        href: "/design/brand",
        icon: "i-tabler-branding-watermark",
      },
      {
        name: "Values",
        href: "/design/values",
        icon: "i-tabler-heart",
      },
      {
        name: "Principles",
        href: "/design/principles",
        icon: "i-tabler-bulb",
      },
    ],
  },
  {
    title: "Foundation",
    description: "Core design elements and guidelines",
    items: [
      {
        name: "Colors",
        href: "/design/colors",
        icon: "i-tabler-color-swatch",
      },
      {
        name: "Typography",
        href: "/design/typography",
        icon: "i-tabler-text-wrap",
      },
      {
        name: "Icons",
        href: "/design/icons",
        icon: "i-tabler-icons",
      },
      {
        name: "Spacing",
        href: "/design/spacing",
        icon: "i-tabler-ruler-2",
      },
      {
        name: "Accessibility",
        href: "/design/accessibility",
        icon: "i-tabler-accessible",
      },
      {
        name: "Responsive Design",
        href: "/design/responsive",
        icon: "i-tabler-device-mobile",
      },
    ],
  },
  {
    title: "Patterns",
    description: "Reusable design patterns and components",
    items: [],
  },
  {
    title: "Examples",
    description: "Real-world examples of design system usage",
    items: [],
  },
];

// Navigation items
const navigationItems = [
  { label: "Variants", hash: "#variants", icon: "i-tabler-palette" },
  { label: "Colors", hash: "#colors", icon: "i-tabler-color-swatch" },
  { label: "Sizes", hash: "#sizes", icon: "i-tabler-dimensions" },
  { label: "States", hash: "#states", icon: "i-tabler-toggle-left" },
  { label: "Icons", hash: "#icons", icon: "i-tabler-icons" },
  { label: "Usage", hash: "#usage", icon: "i-tabler-list-check" },
  {
    label: "Accessibility",
    hash: "#accessibility",
    icon: "i-tabler-accessible",
  },
];
</script>

<template>
  <PageWrapper>
    <PageHeader
      title="Design System"
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
      ]"
      :navigation-items="navigationItems"
    />
    <!-- Header -->
    <div class="text-center space-y-6 mb-16">
      <div class="space-y-4">
        <h1 class="text-4xl font-bold text-neutral-900 dark:text-white">
          RidersDB Design System
        </h1>
        <p
          class="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto"
        >
          A comprehensive design system for building consistent, accessible, and
          beautiful motorcycle gear experiences
        </p>
      </div>

      <!-- Quick stats -->
      <div class="flex justify-center gap-8 mt-8">
        <div class="text-center">
          <div class="text-2xl font-bold text-primary-500">4</div>
          <div class="text-sm text-neutral-500">Foundation</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-primary-500">3</div>
          <div class="text-sm text-neutral-500">Patterns</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-primary-500">100%</div>
          <div class="text-sm text-neutral-500">Accessible</div>
        </div>
      </div>
    </div>

    <!-- Design System Sections -->
    <div class="space-y-12">
      <div
        v-for="section in sections"
        :key="section.title"
        class="space-y-6"
      >
        <div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            {{ section.title }}
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            {{ section.description }}
          </p>
        </div>

        <BaseGrid
          :cols="{ default: 1, md: 2, lg: 3 }"
          class="gap-4"
        >
          <FeatureCard
            v-for="item in section.items"
            :key="item.name"
            :title="item.name"
            :icon="item.icon"
            icon-color="primary"
            variant="compact"
            class="group hover:shadow-lg transition-all duration-200 cursor-pointer border border-neutral-200 dark:border-neutral-800"
            @click="$router.push(item.href)"
          />
        </BaseGrid>
      </div>
    </div>

    <!-- Getting Started -->
    <div
      class="mt-16 bg-gradient-to-r from-primary-50 to-sky-50 dark:from-primary-950/50 dark:to-sky-950/50 rounded-xl p-8"
    >
      <div class="text-center space-y-4">
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">
          Getting Started
        </h2>
        <p class="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Ready to build with our design system? Start with the foundations and
          work your way up to complex patterns.
        </p>
        <div class="flex justify-center gap-4 mt-6">
          <UButton
            to="/design/principles"
            color="primary"
            size="lg"
            icon="i-tabler-rocket"
          >
            Design Principles
          </UButton>
          <UButton
            to="/design/colors"
            variant="outline"
            color="primary"
            size="lg"
            icon="i-tabler-palette"
          >
            Explore Colors
          </UButton>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
