<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: "Colors - Design System",
  description:
    "Color palette, usage guidelines, and accessibility standards for the RidersDB design system.",
});

// Primary color palette
const primaryColors = [
  { name: "Sky 50", value: "#f0f9ff", hex: "#f0f9ff", css: "sky-50" },
  { name: "Sky 100", value: "#e0f2fe", hex: "#e0f2fe", css: "sky-100" },
  { name: "Sky 200", value: "#bae6fd", hex: "#bae6fd", css: "sky-200" },
  { name: "Sky 300", value: "#7dd3fc", hex: "#7dd3fc", css: "sky-300" },
  { name: "Sky 400", value: "#38bdf8", hex: "#38bdf8", css: "sky-400" },
  { name: "Sky 500", value: "#0ea5e9", hex: "#0ea5e9", css: "sky-500" },
  { name: "Sky 600", value: "#0284c7", hex: "#0284c7", css: "sky-600" },
  { name: "Sky 700", value: "#0369a1", hex: "#0369a1", css: "sky-700" },
  { name: "Sky 800", value: "#075985", hex: "#075985", css: "sky-800" },
  { name: "Sky 900", value: "#0c4a6e", hex: "#0c4a6e", css: "sky-900" },
  { name: "Sky 950", value: "#082f49", hex: "#082f49", css: "sky-950" },
];

// Neutral color palette
const neutralColors = [
  { name: "Neutral 50", value: "#fafafa", hex: "#fafafa", css: "neutral-50" },
  { name: "Neutral 100", value: "#f4f4f5", hex: "#f4f4f5", css: "neutral-100" },
  { name: "Neutral 200", value: "#e4e4e7", hex: "#e4e4e7", css: "neutral-200" },
  { name: "Neutral 300", value: "#d4d4d8", hex: "#d4d4d8", css: "neutral-300" },
  { name: "Neutral 400", value: "#a1a1aa", hex: "#a1a1aa", css: "neutral-400" },
  { name: "Neutral 500", value: "#71717a", hex: "#71717a", css: "neutral-500" },
  { name: "Neutral 600", value: "#52525b", hex: "#52525b", css: "neutral-600" },
  { name: "Neutral 700", value: "#3f3f46", hex: "#3f3f46", css: "neutral-700" },
  { name: "Neutral 800", value: "#27272a", hex: "#27272a", css: "neutral-800" },
  { name: "Neutral 900", value: "#18181b", hex: "#18181b", css: "neutral-900" },
  { name: "Neutral 950", value: "#09090b", hex: "#09090b", css: "neutral-950" },
];

// Semantic colors
const semanticColors = [
  {
    name: "Success",
    colors: ["#dcfce7", "#16a34a", "#15803d"],
    usage: "Confirmations, success states, completed actions",
  },
  {
    name: "Warning",
    colors: ["#fef3c7", "#d97706", "#b45309"],
    usage: "General warnings, alerts, attention needed",
  },
  {
    name: "Caution",
    colors: ["#fef7cd", "#eab308", "#ca8a04"],
    usage: "Important notices, proceed with care, intermediate warnings",
  },
  {
    name: "Error",
    colors: ["#fee2e2", "#dc2626", "#b91c1c"],
    usage: "Errors, destructive actions, critical failures",
  },
  {
    name: "Info",
    colors: ["#dbeafe", "#2563eb", "#1d4ed8"],
    usage: "Information, help, neutral notifications",
  },
];

// Brand colors for integrations
const brandColors = [
  { name: "Spotify", primary: "#1db954", usage: "Spotify integration" },
  { name: "Twitter", primary: "#1da1f2", usage: "Twitter integration" },
];

// Color usage examples
const usageExamples = [
  {
    category: "Backgrounds",
    examples: [
      {
        name: "Page Background",
        light: "white",
        dark: "neutral-950",
        description: "Main page background",
      },
      {
        name: "Card Background",
        light: "white",
        dark: "neutral-900",
        description: "Card and panel backgrounds",
      },
      {
        name: "Hover Background",
        light: "neutral-50",
        dark: "neutral-800",
        description: "Interactive hover states",
      },
    ],
  },
  {
    category: "Typography",
    examples: [
      {
        name: "Primary Text",
        light: "neutral-900",
        dark: "white",
        description: "Headers, important text",
      },
      {
        name: "Secondary Text",
        light: "neutral-600",
        dark: "neutral-400",
        description: "Supporting text, descriptions",
      },
      {
        name: "Muted Text",
        light: "neutral-500",
        dark: "neutral-500",
        description: "Placeholder text, captions",
      },
    ],
  },
  {
    category: "Borders",
    examples: [
      {
        name: "Default Border",
        light: "neutral-200",
        dark: "neutral-800",
        description: "Standard borders",
      },
      {
        name: "Subtle Border",
        light: "neutral-100",
        dark: "neutral-900",
        description: "Light separation",
      },
      {
        name: "Focus Border",
        light: "sky-500",
        dark: "sky-400",
        description: "Focus states",
      },
    ],
  },
];

