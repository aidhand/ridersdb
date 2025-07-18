<script setup lang="ts">
interface Props {
  modelValue?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "Search...",
  size: "md",
  disabled: false,
  loading: false,
  clearable: true,
  class: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  "search": [query: string];
  "clear": [];
}>();

const searchQuery = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

function handleSearch() {
  emit("search", searchQuery.value);
}

function handleClear() {
  searchQuery.value = "";
  emit("clear");
}

function handleKeyup(event: KeyboardEvent) {
  if (event.key === "Enter") {
    handleSearch();
  }
}
</script>

<template>
  <div class="relative">
    <BaseInput
      v-model="searchQuery"
      :placeholder="props.placeholder"
      :size="props.size"
      :disabled="props.disabled"
      :loading="props.loading"
      :class="props.class"
      icon="i-tabler-search"
      @keyup="handleKeyup"
    />

    <!-- Clear button -->
    <div
      v-if="props.clearable && searchQuery"
      class="absolute right-2 top-1/2 -translate-y-1/2"
    >
      <BaseButton
        variant="ghost"
        size="xs"
        icon="i-tabler-x"
        :disabled="props.disabled"
        @click="handleClear"
      />
    </div>
  </div>
</template>
