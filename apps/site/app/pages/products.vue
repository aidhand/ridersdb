<script setup lang="ts">
import { usePreferences } from "~/composables/usePreferences";

// Meta tags for SEO
useSeoMeta({
  title: "Products - RidersDB",
  description: "Browse and discover motorcycle gear, accessories, and parts.",
});

// Get user preferences
const preferences = usePreferences();

// Search and filter state
const searchQuery = ref("");
const selectedCategory = ref("all");
const sortBy = ref("name");
const priceRange = ref([0, 5000]);

// Mock product data (in real app, this would come from API)
const products = ref([
  {
    id: "1",
    name: "Alpinestars SMX-6 V2 Boots",
    brand: "Alpinestars",
    category: "Boots",
    price: 249.99,
    image: "/api/placeholder/300/300",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    tags: ["Racing", "Street", "Protection"],
  },
  {
    id: "2",
    name: "Shoei RF-1400 Helmet",
    brand: "Shoei",
    category: "Helmets",
    price: 549.99,
    image: "/api/placeholder/300/300",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    tags: ["Premium", "Safety", "Aerodynamic"],
  },
  {
    id: "3",
    name: "Dainese Racing Jacket",
    brand: "Dainese",
    category: "Jackets",
    price: 399.99,
    image: "/api/placeholder/300/300",
    rating: 4.6,
    reviews: 156,
    inStock: false,
    tags: ["Racing", "Leather", "Protection"],
  },
  {
    id: "4",
    name: "Rev'it! Sand 4 H2O Jacket",
    brand: "Rev'it!",
    category: "Jackets",
    price: 899.99,
    image: "/api/placeholder/300/300",
    rating: 4.7,
    reviews: 73,
    inStock: true,
    tags: ["Adventure", "Waterproof", "Premium"],
  },
  {
    id: "5",
    name: "Sidi Crossfire 3 SRS Boots",
    brand: "Sidi",
    category: "Boots",
    price: 429.99,
    image: "/api/placeholder/300/300",
    rating: 4.4,
    reviews: 92,
    inStock: true,
    tags: ["Off-road", "Motocross", "Durable"],
  },
  {
    id: "6",
    name: "Arai Corsair-X Helmet",
    brand: "Arai",
    category: "Helmets",
    price: 749.99,
    image: "/api/placeholder/300/300",
    rating: 4.9,
    reviews: 234,
    inStock: true,
    tags: ["Premium", "Racing", "Hand-made"],
  },
]);

// Categories for filtering
const categories = [
  { value: "all", label: "All Categories" },
  { value: "helmets", label: "Helmets" },
  { value: "jackets", label: "Jackets" },
  { value: "boots", label: "Boots" },
  { value: "gloves", label: "Gloves" },
  { value: "pants", label: "Pants" },
  { value: "accessories", label: "Accessories" },
];

// Sort options
const sortOptions = [
  { value: "name", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "price", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

// Computed filtered and sorted products
const filteredProducts = computed(() => {
  let filtered = products.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Filter by category
  if (selectedCategory.value !== "all") {
    filtered = filtered.filter(
      (product) =>
        product.category.toLowerCase() === selectedCategory.value.toLowerCase()
    );
  }
  // Filter by price range
  filtered = filtered.filter(
    (product) =>
      product.price >= (priceRange.value[0] || 0) &&
      product.price <= (priceRange.value[1] || 5000)
  );

  // Sort products
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case "name":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return 0; // Would sort by creation date in real app
      default:
        return 0;
    }
  });

  return filtered;
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = 12;
const totalItems = computed(() => filteredProducts.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

// Clear all filters
const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
  sortBy.value = "name";
  priceRange.value = [0, 5000];
  currentPage.value = 1;
};

// Toggle view mode
const toggleViewMode = () => {
  preferences.setViewMode(
    preferences.state.value.view === "grid" ? "list" : "grid"
  );
};

// Format price with user's preferred currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: preferences.state.value.currency,
  }).format(price);
};
</script>