// Accessibility guidelines
const accessibilityGuidelines = [
  {
    title: "Contrast Ratios",
    description: "All color combinations meet WCAG 2.1 AA standards",
    details: [
      "Normal text: minimum 4.5:1 contrast ratio",
      "Large text (18pt+): minimum 3:1 contrast ratio",
      "Interactive elements: minimum 4.5:1 contrast ratio",
    ],
  },
  {
    title: "Color Blindness",
    description:
      "Colors are accessible to users with color vision deficiencies",
    details: [
      "Never rely on color alone to convey information",
      "Use additional visual cues (icons, patterns, text)",
      "Test with color blindness simulators",
    ],
  },
];

// Typography navigation items with icons
const navigationItems = [
  { label: "Primary Colors", hash: "#primary", icon: "i-tabler-palette" },
  { label: "Neutral Colors", hash: "#neutral", icon: "i-tabler-circle" },
  {
    label: "Semantic Colors",
    hash: "#semantic",
    icon: "i-tabler-alert-circle",
  },
  { label: "Brand Colors", hash: "#brand", icon: "i-tabler-brand-abstract" },
  { label: "Usage Guidelines", hash: "#usage", icon: "i-tabler-list-check" },
  {
    label: "Accessibility",
    hash: "#accessibility",
    icon: "i-tabler-accessible",
  },
  { label: "Examples", hash: "#examples", icon: "i-tabler-code" },
];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  // Could add toast notification here
};
</script>

