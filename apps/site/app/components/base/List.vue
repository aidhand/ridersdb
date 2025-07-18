<template>
  <component
    :is="listType"
    :class="['space-y-3', listClass]"
  >
    <li
      v-for="(item, index) in items"
      :key="index"
      class="flex items-center gap-3"
    >
      <UIcon
        v-if="icon"
        :name="icon"
        :class="iconClass"
        :style="{ color: iconColor }"
      />
      <span>{{ item }}</span>
    </li>
  </component>
</template>

<script setup lang="ts">
interface Props {
  items: string[];
  icon?: string;
  iconColor?: string;
  iconClass?: string;
  listClass?: string;
  listType?: "ul" | "ol";
}

withDefaults(defineProps<Props>(), {
  icon: "i-heroicons-check-circle",
  iconColor: "currentColor",
  iconClass: "w-6 h-6 flex-shrink-0",
  listClass: "text-blue-800 dark:text-blue-200",
  listType: "ul",
});
</script>
