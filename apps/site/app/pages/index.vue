<script setup lang="ts">
useSeoMeta({
  title: "RideDB - Your Motorcycle Gear Database",
  description:
    "Discover and manage your motorcycle gear collection with RideDB. Find products, compare features, and build your ideal riding setup.",
});
</script>

<template>
  <PageWrapper>
    <NuxtRouteAnnouncer />

    <!-- Hero Section -->
    <section class="text-center space-y-6">
      <div class="space-y-4">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white"
        >
          Welcome to
          <span class="text-primary-500">RideDB</span>
        </h1>
        <p class="text-xl md:text-2xl text-neutral-500/70 max-w-3xl mx-auto">
          Your comprehensive motorcycle gear database. Discover, compare, and
          manage your riding gear collection.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <UButton
          to="/products"
          color="primary"
          size="md"
          icon="i-tabler-search"
          class="font-medium"
        >
          Browse Products
        </UButton>
        <UButton
          to="/products/new"
          variant="outline"
          color="neutral"
          size="md"
          icon="i-tabler-plus"
          class="font-medium"
        >
          Add Product
        </UButton>
      </div>
    </section>

    <!-- Features Section -->
    <section class="space-y-8">
      <div class="text-center space-y-4">
        <h2 class="text-3xl font-bold text-neutral-900 dark:text-white">
          Everything you need for your gear
        </h2>
        <p class="text-lg text-neutral-500/70 max-w-2xl mx-auto">
          Organize your motorcycle gear collection with powerful tools designed
          for riders.
        </p>
      </div>

      <BaseGrid
        cols="1 md:2 lg:3"
        gap="8"
      >
        <UCard class="text-center">
          <template #header>
            <div class="flex justify-center">
              <div class="p-3 bg-primary-500/10 rounded-lg">
                <UIcon
                  name="i-tabler-database"
                  class="text-2xl text-primary-500"
                />
              </div>
            </div>
          </template>

          <div class="space-y-2">
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-white">
              Product Database
            </h3>
            <p class="text-neutral-500/70">
              Comprehensive database of motorcycle gear with detailed
              specifications and reviews.
            </p>
          </div>
        </UCard>

        <UCard class="text-center">
          <template #header>
            <div class="flex justify-center">
              <div class="p-3 bg-green-500/10 rounded-lg">
                <UIcon
                  name="i-tabler-list-check"
                  class="text-2xl text-green-500"
                />
              </div>
            </div>
          </template>

          <div class="space-y-2">
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-white">
              Collection Management
            </h3>
            <p class="text-neutral-500/70">
              Track your gear collection, wishlist, and maintenance schedules
              all in one place.
            </p>
          </div>
        </UCard>

        <UCard class="text-center">
          <template #header>
            <div class="flex justify-center">
              <div class="p-3 bg-blue-500/10 rounded-lg">
                <UIcon
                  name="i-tabler-search"
                  class="text-2xl text-blue-500"
                />
              </div>
            </div>
          </template>

          <div class="space-y-2">
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-white">
              Smart Search
            </h3>
            <p class="text-neutral-500/70">
              Find the perfect gear with advanced filtering and search
              capabilities.
            </p>
          </div>
        </UCard>
      </BaseGrid>
    </section>

    <!-- Recent Products -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">
          Recent Products
        </h2>
        <UButton
          to="/products"
          variant="ghost"
          color="neutral"
          trailing-icon="i-tabler-arrow-right"
        >
          View All
        </UButton>
      </div>

      <ProductsList
        :columns="'1 sm:2 lg:3'"
        card-variant="subtle"
      />
    </section>
  </PageWrapper>
</template>
