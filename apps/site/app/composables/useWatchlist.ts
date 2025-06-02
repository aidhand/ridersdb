import { useLocalStorage } from "@vueuse/core";
import { computed, readonly } from "vue";

export interface WatchlistState {
  products: {
    id: string;
  }[];
}

// TODO: Consider using a Set for faster lookups
// TODO: Use a watcher to sync with the backend
// TODO: Add more information to the products (e.g., name, image, price)

export const useWatchlist = () => {
  const state = useLocalStorage<WatchlistState>("watchlist", {
    products: [],
  });

  // Getters
  const count = computed(() => state.value.products.length);
  const empty = computed(() => state.value.products.length === 0);
  const has = (id: string) =>
    computed(() => state.value.products.some((product) => product.id === id));

  // Actions
  const add = (product: { id: string }) => {
    if (!has(product.id).value) state.value.products.push(product);
  };

  const remove = (id: string) => {
    state.value.products = state.value.products.filter((p) => p.id !== id);
  };

  return {
    state: readonly(state),

    // Getters
    count,
    empty,
    has,

    // Actions
    add,
    remove,
  };
};
