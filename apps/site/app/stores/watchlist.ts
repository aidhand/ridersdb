interface Item {
  slug: string;
  name: string;
  addedOn: Date;
}

export const useWatchlist = defineStore("watchlist", () => {
  // State
  const items = ref<Item[]>([]);

  // Getters
  const count = computed(() => items.value.length);
  const empty = computed(() => items.value.length === 0);
  const has = computed(() => (slug: string) => {
    return items.value.some((item) => item.slug === slug);
  }); // Actions
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
});
