<script setup lang="ts">
interface Retailer {
  name: string;
  slug: string;
  url: string;
  price: number;
  lastUpdated: Date;
}

interface Props {
  retailers: Retailer[];
  variantName: string;
}

defineProps<Props>();

const isExpanded = ref(false);

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};
</script>

<template>
  <div class="space-y-2">
    <!-- Summary -->
    <div class="flex items-center justify-between">
      <span class="text-sm text-gray-600"
        >{{ retailers.length }}
        {{ retailers.length === 1 ? "retailer" : "retailers" }}</span
      >
      <UButton
        v-if="retailers.length > 0"
        size="xs"
        variant="ghost"
        @click="isExpanded = !isExpanded"
      >
        {{ isExpanded ? "Hide" : "Show" }} Details
        <UIcon
          :name="isExpanded ? 'i-tabler-chevron-up' : 'i-tabler-chevron-down'"
          class="w-3 h-3 ml-1"
        />
      </UButton>
    </div>

    <!-- Detailed pricing list -->
    <div
      v-if="isExpanded && retailers.length > 0"
      class="mt-3 p-3 bg-gray-50 rounded-lg border"
    >
      <h4 class="text-sm font-semibold mb-2">Available at:</h4>
      <div class="space-y-2">
        <div
          v-for="retailer in retailers"
          :key="retailer.slug"
          class="flex items-center justify-between py-2 px-3 bg-white rounded border"
        >
          <div class="flex-1">
            <a
              :href="retailer.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              {{ retailer.name }}
              <UIcon
                name="i-tabler-external-link"
                class="w-3 h-3 ml-1 inline"
              />
            </a>
            <p class="text-xs text-gray-500">
              Updated {{ formatDate(retailer.lastUpdated) }}
            </p>
          </div>
          <div class="text-right">
            <p class="font-semibold text-green-600">
              {{ formatCurrency(retailer.price) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
