<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: "Motion - Design System",
  description:
    "Animation principles, timing, and motion guidelines for the RidersDB design system.",
});

// Motion principles
const motionPrinciples = [
  {
    title: "Purposeful",
    description:
      "Every animation should serve a purpose - guiding attention, providing feedback, or enhancing understanding",
    icon: "i-tabler-target",
    color: "blue",
    examples: [
      "Loading animations show progress",
      "Hover effects indicate interactivity",
      "Page transitions maintain context",
    ],
  },
  {
    title: "Natural",
    description:
      "Animations should feel realistic and follow natural physics principles",
    icon: "i-tabler-leaf",
    color: "green",
    examples: [
      "Elements ease in and out smoothly",
      "Bounces feel weighty and realistic",
      "Objects follow believable paths",
    ],
  },
  {
    title: "Responsive",
    description:
      "Motion should be fast enough to feel responsive but slow enough to be understood",
    icon: "i-tabler-bolt",
    color: "yellow",
    examples: [
      "Quick feedback for button clicks",
      "Smooth transitions between states",
      "Immediate response to user input",
    ],
  },
  {
    title: "Accessible",
    description: "Respect user preferences and accessibility needs",
    icon: "i-tabler-accessible",
    color: "purple",
    examples: [
      "Respect prefers-reduced-motion",
      "Avoid triggering vestibular disorders",
      "Provide alternatives to motion",
    ],
  },
];

// Timing and easing
const timingValues = [
  {
    name: "Instant",
    duration: "0ms",
    usage: "Immediate feedback",
    example: "Button press acknowledgment",
  },
  {
    name: "Quick",
    duration: "150ms",
    usage: "Small interactions",
    example: "Hover effects, tooltips",
  },
  {
    name: "Fast",
    duration: "250ms",
    usage: "Standard transitions",
    example: "State changes, reveals",
  },
  {
    name: "Moderate",
    duration: "400ms",
    usage: "Complex animations",
    example: "Page transitions, modals",
  },
  {
    name: "Slow",
    duration: "600ms",
    usage: "Large movements",
    example: "Drawer slides, large reveals",
  },
  {
    name: "Deliberate",
    duration: "800ms+",
    usage: "Attention-grabbing",
    example: "Success celebrations, onboarding",
  },
];

const easingCurves = [
  {
    name: "Linear",
    curve: "linear",
    css: "ease-linear",
    usage: "Consistent speed throughout",
    example: "Loading bars, rotations",
  },
  {
    name: "Ease",
    curve: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    css: "ease",
    usage: "Default smooth animation",
    example: "General purpose transitions",
  },
  {
    name: "Ease In",
    curve: "cubic-bezier(0.4, 0, 1, 1)",
    css: "ease-in",
    usage: "Elements entering the scene",
    example: "Fade ins, scale ups",
  },
  {
    name: "Ease Out",
    curve: "cubic-bezier(0, 0, 0.2, 1)",
    css: "ease-out",
    usage: "Elements leaving the scene",
    example: "Fade outs, dismissals",
  },
  {
    name: "Ease In Out",
    curve: "cubic-bezier(0.4, 0, 0.2, 1)",
    css: "ease-in-out",
    usage: "Smooth symmetric motion",
    example: "Modal appearance, page transitions",
  },
];

