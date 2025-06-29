<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: "Design Principles - Design System",
  description:
    "Core design principles that guide the RidersDB design system and user experience decisions.",
});

// Core principles
const principles = [
  {
    title: "Clarity",
    icon: "i-tabler-eye",
    description:
      "Clear, understandable interfaces that don't require explanation",
    color: "blue",
    details: [
      "Use familiar patterns and conventions",
      "Provide clear visual hierarchy",
      "Write in plain, actionable language",
      "Remove unnecessary complexity",
      "Make system status visible",
    ],
    examples: [
      "Clear button labels like 'Save Changes' instead of 'Submit'",
      "Obvious navigation structure",
      "Immediate feedback for user actions",
    ],
  },
  {
    title: "Consistency",
    icon: "i-tabler-repeat",
    description: "Predictable patterns that users can learn and rely on",
    color: "green",
    details: [
      "Use consistent visual elements",
      "Apply patterns uniformly",
      "Maintain behavioral consistency",
      "Create systematic approaches",
      "Document design decisions",
    ],
    examples: [
      "Same button styles perform similar actions",
      "Consistent spacing throughout the interface",
      "Uniform error message patterns",
    ],
  },
  {
    title: "Accessibility",
    icon: "i-tabler-accessible",
    description:
      "Inclusive design that works for everyone, regardless of ability",
    color: "purple",
    details: [
      "Meet WCAG 2.1 AA standards",
      "Support keyboard navigation",
      "Provide sufficient color contrast",
      "Include alternative text for images",
      "Design for screen readers",
    ],
    examples: [
      "4.5:1 color contrast ratios",
      "Proper semantic HTML structure",
      "Keyboard-accessible interactions",
    ],
  },
  {
    title: "Performance",
    icon: "i-tabler-rocket",
    description:
      "Fast, efficient interfaces that respect users' time and resources",
    color: "orange",
    details: [
      "Optimize loading times",
      "Minimize resource usage",
      "Progressive enhancement",
      "Efficient animations",
      "Smart caching strategies",
    ],
    examples: [
      "Lazy loading for images",
      "Skeleton screens during loading",
      "Optimized font loading",
    ],
  },
  {
    title: "Usability",
    icon: "i-tabler-user-check",
    description: "Intuitive interfaces that feel natural and effortless to use",
    color: "indigo",
    details: [
      "Follow user mental models",
      "Provide helpful feedback",
      "Support user goals efficiently",
      "Handle errors gracefully",
      "Enable easy recovery",
    ],
    examples: [
      "Auto-save to prevent data loss",
      "Confirmation dialogs for destructive actions",
      "Smart defaults in forms",
    ],
  },
  {
    title: "Flexibility",
    icon: "i-tabler-adjustments",
    description:
      "Adaptable systems that work across different contexts and needs",
    color: "teal",
    details: [
      "Responsive across devices",
      "Customizable when appropriate",
      "Scalable component system",
      "Theme and preference support",
      "Multiple interaction methods",
    ],
    examples: [
      "Dark/light mode support",
      "Responsive grid layouts",
      "Customizable dashboard views",
    ],
  },
];

// Design philosophy
const designPhilosophy = [
  {
    title: "User-Centered Design",
    description:
      "Every design decision is made with the user's needs, goals, and context in mind.",
    principles: [
      "Understand user workflows and pain points",
      "Test with real users early and often",
      "Prioritize user goals over business goals when they conflict",
      "Design for the majority while accommodating edge cases",
    ],
  },
  {
    title: "Progressive Disclosure",
    description:
      "Present information and functionality in layers, showing only what's relevant at each step.",
    principles: [
      "Start with essential information",
      "Provide pathways to more detail",
      "Avoid overwhelming users with choices",
      "Use contextual help and guidance",
    ],
  },
  {
    title: "Emotional Design",
    description:
      "Create positive emotional experiences that build trust and delight users.",
    principles: [
      "Use appropriate tone and personality",
      "Celebrate user achievements",
      "Provide reassurance during stressful tasks",
      "Create memorable micro-interactions",
    ],
  },
];

