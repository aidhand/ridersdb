<script setup lang="ts">
import { reactive } from "vue";
import AccountInfoCard from "~/components/user/dashboard/AccountInfoCard.vue";
import PreferencesCard from "~/components/user/dashboard/PreferencesCard.vue";
import RecentActivityCard from "~/components/user/dashboard/RecentActivityCard.vue";
import RecentActivityList from "~/components/user/dashboard/RecentActivityList.vue";
import WatchlistCard from "~/components/user/dashboard/WatchlistCard.vue";
definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "User Dashboard",
  description:
    "Manage your account, preferences, and motorcycle gear collection.",
});

const preferences = usePreferences();

// Quick stats or user info could go here
const userStats = reactive({
  watchlistItems: 12,
  recentlyViewed: 8,
  savedSearches: 3,
});

// Use the real user session composable
const { user: sessionUser } = useUserSession();

// Recent activity (this would normally come from an API)
const recentActivity = reactive([
  { id: "1", date: "Yesterday", action: "Viewed", item: "Yamaha MT-07" },
  {
    id: "2",
    date: "2 days ago",
    action: "Added to Watchlist",
    item: "Shoei RF-1200 Helmet",
  },
  {
    id: "3",
    date: "1 week ago",
    action: "Purchased",
    item: "Alpinestars SMX-1R Boots",
  },
]);
</script>

<template>
  <BasePageWrapper>
    <!-- Page Header Navigation -->
    <LayoutHeaderNav
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

    <!-- Quick Actions at the Top -->
    <UCard class="mb-8">
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

    <!-- Main Content: Two Columns -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-8">
        <!-- Account Information Card -->
        <AccountInfoCard :user="sessionUser || {}" />

        <!-- Preferences Card -->
        <PreferencesCard :preferences="preferences" />
      </div>
      <div class="space-y-8">
        <!-- Watchlist Card -->
        <WatchlistCard :watchlist-items="userStats.watchlistItems" />

        <!-- Recent Activity Card -->
        <RecentActivityCard
          :recently-viewed="userStats.recentlyViewed"
          :saved-searches="userStats.savedSearches"
        />

        <!-- Recent Activity List -->
        <RecentActivityList :recent-activity="recentActivity" />
      </div>
    </div>
  </BasePageWrapper>
</template>
