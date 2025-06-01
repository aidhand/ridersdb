<script setup lang="ts">
useSeoMeta({
  title: "User Dashboard - RideDB",
  description:
    "Manage your account, preferences, and motorcycle gear collection.",
});

const preferences = usePreferences();

// Quick stats or user info could go here
const userStats = {
  watchlistItems: 12,
  recentlyViewed: 8,
  savedSearches: 3,
};
</script>

<template>
  <PageWrapper>
    <!-- Page Header Navigation -->
    <PageHeaderNav
      :breadcrumbs="[
        { label: 'User', icon: 'i-tabler-user' },
        { label: 'Dashboard' },
      ]"
    />

    <!-- Page Title -->
    <div class="space-y-2 mb-8">
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
        User Dashboard
      </h1>
      <p class="text-neutral-500/70">
        Manage your account and motorcycle gear collection.
      </p>
    </div>

    <!-- Quick Actions Grid -->
    <div class="space-y-8">
      <!-- Main Actions -->
      <BaseGrid
        cols="1 md:2 lg:3"
        gap="6"
      >
        <!-- Settings Card -->
        <UCard class="group hover:shadow-lg transition-shadow">
          <template #header>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-primary-500/10 rounded-lg">
                <UIcon
                  name="i-tabler-settings"
                  class="text-lg text-primary-500"
                />
              </div>
              <div>
                <h3 class="font-semibold text-neutral-900 dark:text-white">
                  Settings
                </h3>
                <p class="text-sm text-neutral-500/70">Preferences & account</p>
              </div>
            </div>
          </template>

          <div class="space-y-4">
            <p class="text-neutral-600 dark:text-neutral-400">
              Customize your experience and manage your preferences.
            </p>

            <!-- Current Preferences Preview -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-500/70">View Mode:</span>
                <UBadge
                  variant="soft"
                  color="primary"
                >
                  {{
                    preferences.state.value.view === "grid" ? "Grid" : "List"
                  }}
                </UBadge>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-500/70">Currency:</span>
                <UBadge
                  variant="soft"
                  color="success"
                >
                  {{ preferences.state.value.currency }}
                </UBadge>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-neutral-500/70">Region:</span>
                <UBadge
                  variant="soft"
                  color="secondary"
                >
                  {{ preferences.state.value.region }}
                </UBadge>
              </div>
            </div>
          </div>

          <template #footer>
            <UButton
              to="/user/settings"
              variant="solid"
              color="primary"
              icon="i-tabler-settings"
              class="w-full"
            >
              Manage Settings
            </UButton>
          </template>
        </UCard>

        <!-- Watchlist Card -->
        <UCard class="group hover:shadow-lg transition-shadow">
          <template #header>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-green-500/10 rounded-lg">
                <UIcon
                  name="i-tabler-list-check"
                  class="text-lg text-green-500"
                />
              </div>
              <div>
                <h3 class="font-semibold text-neutral-900 dark:text-white">
                  Watchlist
                </h3>
                <p class="text-sm text-neutral-500/70">Saved items</p>
              </div>
            </div>
          </template>

          <div class="space-y-4">
            <p class="text-neutral-600 dark:text-neutral-400">
              Keep track of products you're interested in.
            </p>

            <div class="text-center py-4">
              <div class="text-2xl font-bold text-neutral-900 dark:text-white">
                {{ userStats.watchlistItems }}
              </div>
              <div class="text-sm text-neutral-500/70">Items in watchlist</div>
            </div>
          </div>

          <template #footer>
            <UButton
              to="/watchlist"
              variant="outline"
              color="success"
              icon="i-tabler-list-check"
              class="w-full"
            >
              View Watchlist
            </UButton>
          </template>
        </UCard>

        <!-- Recent Activity Card -->
        <UCard class="group hover:shadow-lg transition-shadow">
          <template #header>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-500/10 rounded-lg">
                <UIcon
                  name="i-tabler-clock"
                  class="text-lg text-blue-500"
                />
              </div>
              <div>
                <h3 class="font-semibold text-neutral-900 dark:text-white">
                  Recent Activity
                </h3>
                <p class="text-sm text-neutral-500/70">Your browsing history</p>
              </div>
            </div>
          </template>

          <div class="space-y-4">
            <p class="text-neutral-600 dark:text-neutral-400">
              Quick access to recently viewed items.
            </p>

            <div class="grid grid-cols-2 gap-4 text-center">
              <div>
                <div class="text-xl font-bold text-neutral-900 dark:text-white">
                  {{ userStats.recentlyViewed }}
                </div>
                <div class="text-xs text-neutral-500/70">Recently Viewed</div>
              </div>
              <div>
                <div class="text-xl font-bold text-neutral-900 dark:text-white">
                  {{ userStats.savedSearches }}
                </div>
                <div class="text-xs text-neutral-500/70">Saved Searches</div>
              </div>
            </div>
          </div>

          <template #footer>
            <UButton
              to="/user/activity"
              variant="outline"
              color="info"
              icon="i-tabler-clock"
              class="w-full"
            >
              View Activity
            </UButton>
          </template>
        </UCard>
      </BaseGrid>

      <!-- Quick Actions -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">
            Quick Actions
          </h2>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <UButton
            to="/products"
            variant="outline"
            color="neutral"
            icon="i-tabler-search"
            class="justify-start"
          >
            Browse Products
          </UButton>

          <UButton
            to="/products/new"
            variant="outline"
            color="neutral"
            icon="i-tabler-plus"
            class="justify-start"
          >
            Add Product
          </UButton>

          <UButton
            to="/user/settings"
            variant="outline"
            color="neutral"
            icon="i-tabler-settings"
            class="justify-start"
          >
            Settings
          </UButton>

          <UButton
            variant="outline"
            color="neutral"
            icon="i-tabler-help"
            class="justify-start"
          >
            Help & Support
          </UButton>
        </div>
      </UCard>
    </div>
  </PageWrapper>
</template>
