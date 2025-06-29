<template>
  <BasePageWrapper>
    <DesignPageHeader
      title="Navigation"
      description="Navigation components, patterns, and guidelines for the RidersDB design system."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'Navigation' },
      ]"
      :navigation-items="[]"
    />
    <div class="">
      <DesignPageSection
        id="breadcrumbs"
        title="Breadcrumbs"
        description="Breadcrumb navigation patterns and usage."
      >
        <!-- Breadcrumbs -->
        <div class="space-y-8">
          <!-- Basic Breadcrumbs -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Basic Breadcrumbs
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div class="space-y-4">
                <BaseBreadcrumbs
                  :items="[
                    { label: 'Home', to: '/' },
                    { label: 'Products', to: '/products' },
                    { label: 'Electronics', to: '/products/electronics' },
                    { label: 'Laptops', to: '/products/electronics/laptops' },
                  ]"
                />

                <BaseBreadcrumbs
                  :items="[
                    { label: 'Design System', to: '/design' },
                    { label: 'Components', to: '/design/components' },
                    { label: 'Navigation', to: '/design/navigation' },
                  ]"
                />
              </div>
            </div>
            <DesignCodeBlock
              title="Code Example"
              language="vue"
              :code="breadcrumbsExample"
            />
          </div>

          <!-- Breadcrumb Guidelines -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Usage Guidelines
            </h3>
            <div
              class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8"
            >
              <ul class="space-y-4 text-blue-800 dark:text-blue-200">
                <li class="flex items-start">
                  <span
                    class="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"
                  ></span>
                  <span class="text-lg"
                    ><strong>Show hierarchy:</strong> Display the path from home
                    to current page</span
                  >
                </li>
                <li class="flex items-start">
                  <span
                    class="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"
                  ></span>
                  <span class="text-lg"
                    ><strong>Keep it simple:</strong> Don't include every level
                    if hierarchy is too deep</span
                  >
                </li>
                <li class="flex items-start">
                  <span
                    class="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"
                  ></span>
                  <span class="text-lg"
                    ><strong>Current page:</strong> Show current page as
                    non-clickable text</span
                  >
                </li>
                <li class="flex items-start">
                  <span
                    class="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"
                  ></span>
                  <span class="text-lg"
                    ><strong>Clear separators:</strong> Use consistent
                    separators between levels</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="tabs"
        title="Tabs"
        description="Tab navigation patterns and usage."
      >
        <!-- Tabs -->
        <div class="space-y-8">
          <!-- Basic Tabs -->
          <div>
            <h3
              class="text-xl font-semibent text-gray-900 dark:text-white mb-4"
            >
              Basic Tabs
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <UTabs
                :items="[
                  { label: 'Overview', slot: 'overview' },
                  { label: 'Details', slot: 'details' },
                  { label: 'Specifications', slot: 'specs' },
                  { label: 'Reviews', slot: 'reviews' },
                ]"
              >
                <template #overview>
                  <div class="py-4">
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Overview
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      This is the overview tab content. It provides a general
                      introduction to the topic.
                    </p>
                  </div>
                </template>

                <template #details>
                  <div class="py-4">
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Details
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Detailed information about the product or service goes
                      here.
                    </p>
                  </div>
                </template>

                <template #specs>
                  <div class="py-4">
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Specifications
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Technical specifications and requirements are listed here.
                    </p>
                  </div>
                </template>

                <template #reviews>
                  <div class="py-4">
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Reviews
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Customer reviews and ratings appear in this section.
                    </p>
                  </div>
                </template>
              </UTabs>
            </div>
          </div>

          <!-- Vertical Tabs -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Vertical Tabs
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <UTabs
                orientation="vertical"
                :items="[
                  {
                    label: 'Account',
                    slot: 'account',
                    icon: 'i-heroicons-user',
                  },
                  {
                    label: 'Security',
                    slot: 'security',
                    icon: 'i-heroicons-shield-check',
                  },
                  {
                    label: 'Notifications',
                    slot: 'notifications',
                    icon: 'i-heroicons-bell',
                  },
                  {
                    label: 'Billing',
                    slot: 'billing',
                    icon: 'i-heroicons-credit-card',
                  },
                ]"
              >
                <template #account>
                  <div class="py-4 pl-6">
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Account Settings
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Manage your account information and preferences.
                    </p>
                  </div>
                </template>

                <template #security>
                  <div class="py-4 pl-6">
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Security Settings
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Configure security options and two-factor authentication.
                    </p>
                  </div>
                </template>

                <template #notifications>
                  <div class="py-4 pl-6">
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Notification Preferences
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Choose how and when you want to receive notifications.
                    </p>
                  </div>
                </template>

                <template #billing>
                  <div class="py-4 pl-6">
                    <h4
                      class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Billing Information
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Manage your payment methods and billing history.
                    </p>
                  </div>
                </template>
              </UTabs>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="pagination"
        title="Pagination"
        description="Pagination patterns and usage."
      >
        <!-- Pagination -->
        <div class="space-y-8">
          <!-- Basic Pagination -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Basic Pagination
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div class="space-y-6">
                <UPagination
                  v-model="currentPage"
                  :page-count="10"
                  :total="100"
                />

                <UPagination
                  v-model="currentPage2"
                  :page-count="20"
                  :total="200"
                  :max="7"
                />
              </div>
            </div>
            <DesignCodeBlock
              title="Code Example"
              language="vue"
              :code="paginationExample"
            />
          </div>

          <!-- Pagination with Info -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Pagination with Information
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div
                class="flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Showing {{ (currentPage3 - 1) * 10 + 1 }} to
                  {{ Math.min(currentPage3 * 10, 87) }} of 87 results
                </p>
                <UPagination
                  v-model="currentPage3"
                  :page-count="9"
                  :total="87"
                />
              </div>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="menus"
        title="Menus & Dropdowns"
        description="Menu and dropdown navigation patterns."
      >
        <!-- Menus -->
        <div class="space-y-8">
          <!-- Dropdown Menu -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Dropdown Menu
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div class="flex flex-wrap gap-4">
                <UDropdown
                  :items="[
                    [{ label: 'Profile', icon: 'i-heroicons-user' }],
                    [{ label: 'Settings', icon: 'i-heroicons-cog-6-tooth' }],
                    [
                      {
                        label: 'Sign out',
                        icon: 'i-heroicons-arrow-right-on-rectangle',
                      },
                    ],
                  ]"
                >
                  <UButton variant="outline">
                    Account
                    <Icon
                      name="i-heroicons-chevron-down"
                      class="w-4 h-4 ml-2"
                    />
                  </UButton>
                </UDropdown>

                <UDropdown
                  :items="[
                    [
                      {
                        label: 'New File',
                        icon: 'i-heroicons-document-plus',
                        shortcuts: ['⌘', 'N'],
                      },
                      {
                        label: 'New Folder',
                        icon: 'i-heroicons-folder-plus',
                        shortcuts: ['⌘', 'Shift', 'N'],
                      },
                    ],
                    [
                      {
                        label: 'Open',
                        icon: 'i-heroicons-folder-open',
                        shortcuts: ['⌘', 'O'],
                      },
                      {
                        label: 'Save',
                        icon: 'i-heroicons-document-arrow-down',
                        shortcuts: ['⌘', 'S'],
                      },
                    ],
                    [
                      {
                        label: 'Delete',
                        icon: 'i-heroicons-trash',
                        class: 'text-red-500',
                        shortcuts: ['⌫'],
                      },
                    ],
                  ]"
                >
                  <UButton variant="outline">
                    File
                    <Icon
                      name="i-heroicons-chevron-down"
                      class="w-4 h-4 ml-2"
                    />
                  </UButton>
                </UDropdown>
              </div>
            </div>
          </div>

          <!-- Command Palette Style -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Command Menu
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <UCommandPalette
                :groups="[
                  {
                    id: 'recent',
                    label: 'Recent',
                    items: [
                      {
                        id: 'dashboard',
                        label: 'Dashboard',
                        icon: 'i-heroicons-home',
                      },
                      {
                        id: 'products',
                        label: 'Products',
                        icon: 'i-heroicons-cube',
                      },
                      {
                        id: 'users',
                        label: 'Users',
                        icon: 'i-heroicons-users',
                      },
                    ],
                  },
                  {
                    id: 'actions',
                    label: 'Actions',
                    items: [
                      {
                        id: 'create',
                        label: 'Create New',
                        icon: 'i-heroicons-plus',
                      },
                      {
                        id: 'search',
                        label: 'Search',
                        icon: 'i-heroicons-magnifying-glass',
                      },
                      {
                        id: 'help',
                        label: 'Help & Support',
                        icon: 'i-heroicons-question-mark-circle',
                      },
                    ],
                  },
                ]"
                placeholder="Search commands..."
              />
            </div>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="patterns"
        title="Navigation Patterns"
        description="Sidebar, wizard, and other navigation patterns."
      >
        <!-- Navigation Patterns -->
        <div class="space-y-8">
          <!-- Sidebar Navigation -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Sidebar Navigation
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div class="flex h-64">
                <div
                  class="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700"
                >
                  <nav class="p-4 space-y-2">
                    <a
                      href="#"
                      class="flex items-center px-3 py-2 text-sm font-medium text-white bg-primary rounded-md"
                    >
                      <Icon
                        name="i-heroicons-home"
                        class="w-5 h-5 mr-3"
                      />
                      Dashboard
                    </a>
                    <a
                      href="#"
                      class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                      <Icon
                        name="i-heroicons-cube"
                        class="w-5 h-5 mr-3"
                      />
                      Products
                    </a>
                    <a
                      href="#"
                      class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                      <Icon
                        name="i-heroicons-users"
                        class="w-5 h-5 mr-3"
                      />
                      Users
                    </a>
                    <a
                      href="#"
                      class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    >
                      <Icon
                        name="i-heroicons-chart-bar"
                        class="w-5 h-5 mr-3"
                      />
                      Analytics
                    </a>
                  </nav>
                </div>
                <div class="flex-1 p-6">
                  <h4
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    Main Content Area
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    This is where the main content would appear based on the
                    selected navigation item.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Steps/Wizard Navigation -->
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              Step Navigation (Wizard)
            </h3>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium"
                    >
                      ✓
                    </div>
                    <span
                      class="ml-2 text-sm font-medium text-green-600 dark:text-green-400"
                      >Account</span
                    >
                  </div>
                  <div class="w-16 h-0.5 bg-green-500"></div>
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium"
                    >
                      2
                    </div>
                    <span class="ml-2 text-sm font-medium text-primary"
                      >Profile</span
                    >
                  </div>
                  <div class="w-16 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center text-sm font-medium"
                    >
                      3
                    </div>
                    <span class="ml-2 text-sm text-gray-600 dark:text-gray-300"
                      >Preferences</span
                    >
                  </div>
                  <div class="w-16 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center text-sm font-medium"
                    >
                      4
                    </div>
                    <span class="ml-2 text-sm text-gray-600 dark:text-gray-300"
                      >Review</span
                    >
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h4
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                >
                  Step 2: Profile Information
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  Complete your profile to continue with the setup process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="accessibility"
        title="Navigation Accessibility"
        description="Accessibility guidelines for navigation components."
      >
        <!-- Accessibility -->
        <div class="space-y-6">
          <div
            class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6"
          >
            <h3
              class="text-lg font-semibold text-green-800 dark:text-green-200 mb-4"
            >
              Navigation Accessibility Best Practices
            </h3>
            <ul class="space-y-3 text-green-700 dark:text-green-300">
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  ><strong>Keyboard navigation:</strong> Ensure all navigation
                  elements are keyboard accessible</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  ><strong>Focus management:</strong> Provide clear focus
                  indicators and logical tab order</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  ><strong>ARIA labels:</strong> Use proper ARIA attributes for
                  complex navigation</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  ><strong>Skip links:</strong> Provide skip navigation links
                  for screen reader users</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  ><strong>Current page indication:</strong> Clearly mark the
                  current page or section</span
                >
              </li>
              <li class="flex items-start">
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
                />
                <span
                  ><strong>Consistent patterns:</strong> Use consistent
                  navigation patterns throughout the app</span
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
              ARIA Navigation Roles
            </h3>
            <div class="space-y-3 text-blue-700 dark:text-blue-300">
              <div>
                <code
                  class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-sm"
                  >role="navigation"</code
                >
                <span class="ml-2">- Main navigation areas</span>
              </div>
              <div>
                <code
                  class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-sm"
                  >role="tablist"</code
                >
                <span class="ml-2">- Tab navigation containers</span>
              </div>
              <div>
                <code
                  class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-sm"
                  >role="menubar"</code
                >
                <span class="ml-2">- Menu navigation bars</span>
              </div>
              <div>
                <code
                  class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-sm"
                  >aria-current="page"</code
                >
                <span class="ml-2">- Current page indicator</span>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              Mobile Navigation Considerations
            </h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Touch targets should be at least 44x44 pixels</li>
              <li>• Consider hamburger menus for space-constrained layouts</li>
              <li>• Provide clear visual feedback for touch interactions</li>
              <li>
                • Ensure navigation is accessible via swipe gestures when
                appropriate
              </li>
              <li>• Test navigation with screen readers on mobile devices</li>
            </ul>
          </div>
        </div>
      </DesignPageSection>
    </div>
  </BasePageWrapper>
</template>

<script setup lang="ts">
// SEO meta
definePageMeta({
  title: "Navigation - RidersDB Design System",
});

// Reactive data for pagination examples
const currentPage = ref(1);
const currentPage2 = ref(1);
const currentPage3 = ref(1);

// Code examples
const breadcrumbsExample = `<BaseBreadcrumbs
  :items="[
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Current Page', to: '/products/current' }
  ]"
/>`;

const paginationExample = `<UPagination
  v-model="currentPage"
  :page-count="10"
  :total="100"
/>`;
</script>
