<script setup lang="ts">
import { useLazyAsyncData } from "#app";

const orpc = useOrpc();

const brands = await useLazyAsyncData("brands", () => orpc.listBrands({}));

const collections = await useLazyAsyncData("collections", () =>
  orpc.listCollections({})
);

//create ui state

const form = reactive({
  name: "",
  description: "",
  brand: "",
  collection: "",
});

const state = reactive({
  canCreateBrand: false,
  canCreateCollection: false,
});

const ui = reactive({
  brandMenuOpen: false,
  collectionMenuOpen: false,
  brandSearch: "",
  collectionSearch: "",
});
</script>

<template>
  <div class="flex flex-col gap-16">
    <section class="flex gap-8 items-bottom justify-between">
      <div>
        <h1 class="text-3xl font-semibold">New product</h1>
      </div>

      <div class="flex flex-col gap-4 justify-end">
        <div class="flex flex-wrap gap-4 justify-end">
          <UButton
            to="/products"
            color="primary"
            icon="i-tabler-arrow-left"
          >
            Back
          </UButton>
        </div>
      </div>
    </section>

    <section>
      <UForm
        :state="form"
        class="flex flex-col gap-12"
      >
        <UFormField
          label="Name"
          name="name"
        >
          <UInput v-model="form.name" />
        </UFormField>
        <USeparator />
        <UFormField
          label="Description"
          name="description"
        >
          <UTextarea v-model="form.description" />
        </UFormField>
        <USeparator />
        <UFormField
          label="Brand"
          name="brand"
        >
          <UInputMenu
            v-model="form.brand"
            v-model:open="ui.brandMenuOpen"
            v-model:search-term="ui.brandSearch"
            :items="brands.data.value"
            :disabled="brands.status.value === 'pending'"
            :create-item="state.canCreateBrand ? 'always' : false"
            label-key="name"
            value-key="id"
            required
          />
        </UFormField>
        <USeparator />
        <UFormField
          label="Collection"
          name="collection"
        >
          <UInputMenu
            v-model="form.collection"
            v-model:open="ui.collectionMenuOpen"
            v-model:search-term="ui.collectionSearch"
            :items="collections.data.value"
            :disabled="collections.status.value === 'pending'"
            :create-item="state.canCreateCollection ? 'always' : false"
            label-key="name"
            value-key="id"
            required
          />
        </UFormField>
        <USeparator />
        <div class="flex justify-between">
          <div>
            <pre>{{ brands.data.value }}</pre>
          </div>
          <UButton
            type="submit"
            color="primary"
          >
            Create Product
          </UButton>
        </div>
      </UForm>
    </section>
  </div>
</template>
