<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: "Buttons - Design System",
  description:
    "Button components, variants, states, and usage guidelines for the RidersDB design system.",
});

// Button variants
const buttonVariants = [
  {
    name: "solid",
    description: "Primary actions, high emphasis",
    example: "Save Changes",
  },
  {
    name: "outline",
    description: "Secondary actions, medium emphasis",
    example: "Cancel",
  },
  {
    name: "ghost",
    description: "Tertiary actions, low emphasis",
    example: "View Details",
  },
  {
    name: "soft",
    description: "Subtle actions, minimal emphasis",
    example: "Learn More",
  },
];

// Button colors
const buttonColors = [
  { name: "primary", color: "sky", description: "Main actions, confirmations" },
  {
    name: "neutral",
    color: "zinc",
    description: "General actions, navigation",
  },
  {
    name: "success",
    color: "green",
    description: "Positive actions, success states",
  },
  {
    name: "warning",
    color: "yellow",
    description: "Caution actions, warnings",
  },
  { name: "error", color: "red", description: "Destructive actions, errors" },
];

// Button sizes
const buttonSizes = [
  {
    name: "xs",
    description: "Compact spaces, dense interfaces",
    padding: "px-2 py-1",
    text: "text-xs",
  },
  {
    name: "sm",
    description: "Secondary buttons, tight layouts",
    padding: "px-3 py-1.5",
    text: "text-sm",
  },
  {
    name: "md",
    description: "Standard size, most common",
    padding: "px-4 py-2",
    text: "text-sm",
  },
  {
    name: "lg",
    description: "Primary buttons, call-to-actions",
    padding: "px-6 py-3",
    text: "text-base",
  },
  {
    name: "xl",
    description: "Hero sections, landing pages",
    padding: "px-8 py-4",
    text: "text-lg",
  },
];

// Button states
const _buttonStates = [
  { name: "default", description: "Normal interactive state" },
  { name: "hover", description: "Mouse over interaction" },
  { name: "focus", description: "Keyboard focus state" },
  { name: "active", description: "Pressed/clicked state" },
  { name: "disabled", description: "Non-interactive state" },
  { name: "loading", description: "Processing state" },
];

// Icon usage
const _iconUsage = [
  {
    position: "leading",
    description: "Icon before text",
    example: "Save Document",
  },
  {
    position: "trailing",
    description: "Icon after text",
    example: "External Link",
  },
  { position: "only", description: "Icon without text", example: "Close" },
];

// Usage guidelines
const usageGuidelines = [
  {
    title: "Hierarchy",
    description: "Use button variants to create clear visual hierarchy",
    guidelines: [
      "Primary action: solid variant",
      "Secondary action: outline variant",
      "Tertiary action: ghost variant",
      "Subtle action: soft variant",
    ],
  },
  {
    title: "Placement",
    description: "Strategic button placement improves user experience",
    guidelines: [
      "Place primary actions prominently",
      "Group related actions together",
      "Use consistent spacing between buttons",
      "Align buttons to content or container edges",
    ],
  },
  {
    title: "Content",
    description: "Button text should be clear and actionable",
    guidelines: [
      "Use action verbs (Save, Cancel, Submit)",
      "Keep text concise and descriptive",
      "Avoid generic terms like 'Click here'",
      "Match button text to the action outcome",
    ],
  },
];

