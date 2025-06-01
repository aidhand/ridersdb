<script setup lang="ts">
// SEO and page metadata
useSeoMeta({
  title: "Settings - RideDB",
  description: "Manage your preferences and account settings.",
});

// Get preferences composable
const preferences = usePreferences();

// Available items for dropdowns
const viewModeitems = [
  { label: "Grid View", value: "grid", icon: "i-tabler-grid-3x3" },
  { label: "List View", value: "list", icon: "i-tabler-list" },
];

const currencyitems = [
  { label: "US Dollar (USD)", value: "USD" },
  { label: "Euro (EUR)", value: "EUR" },
  { label: "British Pound (GBP)", value: "GBP" },
  { label: "Canadian Dollar (CAD)", value: "CAD" },
  { label: "Australian Dollar (AUD)", value: "AUD" },
  { label: "Japanese Yen (JPY)", value: "JPY" },
];

const regionitems = [
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "UK" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Japan", value: "JP" },
  { label: "Other", value: "OTHER" },
];

// Computed properties for preferences
const viewMode = computed({
  get: () => preferences.state.value.view,
  set: (value) => preferences.setViewMode(value as "grid" | "list"),
});

const currency = computed({
  get: () => preferences.state.value.currency,
  set: (value) => preferences.setCurrency(value),
});

const region = computed({
  get: () => preferences.state.value.region,
  set: (value) => preferences.setRegion(value),
});

// Success notification
const toast = useToast();

const resetToDefaults = () => {
  viewMode.value = "grid";
  currency.value = "USD";
  region.value = "US";
  toast.add({
    title: "Settings Reset",
    description: "Your preferences have been reset to defaults.",
    icon: "i-tabler-check",
    color: "success",
  });
};
</script>

