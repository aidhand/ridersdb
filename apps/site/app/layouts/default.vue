<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
    <!-- Header -->
    <SiteHeader />

    <!-- Main Content -->
    <main
      class="flex flex-col flex-1 bg-neutral-400/4"
      aria-label="Main content"
    >
      <BaseContainer class="flex flex-col flex-1">
        <slot />
      </BaseContainer>
    </main>

    <!-- Footer -->
    <footer
      class="border-t border-neutral-500/20 bg-neutral-500/5 dark:bg-neutral-500/5"
    >
      <BaseContainer class="py-8">
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p class="text-sm text-neutral-500/70">
            &copy; 2025 RideDB - Your Motorcycle Gear Database
          </p>
          <div class="flex items-center gap-4 text-sm text-neutral-500/70">
            <NuxtLink
              href="/privacy"
              class="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              Privacy
            </NuxtLink>
            <NuxtLink
              href="/terms"
              class="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              Terms
            </NuxtLink>
            <NuxtLink
              href="/contact"
              class="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              Contact
            </NuxtLink>
          </div>
        </div>
      </BaseContainer>
    </footer>
  </div>
</template>
