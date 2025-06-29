<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: "Spacing - Design System",
  description:
    "Spacing scale, padding, margins, and layout guidelines for the RidersDB design system.",
});

// Spacing scale
const spacingScale = [
  { name: "0", value: "0px", rem: "0rem", class: "0" },
  { name: "px", value: "1px", rem: "0.0625rem", class: "px" },
  { name: "0.5", value: "2px", rem: "0.125rem", class: "0.5" },
  { name: "1", value: "4px", rem: "0.25rem", class: "1" },
  { name: "1.5", value: "6px", rem: "0.375rem", class: "1.5" },
  { name: "2", value: "8px", rem: "0.5rem", class: "2" },
  { name: "2.5", value: "10px", rem: "0.625rem", class: "2.5" },
  { name: "3", value: "12px", rem: "0.75rem", class: "3" },
  { name: "3.5", value: "14px", rem: "0.875rem", class: "3.5" },
  { name: "4", value: "16px", rem: "1rem", class: "4" },
  { name: "5", value: "20px", rem: "1.25rem", class: "5" },
  { name: "6", value: "24px", rem: "1.5rem", class: "6" },
  { name: "7", value: "28px", rem: "1.75rem", class: "7" },
  { name: "8", value: "32px", rem: "2rem", class: "8" },
  { name: "9", value: "36px", rem: "2.25rem", class: "9" },
  { name: "10", value: "40px", rem: "2.5rem", class: "10" },
  { name: "11", value: "44px", rem: "2.75rem", class: "11" },
  { name: "12", value: "48px", rem: "3rem", class: "12" },
  { name: "14", value: "56px", rem: "3.5rem", class: "14" },
  { name: "16", value: "64px", rem: "4rem", class: "16" },
  { name: "20", value: "80px", rem: "5rem", class: "20" },
  { name: "24", value: "96px", rem: "6rem", class: "24" },
  { name: "28", value: "112px", rem: "7rem", class: "28" },
  { name: "32", value: "128px", rem: "8rem", class: "32" },
];

// Common spacing patterns
const spacingPatterns = [
  {
    category: "Component Spacing",
    description: "Standard spacing within components",
    patterns: [
      {
        name: "Button padding",
        spacing: "px-4 py-2",
        pixels: "16px 8px",
        usage: "Standard button padding",
      },
      {
        name: "Card padding",
        spacing: "p-6",
        pixels: "24px",
        usage: "Card content padding",
      },
      {
        name: "Form field gap",
        spacing: "space-y-4",
        pixels: "16px",
        usage: "Between form fields",
      },
      {
        name: "Icon-to-text",
        spacing: "gap-2",
        pixels: "8px",
        usage: "Icon next to text",
      },
    ],
  },
  {
    category: "Layout Spacing",
    description: "Spacing for layout and structure",
    patterns: [
      {
        name: "Section spacing",
        spacing: "space-y-12",
        pixels: "48px",
        usage: "Between major sections",
      },
      {
        name: "Container padding",
        spacing: "px-4 md:px-6",
        pixels: "16px/24px",
        usage: "Page container padding",
      },
      {
        name: "Grid gaps",
        spacing: "gap-6",
        pixels: "24px",
        usage: "Grid item spacing",
      },
      {
        name: "Page margins",
        spacing: "my-8",
        pixels: "32px",
        usage: "Page top/bottom margins",
      },
    ],
  },
  {
    category: "Content Spacing",
    description: "Spacing for text and content",
    patterns: [
      {
        name: "Paragraph spacing",
        spacing: "space-y-4",
        pixels: "16px",
        usage: "Between paragraphs",
      },
      {
        name: "Heading margins",
        spacing: "mb-2",
        pixels: "8px",
        usage: "Heading to content",
      },
      {
        name: "List item spacing",
        spacing: "space-y-2",
        pixels: "8px",
        usage: "Between list items",
      },
      {
        name: "Content blocks",
        spacing: "space-y-6",
        pixels: "24px",
        usage: "Between content blocks",
      },
    ],
  },
];