// Application examples
const applicationExamples = [
  {
    scenario: "Product Search",
    principle: "Clarity & Usability",
    implementation: [
      "Clear search filters with visual indicators",
      "Immediate search results as you type",
      "Easy-to-scan product cards with key information",
      "Clear 'No results' state with suggested actions",
    ],
  },
  {
    scenario: "User Registration",
    principle: "Accessibility & Performance",
    implementation: [
      "Progressive form validation with helpful error messages",
      "Keyboard navigation support throughout",
      "Fast form submission with loading indicators",
      "Clear password requirements and strength indicators",
    ],
  },
  {
    scenario: "Mobile Navigation",
    principle: "Flexibility & Consistency",
    implementation: [
      "Touch-friendly navigation with adequate spacing",
      "Consistent navigation patterns across pages",
      "Responsive layout that adapts to screen size",
      "Gesture support where appropriate",
    ],
  },
];

// Measuring success
const successMetrics = [
  {
    category: "Usability Metrics",
    metrics: [
      "Task completion rate",
      "Time to complete tasks",
      "Error rate and recovery",
      "User satisfaction scores",
    ],
  },
  {
    category: "Accessibility Metrics",
    metrics: [
      "WCAG compliance audit scores",
      "Keyboard navigation completeness",
      "Screen reader compatibility",
      "Color contrast validation",
    ],
  },
  {
    category: "Performance Metrics",
    metrics: [
      "Page load times",
      "First contentful paint",
      "Cumulative layout shift",
      "User engagement metrics",
    ],
  },
];
</script>

