<template>
  <BasePageWrapper>
    <DesignPageHeader
      title="Accessibility"
      description="Guidelines and best practices for creating inclusive and accessible user experiences."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Accessibility' },
      ]"
      :navigation-items="[]"
    />
    <div class="">
      <DesignPageSection
        id="principles"
        title="Accessibility Principles"
        description="Core accessibility principles (POUR) and our commitment."
      >
        <!-- Core Principles -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Core Principles (POUR)
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UCard>
              <div class="flex items-start">
                <div
                  class="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg mr-6 flex-shrink-0 w-16 h-16 flex items-center justify-center"
                >
                  <Icon
                    name="i-heroicons-eye"
                    class="w-8 h-8 text-blue-600 dark:text-blue-400"
                  />
                </div>
                <div>
                  <h4
                    class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
                  >
                    Perceivable
                  </h4>
                  <p class="text-lg text-neutral-600 dark:text-neutral-300">
                    Information must be presentable in ways users can perceive,
                    including alternative text for images and sufficient color
                    contrast.
                  </p>
                </div>
              </div>
            </UCard>

            <UCard>
              <div class="flex items-start">
                <div
                  class="p-4 bg-green-100 dark:bg-green-900 rounded-lg mr-6 flex-shrink-0 w-16 h-16 flex items-center justify-center"
                >
                  <Icon
                    name="i-heroicons-cursor-arrow-rays"
                    class="w-8 h-8 text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <h4
                    class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
                  >
                    Operable
                  </h4>
                  <p class="text-lg text-neutral-600 dark:text-neutral-300">
                    Interface components must be operable through various input
                    methods, including keyboard navigation and assistive
                    technologies.
                  </p>
                </div>
              </div>
            </UCard>

            <UCard>
              <div class="flex items-start">
                <div
                  class="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg mr-6 flex-shrink-0 w-16 h-16 flex items-center justify-center"
                >
                  <Icon
                    name="i-heroicons-light-bulb"
                    class="w-8 h-8 text-purple-600 dark:text-purple-400"
                  />
                </div>
                <div>
                  <h4
                    class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
                  >
                    Understandable
                  </h4>
                  <p class="text-lg text-neutral-600 dark:text-neutral-300">
                    Information and UI operation must be understandable, with
                    clear language, predictable functionality, and helpful error
                    messages.
                  </p>
                </div>
              </div>
            </UCard>

            <UCard>
              <div class="flex items-start">
                <div
                  class="p-4 bg-orange-100 dark:bg-orange-900 rounded-lg mr-6 flex-shrink-0 w-16 h-16 flex items-center justify-center"
                >
                  <Icon
                    name="i-heroicons-shield-check"
                    class="w-8 h-8 text-orange-600 dark:text-orange-400"
                  />
                </div>
                <div>
                  <h4
                    class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
                  >
                    Robust
                  </h4>
                  <p class="text-lg text-neutral-600 dark:text-neutral-300">
                    Content must be robust enough to be interpreted by a variety
                    of user agents, including assistive technologies.
                  </p>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Our Commitment -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Our Accessibility Commitment
          </h3>
          <div
            class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
          >
            <ul class="space-y-3 text-blue-800 dark:text-blue-200">
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  >We strive to meet WCAG 2.1 AA standards across all components
                  and patterns</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  >All interactive elements are keyboard accessible and screen
                  reader friendly</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  >Color combinations meet or exceed minimum contrast
                  requirements</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  >We regularly test with assistive technologies and real
                  users</span
                >
              </li>
            </ul>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="wcag"
        title="WCAG 2.1 Guidelines"
        description="Key WCAG 2.1 AA requirements for accessibility."
      >
        <!-- Level AA Requirements -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Level AA Requirements
          </h3>
          <div class="space-y-6">
            <UCard>
              <h4
                class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
              >
                1.4.3 Contrast (Minimum)
              </h4>
              <p class="text-neutral-600 dark:text-neutral-300 mb-4">
                Text and background colors must have a contrast ratio of at
                least 4.5:1 for normal text and 3:1 for large text.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white border border-gray-300 rounded p-3">
                  <div class="text-neutral-900 font-medium mb-2">
                    ✓ Good Contrast (7.2:1)
                  </div>
                  <div class="text-neutral-900">
                    Dark text on light background
                  </div>
                </div>
                <div class="bg-gray-100 border border-gray-300 rounded p-3">
                  <div class="text-neutral-400 font-medium mb-2">
                    ✗ Poor Contrast (2.1:1)
                  </div>
                  <div class="text-neutral-400">
                    Light gray text on light background
                  </div>
                </div>
              </div>
            </UCard>

            <UCard>
              <h4
                class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
              >
                2.1.1 Keyboard Navigation
              </h4>
              <p class="text-neutral-600 dark:text-neutral-300 mb-4">
                All functionality must be available through keyboard interfaces
                without specific timing requirements.
              </p>
              <div class="bg-gray-50 dark:bg-gray-900 rounded p-4">
                <h5 class="font-medium text-neutral-900 dark:text-white mb-2">
                  Key Navigation Patterns:
                </h5>
                <ul
                  class="text-sm text-neutral-700 dark:text-neutral-300 space-y-1"
                >
                  <li>
                    •
                    <kbd
                      class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs"
                      >Tab</kbd
                    >
                    - Move forward through interactive elements
                  </li>
                  <li>
                    •
                    <kbd
                      class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs"
                      >Shift + Tab</kbd
                    >
                    - Move backward through interactive elements
                  </li>
                  <li>
                    •
                    <kbd
                      class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs"
                      >Enter</kbd
                    >
                    - Activate buttons and links
                  </li>
                  <li>
                    •
                    <kbd
                      class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs"
                      >Space</kbd
                    >
                    - Activate buttons and checkboxes
                  </li>
                  <li>
                    •
                    <kbd
                      class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs"
                      >Arrow Keys</kbd
                    >
                    - Navigate within components
                  </li>
                </ul>
              </div>
            </UCard>

            <UCard>
              <h4
                class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
              >
                3.2.2 On Input
              </h4>
              <p class="text-neutral-600 dark:text-neutral-300">
                Changing form controls should not automatically cause unexpected
                context changes unless users are warned beforehand.
              </p>
            </UCard>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="keyboard"
        title="Keyboard Navigation"
        description="Keyboard navigation and focus management."
      >
        <!-- Focus Management -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Focus Management
          </h3>
          <div class="space-y-6">
            <UCard>
              <h4
                class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
              >
                Focus Indicators
              </h4>
              <p class="text-neutral-600 dark:text-neutral-300 mb-4">
                All interactive elements must have visible focus indicators with
                sufficient contrast.
              </p>
              <div class="space-y-3">
                <UButton
                  class="focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Button with Focus Ring
                </UButton>
                <UInput placeholder="Input with focus indicator" />
                <USelect
                  placeholder="Select with focus indicator"
                  :options="['Option 1', 'Option 2', 'Option 3']"
                />
              </div>
            </UCard>

            <UCard>
              <h4
                class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
              >
                Tab Order
              </h4>
              <p class="text-neutral-600 dark:text-neutral-300 mb-4">
                Interactive elements should follow a logical reading order.
              </p>
              <div class="grid grid-cols-3 gap-4">
                <UButton
                  tabindex="1"
                  size="sm"
                  >First (1)</UButton
                >
                <UButton
                  tabindex="2"
                  size="sm"
                  >Second (2)</UButton
                >
                <UButton
                  tabindex="3"
                  size="sm"
                  >Third (3)</UButton
                >
              </div>
              <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                Try tabbing through these buttons to see the order.
              </p>
            </UCard>
          </div>
        </div>

        <!-- Skip Links -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Skip Navigation
          </h3>
          <UCard>
            <h4
              class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
            >
              Skip Links
            </h4>
            <p class="text-neutral-600 dark:text-neutral-300 mb-4">
              Provide skip links to help keyboard users bypass repetitive
              navigation.
            </p>
            <div class="bg-gray-50 dark:bg-gray-900 rounded p-4">
              <h5 class="font-medium text-neutral-900 dark:text-white mb-2">
                Implementation:
              </h5>
              <pre
                class="text-sm text-neutral-700 dark:text-neutral-300 overflow-x-auto"
              ><code>&lt;a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