<template>
  <BasePageWrapper>
    <DesignPageHeader
      title="Colors"
      description="Our color system is built for consistency, accessibility, and flexibility. Each color serves a specific purpose and follows strict contrast guidelines."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Colors' },
      ]"
      :navigation-items="navigationItems"
    />
    <div class="">
      <!-- Primary Colors -->
      <DesignPageSection
        id="primary"
        title="Primary Colors"
        description="Sky is our primary color, used for branding, primary actions, and key interactive elements."
      >
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-2"
        >
          <div
            v-for="color in primaryColors"
            :key="color.name"
            class="group cursor-pointer"
            @click="copyToClipboard(color.hex)"
          >
            <div
              class="w-full h-16 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm group-hover:scale-105 transition-transform"
              :style="{ backgroundColor: color.value }"
            />
            <div class="mt-2 text-center">
              <div class="text-xs font-medium text-neutral-900 dark:text-white">
                {{ color.css }}
              </div>
              <div class="text-xs text-neutral-500 font-mono">
                {{ color.hex }}
              </div>
            </div>
          </div>
        </div>
      </DesignPageSection>
      <!-- Neutral Colors -->
      <DesignPageSection
        id="neutral"
        title="Neutral Colors"
        description="Our neutral color palette for backgrounds, text, and subtle UI elements."
      >
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-2"
        >
          <div
            v-for="color in neutralColors"
            :key="color.name"
            class="group cursor-pointer"
            @click="copyToClipboard(color.hex)"
          >
            <div
              class="w-full h-16 rounded-lg border shadow-sm group-hover:scale-105 transition-transform"
              :class="
                color.css === 'neutral-50' ?
                  'border-neutral-300'
                : 'border-neutral-200 dark:border-neutral-800'
              "
              :style="{ backgroundColor: color.value }"
            />
            <div class="mt-2 text-center">
              <div class="text-xs font-medium text-neutral-900 dark:text-white">
                {{ color.css }}
              </div>
              <div class="text-xs text-neutral-500 font-mono">
                {{ color.hex }}
              </div>
            </div>
          </div>
        </div>
      </DesignPageSection>
      <!-- Semantic Colors -->
      <DesignPageSection
        id="semantic"
        title="Semantic Colors"
        description="Colors that convey meaning and state across the interface."
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard
            v-for="semantic in semanticColors"
            :key="semantic.name"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-neutral-900 dark:text-white">
                  {{ semantic.name }}
                </h3>
                <div class="flex gap-1">
                  <div
                    v-for="(color, idx) in semantic.colors"
                    :key="idx"
                    class="w-6 h-6 rounded border border-neutral-200 dark:border-neutral-800"
                    :style="{ backgroundColor: color }"
                  />
                </div>
              </div>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ semantic.usage }}
              </p>
            </div>
          </UCard>
        </div>
      </DesignPageSection>
      <!-- Brand Colors -->
      <DesignPageSection
        id="brand"
        title="Brand Colors"
        description="Official brand colors for third-party integrations."
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <UCard
            v-for="brand in brandColors"
            :key="brand.name"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-lg border border-neutral-200 dark:border-neutral-800"
                :style="{ backgroundColor: brand.primary }"
              />
              <div class="flex-1">
                <h3 class="font-semibold text-neutral-900 dark:text-white">
                  {{ brand.name }}
                </h3>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  {{ brand.usage }}
                </p>
                <p class="text-xs font-mono text-neutral-500 mt-1">
                  {{ brand.primary }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </DesignPageSection>
      <!-- Usage Guidelines -->
      <DesignPageSection
        id="usage"
        title="Usage Guidelines"
        description="How to apply colors consistently across different contexts."
      >
        <div class="space-y-8">
          <div
            v-for="usage in usageExamples"
            :key="usage.category"
            class="space-y-4"
          >
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
              {{ usage.category }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UCard
                v-for="example in usage.examples"
                :key="example.name"
                class="border border-neutral-200 dark:border-neutral-800"
              >
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <h4 class="font-medium text-neutral-900 dark:text-white">
                      {{ example.name }}
                    </h4>
                    <div class="flex gap-1">
                      <div
                        class="w-4 h-4 rounded border border-neutral-300"
                        :class="`bg-${example.light}`"
                        title="Light mode"
                      />
                      <div
                        class="w-4 h-4 rounded border border-neutral-600"
                        :class="`bg-${example.dark}`"
                        title="Dark mode"
                      />
                    </div>
                  </div>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ example.description }}
                  </p>
                  <div class="flex gap-2 text-xs font-mono">
                    <UBadge
                      variant="soft"
                      color="neutral"
                      >{{ example.light }}</UBadge
                    >
                    <UBadge
                      variant="soft"
                      color="neutral"
                      >{{ example.dark }}</UBadge
                    >
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <!-- Accessibility -->
      <DesignPageSection
        id="accessibility"
        title="Accessibility"
        description="Our color system is designed with accessibility as a core principle."
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard
            v-for="guideline in accessibilityGuidelines"
            :key="guideline.title"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="flex items-start">
              <div
                :class="[
                  'p-4 rounded-lg mr-6 flex-shrink-0 w-16 h-16 flex items-center justify-center',
                  guideline.title === 'Contrast Ratios' ?
                    'bg-blue-100 dark:bg-blue-900'
                  : 'bg-green-100 dark:bg-green-900',
                ]"
              >
                <Icon
                  :name="
                    guideline.title === 'Contrast Ratios' ?
                      'i-tabler-contrast'
                    : 'i-tabler-eye'
                  "
                  :class="[
                    'w-8 h-8',
                    guideline.title === 'Contrast Ratios' ?
                      'text-blue-600 dark:text-blue-400'
                    : 'text-green-600 dark:text-green-400',
                  ]"
                />
              </div>
              <div class="space-y-4">
                <div>
                  <h3
                    class="text-xl font-semibold text-neutral-900 dark:text-white mb-2"
                  >
                    {{ guideline.title }}
                  </h3>
                  <p class="text-lg text-neutral-600 dark:text-neutral-300">
                    {{ guideline.description }}
                  </p>
                </div>
                <ul class="space-y-2">
                  <li
                    v-for="detail in guideline.details"
                    :key="detail"
                    class="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                  >
                    <UIcon
                      name="i-tabler-check"
                      class="text-success-500 mt-0.5 flex-shrink-0"
                    />
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </div>
          </UCard>
        </div>
      </DesignPageSection>

      <!-- Code Examples -->
      <DesignPageSection
        id="examples"
        title="Code Examples"
        description="How to use colors in your code with Tailwind CSS classes."
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Background Colors
              </h3>
            </template>
            <pre
              class="text-sm text-neutral-700 dark:text-neutral-300 overflow-x-auto"
            ><code><!-- Primary backgrounds -->
&lt;div class="bg-sky-500"&gt;...&lt;/div&gt;
&lt;div class="bg-sky-50 dark:bg-sky-950"&gt;...&lt;/div&gt;

<!-- Neutral backgrounds -->
&lt;div class="bg-white dark:bg-neutral-900"&gt;...&lt;/div&gt;
&lt;div class="bg-neutral-50 dark:bg-neutral-800"&gt;...&lt;/div&gt;</code></pre>
          </UCard>

          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Text Colors
              </h3>
            </template>
            <pre
              class="text-sm text-neutral-700 dark:text-neutral-300 overflow-x-auto"
            ><code><!-- Primary text -->
&lt;h1 class="text-neutral-900 dark:text-white"&gt;...&lt;/h1&gt;

<!-- Secondary text -->
&lt;p class="text-neutral-600 dark:text-neutral-400"&gt;...&lt;/p&gt;

<!-- Accent text -->
&lt;span class="text-sky-600 dark:text-sky-400"&gt;...&lt;/span&gt;</code></pre>
          </UCard>
        </div>
      </DesignPageSection>
    </div>
  </BasePageWrapper>
</template>
