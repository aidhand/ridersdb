<script setup lang="ts">
// No script needed for header after moving user navigation
</script>

<template>
  <header class="">
    <BaseContainer>
      <div class="min-h-16 flex flex-row gap-8 items-center justify-between">
        <div>
          <NuxtLink href="/">
            <h1 class="text-xl font-bold">RideDB</h1>
          </NuxtLink>
        </div>

        <SiteNav />
      </div>
    </BaseContainer>
  </header>
</template>