<template>
  <BasePageWrapper>
    <!-- Header -->
    <LayoutHeaderNav
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Principles' },
      ]"
    />

    <div class="space-y-12">
      <!-- Page Header -->
      <div>
        <h1 class="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Design Principles
        </h1>
        <p class="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl">
          These principles guide every design decision in our system, ensuring
          we create experiences that are meaningful, accessible, and delightful
          for motorcycle enthusiasts.
        </p>
      </div>

      <!-- Core Principles -->
      <section class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Core Principles
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            The fundamental beliefs that shape our design approach.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard
            v-for="principle in principles"
            :key="principle.title"
            class="border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-shadow group"
          >
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div
                  class="p-3 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform"
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

              <div class="space-y-3">
                <h4 class="font-medium text-neutral-900 dark:text-white">
                  Key Practices
                </h4>
                <ul class="space-y-1">
                  <li
                    v-for="detail in principle.details"
                    :key="detail"
                    class="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                  >
                    <UIcon
                      name="i-tabler-check"
                      :class="`text-${principle.color}-500 mt-0.5 flex-shrink-0`"
                    />
                    {{ detail }}
                  </li>
                </ul>
              </div>

              <div
                class="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800"
              >
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
      </section>

      <!-- Design Philosophy -->
      <section class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Design Philosophy
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            Our overarching approach to creating meaningful user experiences.
          </p>
        </div>

        <div class="space-y-6">
          <UCard
            v-for="item in designPhilosophy"
            :key="item.title"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="space-y-4">
              <div>
                <h3
                  class="text-lg font-semibold text-neutral-900 dark:text-white mb-2"
                >
                  {{ item.title }}
                </h3>
                <p class="text-neutral-600 dark:text-neutral-400">
                  {{ item.description }}
                </p>
              </div>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li
                  v-for="principle in item.principles"
                  :key="principle"
                  class="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                >
                  <UIcon
                    name="i-tabler-arrow-right"
                    class="text-primary-500 mt-0.5 flex-shrink-0"
                  />
                  {{ principle }}
                </li>
              </ul>
            </div>
          </UCard>
        </div>
      </section>

      <!-- Application Examples -->
      <section class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Principles in Action
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            Real examples of how these principles guide specific design
            decisions.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UCard
            v-for="example in applicationExamples"
            :key="example.scenario"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="space-y-4">
              <div>
                <h3
                  class="text-lg font-semibold text-neutral-900 dark:text-white"
                >
                  {{ example.scenario }}
                </h3>
                <UBadge
                  variant="soft"
                  color="primary"
                  class="mt-2"
                >
                  {{ example.principle }}
                </UBadge>
              </div>
              <ul class="space-y-2">
                <li
                  v-for="implementation in example.implementation"
                  :key="implementation"
                  class="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                >
                  <UIcon
                    name="i-tabler-bulb"
                    class="text-yellow-500 mt-0.5 flex-shrink-0"
                  />
                  {{ implementation }}
                </li>
              </ul>
            </div>
          </UCard>
        </div>
      </section>

      <!-- Measuring Success -->
      <section class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Measuring Success
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            How we evaluate whether our principles are being effectively
            applied.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard
            v-for="category in successMetrics"
            :key="category.category"
            class="border border-neutral-200 dark:border-neutral-800"
          >
            <div class="space-y-4">
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                {{ category.category }}
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="metric in category.metrics"
                  :key="metric"
                  class="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                >
                  <UIcon
                    name="i-tabler-chart-line"
                    class="text-primary-500 mt-0.5 flex-shrink-0"
                  />
                  {{ metric }}
                </li>
              </ul>
            </div>
          </UCard>
        </div>
      </section>

      <!-- Implementation Guidelines -->
      <section class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Implementation Guidelines
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            Practical advice for applying these principles in your work.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UCard
            class="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-lightbulb"
                  class="text-green-600 dark:text-green-400"
                />
                <h3 class="font-semibold text-green-900 dark:text-green-100">
                  Decision Framework
                </h3>
              </div>
            </template>
            <div class="space-y-3">
              <p class="text-sm text-green-800 dark:text-green-200">
                When making design decisions, ask yourself:
              </p>
              <ul class="space-y-2 text-sm text-green-800 dark:text-green-200">
                <li>• Does this make the interface clearer?</li>
                <li>• Is this consistent with existing patterns?</li>
                <li>• Will this work for users with disabilities?</li>
                <li>• Does this improve performance?</li>
                <li>• Is this intuitive for our users?</li>
                <li>• Can this adapt to different contexts?</li>
              </ul>
            </div>
          </UCard>

          <UCard
            class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-target"
                  class="text-blue-600 dark:text-blue-400"
                />
                <h3 class="font-semibold text-blue-900 dark:text-blue-100">
                  Trade-off Priorities
                </h3>
              </div>
            </template>
            <div class="space-y-3">
              <p class="text-sm text-blue-800 dark:text-blue-200">
                When principles conflict, prioritize in this order:
              </p>
              <ol class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>1. Accessibility - Never compromise on inclusivity</li>
                <li>2. Clarity - Users must understand the interface</li>
                <li>3. Usability - The interface must be functional</li>
                <li>4. Consistency - Maintain predictable patterns</li>
                <li>5. Performance - Optimize within constraints</li>
                <li>6. Flexibility - Adapt when beneficial</li>
              </ol>
            </div>
          </UCard>
        </div>
      </section>

      <!-- Resources and References -->
      <section class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Resources and References
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400">
            External resources that inform and support our design principles.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Accessibility Standards
              </h3>
            </template>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-external-link"
                  class="text-primary-500"
                />
                <a
                  href="https://www.w3.org/WAI/WCAG21/quickref/"
                  class="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  WCAG 2.1 Quick Reference
                </a>
              </li>
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-external-link"
                  class="text-primary-500"
                />
                <a
                  href="https://webaim.org/"
                  class="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  WebAIM Resources
                </a>
              </li>
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-external-link"
                  class="text-primary-500"
                />
                <a
                  href="https://inclusive-components.design/"
                  class="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Inclusive Components
                </a>
              </li>
            </ul>
          </UCard>

          <UCard class="border border-neutral-200 dark:border-neutral-800">
            <template #header>
              <h3 class="font-semibold text-neutral-900 dark:text-white">
                Design Philosophy
              </h3>
            </template>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-external-link"
                  class="text-primary-500"
                />
                <a
                  href="https://lawsofux.com/"
                  class="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Laws of UX
                </a>
              </li>
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-external-link"
                  class="text-primary-500"
                />
                <a
                  href="https://www.nngroup.com/articles/ten-usability-heuristics/"
                  class="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Nielsen's Heuristics
                </a>
              </li>
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-tabler-external-link"
                  class="text-primary-500"
                />
                <a
                  href="https://material.io/design/introduction/"
                  class="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Material Design Principles
                </a>
              </li>
            </ul>
          </UCard>
        </div>
      </section>

      <!-- Call to Action -->
      <section
        class="bg-gradient-to-r from-primary-50 to-sky-50 dark:from-primary-950/50 dark:to-sky-950/50 rounded-xl p-8"
      >
        <div class="text-center space-y-4">
          <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">
            Ready to Apply These Principles?
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Explore our component library and patterns to see these principles
            in action, or start building your own components with our design
            tokens.
          </p>
          <div class="flex justify-center gap-4 mt-6">
            <UButton
              to="/design/buttons"
              color="primary"
              size="lg"
              icon="i-tabler-click"
            >
              Explore Components
            </UButton>
            <UButton
              to="/design/colors"
              variant="outline"
              color="primary"
              size="lg"
              icon="i-tabler-palette"
            >
              Design Tokens
            </UButton>
          </div>
        </div>
      </section>
    </div>
  </BasePageWrapper>
</template>