// Accessibility guidelines
const accessibilityGuidelines = [
  {
    title: "Keyboard Navigation",
    description: "Ensure buttons are fully keyboard accessible",
    requirements: [
      "Focusable with Tab key",
      "Activatable with Enter or Space",
      "Clear focus indicators",
      "Logical tab order",
    ],
  },
  {
    title: "Screen Readers",
    description: "Provide clear context for assistive technology",
    requirements: [
      "Descriptive button text",
      "aria-label for icon-only buttons",
      "aria-describedby for additional context",
      "Proper semantic markup",
    ],
  },
  {
    title: "Visual Design",
    description: "Maintain accessibility in visual design",
    requirements: [
      "Minimum 44px touch target size",
      "Sufficient color contrast (4.5:1)",
      "Clear disabled state indication",
      "Consistent visual feedback",
    ],
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

const isLoading = ref(false);

const handleLoadingExample = async () => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isLoading.value = false;
};
</script>

<template>
  <BasePageWrapper>
    <DesignPageHeader
      title="Buttons"
      description="Button components, variants, states, and usage guidelines for the RidersDB design system."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Buttons' },
      ]"
      :navigation-items="navigationItems"
    />
    <div class="">
      <!-- Button Variants -->
      <DesignPageSection
        id="variants"
        title="Variants"
        description="Different visual styles to establish hierarchy and context."
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard
            v-for="variant in buttonVariants"
            :key="variant.name"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3
                    class="font-semibold text-neutral-900 dark:text-white capitalize"
                  >
                    {{ variant.name }}
                  </h3>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ variant.description }}
                  </p>
                </div>
                <UButton
                  :variant="variant.name as any"
                  color="primary"
                >
                  {{ variant.example }}
                </UButton>
              </div>
              <div
                class="text-xs font-mono bg-neutral-50 dark:bg-neutral-900 p-2 rounded"
              >
                &lt;UButton variant="{{ variant.name }}" color="primary"&gt;{{
                  variant.example
                }}&lt;/UButton&gt;
              </div>
            </div>
          </UCard>
        </div>
      </DesignPageSection>
      <!-- Button Colors -->
      <DesignPageSection
        id="colors"
        title="Colors"
        description="Semantic colors that convey meaning and intent."
      >
        <div class="space-y-6">
          <div
            v-for="color in buttonColors"
            :key="color.name"
            class="space-y-3"
          >
            <div>
              <h3
                class="font-semibold text-neutral-900 dark:text-white capitalize"
              >
                {{ color.name }}
              </h3>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ color.description }}
              </p>
            </div>
            <div class="flex flex-wrap gap-3">
              <UButton
                v-for="variant in buttonVariants"
                :key="variant.name"
                :variant="variant.name as any"
                :color="color.name as any"
                size="sm"
              >
                {{ variant.name }}
              </UButton>
            </div>
          </div>
        </div>
      </DesignPageSection>
      <!-- Button Sizes -->
      <DesignPageSection
        id="sizes"
        title="Sizes"
        description="Different sizes for various contexts and hierarchies."
      >
        <div class="space-y-6">
          <div class="flex flex-wrap items-center gap-4">
            <UButton
              v-for="size in buttonSizes"
              :key="size.name"
              :size="size.name as any"
              color="primary"
            >
              {{ size.name.toUpperCase() }}
            </UButton>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UCard
              v-for="size in buttonSizes"
              :key="size.name"
              class="border border-neutral-200 dark:border-neutral-800 text-center"
            >
              <div class="space-y-3">
                <UButton
                  :size="size.name as any"
                  color="primary"
                >
                  Sample Button
                </UButton>
                <div>
                  <UBadge
                    variant="soft"
                    color="neutral"
                  >
                    {{ size.name }}
                  </UBadge>
                  <p
                    class="text-xs text-neutral-600 dark:text-neutral-400 mt-1"
                  >
                    {{ size.description }}
                  </p>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </DesignPageSection>
      <!-- Button States -->
      <DesignPageSection
        id="states"
        title="States"
        description="Visual feedback for different interaction states."
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UCard
            class="border border-neutral-200 dark:border-neutral-800 text-center"
          >
            <div class="space-y-3">
              <UButton color="primary"> Default </UButton>
              <div>
                <UBadge
                  variant="soft"
                  color="neutral"
                  >default</UBadge
                >
                <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  Normal interactive state
                </p>
              </div>
            </div>
          </UCard>

          <UCard
            class="border border-neutral-200 dark:border-neutral-800 text-center"
          >
            <div class="space-y-3">
              <UButton
                color="primary"
                disabled
              >
                Disabled
              </UButton>
              <div>
                <UBadge
                  variant="soft"
                  color="neutral"
                  >disabled</UBadge
                >
                <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  Non-interactive state
                </p>
              </div>
            </div>
          </UCard>

          <UCard
            class="border border-neutral-200 dark:border-neutral-800 text-center"
          >
            <div class="space-y-3">
              <UButton
                color="primary"
                :loading="isLoading"
                @click="handleLoadingExample"
              >
                Loading
              </UButton>
              <div>
                <UBadge
                  variant="soft"
                  color="neutral"
                  >loading</UBadge
                >
                <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  Processing state
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </DesignPageSection>

      <!-- Icons -->
      <DesignPageSection
        id="icons"
        title="Icons"
        description="Icons enhance button clarity and provide visual context."
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard
            class="border border-neutral-200 dark:border-neutral-800 text-center"
          >
            <div class="space-y-4">
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Leading Icon
              </h3>
              <div class="space-y-3">
                <UButton
                  color="primary"
                  icon="i-tabler-download"
                >
                  Download
                </UButton>
                <UButton
                  color="success"
                  icon="i-tabler-check"
                  variant="outline"
                >
                  Confirm
                </UButton>
                <UButton
                  color="neutral"
                  icon="i-tabler-plus"
                  variant="ghost"
                >
                  Add Item
                </UButton>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">
                Icon before text for actions
              </p>
            </div>
          </UCard>

          <UCard
            class="border border-neutral-200 dark:border-neutral-800 text-center"
          >
            <div class="space-y-4">
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Trailing Icon
              </h3>
              <div class="space-y-3">
                <UButton
                  color="primary"
                  trailing-icon="i-tabler-external-link"
                >
                  Open Link
                </UButton>
                <UButton
                  color="neutral"
                  trailing-icon="i-tabler-chevron-right"
                  variant="outline"
                >
                  Next Step
                </UButton>
                <UButton
                  color="neutral"
                  trailing-icon="i-tabler-arrow-right"
                  variant="ghost"
                >
                  Continue
                </UButton>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">
                Icon after text for navigation
              </p>
            </div>
          </UCard>

          <UCard
            class="border border-neutral-200 dark:border-neutral-800 text-center"
          >
            <div class="space-y-4">
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Icon Only
              </h3>
              <div class="space-y-3">
                <UButton
                  color="primary"
                  icon="i-tabler-heart"
                  square
                />
                <UButton
                  color="neutral"
                  icon="i-tabler-settings"
                  variant="outline"
                  square
                />
                <UButton
                  color="neutral"
                  icon="i-tabler-x"
                  variant="ghost"
                  square
                />
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">
                Icon without text for compact spaces
              </p>
            </div>
          </UCard>
        </div>
      </DesignPageSection>

      <!-- Usage Guidelines -->
      <DesignPageSection
        id="usage"
        title="Usage Guidelines"
        description="Best practices for implementing buttons effectively."
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard
            v-for="guideline in usageGuidelines"
            :key="guideline.title"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-neutral-900 dark:text-white">
                  {{ guideline.title }}
                </h3>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  {{ guideline.description }}
                </p>
              </div>
              <ul class="space-y-2">
                <li
                  v-for="item in guideline.guidelines"
                  :key="item"
                  class="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                >
                  <UIcon
                    name="i-tabler-check"
                    class="text-success-500 mt-0.5 flex-shrink-0"
                  />
                  {{ item }}
                </li>
              </ul>
            </div>
          </UCard>
        </div>
      </DesignPageSection>

      <!-- Accessibility -->
      <DesignPageSection
        id="accessibility"
        title="Accessibility"
        description="Ensuring buttons are accessible to all users."
      >
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

      <!-- Code Examples -->
      <DesignPageSection
        id="examples"
        title="Code Examples"
        description="Common button implementations and patterns."
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Basic Button
              </h3>
            </template>
            <div class="space-y-4">
              <div class="flex gap-3">
                <UButton color="primary"> Primary Action </UButton>
                <UButton
                  color="neutral"
                  variant="outline"
                >
                  Secondary Action
                </UButton>
              </div>
              <pre
                class="text-sm bg-neutral-50 dark:bg-neutral-900 p-3 rounded overflow-x-auto"
              ><code>&lt;UButton color="primary"&gt;
  Primary Action