// Animation types
const animationTypes = [
  {
    category: "Micro-interactions",
    description: "Small, delightful animations that provide feedback",
    animations: [
      {
        name: "Button Hover",
        description: "Subtle scale or color change on hover",
      },
      {
        name: "Form Validation",
        description: "Shake for errors, checkmark for success",
      },
      { name: "Loading Dots", description: "Pulsing dots to indicate loading" },
      {
        name: "Toggle Switch",
        description: "Smooth slide animation for toggles",
      },
    ],
  },
  {
    category: "Transitions",
    description: "Smooth changes between states or views",
    animations: [
      { name: "Page Transitions", description: "Slide or fade between pages" },
      { name: "Modal Enter/Exit", description: "Scale and fade for modals" },
      {
        name: "Accordion Expand",
        description: "Smooth height animation for reveals",
      },
      {
        name: "Tab Switching",
        description: "Sliding indicator for active tab",
      },
    ],
  },
  {
    category: "Loading States",
    description: "Animations that indicate progress or activity",
    animations: [
      {
        name: "Skeleton Loading",
        description: "Shimmering placeholder content",
      },
      { name: "Progress Bars", description: "Smooth progress indication" },
      {
        name: "Spinners",
        description: "Rotating indicators for indeterminate loading",
      },
      {
        name: "Pulse Effects",
        description: "Gentle pulsing for awaiting states",
      },
    ],
  },
  {
    category: "Attention Grabbers",
    description: "Animations that draw user attention",
    animations: [
      {
        name: "Success Celebration",
        description: "Confetti or checkmark animations",
      },
      { name: "Error Shake", description: "Horizontal shake for errors" },
      {
        name: "Notification Slide",
        description: "Slide in from edge for alerts",
      },
      {
        name: "Badge Bounce",
        description: "Gentle bounce for new notifications",
      },
    ],
  },
];

// Accessibility considerations
const accessibilityConsiderations = [
  {
    title: "Reduced Motion",
    description: "Respect user preferences for reduced motion",
    implementation: [
      "Use prefers-reduced-motion media query",
      "Provide static alternatives",
      "Reduce animation intensity",
      "Maintain functionality without motion",
    ],
    codeExample: `@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`,
  },
  {
    title: "Vestibular Disorders",
    description: "Avoid animations that could trigger vestibular disorders",
    implementation: [
      "Avoid excessive parallax scrolling",
      "Minimize zoom and scale animations",
      "Limit rotating or spinning elements",
      "Provide pause controls for autoplay",
    ],
    codeExample: `/* Safer animation approach */
.safe-animation {
  transform: translateY(10px);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}`,
  },
  {
    title: "Performance",
    description: "Ensure animations don't negatively impact performance",
    implementation: [
      "Use transform and opacity for animations",
      "Avoid animating layout properties",
      "Use will-change sparingly",
      "Optimize for 60fps on all devices",
    ],
    codeExample: `/* Performant animation */
.performant {
  will-change: transform, opacity;
  transform: translateX(0);
  transition: transform 0.25s ease-out;
}`,
  },
];

// Implementation examples
const implementationExamples = [
  {
    title: "Button Hover Effect",
    description: "Subtle interaction feedback",
    code: `<button class="
  px-4 py-2 bg-primary-500 text-white rounded-lg
  transition-all duration-150 ease-out
  hover:bg-primary-600 hover:scale-105
  active:scale-95
">
  Click me
</button>`,
  },
  {
    title: "Modal Animation",
    description: "Smooth modal entrance",
    code: `/* Modal backdrop */
.modal-backdrop {
  opacity: 0;
  transition: opacity 0.25s ease-out;
}

.modal-backdrop.show {
  opacity: 1;
}

/* Modal content */
.modal-content {
  transform: scale(0.95);
  opacity: 0;
  transition: transform 0.25s ease-out, opacity 0.25s ease-out;
}

.modal-content.show {
  transform: scale(1);
  opacity: 1;
}`,
  },
  {
    title: "Loading Skeleton",
    description: "Shimmer effect for loading content",
    code: `@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}`,
  },
];

// Performance guidelines
const performanceGuidelines = [
  {
    title: "Optimal Properties",
    description: "Properties that can be animated efficiently",
    properties: ["transform", "opacity", "filter"],
    impact: "GPU accelerated, no layout recalculation",
  },
  {
    title: "Caution Properties",
    description: "Properties that may cause performance issues",
    properties: ["width", "height", "padding", "margin"],
    impact: "Triggers layout recalculation",
  },
  {
    title: "Avoid Properties",
    description: "Properties that significantly impact performance",
    properties: ["left", "top", "box-shadow", "border-radius"],
    impact: "Expensive repaints and layout shifts",
  },
];

const isAnimating = ref(false);
const currentExample = ref("hover");

const triggerAnimation = (type: string) => {
  currentExample.value = type;
  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
  }, 1000);
};
</script>

