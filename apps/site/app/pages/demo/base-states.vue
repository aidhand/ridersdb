<template>
  <BasePageWrapper>
    <div class="space-y-8">
      <div class="text-center space-y-4">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Base State Components Demo
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Demonstration of reusable loading, error, empty, and skeleton states
        </p>
      </div>

      <!-- Controls -->
      <div class="flex flex-wrap justify-center gap-4">
        <button
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            currentState === 'loading' ?
              'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="currentState = 'loading'"
        >
          Loading State
        </button>
        <button
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            currentState === 'error' ?
              'bg-red-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="currentState = 'error'"
        >
          Error State
        </button>
        <button
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            currentState === 'empty' ?
              'bg-green-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="currentState = 'empty'"
        >
          Empty State
        </button>
        <button
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            currentState === 'skeleton' ?
              'bg-purple-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="currentState = 'skeleton'"
        >
          Skeleton Loader
        </button>
        <button
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            currentState === 'productSkeleton' ?
              'bg-orange-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="currentState = 'productSkeleton'"
        >
          Product Skeleton
        </button>
      </div>

      <!-- Demo Area -->
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 min-h-[400px]"
      >
        <!-- Loading State -->
        <BaseLoadingState
          v-if="currentState === 'loading'"
          title="Loading demo content..."
          description="This is a demonstration of the loading state component with a custom description."
        />

        <!-- Error State -->
        <BaseErrorState
          v-else-if="currentState === 'error'"
          title="Demo Error Occurred"
          message="This is a demonstration of the error state component. You can customize the title, message, and retry functionality."
          :retrying="isRetrying"
          @retry="handleRetry"
        />

        <!-- Empty State -->
        <BaseEmptyState
          v-else-if="currentState === 'empty'"
          title="No demo content"
          description="This is a demonstration of the empty state component with a custom action button."
          icon="lucide:folder-open"
          action-text="Create Demo Content"
          action-icon="lucide:plus"
          @action="handleAction"
        />

        <!-- Skeleton Loader -->
        <BaseSkeletonLoader
          v-else-if="currentState === 'skeleton'"
          :count="3"
          :lines="3"
          :show-avatar="true"
          :show-actions="true"
        />

        <!-- Product Skeleton -->
        <BaseProductSkeleton
          v-else-if="currentState === 'productSkeleton'"
          :count="6"
        />
      </div>

      <!-- Code Examples -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Usage Examples
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Loading State Example -->
          <div class="space-y-3">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Loading State
            </h3>
            <pre
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto"
            ><code>&lt;BaseLoadingState
  title="Loading products..."
  description="Please wait while we fetch your data"
/&gt;</code></pre>
          </div>

          <!-- Error State Example -->
          <div class="space-y-3">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Error State
            </h3>
            <pre
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto"
            ><code>&lt;BaseErrorState
  title="Failed to load data"
  :message="error.message"
  @retry="refresh()"
/&gt;</code></pre>
          </div>

          <!-- Empty State Example -->
          <div class="space-y-3">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Empty State
            </h3>
            <pre
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto"
            ><code>&lt;BaseEmptyState
  title="No products found"
  description="Get started by adding your first product"
  action-text="Add Product"
  @action="navigateTo('/products/new')"
/&gt;</code></pre>
          </div>

          <!-- Skeleton Example -->
          <div class="space-y-3">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Skeleton Loaders
            </h3>
            <pre
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto"
            ><code>&lt;BaseSkeletonLoader :count="3" /&gt;
&lt;BaseProductSkeleton :count="6" /&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>
  </BasePageWrapper>
</template>

<script setup lang="ts">
// Demo state
const currentState = ref<
  "loading" | "error" | "empty" | "skeleton" | "productSkeleton"
>("loading");
const isRetrying = ref(false);

// Demo handlers
const handleRetry = async () => {
  isRetrying.value = true;
  // Simulate retry delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isRetrying.value = false;
  // Could switch to success state or show new content
};

const handleAction = () => {
  alert(
    "Demo action triggered! In a real app, this would navigate or perform an action."
  );
};

// SEO
useSeoMeta({
  title: "Base State Components Demo - RidersDB",
  description:
    "Demonstration of reusable loading, error, empty, and skeleton state components.",
});
</script>
