<template>
  <header class="bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
    <BaseContainer>
      <div class="flex h-16 items-center justify-between gap-8">
        <!-- Logo/Brand -->
        <div class="flex items-center gap-2">
          <NuxtLink
            href="/"
            class="group flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <h1 class="text-xl font-semibold text-neutral-900 dark:text-white">
              RideDB
            </h1>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <SiteNav />
      </div>
    </BaseContainer>
  </header>
</template>
