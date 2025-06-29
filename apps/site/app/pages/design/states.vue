<template>
  <BasePageWrapper>
    <DesignPageHeader
      title="States"
      description="Component states and feedback patterns for the RidersDB design system."
      :breadcrumbs="[
        { label: 'Design System', to: '/design', icon: 'i-tabler-palette' },
        { label: 'States' },
      ]"
      :navigation-items="[]"
    />
    <div class="">
      <DesignPageSection
        id="loading"
        title="Loading States"
        description="Loading, skeletons, and spinner patterns."
      >
        <!-- Skeletons -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Skeleton Loaders
          </h3>
          <div
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <div class="space-y-6">
              <!-- Card Skeleton -->
              <div>
                <h4
                  class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
                >
                  Card Skeleton
                </h4>
                <div class="max-w-sm">
                  <BaseSkeletonLoader>
                    <div class="space-y-4">
                      <div
                        class="w-full h-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"
                      ></div>
                      <div class="space-y-2">
                        <div
                          class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"
                        ></div>
                        <div
                          class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-3/4"
                        ></div>
                        <div
                          class="h-6 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-1/2"
                        ></div>
                      </div>
                    </div>
                  </BaseSkeletonLoader>
                </div>
              </div>

              <!-- List Skeleton -->
              <div>
                <h4
                  class="text-lg font-semibold text-neutral-900 dark:text-white mb-3"
                >
                  List Skeleton
                </h4>
                <BaseSkeletonLoader>
                  <div class="space-y-3">
                    <div
                      v-for="itemIndex in 4"
                      :key="itemIndex"
                      class="flex items-center space-x-3"
                    >
                      <div
                        class="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse"
                      ></div>
                      <div class="flex-1 space-y-2">
                        <div
                          class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"
                        ></div>
                        <div
                          class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-2/3"
                        ></div>
                      </div>
                    </div>
                  </div>
                </BaseSkeletonLoader>
              </div>
            </div>
          </div>
        </div>

        <!-- Spinners -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Loading Spinners
          </h3>
          <div
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="mb-3">
                  <Icon
                    name="i-heroicons-arrow-path"
                    class="w-8 h-8 mx-auto text-primary animate-spin"
                  />
                </div>
                <p class="text-sm text-neutral-600 dark:text-neutral-300">
                  Loading...
                </p>
              </div>

              <div class="text-center">
                <BaseLoadingState size="sm" />
                <p class="text-sm text-neutral-600 dark:text-neutral-300 mt-2">
                  Small Spinner
                </p>
              </div>

              <div class="text-center">
                <BaseLoadingState />
                <p class="text-sm text-neutral-600 dark:text-neutral-300 mt-2">
                  Default Spinner
                </p>
              </div>
            </div>
          </div>

          <div class="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h4 class="font-medium text-neutral-900 dark:text-white mb-2">
              Code Example
            </h4>
            <pre
              class="text-sm text-gray-700 dark:text-neutral-300 overflow-x-auto"
            ><code>&lt;BaseLoadingState /&gt;

&lt;!-- With custom size --&gt;
&lt;BaseLoadingState size="sm" /&gt;

