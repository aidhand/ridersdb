import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, readonly } from "vue";

interface Item {
  slug: string;
  name: string;
  addedOn: Date;
}

export const useWatchlist = defineStore(
  "watchlist",
  () => {
    // State
    const items = useLocalStorage<Item[]>("watchlist", [], {
      mergeDefaults: true,
      serializer: {
        read: (v: string): Item[] => {
          try {
            return (
              JSON.parse(v) as { slug: string; name: string; addedOn: string }[]
            ).map((i) => ({ ...i, addedOn: new Date(i.addedOn) }));
          } catch {
            return [];
          }
        },
        write: (arr: Item[]) =>
          JSON.stringify(
            arr.map((i) => ({ ...i, addedOn: i.addedOn.toISOString() }))
          ),
      },
    });

    // Getters
    const count = computed(() => items.value.length);
    const empty = computed(() => items.value.length === 0);
    const has = computed(() => (slug: string) => {
      return items.value.some((item) => item.slug === slug);
    });
    // Actions
    const add = (input: Omit<Item, "addedOn">) => {
      items.value.push({ ...input, addedOn: new Date() });
    };
    const remove = (input: Pick<Item, "slug">) => {
      items.value = items.value.filter((i) => i.slug !== input.slug);
    };
    const clear = () => {
      items.value = [];
    };

    return {
      // State (read-only)
      items: readonly(items),
      // Getters
      count,
      empty,
      has,
      // Actions
      add,
      remove,
      clear,
    };
  },
  {
    persist: true,
  }
);
