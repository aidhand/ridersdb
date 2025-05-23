<script setup lang="ts">
// Removed unused FormSubmitEvent import
import slugify from "slugify";
import * as v from "valibot";
// Router and loading state for product creation
import { useRouter } from "vue-router";

const schema = v.object({
  name: v.pipe(v.string()),
  slug: v.pipe(v.string()),
  description: v.optional(v.string()),
  brand: v.pipe(v.string()),
  collection: v.pipe(v.string()),
});

// Removed unused Schema type

const state = reactive({
  name: "",
  slug: "",
  description: "",
  brand: "",
  collection: "",
});

// Automatically generate slug from product name
watch(
  () => state.name,
  (name) => {
    state.slug = slugify(name, { lower: true, strict: true });
  }
);

const orpc = useOrpc();
const router = useRouter();
const productLoading = ref(false);
const brands = ref<{ id: string; name: string; slug: string }[]>(
  await orpc.listBrands({})
);

const collections = ref<{ id: string; name: string; slug: string }[]>(
  await orpc.listCollections({})
);

const brandMenuOpen = ref(false);
const brandMenuLoading = ref(false);

const brandSearch = ref("");
const canCreateBrand = computed(() => {
  return !brands.value.some(
    (b) => b.name.toLowerCase() === brandSearch.value.trim().toLowerCase()
  );
});

async function onNewBrand(brand: string) {
  // Handle the creation of a new brand
  console.log("Creating new brand:", brand);

  // Close the list and set loading state
  brandMenuOpen.value = false;
  brandMenuLoading.value = true;

  const newBrand = {
    name: brand,
    slug: slugify(brand, {
      lower: true,
      strict: true,
    }),
  };

  orpc
    .createBrand({
      data: newBrand,
    })
    .then((res) => {
      // Handle success by storing the new brand id
      state.brand = res?.id || "";
      brands.value.push({
        id: res?.id || "",
        name: res?.name || "",
        slug: res?.slug || "",
      });
    })
    .catch((err) => {
      // Handle error
      console.error("Error creating brand:", err);
    })
    .finally(() => {
      // Set loading state to false
      brandMenuLoading.value = false;
    });
}

const collectionMenuOpen = ref(false);
const collectionMenuLoading = ref(false);

const collectionSearch = ref("");
const canCreateCollection = computed(() => {
  return !collections.value.some(
    (c) => c.name.toLowerCase() === collectionSearch.value.trim().toLowerCase()
  );
});

async function onNewCollection(collection: string) {
  // Handle the creation of a new item
  console.log("Creating new collection:", collection);

  // Close the list and set loading state
  collectionMenuOpen.value = false;
  collectionMenuLoading.value = true;

  const newCollection = {
    name: collection,
    slug: slugify(collection, {
      lower: true,
      strict: true,
    }),
  };

  // TODO: don't attempt to create a collection if it already exists
  // TODO: use pinia colada
  // TODO: handle error
  orpc
    .createCollection({ data: newCollection })
    .then((res) => {
      // Handle success by storing the new collection id
      state.collection = res?.id || "";
      collections.value.push({
        id: res?.id || "",
        name: res?.name || "",
        slug: res?.slug || "",
      });
    })
    .catch((err) => {
      // Handle error
      console.error("Error creating collection:", err);
    })
    .finally(() => {
      // Set loading state to false
      collectionMenuLoading.value = false;
    });
}

async function onSubmit() {
  productLoading.value = true;
  try {
    const created = await orpc.createProduct({ data: state });

    if (created) {
      router.push(`/products/${created.slug}`);
    }
  } catch (err) {
    console.error("Error creating product:", err);
  } finally {
    productLoading.value = false;
  }
}
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
        :schema="schema"
        :state="state"
        class="flex flex-col gap-12"
        @submit="onSubmit"
      >
        <UFormField
          label="Name"
          name="name"
        >
          <UInput v-model="state.name" />
        </UFormField>
        <USeparator />
        <UFormField
          label="Description"
          name="description"
        >
          <UTextarea v-model="state.description" />
        </UFormField>
        <USeparator />
        <UFormField
          label="Brand"
          name="brand"
        >
          <UInputMenu
            v-model="state.brand"
            v-model:open="brandMenuOpen"
            v-model:search-term="brandSearch"
            :items="brands"
            :disabled="brandMenuLoading"
            :create-item="canCreateBrand ? 'always' : false"
            label-key="name"
            value-key="id"
            required
            @create="onNewBrand"
          />
        </UFormField>
        <USeparator />
        <UFormField
          label="Collection"
          name="collection"
        >
          <UInputMenu
            v-model="state.collection"
            v-model:open="collectionMenuOpen"
            v-model:search-term="collectionSearch"
            :items="collections"
            :disabled="collectionMenuLoading"
            :create-item="canCreateCollection ? 'always' : false"
            label-key="name"
            value-key="id"
            required
            @create="onNewCollection"
          />
        </UFormField>
        <USeparator />
        <div class="flex justify-end">
          <UButton
            type="submit"
            color="primary"
            :loading="productLoading"
          >
            Create Product
          </UButton>
        </div>
      </UForm>
    </section>

    <section class="flex gap-8 items-bottom justify-between">
      <pre class="text-xs"
        >{{ state }}
brandsearchterm: {{ brandSearch }}
cancreateBrand: {{ canCreateBrand }}

collectionsearchterm: {{ collectionSearch }}
cancreateCollection: {{ canCreateCollection }}

      </pre>
    </section>
  </div>
</template>
