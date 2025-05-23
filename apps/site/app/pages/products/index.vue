<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-16">
    <section class="flex gap-8 items-bottom justify-between">
      <div>
        <h1 class="text-3xl font-semibold">Products</h1>
      </div>

      <div class="flex flex-col gap-4 justify-end">
        <div class="flex flex-wrap gap-4 justify-end">
          <UButton
            to="/products/new"
            color="primary"
            icon="i-tabler-plus"
          >
            Add Product
          </UButton>
        </div>
        <div class="flex flex-wrap gap-4 justify-end">filters and sorting</div>
      </div>
    </section>

    <section>products</section>

    <section class="flex gap-8 items-bottom justify-between">
      <pre class="text-xs">state</pre>
    </section>
  </div>
</template>
