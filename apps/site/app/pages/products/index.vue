<script setup lang="ts">
const searchQuery = useProductSearch();

useSeoMeta({
  title: "Products",
  description:
    "Browse our comprehensive database of motorcycle gear. Find helmets, jackets, boots, gloves, and more.",
});
</script>

<template>
  <PageWrapper>
    <!-- Page Header Navigation -->
    <PageHeaderNav
      :breadcrumbs="[{ label: 'Products', icon: 'i-tabler-package' }]"
      ><template #actions>
        <UButton
          to="/products/new"
          color="primary"
          variant="outline"
          icon="i-tabler-plus"
        >
          Add Product
        </UButton>
      </template>
    </PageHeaderNav>

    <!-- Page Header -->
    <ProductPageHeader>
      <template #title>Products</template>
      <template #subtitle>
        Browse our comprehensive database of motorcycle gear and accessories
      </template>
      <template #actions>
        <UInput
          v-model="searchQuery"
          icon="i-tabler-search"
          placeholder="Search products..."
        />
      </template>
    </ProductPageHeader>

    <!-- Products List -->
    <ProductsList />
  </PageWrapper>
</template>
