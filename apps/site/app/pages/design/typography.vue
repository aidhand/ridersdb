<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: "Typography - Design System",
  description:
    "Typography scale, font families, and text styling guidelines for the RidersDB design system.",
});

// Font stacks
const fontStacks = [
  {
    name: "Sans-serif (Primary)",
    family: "Inter",
    stack: "Inter, system-ui, -apple-system, sans-serif",
    usage: "All UI text, headings, and body copy",
    weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    name: "Mono (Code)",
    family: "System Mono",
    stack:
      "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, monospace",
    usage: "Code blocks, technical content, data display",
    weights: ["400", "600", "700"],
  },
];

// Type scale
const typeScale = [
  { name: "text-xs", size: "0.75rem", lineHeight: "1rem", pixels: "12px" },
  { name: "text-sm", size: "0.875rem", lineHeight: "1.25rem", pixels: "14px" },
  { name: "text-base", size: "1rem", lineHeight: "1.5rem", pixels: "16px" },
  { name: "text-lg", size: "1.125rem", lineHeight: "1.75rem", pixels: "18px" },
  { name: "text-xl", size: "1.25rem", lineHeight: "1.75rem", pixels: "20px" },
  { name: "text-2xl", size: "1.5rem", lineHeight: "2rem", pixels: "24px" },
  { name: "text-3xl", size: "1.875rem", lineHeight: "2.25rem", pixels: "30px" },
  { name: "text-4xl", size: "2.25rem", lineHeight: "2.5rem", pixels: "36px" },
  { name: "text-5xl", size: "3rem", lineHeight: "1", pixels: "48px" },
  { name: "text-6xl", size: "3.75rem", lineHeight: "1", pixels: "60px" },
  { name: "text-7xl", size: "4.5rem", lineHeight: "1", pixels: "72px" },
  { name: "text-8xl", size: "6rem", lineHeight: "1", pixels: "96px" },
  { name: "text-9xl", size: "8rem", lineHeight: "1", pixels: "128px" },
];

// Font weights
const fontWeights = [
  { name: "font-thin", weight: "100", usage: "Rarely used, decorative only" },
  {
    name: "font-extralight",
    weight: "200",
    usage: "Very light text, large displays",
  },
  { name: "font-light", weight: "300", usage: "Light text, secondary content" },
  { name: "font-normal", weight: "400", usage: "Body text, default weight" },
  { name: "font-medium", weight: "500", usage: "Emphasis, important text" },
  { name: "font-semibold", weight: "600", usage: "Subheadings, card titles" },
  { name: "font-bold", weight: "700", usage: "Main headings, strong emphasis" },
  { name: "font-extrabold", weight: "800", usage: "Major headings, hero text" },
  { name: "font-black", weight: "900", usage: "Display text, maximum impact" },
];

// Usage guidelines
const usageGuidelines = [
  {
    category: "Headings",
    guidelines: [
      {
        element: "h1",
        classes: "text-4xl font-bold",
        usage: "Page titles, main headings",
      },
      {
        element: "h2",
        classes: "text-3xl font-bold",
        usage: "Section headings",
      },
      {
        element: "h3",
        classes: "text-2xl font-semibold",
        usage: "Subsection headings",
      },
      {
        element: "h4",
        classes: "text-xl font-semibold",
        usage: "Component headings",
      },
      {
        element: "h5",
        classes: "text-lg font-medium",
        usage: "Small headings",
      },
      {
        element: "h6",
        classes: "text-base font-medium",
        usage: "Minimal headings",
      },
    ],
  },
  {
    category: "Body Text",
    guidelines: [
      {
        element: "p",
        classes: "text-base font-normal",
        usage: "Default paragraph text",
      },
      {
        element: "small",
        classes: "text-sm font-normal",
        usage: "Fine print, captions",
      },
      {
        element: "lead",
        classes: "text-lg font-normal",
        usage: "Introduction text, standout paragraphs",
      },
    ],
  },
  {
    category: "Interactive",
    guidelines: [
      {
        element: "button",
        classes: "text-sm font-medium",
        usage: "Button labels",
      },
      {
        element: "link",
        classes: "text-base font-medium",
        usage: "Text links",
      },
      {
        element: "nav",
        classes: "text-sm font-medium",
        usage: "Navigation items",
      },
    ],
  },
  {
    category: "Data Display",
    guidelines: [
      { element: "code", classes: "text-sm font-mono", usage: "Inline code" },
      { element: "pre", classes: "text-sm font-mono", usage: "Code blocks" },
      {
        element: "table",
        classes: "text-sm font-normal",
        usage: "Table content",
      },
    ],
  },
];

// Line height guidelines
const lineHeights = [
  { name: "leading-none", value: "1", usage: "Tight headings" },
  { name: "leading-tight", value: "1.25", usage: "Compact text" },
  { name: "leading-snug", value: "1.375", usage: "Slightly loose" },
  { name: "leading-normal", value: "1.5", usage: "Default body text" },
  { name: "leading-relaxed", value: "1.625", usage: "Comfortable reading" },
  { name: "leading-loose", value: "2", usage: "Very spacious text" },
];