<template>
  <PageWrapper>
    <!-- Page Header Navigation -->
    <PageHeaderNav
      :breadcrumbs="[
        { label: 'User', icon: 'i-tabler-user' },
        { label: 'Settings' },
      ]"
      :actions="[
        {
          label: 'Reset to Defaults',
          icon: 'i-tabler-refresh',
          color: 'neutral',
          variant: 'outline',
          onClick: resetToDefaults,
        },
      ]"
    />

    <!-- Page Title -->
    <div class="space-y-2 mb-8">
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
        Settings
      </h1>
      <p class="text-neutral-500/70">
        Customize your experience and manage your preferences.
      </p>
    </div>

    <!-- Settings Sections -->
    <div class="space-y-8">
      <!-- Display Preferences -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-primary-500/10 rounded-lg">
              <UIcon
                name="i-tabler-eye"
                class="text-lg text-primary-500"
              />
            </div>
            <div>
              <h2
                class="text-lg font-semibold text-neutral-900 dark:text-white"
              >
                Display Preferences
              </h2>
              <p class="text-sm text-neutral-500/70">
                Customize how content is displayed
              </p>
            </div>
          </div>
        </template>

        <div class="space-y-12">
          <!-- View Mode -->
          <UFormField
            label="Default View Mode"
            description="Choose how products and content are displayed by default"
            class="flex flex-col xs:flex-row justify-between gap-4"
          >
            <USelect
              v-model="viewMode"
              :items="viewModeitems"
              placeholder="Select view mode"
              value-attribute="value"
              option-attribute="label"
            />
          </UFormField>

          <!-- Current Selection Preview -->
          <div
            class="p-4 bg-neutral-500/5 rounded-lg border border-neutral-500/10"
          >
            <div class="flex items-center gap-3">
              <UIcon
                :name="
                  viewMode === 'grid' ? 'i-tabler-grid-3x3' : 'i-tabler-list'
                "
                class="text-primary-500"
              />
              <div>
                <p class="font-medium text-neutral-900 dark:text-white">
                  Current:
                  {{ viewMode === "grid" ? "Grid View" : "List View" }}
                </p>
                <p class="text-sm text-neutral-500/70">
                  {{
                    viewMode === "grid" ?
                      "Products displayed in a visual grid layout"
                    : "Products displayed in a detailed list format"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Localization Settings -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-green-500/10 rounded-lg">
              <UIcon
                name="i-tabler-world"
                class="text-lg text-green-500"
              />
            </div>
            <div>
              <h2
                class="text-lg font-semibold text-neutral-900 dark:text-white"
              >
                Localization
              </h2>
              <p class="text-sm text-neutral-500/70">
                Set your currency and region preferences
              </p>
            </div>
          </div>
        </template>

        <div class="space-y-12">
          <!-- Currency -->
          <UFormField
            label="Currency"
            description="Choose your preferred currency for pricing display"
            class="flex flex-col xs:flex-row justify-between gap-4"
          >
            <USelect
              v-model="currency"
              :items="currencyitems"
              placeholder="Select currency"
              value-attribute="value"
              option-attribute="label"
            />
          </UFormField>

          <!-- Region -->
          <UFormField
            label="Region"
            description="Select your region for localized content and availability"
            class="flex flex-col xs:flex-row justify-between gap-4"
          >
            <USelect
              v-model="region"
              :items="regionitems"
              placeholder="Select region"
              value-attribute="value"
              option-attribute="label"
            />
          </UFormField>

          <!-- Localization Preview -->
          <div
            class="p-4 bg-neutral-500/5 rounded-lg border border-neutral-500/10"
          >
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span
                  class="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Currency:
                </span>
                <UBadge
                  variant="soft"
                  color="success"
                >
                  {{ currency }}
                </UBadge>
              </div>
              <div class="flex items-center justify-between">
                <span
                  class="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Region:
                </span>
                <UBadge
                  variant="soft"
                  color="primary"
                >
                  {{ region }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Account Information -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-500/10 rounded-lg">
              <UIcon
                name="i-tabler-user-cog"
                class="text-lg text-blue-500"
              />
            </div>
            <div>
              <h2
                class="text-lg font-semibold text-neutral-900 dark:text-white"
              >
                Account
              </h2>
              <p class="text-sm text-neutral-500/70">
                Manage your account settings and data
              </p>
            </div>
          </div>
        </template>

        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UButton
              variant="outline"
              color="neutral"
              icon="i-tabler-download"
              class="justify-start"
            >
              Export Data
            </UButton>

            <UButton
              variant="outline"
              color="neutral"
              icon="i-tabler-upload"
              class="justify-start"
            >
              Import Data
            </UButton>

            <UButton
              variant="outline"
              color="neutral"
              icon="i-tabler-trash"
              class="justify-start"
            >
              Clear All Data
            </UButton>

            <UButton
              variant="outline"
              color="neutral"
              icon="i-tabler-shield-check"
              class="justify-start"
            >
              Privacy Settings
            </UButton>
          </div>
        </div>
      </UCard>

      <!-- Application Information -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-purple-500/10 rounded-lg">
              <UIcon
                name="i-tabler-info-circle"
                class="text-lg text-purple-500"
              />
            </div>
            <div>
              <h2
                class="text-lg font-semibold text-neutral-900 dark:text-white"
              >
                About
              </h2>
              <p class="text-sm text-neutral-500/70">
                Application information and support
              </p>
            </div>
          </div>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-medium text-neutral-900 dark:text-white mb-2">
                Version Information
              </h3>
              <div class="space-y-1 text-sm text-neutral-500/70">
                <p>Version: 1.0.0</p>
                <p>Last Updated: {{ new Date().toLocaleDateString() }}</p>
                <p>Build: Production</p>
              </div>
            </div>

            <div>
              <h3 class="font-medium text-neutral-900 dark:text-white mb-2">
                Support
              </h3>
              <div class="space-y-2">
                <UButton
                  variant="ghost"
                  color="neutral"
                  icon="i-tabler-help"
                  size="sm"
                  class="justify-start p-0 h-auto"
                >
                  Help Center
                </UButton>
                <UButton
                  variant="ghost"
                  color="neutral"
                  icon="i-tabler-mail"
                  size="sm"
                  class="justify-start p-0 h-auto"
                >
                  Contact Support
                </UButton>
                <UButton
                  variant="ghost"
                  color="neutral"
                  icon="i-tabler-bug"
                  size="sm"
                  class="justify-start p-0 h-auto"
                >
                  Report Bug
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </PageWrapper>
</template>