&lt;/UButton&gt;
&lt;UButton color="neutral" variant="outline"&gt;
  Secondary Action
&lt;/UButton&gt;</code></pre>
            </div>
          </UCard>

          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Button with Icon
              </h3>
            </template>
            <div class="space-y-4">
              <div class="flex gap-3">
                <UButton
                  color="success"
                  icon="i-tabler-check"
                >
                  Save Changes
                </UButton>
                <UButton
                  color="error"
                  icon="i-tabler-trash"
                  variant="outline"
                >
                  Delete
                </UButton>
              </div>
              <pre
                class="text-sm bg-neutral-50 dark:bg-neutral-900 p-3 rounded overflow-x-auto"
              ><code>&lt;UButton color="success" icon="i-tabler-check"&gt;
  Save Changes
&lt;/UButton&gt;
&lt;UButton color="error" icon="i-tabler-trash" variant="outline"&gt;
  Delete
&lt;/UButton&gt;</code></pre>
            </div>
          </UCard>

          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Loading State
              </h3>
            </template>
            <div class="space-y-4">
              <UButton
                color="primary"
                :loading="isLoading"
                @click="handleLoadingExample"
              >
                {{ isLoading ? "Processing..." : "Process Data" }}
              </UButton>
              <pre
                class="text-sm bg-neutral-50 dark:bg-neutral-900 p-3 rounded overflow-x-auto"
              ><code>&lt;UButton
  color="primary"
  :loading="isLoading"
  @click="handleProcess"