// Responsive spacing
const responsiveSpacing = [
  {
    breakpoint: "Mobile (< 640px)",
    guidelines: [
      "Use smaller spacing values (2-4)",
      "Reduce container padding",
      "Tighter component spacing",
      "Minimum 16px touch targets",
    ],
  },
  {
    breakpoint: "Tablet (640px - 1024px)",
    guidelines: [
      "Moderate spacing values (4-8)",
      "Increased container padding",
      "Comfortable touch targets",
      "Balanced visual hierarchy",
    ],
  },
  {
    breakpoint: "Desktop (> 1024px)",
    guidelines: [
      "Generous spacing values (6-12+)",
      "Maximum container padding",
      "Spacious layout",
      "Clear visual separation",
    ],
  },
];

// Accessibility guidelines
const accessibilityGuidelines = [
  {
    title: "Touch Targets",
    description: "Ensure interactive elements are large enough",
    requirements: [
      "Minimum 44px x 44px for touch targets",
      "8px minimum spacing between targets",
      "Larger targets for primary actions",
      "Consider thumb-friendly placement",
    ],
  },
  {
    title: "Visual Hierarchy",
    description: "Use spacing to create clear hierarchy",
    requirements: [
      "More space around important content",
      "Consistent spacing patterns",
      "Logical grouping with white space",
      "Clear section boundaries",
    ],
  },
  {
    title: "Reading Flow",
    description: "Support natural reading patterns",
    requirements: [
      "Comfortable line spacing",
      "Adequate paragraph spacing",
      "Balanced margins and padding",
      "Scannable content structure",
    ],
  },
];
</script>

