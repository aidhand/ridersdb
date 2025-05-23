<template>
  <div class="min-h-screen max-w-screen flex flex-col overflow-hidden">
    <SiteHeader />

    <main
      class="flex-grow bg-white/50 dark:bg-black/50"
      aria-label="Main content"
    >
      <BaseContainer class="my-8">
        <slot />
      </BaseContainer>
    </main>
    <footer class="bg-neutral-500/5">
      <div class="mx-auto px-2 md:px-4 py-16 container">
        <p>&copy; 2025 RideDB - Your Motorcycle Gear Database</p>
      </div>
    </footer>
  </div>
</template>