// Letter spacing
const letterSpacing = [
  {
    name: "tracking-tighter",
    value: "-0.05em",
    usage: "Very tight, large headings",
  },
  {
    name: "tracking-tight",
    value: "-0.025em",
    usage: "Headings, compact text",
  },
  { name: "tracking-normal", value: "0em", usage: "Default body text" },
  { name: "tracking-wide", value: "0.025em", usage: "Button text, labels" },
  { name: "tracking-wider", value: "0.05em", usage: "Spacious headers" },
  { name: "tracking-widest", value: "0.1em", usage: "Very spacious, all caps" },
];

// Typography navigation items with icons
const navigationItems = [
  { label: "Font Families", hash: "#fonts", icon: "i-lucide-type" },
  { label: "Type Scale", hash: "#scale", icon: "i-lucide-scaling" },
  { label: "Font Weights", hash: "#weights", icon: "i-lucide-bold" },
  {
    label: "Line Height",
    hash: "#line-height",
    icon: "i-lucide-align-vertical-space-around",
  },
  { label: "Letter Spacing", hash: "#spacing", icon: "i-lucide-space" },
  { label: "Code Examples", hash: "#examples", icon: "i-lucide-code" },
  {
    label: "Best Practices",
    hash: "#practices",
    icon: "i-lucide-check-circle",
  },
];
</script>