<template>
  <BasePageWrapper>
    <DesignPageHeader
      title="Spacing"
      description="Spacing scale, padding, margins, and layout guidelines for the RidersDB design system."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Spacing' },
      ]"
      :navigation-items="[]"
    />
    <div class="">
      <DesignPageSection
        id="scale"
        title="Spacing Scale"
        description="A consistent scale based on 4px increments for predictable and harmonious spacing."
      >
        <!-- Spacing Scale Content -->
        <div class="space-y-3">
          <div
            v-for="space in spacingScale"
            :key="space.name"
            class="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg"
          >
            <div class="flex items-center gap-6 flex-1">
              <div class="min-w-16">
                <UBadge
                  variant="soft"
                  color="neutral"
                  class="font-mono"
                >
                  {{ space.name }}
                </UBadge>
              </div>
              <div class="flex items-center gap-4">
                <div
                  class="bg-primary-500 rounded"
                  :style="{ width: space.value, height: '16px' }"
                />
                <div class="text-sm text-neutral-900 dark:text-white">
                  {{ space.value }}
                </div>
              </div>
            </div>
            <div class="text-right text-sm text-neutral-500 space-y-1">
              <div class="font-mono">{{ space.rem }}</div>
              <div class="text-xs">{{ space.class }}</div>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="patterns"
        title="Common Patterns"
        description="Established spacing patterns for consistent implementation across components."
      >
        <!-- Common Patterns Content -->
        <div class="space-y-8">
          <div
            v-for="pattern in spacingPatterns"
            :key="pattern.category"
            class="space-y-4"
          >
            <div>
              <h3
                class="text-lg font-semibold text-neutral-900 dark:text-white"
              >
                {{ pattern.category }}
              </h3>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ pattern.description }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UCard
                v-for="item in pattern.patterns"
                :key="item.name"
                class="border border-neutral-200 dark:border-neutral-800"
              >
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <h4 class="font-medium text-neutral-900 dark:text-white">
                      {{ item.name }}
                    </h4>
                    <UBadge
                      variant="soft"
                      color="primary"
                      class="font-mono text-xs"
                    >
                      {{ item.spacing }}
                    </UBadge>
                  </div>
                  <div class="space-y-2">
                    <div class="text-sm text-neutral-600 dark:text-neutral-400">
                      {{ item.usage }}
                    </div>
                    <div class="text-xs text-neutral-500 font-mono">
                      {{ item.pixels }}
                    </div>
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="examples"
        title="Visual Examples"
        description="See how spacing affects visual hierarchy and readability."
      >
        <!-- Visual Examples Content -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Good Example -->
          <UCard class="border border-green-200 dark:border-green-800">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-check"
                  class="text-green-600 dark:text-green-400"
                />
                <h3 class="font-semibold text-green-900 dark:text-green-100">
                  Good Spacing
                </h3>
              </div>
            </template>
            <div class="space-y-6">
              <div class="space-y-2">
                <h4
                  class="text-lg font-semibold text-neutral-900 dark:text-white"
                >
                  Card Title
                </h4>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  This example shows proper spacing between elements with clear
                  hierarchy and breathing room.
                </p>
              </div>
              <div class="flex gap-3">
                <UButton
                  color="primary"
                  size="sm"
                >
                  Primary
                </UButton>
                <UButton
                  color="neutral"
                  variant="outline"
                  size="sm"
                >
                  Secondary
                </UButton>
              </div>
            </div>
          </UCard>

          <!-- Bad Example -->
          <UCard class="border border-red-200 dark:border-red-800">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-x"
                  class="text-red-600 dark:text-red-400"
                />
                <h3 class="font-semibold text-red-900 dark:text-red-100">
                  Poor Spacing
                </h3>
              </div>
            </template>
            <div class="space-y-1">
              <div class="space-y-0.5">
                <h4
                  class="text-lg font-semibold text-neutral-900 dark:text-white"
                >
                  Card Title
                </h4>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  This example shows cramped spacing that reduces readability
                  and creates visual tension.
                </p>
              </div>
              <div class="flex gap-1">
                <UButton
                  color="primary"
                  size="sm"
                >
                  Primary
                </UButton>
                <UButton
                  color="neutral"
                  variant="outline"
                  size="sm"
                >
                  Secondary
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="responsive"
        title="Responsive Spacing"
        description="Adapt spacing based on screen size and device capabilities."
      >
        <!-- Responsive Spacing Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard
            v-for="responsive in responsiveSpacing"
            :key="responsive.breakpoint"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="space-y-4">
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                {{ responsive.breakpoint }}
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="guideline in responsive.guidelines"
                  :key="guideline"
                  class="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                >
                  <UIcon
                    name="i-tabler-arrow-right"
                    class="text-primary-500 mt-0.5 flex-shrink-0"
                  />
                  {{ guideline }}
                </li>
              </ul>
            </div>
          </UCard>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="accessibility"
        title="Accessibility"
        description="Spacing considerations for accessibility and usability."
      >
        <!-- Accessibility Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard
            v-for="accessibility in accessibilityGuidelines"
            :key="accessibility.title"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-neutral-900 dark:text-white">
                  {{ accessibility.title }}
                </h3>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  {{ accessibility.description }}
                </p>
              </div>
              <ul class="space-y-2">
                <li
                  v-for="requirement in accessibility.requirements"
                  :key="requirement"
                  class="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                >
                  <UIcon
                    name="i-tabler-accessible"
                    class="text-primary-500 mt-0.5 flex-shrink-0"
                  />
                  {{ requirement }}
                </li>
              </ul>
            </div>
          </UCard>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="best-practices"
        title="Best Practices"
        description="Guidelines for effective spacing implementation."
      >
        <!-- Best Practices Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard
            class="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-check"
                  class="text-green-600 dark:text-green-400"
                />
                <h3 class="font-semibold text-green-900 dark:text-green-100">
                  Do
                </h3>
              </div>
            </template>
            <ul class="space-y-2 text-sm text-green-800 dark:text-green-200">
              <li>• Use consistent spacing values from the scale</li>
              <li>• Create visual hierarchy with spacing</li>
              <li>• Group related elements with proximity</li>
              <li>• Test spacing on different screen sizes</li>
              <li>• Consider touch target sizes on mobile</li>
              <li>• Use white space to improve readability</li>
            </ul>
          </UCard>

          <UCard
            class="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-x"
                  class="text-red-600 dark:text-red-400"
                />
                <h3 class="font-semibold text-red-900 dark:text-red-100">
                  Don't
                </h3>
              </div>
            </template>
            <ul class="space-y-2 text-sm text-red-800 dark:text-red-200">
              <li>• Use arbitrary spacing values</li>
              <li>• Cram too much content together</li>
              <li>• Ignore responsive spacing needs</li>
              <li>• Create inconsistent spacing patterns</li>
              <li>• Forget about touch target requirements</li>
              <li>• Over-space content that should be grouped</li>
            </ul>
          </UCard>
        </div>
      </DesignPageSection>
    </div>
  </BasePageWrapper>
</template>
