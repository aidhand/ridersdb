<script setup lang="ts">
import type { Brand, Collection } from "@repo/validation/types";

interface FormData {
  name: string;
  description: string;
  brand: string;
  collection: string;
}

// Form state
const form = reactive<FormData>({
  name: "",
  description: "",
  brand: "",
  collection: "",
});

// Data fetching
const { data: brands } = useFetch<Brand[]>("/api/brands");
const { data: collections } = useFetch<Collection[]>("/api/collections");

const selectedBrandName = computed(() => {
  return brands.value?.find((b) => b.id === form.brand)?.name || "";
});

const selectedCollectionName = computed(() => {
  return collections.value?.find((c) => c.id === form.collection)?.name || "";
});

// Form submission
const isSubmitting = ref(false);

async function createProduct() {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    await $fetch("/api/products", {
      method: "POST",
      body: form,
    });

    await navigateTo("/products");
  } catch (error) {
    console.error("Error creating product:", error);
    // Handle error state here
  } finally {
    isSubmitting.value = false;
  }
}

// SEO
useSeoMeta({
  title: "Create New Product - RidersDB",
  description: "Add a new motorcycle gear product to your catalog",
});
</script>

<template>
  <BasePageWrapper>
    <!-- Page Header Navigation -->
    <LayoutHeaderNav
      :breadcrumbs="[
        { label: 'Products', to: '/products', icon: 'i-tabler-package' },
        { label: 'Create New Product' },
      ]"
    >
      <template #actions>
        <BaseBackButton />
      </template>
    </LayoutHeaderNav>

    <!-- Page Header -->
    <ProductPageHeader>
      <template #title>Create New Product</template>
      <template #subtitle>Add a new product to your catalog</template>
      <template #actions>
        <BaseBackButton
          text="Back to Products"
          to="/products"
        />
      </template>
    </ProductPageHeader>

    <!-- Form Content -->
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Form Fields -->
      <div class="flex-1 space-y-8">
        <!-- Product Name -->
        <div
          class="bg-neutral-500/5 border border-neutral-500/20 rounded-lg p-6"
        >
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-neutral-500/90">
              Product Name
            </h3>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter product name"
              class="w-full px-4 py-3 bg-transparent border border-neutral-500/20 rounded-lg text-neutral-500/90 placeholder-neutral-500/50 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
            />
          </div>
        </div>

        <!-- Description -->
        <div
          class="bg-neutral-500/5 border border-neutral-500/20 rounded-lg p-6"
        >
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-neutral-500/90">
              Description
            </h3>
            <textarea
              v-model="form.description"
              placeholder="Enter product description"
              rows="4"
              class="w-full px-4 py-3 bg-transparent border border-neutral-500/20 rounded-lg text-neutral-500/90 placeholder-neutral-500/50 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Brand Selection -->
        <div
          class="bg-neutral-500/5 border border-neutral-500/20 rounded-lg p-6"
        >
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-neutral-500/90">Brand</h3>
            <select
              v-model="form.brand"
              class="w-full px-4 py-3 bg-transparent border border-neutral-500/20 rounded-lg text-neutral-500/90 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
            >
              <option
                value=""
                class="bg-white dark:bg-neutral-900"
              >
                Select a brand
              </option>
              <option
                v-for="brand in brands"
                :key="brand.id"
                :value="brand.id"
                class="bg-white dark:bg-neutral-900"
              >
                {{ brand.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Collection Selection -->
        <div
          class="bg-neutral-500/5 border border-neutral-500/20 rounded-lg p-6"
        >
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-neutral-500/90">
              Collection
            </h3>
            <select
              v-model="form.collection"
              class="w-full px-4 py-3 bg-transparent border border-neutral-500/20 rounded-lg text-neutral-500/90 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
            >
              <option
                value=""
                class="bg-white dark:bg-neutral-900"
              >
                Select a collection
              </option>
              <option
                v-for="collection in collections"
                :key="collection.id"
                :value="collection.id"
                class="bg-white dark:bg-neutral-900"
              >
                {{ collection.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end pt-4">
          <button
            type="button"
            :disabled="isSubmitting || !form.name.trim()"
            class="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-primary-500 border border-primary-500 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            @click="createProduct"
          >
            <Icon
              v-if="isSubmitting"
              name="lucide:loader-2"
              class="w-4 h-4 animate-spin"
            />
            <Icon
              v-else
              name="lucide:plus"
              class="w-4 h-4"
            />
            {{ isSubmitting ? "Creating..." : "Create Product" }}
          </button>
        </div>
      </div>

      <!-- Preview Panel -->
      <div class="lg:w-96">
        <div
          class="bg-neutral-500/5 border border-neutral-500/20 rounded-lg sticky top-8"
        >
          <div class="border-b border-neutral-500/20 p-4">
            <div class="flex items-center gap-2">
              <UIcon
                name="tabler:package"
                class="w-5 h-5 text-primary-500"
              />
              <h3 class="text-lg font-semibold text-neutral-500/90">Preview</h3>
            </div>
          </div>
          <div class="p-6 space-y-6">
            <!-- Name Preview -->
            <div>
              <p
                class="text-xs font-medium text-neutral-500/70 uppercase tracking-wider mb-2"
              >
                Name
              </p>
              <p class="text-xl font-bold text-neutral-500/90">
                {{ form.name || "Product name..." }}
              </p>
            </div>

            <!-- Description Preview -->
            <div>
              <p
                class="text-xs font-medium text-neutral-500/70 uppercase tracking-wider mb-2"
              >
                Description
              </p>
              <p class="text-neutral-500/70">
                {{ form.description || "Product description..." }}
              </p>
            </div>

            <!-- Brand & Collection Preview -->
            <div class="grid grid-cols-1 gap-4">
              <div>
                <p
                  class="text-xs font-medium text-neutral-500/70 uppercase tracking-wider mb-2"
                >
                  Brand
                </p>
                <p class="text-neutral-500/70">
                  {{ selectedBrandName || "No brand selected" }}
                </p>
              </div>
              <div>
                <p
                  class="text-xs font-medium text-neutral-500/70 uppercase tracking-wider mb-2"
                >
                  Collection
                </p>
                <p class="text-neutral-500/70">
                  {{ selectedCollectionName || "No collection selected" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BasePageWrapper>
</template>