<template>
  <BasePageWrapper>
    <!-- Page Header -->
    <DesignPageHeader
      title="Typography"
      description="Our typography system creates hierarchy, improves readability, and maintains consistency across all interfaces."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Typography' },
      ]"
      :navigation-items="navigationItems"
    >
    </DesignPageHeader>

    <div class="">
      <!-- Font Families -->
      <DesignPageSection
        id="fonts"
        title="Font Families"
        description="We use system fonts to ensure optimal performance and consistency across platforms."
      >
        <div class="space-y-6">
          <UCard
            v-for="font in fontStacks"
            :key="font.name"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="space-y-4">
              <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <h3
                    class="text-lg font-semibold text-neutral-900 dark:text-white"
                  >
                    {{ font.name }}
                  </h3>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ font.usage }}
                  </p>
                </div>
                <UBadge
                  variant="soft"
                  color="neutral"
                  class="font-mono"
                >
                  {{ font.family }}
                </UBadge>
              </div>

              <div class="space-y-3">
                <div
                  class="text-2xl"
                  :style="{ fontFamily: font.stack }"
                >
                  The quick brown fox jumps over the lazy dog
                </div>
                <div
                  class="text-sm text-neutral-500 font-mono bg-neutral-50 dark:bg-neutral-900 p-3 rounded"
                >
                  font-family: {{ font.stack }}
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="weight in font.weights"
                  :key="weight"
                  variant="soft"
                  color="primary"
                  :style="{ fontFamily: font.stack, fontWeight: weight }"
                >
                  {{ weight }}
                </UBadge>
              </div>
            </div>
          </UCard>
        </div>
      </DesignPageSection>
      <!-- Type Scale -->
      <DesignPageSection
        id="scale"
        title="Type Scale"
        description="A harmonious scale that provides appropriate sizing for all content types."
      >
        <div class="space-y-4">
          <div
            v-for="scale in typeScale"
            :key="scale.name"
            class="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg"
          >
            <div class="flex items-center gap-6 flex-1">
              <div class="min-w-20">
                <UBadge
                  variant="soft"
                  color="neutral"
                  class="font-mono"
                >
                  {{ scale.name }}
                </UBadge>
              </div>
              <div
                :class="scale.name"
                class="text-neutral-900 dark:text-white"
              >
                Sample text
              </div>
            </div>
            <div class="text-right text-sm text-neutral-500 space-y-1">
              <div class="font-mono">
                {{ scale.size }} / {{ scale.lineHeight }}
              </div>
              <div class="text-xs">{{ scale.pixels }}</div>
            </div>
          </div>
        </div>
      </DesignPageSection>
      <!-- Font Weights -->
      <DesignPageSection
        id="weights"
        title="Font Weights"
        description="Strategic use of font weights creates visual hierarchy and emphasis."
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UCard
            v-for="weight in fontWeights"
            :key="weight.name"
            class="border border-neutral-200 dark:border-neutral-800 text-center"
          >
            <div class="space-y-3">
              <div
                :class="weight.name"
                class="text-2xl text-neutral-900 dark:text-white"
              >
                Aa
              </div>
              <div>
                <UBadge
                  variant="soft"
                  color="neutral"
                  class="font-mono"
                >
                  {{ weight.name }}
                </UBadge>
                <div class="text-xs text-neutral-500 mt-1">
                  {{ weight.weight }}
                </div>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">
                {{ weight.usage }}
              </p>
            </div>
          </UCard>
        </div>
      </DesignPageSection>

      <!-- Usage Guidelines -->
      <section class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Usage Guidelines
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            Consistent application of typography across different contexts and
            components.
          </p>
        </div>

        <div class="space-y-8">
          <div
            v-for="category in usageGuidelines"
            :key="category.category"
            class="space-y-4"
          >
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
              {{ category.category }}
            </h3>

            <div class="space-y-3">
              <div
                v-for="guideline in category.guidelines"
                :key="guideline.element"
                class="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg"
              >
                <div class="flex items-center gap-6 flex-1">
                  <UBadge
                    variant="soft"
                    color="primary"
                  >
                    {{ guideline.element }}
                  </UBadge>
                  <div
                    :class="guideline.classes"
                    class="text-neutral-900 dark:text-white"
                  >
                    Sample {{ guideline.element }} text
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-mono text-neutral-500">
                    {{ guideline.classes }}
                  </div>
                  <div class="text-xs text-neutral-400">
                    {{ guideline.usage }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Line Height -->
      <section
        id="line-height"
        class="space-y-6"
      >
        <div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Line Height
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            Proper line height improves readability and visual rhythm.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard
            v-for="leading in lineHeights"
            :key="leading.name"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <UBadge
                  variant="soft"
                  color="neutral"
                  class="font-mono"
                >
                  {{ leading.name }}
                </UBadge>
                <span class="text-sm text-neutral-500">{{
                  leading.value
                }}</span>
              </div>
              <div
                :class="leading.name"
                class="text-sm text-neutral-900 dark:text-white"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">
                {{ leading.usage }}
              </p>
            </div>
          </UCard>
        </div>
      </section>
      <!-- Letter Spacing -->
      <section
        id="spacing"
        class="space-y-6"
      >
        <div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Letter Spacing
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            Subtle adjustments to letter spacing enhance readability and style.
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="tracking in letterSpacing"
            :key="tracking.name"
            class="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg"
          >
            <div class="flex items-center gap-6 flex-1">
              <div class="min-w-32">
                <UBadge
                  variant="soft"
                  color="neutral"
                  class="font-mono"
                >
                  {{ tracking.name }}
                </UBadge>
              </div>
              <div
                :class="tracking.name"
                class="text-lg text-neutral-900 dark:text-white"
              >
                SAMPLE TEXT
              </div>
            </div>
            <div class="text-right text-sm text-neutral-500">
              <div class="font-mono">{{ tracking.value }}</div>
              <div class="text-xs">{{ tracking.usage }}</div>
            </div>
          </div>
        </div>
      </section>
      <!-- Code Examples -->
      <section
        id="examples"
        class="space-y-6"
      >
        <div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Code Examples
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            Common typography patterns and how to implement them.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Page Headers
              </h3>
            </template>
            <div class="space-y-4">
              <div class="space-y-2">
                <h1 class="text-4xl font-bold text-neutral-900 dark:text-white">
                  Page Title
                </h1>
                <p class="text-xl text-neutral-600 dark:text-neutral-400">
                  Supporting description text
                </p>
              </div>
              <pre
                class="text-sm bg-neutral-50 dark:bg-neutral-900 p-3 rounded overflow-x-auto"
              ><code>&lt;h1 class="text-4xl font-bold text-neutral-900 dark:text-white"&gt;
  Page Title
&lt;/h1&gt;
&lt;p class="text-xl text-neutral-600 dark:text-neutral-400"&gt;
  Supporting description text
&lt;/p&gt;</code></pre>
            </div>
          </UCard>

          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Content Hierarchy
              </h3>
            </template>
            <div class="space-y-4">
              <div class="space-y-3">
                <h2
                  class="text-2xl font-semibold text-neutral-900 dark:text-white"
                >
                  Section Title
                </h2>
                <h3
                  class="text-lg font-medium text-neutral-900 dark:text-white"
                >
                  Subsection
                </h3>
                <p class="text-base text-neutral-600 dark:text-neutral-400">
                  Body paragraph text with proper hierarchy.
                </p>
              </div>
              <pre
                class="text-sm bg-neutral-50 dark:bg-neutral-900 p-3 rounded overflow-x-auto"
              ><code>&lt;h2 class="text-2xl font-semibold"&gt;Section Title&lt;/h2&gt;
&lt;h3 class="text-lg font-medium"&gt;Subsection&lt;/h3&gt;
&lt;p class="text-base text-neutral-600"&gt;Body text&lt;/p&gt;</code></pre>
            </div>
          </UCard>
        </div>
      </section>
      <!-- Best Practices -->
      <section
        id="practices"
        class="space-y-6"
      >
        <div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Best Practices
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            Guidelines for effective typography implementation.
          </p>
        </div>

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
              <li>• Use consistent font weights for similar content types</li>
              <li>• Maintain proper contrast ratios for accessibility</li>
              <li>• Establish clear hierarchy with size and weight</li>
              <li>• Test readability across different screen sizes</li>
              <li>• Use line height appropriate for text size</li>
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
              <li>• Mix too many font weights in one interface</li>
              <li>• Use decorative fonts for body text</li>
              <li>
                • Create insufficient contrast between text and background
              </li>
              <li>• Make line heights too tight for readability</li>
              <li>• Overuse letter spacing adjustments</li>
            </ul>
          </UCard>
        </div>
      </section>
    </div>
  </BasePageWrapper>
</template>