&lt;!-- With message --&gt;
&lt;BaseLoadingState message="Loading products..." /&gt;</code></pre>
          </div>
        </div>

        <!-- Loading Buttons -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Loading Buttons
          </h3>
          <div
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <div class="flex flex-wrap gap-4">
              <UButton loading> Saving... </UButton>

              <UButton
                loading
                variant="outline"
              >
                Processing
              </UButton>

              <UButton
                loading
                variant="ghost"
              >
                Loading
              </UButton>

              <UButton
                loading
                size="sm"
              >
                Submit
              </UButton>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="empty"
        title="Empty States"
        description="Patterns for empty and zero-data states."
      >
        <!-- Basic Empty State -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Basic Empty State
          </h3>
          <div
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <BaseEmptyState
              icon="i-heroicons-inbox"
              title="No items found"
              description="There are no items to display at the moment."
            >
              <UButton>Add Item</UButton>
            </BaseEmptyState>
          </div>
        </div>

        <!-- Empty State Variations -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Empty State Variations
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- No Search Results -->
            <div
              class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
            >
              <BaseEmptyState
                icon="i-heroicons-magnifying-glass"
                title="No search results"
                description="We couldn't find any items matching your search criteria."
              >
                <div class="flex gap-2">
                  <UButton
                    variant="outline"
                    size="sm"
                    >Clear Search</UButton
                  >
                  <UButton size="sm">Browse All</UButton>
                </div>
              </BaseEmptyState>
            </div>

            <!-- No Products -->
            <div
              class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
            >
              <BaseEmptyState
                icon="i-heroicons-cube"
                title="No products yet"
                description="Start by adding your first product to get started."
              >
                <UButton>Add Product</UButton>
              </BaseEmptyState>
            </div>

            <!-- No Notifications -->
            <div
              class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
            >
              <BaseEmptyState
                icon="i-heroicons-bell"
                title="All caught up!"
                description="You have no new notifications."
              />
            </div>

            <!-- No Messages -->
            <div
              class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
            >
              <BaseEmptyState
                icon="i-heroicons-chat-bubble-left-right"
                title="No messages"
                description="Start a conversation to see messages here."
              >
                <UButton>Send Message</UButton>
              </BaseEmptyState>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="error"
        title="Error States"
        description="Error and failure state patterns."
      >
        <!-- Basic Error State -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Basic Error State
          </h3>
          <div
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <BaseErrorState
              title="Something went wrong"
              description="We encountered an error while loading the data. Please try again."
            >
              <div class="flex gap-2">
                <UButton variant="outline">Go Back</UButton>
                <UButton>Try Again</UButton>
              </div>
            </BaseErrorState>
          </div>
        </div>

        <!-- Error State Variations -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Error State Variations
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Network Error -->
            <div
              class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
            >
              <BaseErrorState
                icon="i-heroicons-wifi"
                title="Connection lost"
                description="Please check your internet connection and try again."
              >
                <UButton>Retry</UButton>
              </BaseErrorState>
            </div>

            <!-- 404 Error -->
            <div
              class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
            >
              <BaseErrorState
                icon="i-heroicons-magnifying-glass"
                title="Page not found"
                description="The page you're looking for doesn't exist or has been moved."
              >
                <UButton>Go Home</UButton>
              </BaseErrorState>
            </div>

            <!-- Permission Error -->
            <div
              class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
            >
              <BaseErrorState
                icon="i-heroicons-lock-closed"
                title="Access denied"
                description="You don't have permission to view this content."
              >
                <UButton>Request Access</UButton>
              </BaseErrorState>
            </div>

            <!-- Server Error -->
            <div
              class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
            >
              <BaseErrorState
                icon="i-heroicons-server"
                title="Server error"
                description="Our servers are experiencing issues. Please try again later."
              >
                <UButton>Try Again</UButton>
              </BaseErrorState>
            </div>
          </div>
        </div>

        <!-- Inline Errors -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Inline Error Messages
          </h3>
          <div
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <div class="space-y-4">
              <UAlert
                icon="i-heroicons-exclamation-triangle"
                color="error"
                variant="subtle"
                title="Validation Error"
                description="Please fix the errors below and try again."
              />

              <UAlert
                icon="i-heroicons-x-circle"
                color="error"
                variant="solid"
                title="Upload Failed"
                description="The file could not be uploaded. Please check the file format and size."
              />

              <UAlert
                icon="i-heroicons-wifi"
                color="warning"
                variant="outline"
                title="Connection Issues"
                description="We're having trouble connecting to our servers. Some features may be limited."
              />
            </div>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="interactive"
        title="Interactive States"
        description="Interactive and focus state patterns."
      >
        <!-- Button States -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Button States
          </h3>
          <div
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center space-y-2">
                <UButton>Default</UButton>
                <p class="text-xs text-gray-500">Normal</p>
              </div>

              <div class="text-center space-y-2">
                <UButton class="hover:bg-primary-600">Hover</UButton>
                <p class="text-xs text-gray-500">Hover</p>
              </div>

              <div class="text-center space-y-2">
                <UButton class="focus:ring-2 focus:ring-primary">Focus</UButton>
                <p class="text-xs text-gray-500">Focus</p>
              </div>

              <div class="text-center space-y-2">
                <UButton disabled>Disabled</UButton>
                <p class="text-xs text-gray-500">Disabled</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Input States -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Input States
          </h3>
          <div
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <div class="space-y-4 max-w-md">
              <UFormGroup
                label="Default Input"
                name="default"
              >
                <UInput placeholder="Normal state" />
              </UFormGroup>

              <UFormGroup
                label="Focused Input"
                name="focused"
              >
                <UInput
                  placeholder="Focused state"
                  class="ring-2 ring-primary"
                />
              </UFormGroup>

              <UFormGroup
                label="Valid Input"
                name="valid"
              >
                <UInput
                  placeholder="Valid input"
                  color="success"
                  trailing-icon="i-heroicons-check-circle"
                />
              </UFormGroup>

              <UFormGroup
                label="Invalid Input"
                name="invalid"
                error="This field is required"
              >
                <UInput
                  placeholder="Invalid input"
                  color="error"
                />
              </UFormGroup>

              <UFormGroup
                label="Disabled Input"
                name="disabled"
              >
                <UInput
                  placeholder="Disabled input"
                  disabled
                />
              </UFormGroup>
            </div>
          </div>
        </div>

        <!-- Card Hover States -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Card Interactive States
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UCard class="transition-all duration-200">
              <h4 class="font-semibold text-neutral-900 dark:text-white mb-2">
                Static Card
              </h4>
              <p class="text-neutral-600 dark:text-neutral-300">
                This card has no interactive states.
              </p>
            </UCard>

            <UCard
              class="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <h4 class="font-semibold text-neutral-900 dark:text-white mb-2">
                Interactive Card
              </h4>
              <p class="text-neutral-600 dark:text-neutral-300">
                This card responds to hover and focus states.
              </p>
            </UCard>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="feedback"
        title="Feedback & Notifications"
        description="Feedback, toast, and notification patterns."
      >
        <!-- Toast Notifications -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Toast Notifications
          </h3>
          <div
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <div class="space-y-4">
              <div class="flex gap-4">
                <UButton @click="showSuccessToast">Show Success</UButton>
                <UButton
                  variant="outline"
                  @click="showErrorToast"
                  >Show Error</UButton
                >
                <UButton
                  variant="ghost"
                  @click="showWarningToast"
                  >Show Warning</UButton
                >
                <UButton
                  variant="soft"
                  @click="showInfoToast"
                  >Show Info</UButton
                >
              </div>

              <div class="text-sm text-neutral-600 dark:text-neutral-300">
                Click the buttons above to see different toast notification
                types.
              </div>
            </div>
          </div>
        </div>

        <!-- Progress States -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Progress Indicators
          </h3>
          <div
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <div class="space-y-6">
              <div>
                <div
                  class="flex justify-between text-sm text-neutral-600 dark:text-neutral-300 mb-2"
                >
                  <span>Progress</span>
                  <span>{{ progressValue }}%</span>
                </div>
                <UProgress :value="progressValue" />
              </div>

              <div>
                <div
                  class="flex justify-between text-sm text-neutral-600 dark:text-neutral-300 mb-2"
                >
                  <span>Upload Progress</span>
                  <span>3 of 5 files</span>
                </div>
                <UProgress
                  :value="60"
                  color="success"
                />
              </div>

              <div>
                <div
                  class="flex justify-between text-sm text-neutral-600 dark:text-neutral-300 mb-2"
                >
                  <span>Loading...</span>
                  <span>Indeterminate</span>
                </div>
                <UProgress animation="carousel" />
              </div>
              <div class="flex gap-2">
                <UButton
                  size="sm"
                  variant="outline"
                  @click="decreaseProgress"
                  >Decrease</UButton
                >
                <UButton
                  size="sm"
                  @click="increaseProgress"
                  >Increase</UButton
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Badge States -->
        <div>
          <h3
            class="text-xl font-semibold text-neutral-900 dark:text-white mb-4"
          >
            Status Badges
          </h3>
          <div
            class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <div class="flex flex-wrap gap-3">
              <UBadge
                color="success"
                variant="solid"
                size="lg"
              >
                <Icon
                  name="i-heroicons-check-circle"
                  class="w-4 h-4 mr-2"
                />
                Success
              </UBadge>

              <UBadge
                color="error"
                variant="solid"
                size="lg"
              >
                <Icon
                  name="i-heroicons-x-circle"
                  class="w-4 h-4 mr-2"
                />
                Error
              </UBadge>

              <UBadge
                color="warning"
                variant="solid"
                size="lg"
              >
                <Icon
                  name="i-heroicons-exclamation-triangle"
                  class="w-4 h-4 mr-2"
                />
                Warning
              </UBadge>

              <UBadge
                color="primary"
                variant="solid"
                size="lg"
              >
                <Icon
                  name="i-heroicons-information-circle"
                  class="w-4 h-4 mr-2"
                />
                Info
              </UBadge>

              <UBadge
                color="neutral"
                variant="solid"
                size="lg"
              >
                <Icon
                  name="i-heroicons-pause-circle"
                  class="w-4 h-4 mr-2"
                />
                Pending
              </UBadge>

              <UBadge
                color="warning"
                variant="outline"
                size="lg"
              >
                <Icon
                  name="i-heroicons-shield-exclamation"
                  class="w-4 h-4 mr-2"
                />
                Caution
              </UBadge>
            </div>
          </div>
        </div>
      </DesignPageSection>

      <DesignPageSection
        id="guidelines"
        title="State Guidelines"
        description="Guidelines for state design and accessibility."
      >
        <div class="space-y-6">
          <div
            class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
          >
            <h3
              class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4"
            >
              State Design Principles
            </h3>
            <ul class="space-y-3 text-blue-700 dark:text-blue-300">
              <li class="flex items-start">
                <span
                  class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"
                ></span>
                <span
                  ><strong>Immediate feedback:</strong> Provide instant visual
                  response to user interactions</span
                >
              </li>
              <li class="flex items-start">
                <span
                  class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"
                ></span>
                <span
                  ><strong>Clear communication:</strong> Use descriptive
                  messaging that explains what's happening</span
                >
              </li>
              <li class="flex items-start">
                <span
                  class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"
                ></span>
                <span
                  ><strong>Consistent patterns:</strong> Use the same state
                  patterns throughout the application</span
                >
              </li>
              <li class="flex items-start">
                <span
                  class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"
                ></span>
                <span
                  ><strong>Progressive disclosure:</strong> Show appropriate
                  detail level for each state</span
                >
              </li>
            </ul>
          </div>

          <div
            class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6"
          >
            <h3
              class="text-lg font-semibold text-green-800 dark:text-green-200 mb-4"
            >
              Loading State Best Practices
            </h3>
            <ul class="space-y-2 text-green-700 dark:text-green-300">
              <li>
                • Use skeleton screens for content that takes longer than 1
                second to load
              </li>
              <li>
                • Show spinners for actions that complete within 2-3 seconds
              </li>
              <li>• Provide progress indicators for long-running operations</li>
              <li>
                • Use optimistic UI updates when possible to reduce perceived
                loading time
              </li>
              <li>• Include estimated time remaining for lengthy processes</li>
            </ul>
          </div>

          <div
            class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6"
          >
            <h3
              class="text-lg font-semibold text-red-800 dark:text-red-200 mb-4"
            >
              Error Handling Guidelines
            </h3>
            <ul class="space-y-2 text-red-700 dark:text-red-300">
              <li>• Always provide a clear explanation of what went wrong</li>
              <li>• Offer actionable solutions or next steps</li>
              <li>
                • Use appropriate error severity levels (error, warning, info)
              </li>
              <li>
                • Maintain context - don't navigate users away from their
                current task
              </li>
              <li>
                • Log errors appropriately for debugging while showing
                user-friendly messages
              </li>
            </ul>
          </div>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3
              class="text-lg font-semibold text-neutral-900 dark:text-white mb-4"
            >
              Accessibility Considerations
            </h3>
            <ul class="space-y-2 text-gray-700 dark:text-neutral-300">
              <li>
                • Use ARIA live regions to announce state changes to screen
                readers
              </li>
              <li>
                • Ensure loading states don't interfere with keyboard navigation
              </li>
              <li>• Provide alternative text for visual state indicators</li>
              <li>• Use sufficient color contrast for all state variations</li>
              <li>• Test all states with assistive technologies</li>
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
  title: "States - RidersDB Design System",
});

// Reactive data
const progressValue = ref(45);
const toast = useToast();

// Methods
const increaseProgress = () => {
  if (progressValue.value < 100) {
    progressValue.value += 10;
  }
};

const decreaseProgress = () => {
  if (progressValue.value > 0) {
    progressValue.value -= 10;
  }
};

const showSuccessToast = () => {
  toast.add({
    title: "Success!",
    description: "Your action was completed successfully.",
    color: "success",
  });
};

const showErrorToast = () => {
  toast.add({
    title: "Error occurred",
    description: "Something went wrong. Please try again.",
    color: "error",
  });
};

const showWarningToast = () => {
  toast.add({
    title: "Warning",
    description: "Please review your input before continuing.",
    color: "warning",
  });
};

const showInfoToast = () => {
  toast.add({
    title: "Information",
    description: "Here is some helpful information for you.",
    color: "info",
  });
};
</script>