<template>
  <BasePageWrapper>
    <DesignPageHeader
      title="Motion Design"
      description="Animation principles, timing, and motion guidelines for the RidersDB design system."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Motion' },
      ]"
      :navigation-items="[]"
    />
    <div class="">
      <DesignPageSection
        id="principles"
        title="Motion Principles"
        description="Core principles that guide our approach to animation and motion design."
      >
        <!-- Motion Principles -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard
            v-for="principle in motionPrinciples"
            :key="principle.title"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div
                  class="p-3 rounded-lg flex-shrink-0"
                  :class="`bg-${principle.color}-100 dark:bg-${principle.color}-900/20`"
                >
                  <UIcon
                    :name="principle.icon"
                    class="text-xl"
                    :class="`text-${principle.color}-600 dark:text-${principle.color}-400`"
                  />
                </div>
                <div class="flex-1">
                  <h3
                    class="text-lg font-semibold text-neutral-900 dark:text-white mb-2"
                  >
                    {{ principle.title }}
                  </h3>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ principle.description }}
                  </p>
                </div>
              </div>

              <div class="space-y-2">
                <h4
                  class="font-medium text-neutral-900 dark:text-white text-sm"
                >
                  Examples
                </h4>
                <ul class="space-y-1">
                  <li
                    v-for="example in principle.examples"
                    :key="example"
                    class="text-xs text-neutral-500 dark:text-neutral-400"
                  >
                    • {{ example }}
                  </li>
                </ul>
              </div>
            </div>
          </UCard>
        </div>
      </DesignPageSection>
      <DesignPageSection
        id="timing"
        title="Timing and Easing"
        description="Consistent timing and natural easing curves create polished experiences."
      >
        <!-- Timing and Easing -->
        <div class="space-y-8">
          <!-- Duration Guidelines -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
              Duration Guidelines
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <UCard
                v-for="timing in timingValues"
                :key="timing.name"
                class="border border-neutral-200 dark:border-neutral-800 text-center"
              >
                <div class="space-y-3">
                  <div>
                    <h4 class="font-semibold text-neutral-900 dark:text-white">
                      {{ timing.name }}
                    </h4>
                    <UBadge
                      variant="soft"
                      color="primary"
                      class="font-mono"
                    >
                      {{ timing.duration }}
                    </UBadge>
                  </div>
                  <div class="space-y-2">
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">
                      {{ timing.usage }}
                    </p>
                    <p class="text-xs text-neutral-500">
                      {{ timing.example }}
                    </p>
                  </div>
                </div>
              </UCard>
            </div>
          </div>

          <!-- Easing Curves -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
              Easing Curves
            </h3>
            <div class="space-y-4">
              <UCard
                v-for="easing in easingCurves"
                :key="easing.name"
                class="border border-neutral-200 dark:border-neutral-800"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-4 mb-2">
                      <h4
                        class="font-semibold text-neutral-900 dark:text-white"
                      >
                        {{ easing.name }}
                      </h4>
                      <UBadge
                        variant="soft"
                        color="neutral"
                        class="font-mono text-xs"
                      >
                        {{ easing.css }}
                      </UBadge>
                    </div>
                    <p
                      class="text-sm text-neutral-600 dark:text-neutral-400 mb-1"
                    >
                      {{ easing.usage }}
                    </p>
                    <p class="text-xs text-neutral-500">
                      {{ easing.example }}
                    </p>
                  </div>
                  <div class="ml-4">
                    <!-- Visual representation would go here -->
                    <div
                      class="w-16 h-8 bg-neutral-100 dark:bg-neutral-800 rounded flex items-end p-1"
                    >
                      <div class="w-full h-2 bg-primary-500 rounded" />
                    </div>
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </DesignPageSection>
      <DesignPageSection
        id="types"
        title="Animation Types"
        description="Common animation patterns and their appropriate use cases."
      >
        <!-- Animation types -->
        <div class="space-y-8">
          <div
            v-for="category in animationTypes"
            :key="category.category"
            class="space-y-4"
          >
            <div>
              <h3
                class="text-lg font-semibold text-neutral-900 dark:text-white"
              >
                {{ category.category }}
              </h3>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ category.description }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UCard
                v-for="animation in category.animations"
                :key="animation.name"
                class="border border-neutral-200 dark:border-neutral-800"
              >
                <div class="space-y-2">
                  <h4 class="font-medium text-neutral-900 dark:text-white">
                    {{ animation.name }}
                  </h4>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ animation.description }}
                  </p>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </DesignPageSection>
      <DesignPageSection
        id="examples"
        title="Interactive Examples"
        description="Try these interactive examples to see motion principles in action."
      >
        <!-- Interactive Examples -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Button Animations -->
          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Button Interactions
              </h3>
            </template>
            <div class="space-y-6">
              <div class="flex flex-wrap gap-4">
                <UButton
                  color="primary"
                  class="transition-all duration-150 hover:scale-105 active:scale-95"
                  @click="triggerAnimation('button')"
                >
                  Hover & Click Me
                </UButton>
                <UButton
                  color="success"
                  variant="outline"
                  class="transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  @click="triggerAnimation('lift')"
                >
                  Lift Effect
                </UButton>
                <UButton
                  color="neutral"
                  variant="ghost"
                  class="transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  @click="triggerAnimation('background')"
                >
                  Background Fade
                </UButton>
              </div>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Each button demonstrates different hover and active states with
                appropriate timing.
              </p>
            </div>
          </UCard>

          <!-- Loading States -->
          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Loading Animations
              </h3>
            </template>
            <div class="space-y-6">
              <div class="space-y-4">
                <!-- Pulse Animation -->
                <div class="flex items-center gap-3">
                  <div
                    class="w-3 h-3 bg-primary-500 rounded-full animate-pulse"
                  />
                  <span class="text-sm">Pulse Loading</span>
                </div>

                <!-- Spin Animation -->
                <div class="flex items-center gap-3">
                  <UIcon
                    name="i-tabler-loader-2"
                    class="text-primary-500 animate-spin"
                  />
                  <span class="text-sm">Spinner Loading</span>
                </div>

                <!-- Progress Bar -->
                <div class="space-y-2">
                  <span class="text-sm">Progress Bar</span>
                  <div
                    class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2"
                  >
                    <div
                      class="bg-primary-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      :style="{ width: isAnimating ? '100%' : '0%' }"
                    />
                  </div>
                </div>
              </div>
              <UButton
                size="sm"
                variant="outline"
                @click="triggerAnimation('progress')"
              >
                Trigger Animations
              </UButton>
            </div>
          </UCard>
        </div>
      </DesignPageSection>
      <DesignPageSection
        id="accessibility"
        title="Accessibility Considerations"
        description="Ensuring motion is accessible and inclusive for all users."
      >
        <!-- Accessibility considerations -->
        <div class="space-y-6">
          <UCard
            v-for="consideration in accessibilityConsiderations"
            :key="consideration.title"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="space-y-4">
              <div>
                <h3
                  class="text-lg font-semibold text-neutral-900 dark:text-white mb-2"
                >
                  {{ consideration.title }}
                </h3>
                <p class="text-neutral-600 dark:text-neutral-400">
                  {{ consideration.description }}
                </p>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-neutral-900 dark:text-white mb-2">
                    Implementation
                  </h4>
                  <ul class="space-y-1">
                    <li
                      v-for="item in consideration.implementation"
                      :key="item"
                      class="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                    >
                      <UIcon
                        name="i-tabler-check"
                        class="text-primary-500 mt-0.5 flex-shrink-0"
                      />
                      {{ item }}
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 class="font-medium text-neutral-900 dark:text-white mb-2">
                    Code Example
                  </h4>
                  <pre
                    class="text-xs bg-neutral-50 dark:bg-neutral-900 p-3 rounded overflow-x-auto"
                  ><code>{{ consideration.codeExample }}</code></pre>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </DesignPageSection>
      <DesignPageSection
        id="implementation"
        title="Implementation Examples"
        description="Practical code examples for common motion patterns."
      >
        <!-- Implementation examples -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UCard
            v-for="example in implementationExamples"
            :key="example.title"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                {{ example.title }}
              </h3>
            </template>
            <div class="space-y-4">
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ example.description }}
              </p>
              <pre
                class="text-sm bg-neutral-50 dark:bg-neutral-900 p-3 rounded overflow-x-auto"
              ><code>{{ example.code }}</code></pre>
            </div>
          </UCard>
        </div>
      </DesignPageSection>
      <DesignPageSection
        id="performance"
        title="Performance Guidelines"
        description="Best practices for performant animations that maintain 60fps."
      >
        <!-- Performance guidelines -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard
            v-for="guideline in performanceGuidelines"
            :key="guideline.title"
            class="border border-neutral-200 dark:border-neutral-800"
            :class="{
              'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50':
                guideline.title === 'Optimal Properties',
              'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/50':
                guideline.title === 'Caution Properties',
              'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50':
                guideline.title === 'Avoid Properties',
            }"
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

              <div class="space-y-2">
                <div class="flex flex-wrap gap-1">
                  <UBadge
                    v-for="property in guideline.properties"
                    :key="property"
                    variant="soft"
                    :color="
                      guideline.title === 'Optimal Properties' ? 'success'
                      : guideline.title === 'Caution Properties' ? 'warning'
                      : 'error'
                    "
                    class="font-mono text-xs"
                  >
                    {{ property }}
                  </UBadge>
                </div>
                <p class="text-xs text-neutral-500">
                  {{ guideline.impact }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </DesignPageSection>
      <DesignPageSection
        id="best-practices"
        title="Best Practices"
        description="Guidelines for creating effective and accessible motion design."
      >
        <!-- Best Practices -->
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
              <li>• Use consistent timing and easing curves</li>
              <li>• Animate transform and opacity properties</li>
              <li>• Respect prefers-reduced-motion settings</li>
              <li>• Provide clear purpose for each animation</li>
              <li>• Test on lower-end devices</li>
              <li>• Use loading animations for slow operations</li>
              <li>• Keep animations under 500ms for interactions</li>
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
              <li>• Animate layout properties (width, height, left, top)</li>
              <li>• Use animations longer than 1 second for interactions</li>
              <li>• Create animations that trigger motion sickness</li>
              <li>• Animate multiple properties simultaneously</li>
              <li>• Use animations without clear purpose</li>
              <li>• Ignore accessibility preferences</li>
              <li>• Create jarring or sudden movements</li>
            </ul>
          </UCard>
        </div>
      </DesignPageSection>
      <DesignPageSection
        id="resources"
        title="Resources and Tools"
        description="External resources for learning more about motion design and accessibility."
      >
        <!-- Resources -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Motion Design Resources
              </h3>
            </template>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-external-link"
                  class="text-primary-500"
                />
                <a
                  href="https://material.io/design/motion/"
                  class="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Material Design Motion
                </a>
              </li>
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-external-link"
                  class="text-primary-500"
                />
                <a
                  href="https://easings.net/"
                  class="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Easing Functions Cheat Sheet
                </a>
              </li>
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-external-link"
                  class="text-primary-500"
                />
                <a
                  href="https://cssanimation.rocks/"
                  class="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  CSS Animation Rocks
                </a>
              </li>
            </ul>
          </UCard>

          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Accessibility Resources
              </h3>
            </template>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-external-link"
                  class="text-primary-500"
                />
                <a
                  href="https://web.dev/prefers-reduced-motion/"
                  class="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Prefers Reduced Motion Guide
                </a>
              </li>
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-external-link"
                  class="text-primary-500"
                />
                <a
                  href="https://vestibular.org/understanding-vestibular-disorder"
                  class="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Understanding Vestibular Disorders
                </a>
              </li>
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-external-link"
                  class="text-primary-500"
                />
                <a
                  href="https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html"
                  class="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  WCAG Animation Guidelines
                </a>
              </li>
            </ul>
          </UCard>
        </div>
      </DesignPageSection>
    </div>
  </BasePageWrapper>
</template>
