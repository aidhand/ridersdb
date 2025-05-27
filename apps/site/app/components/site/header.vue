<script setup lang="ts">
interface Props {
  /** Whether to show border bottom */
  bordered?: boolean;
  /** Whether to make header sticky */
  sticky?: boolean;
}

const { bordered = true, sticky = false } = defineProps<Props>();

const headerClasses = computed(() => [
  "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm",
  bordered && "border-b border-neutral-500/20",
  sticky && "sticky top-0 z-50",
]);
</script>

<template>
  <header :class="headerClasses">
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
