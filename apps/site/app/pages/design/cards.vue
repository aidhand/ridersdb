<template>
  <BasePageWrapper>
    <DesignPageHeader
      title="Cards"
      description="Card components, patterns, and usage guidelines for the RidersDB design system."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Cards' },
      ]"
      :navigation-items="[]"
    />
    <div class="">
      <DesignPageSection
        id="basic"
        title="Basic Cards"
        description="Basic card patterns and usage."
      >
        <!-- Basic Cards -->
        <section id="basic">
          <div class="space-y-8">
            <!-- Simple Card -->
            <div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Simple Card
              </h3>
              <div class="space-y-4">
                <UCard>
                  <template #header>
                    <h3
                      class="text-lg font-semibold text-gray-900 dark:text-white"
                    >
                      Card Title
                    </h3>
                  </template>

                  <p class="text-gray-600 dark:text-gray-300">
                    This is a basic card with a header and content. Cards are
                    used to group related content together.
                  </p>
                </UCard>

                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                    Code Example
                  </h4>
                  <pre
                    class="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto"
                  ><code>&lt;UCard&gt;
  &lt;template #header&gt;
    &lt;h3&gt;Card Title&lt;/h3&gt;
  &lt;/template&gt;

  &lt;p&gt;Card content goes here&lt;/p&gt;
