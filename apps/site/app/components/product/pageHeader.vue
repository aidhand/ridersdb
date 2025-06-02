<script setup lang="ts"></script>

<template>
  <section class="border-b-2 border-neutral-400/20 my-12 pb-12">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <!-- Title Section -->
      <div class="space-y-2">
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
          <slot name="title">Products</slot>
        </h1>
        <p class="text-sm text-neutral-500/70 dark:text-neutral-400/80">
          <slot name="subtitle">Manage your product catalog</slot>
        </p>
      </div>

      <!-- Actions Section -->
      <div class="flex items-center gap-3">
        <slot name="actions"></slot>
      </div>
    </div>
  </section>
</template>