&gt;
  Skip to main content
&lt;/a&gt;</code></pre>
            </div>
          </UCard>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="screen-readers"
        title="Screen Reader Support"
        description="ARIA, semantic HTML, and live regions."
      >
        <!-- ARIA Labels -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            ARIA Labels and Descriptions
          </h3>
          <div class="space-y-6">
            <UCard>
              <h4
                class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
              >
                Semantic HTML vs ARIA
              </h4>
              <p class="text-neutral-600 dark:text-neutral-300 mb-4">
                Always prefer semantic HTML elements over ARIA attributes when
                possible.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4"
                >
                  <h5
                    class="font-medium text-green-800 dark:text-green-200 mb-2"
                  >
                    ✓ Good
                  </h5>
                  <pre class="text-sm text-green-700 dark:text-green-300">
                    <code>&lt;button&gt;Submit&lt;/button&gt;</code>
                  </pre>
                </div>
                <div
                  class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4"
                >
                  <h5 class="font-medium text-red-800 dark:text-red-200 mb-2">
                    ✗ Avoid
                  </h5>
                  <pre class="text-sm text-red-700 dark:text-red-300">
                    <code>&lt;div role="button"&gt;Submit&lt;/div&gt;</code>
                  </pre>
                </div>
              </div>
            </UCard>

            <UCard>
              <h4
                class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
              >
                Common ARIA Patterns
              </h4>
              <div class="space-y-4">
                <div>
                  <h5 class="font-medium text-neutral-900 dark:text-white mb-2">
                    Form Labels
                  </h5>
                  <div class="bg-gray-50 dark:bg-gray-900 rounded p-3">
                    <UFormGroup
                      label="Email Address"
                      name="email"
                      required
                    >
                      <UInput
                        type="email"
                        placeholder="Enter your email"
                        aria-describedby="email-help"
                      />
                    </UFormGroup>
                    <p
                      id="email-help"
                      class="text-sm text-neutral-500 dark:text-neutral-400 mt-1"
                    >
                      We'll never share your email with anyone else.
                    </p>
                  </div>
                </div>

                <div>
                  <h5 class="font-medium text-neutral-900 dark:text-white mb-2">
                    Loading States
                  </h5>
                  <div class="bg-gray-50 dark:bg-gray-900 rounded p-3">
                    <UButton
                      loading
                      aria-label="Saving user preferences"
                    >
                      Save
                    </UButton>
                    <div
                      aria-live="polite"
                      aria-atomic="true"
                      class="sr-only"
                    >
                      Saving your preferences...
                    </div>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Live Regions -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Live Regions
          </h3>
          <UCard>
            <h4
              class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
            >
              Dynamic Content Announcements
            </h4>
            <p class="text-neutral-600 dark:text-neutral-300 mb-4">
              Use ARIA live regions to announce dynamic content changes to
              screen readers.
            </p>
            <div class="space-y-4">
              <div class="flex gap-2">
                <UButton
                  size="sm"
                  @click="announceSuccess"
                >
                  Announce Success
                </UButton>
                <UButton
                  size="sm"
                  variant="outline"
                  @click="announceError"
                >
                  Announce Error
                </UButton>
              </div>
              <div
                aria-live="polite"
                aria-atomic="true"
                class="bg-gray-50 dark:bg-gray-900 rounded p-3 min-h-[3rem] flex items-center"
              >
                <span
                  v-if="announcement"
                  class="text-neutral-700 dark:text-neutral-300"
                >
                  {{ announcement }}
                </span>
                <span
                  v-else
                  class="text-neutral-500 dark:text-neutral-400 italic"
                >
                  Announcements will appear here...
                </span>
              </div>
            </div>
          </UCard>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="color-contrast"
        title="Color and Contrast"
        description="Contrast requirements and color accessibility."
      >
        <!-- Contrast Requirements -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Contrast Requirements
          </h3>
          <div class="space-y-6">
            <UCard>
              <h4
                class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
              >
                Text Contrast Standards
              </h4>
              <div class="space-y-4">
                <div>
                  <h5 class="font-medium text-neutral-900 dark:text-white mb-2">
                    Normal Text (14px and above)
                  </h5>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white border rounded p-4">
                      <div class="text-neutral-900 font-medium">
                        4.5:1 Minimum Ratio
                      </div>
                      <div class="text-neutral-900">
                        This text meets AA standards
                      </div>
                      <div class="text-sm text-neutral-600 mt-1">
                        Contrast: 4.5:1
                      </div>
                    </div>
                    <div class="bg-primary text-white border rounded p-4">
                      <div class="font-medium">High Contrast Example</div>
                      <div>White text on primary color</div>
                      <div class="text-sm opacity-90 mt-1">Contrast: 7.2:1</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 class="font-medium text-neutral-900 dark:text-white mb-2">
                    Large Text (18px+ or 14px+ bold)
                  </h5>
                  <div class="bg-white border rounded p-4">
                    <div class="text-neutral-600 text-lg font-medium">
                      3:1 Minimum Ratio
                    </div>
                    <div class="text-neutral-600 text-lg">
                      Large text has lower requirements
                    </div>
                    <div class="text-sm text-neutral-500 mt-1">
                      Contrast: 3.2:1
                    </div>
                  </div>
                </div>
              </div>
            </UCard>

            <UCard>
              <h4
                class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
              >
                Non-Text Elements
              </h4>
              <p class="text-neutral-600 dark:text-neutral-300 mb-4">
                UI components and graphical objects must have a contrast ratio
                of at least 3:1.
              </p>
              <div class="space-y-3">
                <div class="flex items-center gap-4">
                  <UButton variant="outline">Button Border: 3.2:1</UButton>
                  <UInput placeholder="Input Border: 3.1:1" />
                </div>
                <div class="flex items-center gap-4">
                  <Icon
                    name="i-heroicons-information-circle"
                    class="w-6 h-6 text-blue-600"
                  />
                  <span class="text-neutral-700 dark:text-neutral-300"
                    >Icon Contrast: 4.1:1</span
                  >
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Color-blind Considerations -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Color Accessibility
          </h3>
          <UCard>
            <h4
              class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
            >
              Don't Rely on Color Alone
            </h4>
            <p class="text-neutral-600 dark:text-neutral-300 mb-4">
              Always provide additional visual cues beyond color to convey
              information.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4"
              >
                <h5 class="font-medium text-red-800 dark:text-red-200 mb-2">
                  ✗ Color Only
                </h5>
                <div class="flex gap-2">
                  <div class="w-4 h-4 bg-red-500 rounded"></div>
                  <span class="text-red-700 dark:text-red-300"
                    >Error status</span
                  >
                </div>
              </div>
              <div
                class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4"
              >
                <h5 class="font-medium text-green-800 dark:text-green-200 mb-2">
                  ✓ Color + Icon
                </h5>
                <div class="flex items-center gap-2">
                  <Icon
                    name="i-heroicons-x-circle"
                    class="w-4 h-4 text-red-500"
                  />
                  <span class="text-red-700 dark:text-red-300"
                    >Error status</span
                  >
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="testing"
        title="Accessibility Testing"
        description="Testing tools, checklists, and user testing."
      >
        <!-- Testing Tools -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Testing Tools and Methods
          </h3>
          <div class="space-y-6">
            <UCard>
              <h4
                class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
              >
                Automated Testing Tools
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <Icon
                      name="i-heroicons-wrench-screwdriver"
                      class="w-5 h-5 text-blue-500"
                    />
                    <div>
                      <div class="font-medium text-neutral-900 dark:text-white">
                        axe DevTools
                      </div>
                      <div
                        class="text-sm text-neutral-600 dark:text-neutral-300"
                      >
                        Browser extension for accessibility testing
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <Icon
                      name="i-heroicons-wrench-screwdriver"
                      class="w-5 h-5 text-green-500"
                    />
                    <div>
                      <div class="font-medium text-neutral-900 dark:text-white">
                        Lighthouse
                      </div>
                      <div
                        class="text-sm text-neutral-600 dark:text-neutral-300"
                      >
                        Built into Chrome DevTools
                      </div>
                    </div>
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <Icon
                      name="i-heroicons-wrench-screwdriver"
                      class="w-5 h-5 text-purple-500"
                    />
                    <div>
                      <div class="font-medium text-neutral-900 dark:text-white">
                        WAVE
                      </div>
                      <div
                        class="text-sm text-neutral-600 dark:text-neutral-300"
                      >
                        Web accessibility evaluation tool
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <Icon
                      name="i-heroicons-wrench-screwdriver"
                      class="w-5 h-5 text-orange-500"
                    />
                    <div>
                      <div class="font-medium text-neutral-900 dark:text-white">
                        Pa11y
                      </div>
                      <div
                        class="text-sm text-neutral-600 dark:text-neutral-300"
                      >
                        Command line accessibility tester
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>

            <UCard>
              <h4
                class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
              >
                Manual Testing Checklist
              </h4>
              <div class="space-y-3">
                <label class="flex items-start gap-3">
                  <UCheckbox />
                  <span class="text-neutral-700 dark:text-neutral-300"
                    >Navigate entire interface using only keyboard</span
                  >
                </label>
                <label class="flex items-start gap-3">
                  <UCheckbox />
                  <span class="text-neutral-700 dark:text-neutral-300"
                    >Test with screen reader (NVDA, JAWS, or VoiceOver)</span
                  >
                </label>
                <label class="flex items-start gap-3">
                  <UCheckbox />
                  <span class="text-neutral-700 dark:text-neutral-300"
                    >Verify color contrast ratios meet standards</span
                  >
                </label>
                <label class="flex items-start gap-3">
                  <UCheckbox />
                  <span class="text-neutral-700 dark:text-neutral-300"
                    >Test with browser zoom at 200% and 400%</span
                  >
                </label>
                <label class="flex items-start gap-3">
                  <UCheckbox />
                  <span class="text-neutral-700 dark:text-neutral-300"
                    >Validate HTML markup</span
                  >
                </label>
                <label class="flex items-start gap-3">
                  <UCheckbox />
                  <span class="text-neutral-700 dark:text-neutral-300"
                    >Check form labels and error messages</span
                  >
                </label>
              </div>
            </UCard>
          </div>
        </div>

        <!-- User Testing -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            User Testing with Disabilities
          </h3>
          <UCard>
            <h4
              class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
            >
              Best Practices for Inclusive Testing
            </h4>
            <ul class="space-y-3 text-neutral-700 dark:text-neutral-300">
              <li class="flex items-start">
                <span
                  class="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"
                ></span>
                <span
                  >Include users with disabilities in your testing process from
                  early stages</span
                >
              </li>
              <li class="flex items-start">
                <span
                  class="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"
                ></span>
                <span
                  >Test with users who rely on different assistive
                  technologies</span
                >
              </li>
              <li class="flex items-start">
                <span
                  class="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"
                ></span>
                <span>Provide multiple ways for users to provide feedback</span>
              </li>
              <li class="flex items-start">
                <span
                  class="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"
                ></span>
                <span>Document and address accessibility issues promptly</span>
              </li>
              <li class="flex items-start">
                <span
                  class="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"
                ></span>
                <span>Regularly review and update accessibility practices</span>
              </li>
            </ul>
          </UCard>
        </div>
      </DesignPageSection>
    </div>
  </BasePageWrapper>
</template>

<script setup lang="ts">
// SEO meta
definePageMeta({
  title: "Accessibility - RidersDB Design System",
});

// Reactive data for demonstrations
const announcement = ref("");

// Methods
const announceSuccess = () => {
  announcement.value = "Success! Your action was completed successfully.";
  setTimeout(() => {
    announcement.value = "";
  }, 3000);
};

const announceError = () => {
  announcement.value = "Error: Something went wrong. Please try again.";
  setTimeout(() => {
    announcement.value = "";
  }, 3000);
};
</script>