&lt;/UCard&gt;</code></pre>
                </div>
              </div>
            </div>

            <!-- Card without Header -->
            <div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Card without Header
              </h3>
              <div class="space-y-4">
                <UCard>
                  <p class="text-gray-600 dark:text-gray-300">
                    This card has no header, just content. Useful for simple
                    content blocks.
                  </p>
                </UCard>
              </div>
            </div>

            <!-- Card with Footer -->
            <div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Card with Footer
              </h3>
              <div class="space-y-4">
                <UCard>
                  <template #header>
                    <h3
                      class="text-lg font-semibold text-gray-900 dark:text-white"
                    >
                      Card with Actions
                    </h3>
                  </template>

                  <p class="text-gray-600 dark:text-gray-300 mb-4">
                    This card includes footer actions for user interaction.
                  </p>

                  <template #footer>
                    <div class="flex justify-end space-x-2">
                      <UButton
                        variant="ghost"
                        size="sm"
                        >Cancel</UButton
                      >
                      <UButton size="sm">Save</UButton>
                    </div>
                  </template>
                </UCard>
              </div>
            </div>
          </div>
        </section>
      </DesignPageSection>
      <DesignPageSection
        id="content"
        title="Content Cards"
        description="Cards for content grouping and display."
      >
        <!-- Content Cards -->
        <section id="content">
          <div class="space-y-8">
            <!-- Product Card -->
            <div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Product Card
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <UCard class="overflow-hidden">
                  <div
                    class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-t-lg mb-4"
                  >
                    <BaseImagePlaceholder />
                  </div>

                  <div class="space-y-2">
                    <h4 class="font-semibold text-gray-900 dark:text-white">
                      Product Name
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                      Brief product description goes here
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-lg font-bold text-primary">$99.99</span>
                      <UButton size="sm">Add to Cart</UButton>
                    </div>
                  </div>
                </UCard>

                <UCard class="overflow-hidden">
                  <div
                    class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-t-lg mb-4"
                  >
                    <BaseImagePlaceholder />
                  </div>

                  <div class="space-y-2">
                    <h4 class="font-semibold text-gray-900 dark:text-white">
                      Another Product
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                      Another product description
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-lg font-bold text-primary"
                        >$149.99</span
                      >
                      <UButton size="sm">Add to Cart</UButton>
                    </div>
                  </div>
                </UCard>
              </div>
            </div>

            <!-- Stats Card -->
            <div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Statistics Card
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <UCard>
                  <div class="flex items-center">
                    <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Icon
                        name="i-heroicons-users"
                        class="w-6 h-6 text-blue-600 dark:text-blue-400"
                      />
                    </div>
                    <div class="ml-4">
                      <p
                        class="text-2xl font-bold text-gray-900 dark:text-white"
                      >
                        1,234
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-300">
                        Total Users
                      </p>
                    </div>
                  </div>
                </UCard>

                <UCard>
                  <div class="flex items-center">
                    <div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Icon
                        name="i-heroicons-chart-bar"
                        class="w-6 h-6 text-green-600 dark:text-green-400"
                      />
                    </div>
                    <div class="ml-4">
                      <p
                        class="text-2xl font-bold text-gray-900 dark:text-white"
                      >
                        $12,345
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-300">
                        Revenue
                      </p>
                    </div>
                  </div>
                </UCard>

                <UCard>
                  <div class="flex items-center">
                    <div
                      class="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg"
                    >
                      <Icon
                        name="i-heroicons-shopping-cart"
                        class="w-6 h-6 text-purple-600 dark:text-purple-400"
                      />
                    </div>
                    <div class="ml-4">
                      <p
                        class="text-2xl font-bold text-gray-900 dark:text-white"
                      >
                        567
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-300">
                        Orders
                      </p>
                    </div>
                  </div>
                </UCard>
              </div>
            </div>

            <!-- Profile Card -->
            <div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Profile Card
              </h3>
              <div class="max-w-sm">
                <UCard>
                  <div class="text-center">
                    <UAvatar
                      size="xl"
                      src="https://via.placeholder.com/80x80"
                      alt="User Avatar"
                      class="mx-auto mb-4"
                    />
                    <h3
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-1"
                    >
                      John Doe
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                      Senior Developer
                    </p>
                    <div class="flex justify-center space-x-2">
                      <UButton size="sm">Follow</UButton>
                      <UButton
                        variant="outline"
                        size="sm"
                        >Message</UButton
                      >
                    </div>
                  </div>
                </UCard>
              </div>
            </div>
          </div>
        </section>
      </DesignPageSection>
      <DesignPageSection
        id="interactive"
        title="Interactive Cards"
        description="Cards with interactive and clickable features."
      >
        <!-- Interactive Cards -->
        <section id="interactive">
          <div class="space-y-8">
            <!-- Clickable Cards -->
            <div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Clickable Cards
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UCard
                  class="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  @click="() => {}"
                >
                  <div class="flex items-center">
                    <Icon
                      name="i-heroicons-document-text"
                      class="w-8 h-8 text-blue-500 mr-4"
                    />
                    <div>
                      <h4 class="font-semibold text-gray-900 dark:text-white">
                        Documentation
                      </h4>
                      <p class="text-sm text-gray-600 dark:text-gray-300">
                        View our complete documentation
                      </p>
                    </div>
                  </div>
                </UCard>

                <UCard
                  class="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  @click="() => {}"
                >
                  <div class="flex items-center">
                    <Icon
                      name="i-heroicons-cog-6-tooth"
                      class="w-8 h-8 text-green-500 mr-4"
                    />
                    <div>
                      <h4 class="font-semibold text-gray-900 dark:text-white">
                        Settings
                      </h4>
                      <p class="text-sm text-gray-600 dark:text-gray-300">
                        Configure your preferences
                      </p>
                    </div>
                  </div>
                </UCard>
              </div>
            </div>

            <!-- Cards with Actions -->
            <div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Cards with Actions
              </h3>
              <div class="space-y-4">
                <UCard>
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h4
                        class="font-semibold text-gray-900 dark:text-white mb-2"
                      >
                        Article Title
                      </h4>
                      <p class="text-gray-600 dark:text-gray-300 mb-3">
                        This is a preview of the article content. It provides a
                        brief overview of what the article contains.
                      </p>
                      <div
                        class="flex items-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        <span>Published 2 days ago</span>
                        <span class="mx-2">•</span>
                        <span>5 min read</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <UDropdown
                        :items="[
                          [{ label: 'Edit', icon: 'i-heroicons-pencil' }],
                          [{ label: 'Share', icon: 'i-heroicons-share' }],
                          [
                            {
                              label: 'Delete',
                              icon: 'i-heroicons-trash',
                              class: 'text-red-500',
                            },
                          ],
                        ]"
                      >
                        <UButton
                          variant="ghost"
                          size="sm"
                          icon="i-heroicons-ellipsis-vertical"
                        />
                      </UDropdown>
                    </div>
                  </div>
                </UCard>
              </div>
            </div>
          </div>
        </section>
      </DesignPageSection>
      <DesignPageSection
        id="layouts"
        title="Card Layouts"
        description="Grid, horizontal, and masonry card layouts."
      >
        <!-- Card Layouts -->
        <section id="layouts">
          <div class="space-y-8">
            <!-- Horizontal Layout -->
            <div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Horizontal Card Layout
              </h3>
              <UCard class="overflow-hidden">
                <div class="md:flex">
                  <div
                    class="md:w-48 aspect-video md:aspect-square bg-gray-200 dark:bg-gray-700"
                  >
                    <BaseImagePlaceholder />
                  </div>
                  <div class="p-6 md:flex-1">
                    <h4
                      class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Horizontal Card Title
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                      This is a horizontal card layout that works well for
                      displaying content with images. The image appears on the
                      left while the content flows on the right.
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-500 dark:text-gray-400">
                        January 15, 2024
                      </span>
                      <UButton size="sm">Read More</UButton>
                    </div>
                  </div>
                </div>
              </UCard>
            </div>

            <!-- Grid Layout -->
            <div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Grid Layout
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <UCard
                  v-for="cardItem in 4"
                  :key="cardItem"
                  class="text-center"
                >
                  <Icon
                    name="i-heroicons-star"
                    class="w-12 h-12 text-yellow-500 mx-auto mb-3"
                  />
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                    Feature {{ cardItem }}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Description for feature {{ cardItem }}
                  </p>
                </UCard>
              </div>
            </div>

            <!-- Masonry-style Layout -->
            <div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                Varied Heights Layout
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <UCard>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                    Short Card
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    This is a shorter card with less content.
                  </p>
                </UCard>

                <UCard>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                    Medium Card
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">
                    This card has a bit more content to display, making it
                    taller than the first card but shorter than the third.
                  </p>
                  <UButton size="sm">Action</UButton>
                </UCard>

                <UCard>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                    Tall Card
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">
                    This card contains significantly more content than the
                    others. It demonstrates how cards can have varying heights
                    while maintaining a consistent design. The layout adapts
                    gracefully to different content lengths.
                  </p>
                  <div class="space-y-2">
                    <UButton
                      size="sm"
                      block
                      >Primary Action</UButton
                    >
                    <UButton
                      variant="outline"
                      size="sm"
                      block
                      >Secondary Action</UButton
                    >
                  </div>
                </UCard>
              </div>
            </div>
          </div>
        </section>
      </DesignPageSection>
      <DesignPageSection
        id="accessibility"
        title="Card Accessibility"
        description="Accessibility guidelines for card components."
      >
        <!-- Accessibility -->
        <section id="accessibility">
          <div class="space-y-6">
            <div
              class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6"
            >
              <h3
                class="text-lg font-semibold text-green-800 dark:text-green-200 mb-4"
              >
                Accessibility Guidelines
              </h3>
              <ul class="space-y-3 text-green-700 dark:text-green-300">
                <li class="flex items-start">
                  <Icon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                  />
                  <span
                    ><strong>Semantic structure:</strong> Use proper heading
                    hierarchy within cards</span
                  >
                </li>
                <li class="flex items-start">
                  <Icon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                  />
                  <span
                    ><strong>Keyboard navigation:</strong> Ensure all
                    interactive elements are keyboard accessible</span
                  >
                </li>
                <li class="flex items-start">
                  <Icon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                  />
                  <span
                    ><strong>Focus indicators:</strong> Provide clear visual
                    focus states for clickable cards</span
                  >
                </li>
                <li class="flex items-start">
                  <Icon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                  />
                  <span
                    ><strong>Alt text:</strong> Include descriptive alt text for
                    images in cards</span
                  >
                </li>
                <li class="flex items-start">
                  <Icon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                  />
                  <span
                    ><strong>Color contrast:</strong> Ensure sufficient contrast
                    between text and background</span
                  >
                </li>
                <li class="flex items-start">
                  <Icon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                  />
                  <span
                    ><strong>Screen reader support:</strong> Use appropriate
                    ARIA labels and roles when needed</span
                  >
                </li>
              </ul>
            </div>

            <div
              class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
            >
              <h3
                class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4"
              >
                Interactive Card Best Practices
              </h3>
              <ul class="space-y-2 text-blue-700 dark:text-blue-300">
                <li>
                  • Use button elements for clickable cards, not div elements
                </li>
                <li>• Provide clear hover and focus states</li>
                <li>
                  • Include keyboard event handlers (Enter and Space keys)
                </li>
                <li>
                  • Use role="button" and tabindex="0" for non-button clickable
                  elements
                </li>
                <li>• Announce dynamic content changes to screen readers</li>
              </ul>
            </div>

            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              >
                Code Example: Accessible Clickable Card
              </h3>
              <pre
                class="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto"
              ><code>&lt;UCard
  role="button"
  tabindex="0"
  class="cursor-pointer focus:ring-2 focus:ring-primary"
  @click="handleClick"
  @keydown.enter="handleClick"
  @keydown.space="handleClick"
  :aria-label="cardAriaLabel"
&gt;
  &lt;!-- Card content --&gt;
&lt;/UCard&gt;</code></pre>
            </div>
          </div>
        </section>
      </DesignPageSection>
    </div>
  </BasePageWrapper>
</template>

<script setup lang="ts">
// SEO meta
definePageMeta({
  title: "Cards - RidersDB Design System",
});
</script>