&gt;
  {{ isLoading ? 'Processing...' : 'Process Data' }}
&lt;/UButton&gt;</code></pre>
            </div>
          </UCard>

          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Button Group
              </h3>
            </template>
            <div class="space-y-4">
              <div class="flex gap-2">
                <UButton
                  color="primary"
                  size="sm"
                >
                  Edit
                </UButton>
                <UButton
                  color="neutral"
                  variant="outline"
                  size="sm"
                >
                  Duplicate
                </UButton>
                <UButton
                  color="error"
                  variant="ghost"
                  size="sm"
                >
                  Delete
                </UButton>
              </div>
              <pre
                class="text-sm bg-neutral-50 dark:bg-neutral-900 p-3 rounded overflow-x-auto"
              ><code>&lt;div class="flex gap-2"&gt;
  &lt;UButton color="primary" size="sm"&gt;Edit&lt;/UButton&gt;
  &lt;UButton color="neutral" variant="outline" size="sm"&gt;Duplicate&lt;/UButton&gt;
  &lt;UButton color="error" variant="ghost" size="sm"&gt;Delete&lt;/UButton&gt;
&lt;/div&gt;</code></pre>
            </div>
          </UCard>
        </div>
      </DesignPageSection>

      <!-- Do's and Don'ts -->
      <DesignPageSection
        id="dos-donts"
        title="Do's and Don'ts"
        description="Common mistakes to avoid and best practices to follow."
      >
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
            <div class="space-y-4">
              <div class="space-y-2">
                <div class="flex gap-2">
                  <UButton
                    color="primary"
                    size="sm"
                    >Save</UButton
                  >
                  <UButton
                    color="neutral"
                    variant="outline"
                    size="sm"
                    >Cancel</UButton
                  >
                </div>
                <p class="text-sm text-green-800 dark:text-green-200">
                  Use clear, specific action words
                </p>
              </div>
              <div class="space-y-2">
                <div class="flex gap-2">
                  <UButton color="primary">Primary Action</UButton>
                  <UButton
                    color="neutral"
                    variant="outline"
                    >Secondary</UButton
                  >
                </div>
                <p class="text-sm text-green-800 dark:text-green-200">
                  Establish clear visual hierarchy
                </p>
              </div>
            </div>
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
            <div class="space-y-4">
              <div class="space-y-2">
                <div class="flex gap-2">
                  <UButton
                    color="primary"
                    size="sm"
                    >Click Here</UButton
                  >
                  <UButton
                    color="primary"
                    size="sm"
                    >OK</UButton
                  >
                </div>
                <p class="text-sm text-red-800 dark:text-red-200">
                  Use generic or unclear button text
                </p>
              </div>
              <div class="space-y-2">
                <div class="flex gap-2">
                  <UButton color="primary">Action 1</UButton>
                  <UButton color="primary">Action 2</UButton>
                </div>
                <p class="text-sm text-red-800 dark:text-red-200">
                  Use multiple primary buttons together
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </DesignPageSection>
    </div>
  </BasePageWrapper>
</template>
