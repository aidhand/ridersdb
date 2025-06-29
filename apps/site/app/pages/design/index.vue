<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: "Design System - RidersDB",
  description:
    "Complete design system documentation for RidersDB, including colors, typography, components, and guidelines.",
});

const sections = [
  {
    title: "Foundation",
    description: "Core design principles and foundation elements",
    items: [
      { name: "Colors", href: "/design/colors", icon: "i-tabler-color-swatch" },
      {
        name: "Typography",
        href: "/design/typography",
        icon: "i-tabler-typography",
      },
      { name: "Spacing", href: "/design/spacing", icon: "i-tabler-box-margin" },
      { name: "Layout", href: "/design/layout", icon: "i-tabler-layout-2" },
    ],
  },
  {
    title: "Components",
    description: "Reusable UI components and patterns",
    items: [
      { name: "Buttons", href: "/design/buttons", icon: "i-tabler-click" },
      { name: "Forms", href: "/design/forms", icon: "i-tabler-forms" },
      { name: "Cards", href: "/design/cards", icon: "i-tabler-cards" },
      {
        name: "Navigation",
        href: "/design/navigation",
        icon: "i-tabler-menu-2",
      },
      { name: "States", href: "/design/states", icon: "i-tabler-loader" },
    ],
  },
  {
    title: "Patterns",
    description: "Complex UI patterns and interactions",
    items: [
      {
        name: "Data Display",
        href: "/design/data-display",
        icon: "i-tabler-table",
      },
      { name: "Motion", href: "/design/motion", icon: "i-tabler-ripple" },
      {
        name: "Accessibility",
        href: "/design/accessibility",
        icon: "i-tabler-accessible",
      },
    ],
  },
  {
    title: "Guidelines",
    description: "Usage guidelines and best practices",
    items: [
      { name: "Principles", href: "/design/principles", icon: "i-tabler-bulb" },
      {
        name: "Voice & Tone",
        href: "/design/voice-tone",
        icon: "i-tabler-message-circle",
      },
      {
        name: "Content Strategy",
        href: "/design/content",
        icon: "i-tabler-file-text",
      },
    ],
  },
];
</script>

<template>
  <BasePageWrapper>
    <LayoutHeaderNav
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
      ]"
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
          <div class="text-2xl font-bold text-primary-500">12</div>
          <div class="text-sm text-neutral-500">Components</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-primary-500">8</div>
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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UCard
            v-for="item in section.items"
            :key="item.name"
            class="group hover:shadow-lg transition-all duration-200 cursor-pointer border border-neutral-200 dark:border-neutral-800"
            @click="$router.push(item.href)"
          >
            <div class="flex items-center gap-4">
              <div
                class="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors"
              >
                <UIcon
                  :name="item.icon"
                  class="text-xl text-primary-600 dark:text-primary-400"
                />
              </div>
              <div>
                <h3
                  class="font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                >
                  {{ item.name }}
                </h3>
              </div>
            </div>
          </UCard>
        </div>
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
  </BasePageWrapper>
</template>