<template>
  <BasePageWrapper>
    <div class="space-y-8">
      <!-- Page Header -->
      <div class="border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
              Products
            </h1>
            <p class="mt-2 text-neutral-600 dark:text-neutral-400">
              Discover motorcycle gear, accessories, and parts
            </p>
          </div>

          <!-- View Toggle -->
          <div class="flex items-center gap-3">
            <UButton
              :icon="
                preferences.state.value.view === 'grid' ?
                  'i-tabler-list'
                : 'i-tabler-grid-3x3'
              "
              variant="outline"
              color="neutral"
              size="sm"
              :label="
                preferences.state.value.view === 'grid' ?
                  'List View'
                : 'Grid View'
              "
              @click="toggleViewMode"
            />
          </div>
        </div>
      </div>

      <!-- Filters & Search -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar Filters -->
        <div class="lg:col-span-1">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-neutral-900 dark:text-white">
                  Filters
                </h3>
                <UButton
                  variant="ghost"
                  size="xs"
                  color="neutral"
                  @click="clearFilters"
                >
                  Clear All
                </UButton>
              </div>
            </template>

            <div class="space-y-6">
              <!-- Search -->
              <div>
                <label
                  class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Search
                </label>
                <UInput
                  v-model="searchQuery"
                  placeholder="Search products..."
                  icon="i-tabler-search"
                />
              </div>

              <!-- Category -->
              <div>
                <label
                  class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Category
                </label>
                <USelect
                  v-model="selectedCategory"
                  :items="categories"
                  value-attribute="value"
                  option-attribute="label"
                />
              </div>

              <!-- Sort -->
              <div>
                <label
                  class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Sort By
                </label>
                <USelect
                  v-model="sortBy"
                  :items="sortOptions"
                  value-attribute="value"
                  option-attribute="label"
                />
              </div>

              <!-- Price Range -->
              <div>
                <label
                  class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Price Range
                </label>
                <div class="space-y-2">
                  <USlider
                    v-model="priceRange"
                    :min="0"
                    :max="5000"
                    :step="50"
                    color="primary"
                  />
                  <div class="flex justify-between text-xs text-neutral-500">
                    <span>{{ formatPrice(priceRange[0] || 0) }}</span>
                    <span>{{ formatPrice(priceRange[1] || 5000) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Products Grid/List -->
        <div class="lg:col-span-3">
          <!-- Results Header -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              {{ totalItems }} products found
            </p>
          </div>

          <!-- Products Grid -->
          <div
            v-if="preferences.state.value.view === 'grid'"
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <UCard
              v-for="product in paginatedProducts"
              :key="product.id"
              class="group hover:shadow-lg transition-shadow duration-200"
            >
              <div class="aspect-square relative overflow-hidden rounded-t-lg">
                <BaseImagePlaceholder
                  :label="product.name"
                  class="w-full h-full"
                />
                <div
                  v-if="!product.inStock"
                  class="absolute top-2 right-2"
                >
                  <UBadge
                    color="error"
                    variant="solid"
                    size="xs"
                  >
                    Out of Stock
                  </UBadge>
                </div>
              </div>

              <template #header>
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <UBadge
                      color="neutral"
                      variant="soft"
                      size="xs"
                    >
                      {{ product.category }}
                    </UBadge>
                    <div class="flex items-center gap-1">
                      <UIcon
                        name="i-tabler-star-filled"
                        class="w-4 h-4 text-yellow-400"
                      />
                      <span
                        class="text-xs text-neutral-600 dark:text-neutral-400"
                      >
                        {{ product.rating }} ({{ product.reviews }})
                      </span>
                    </div>
                  </div>

                  <h3
                    class="font-semibold text-neutral-900 dark:text-white line-clamp-2"
                  >
                    {{ product.name }}
                  </h3>

                  <p class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ product.brand }}
                  </p>
                </div>
              </template>

              <div class="space-y-3">
                <div class="flex flex-wrap gap-1">
                  <UBadge
                    v-for="tag in product.tags.slice(0, 2)"
                    :key="tag"
                    variant="outline"
                    size="xs"
                    color="primary"
                  >
                    {{ tag }}
                  </UBadge>
                </div>

                <div class="flex items-center justify-between">
                  <span
                    class="text-lg font-bold text-neutral-900 dark:text-white"
                  >
                    {{ formatPrice(product.price) }}
                  </span>
                  <UButton
                    icon="i-tabler-heart"
                    variant="ghost"
                    color="neutral"
                    size="sm"
                    square
                  />
                </div>
              </div>

              <template #footer>
                <div class="flex gap-2">
                  <UButton
                    :disabled="!product.inStock"
                    color="primary"
                    class="flex-1"
                    size="sm"
                  >
                    {{ product.inStock ? "View Details" : "Out of Stock" }}
                  </UButton>
                </div>
              </template>
            </UCard>
          </div>

          <!-- Products List -->
          <div
            v-else
            class="space-y-4"
          >
            <UCard
              v-for="product in paginatedProducts"
              :key="product.id"
              class="group hover:shadow-lg transition-shadow duration-200"
            >
              <div class="flex gap-4">
                <div
                  class="w-24 h-24 flex-shrink-0 relative overflow-hidden rounded-lg"
                >
                  <BaseImagePlaceholder
                    :label="product.name"
                    class="w-full h-full"
                  />
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between">
                    <div class="space-y-2 flex-1">
                      <div class="flex items-center gap-2">
                        <UBadge
                          color="neutral"
                          variant="soft"
                          size="xs"
                        >
                          {{ product.category }}
                        </UBadge>
                        <div class="flex items-center gap-1">
                          <UIcon
                            name="i-tabler-star-filled"
                            class="w-4 h-4 text-yellow-400"
                          />
                          <span
                            class="text-xs text-neutral-600 dark:text-neutral-400"
                          >
                            {{ product.rating }} ({{ product.reviews }})
                          </span>
                        </div>
                        <UBadge
                          v-if="!product.inStock"
                          color="error"
                          variant="solid"
                          size="xs"
                        >
                          Out of Stock
                        </UBadge>
                      </div>

                      <h3
                        class="font-semibold text-neutral-900 dark:text-white"
                      >
                        {{ product.name }}
                      </h3>

                      <p class="text-sm text-neutral-600 dark:text-neutral-400">
                        {{ product.brand }}
                      </p>

                      <div class="flex flex-wrap gap-1">
                        <UBadge
                          v-for="tag in product.tags"
                          :key="tag"
                          variant="outline"
                          size="xs"
                          color="primary"
                        >
                          {{ tag }}
                        </UBadge>
                      </div>
                    </div>

                    <div class="text-right space-y-2">
                      <div
                        class="text-lg font-bold text-neutral-900 dark:text-white"
                      >
                        {{ formatPrice(product.price) }}
                      </div>
                      <div class="flex gap-2">
                        <UButton
                          icon="i-tabler-heart"
                          variant="ghost"
                          color="neutral"
                          size="sm"
                          square
                        />
                        <UButton
                          :disabled="!product.inStock"
                          color="primary"
                          size="sm"
                        >
                          {{
                            product.inStock ? "View Details" : "Out of Stock"
                          }}
                        </UButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Empty State -->
          <BaseEmptyState
            v-if="filteredProducts.length === 0"
            title="No products found"
            description="Try adjusting your search criteria or filters to find what you're looking for."
            icon="i-tabler-package-off"
            action-text="Clear Filters"
            @action="clearFilters"
          />

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800"
          >
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
              {{ Math.min(currentPage * itemsPerPage, totalItems) }} of
              {{ totalItems }} products
            </div>

            <UPagination
              v-model="currentPage"
              :page-count="itemsPerPage"
              :total="totalItems"
              :max="5"
              show-first
              show-last
            />
          </div>
        </div>
      </div>
    </div>
  </BasePageWrapper>
</template>
