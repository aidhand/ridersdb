<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  to?: string;
  icon?: string;
}

interface ActionItem {
  label: string;
  icon: string;
  color?: "primary" | "error" | "warning" | "success" | "neutral";
  variant?: "solid" | "outline" | "ghost" | "soft";
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface Props {
  /** Array of breadcrumb items */
  breadcrumbs?: BreadcrumbItem[];
  /** Array of action items */
  actions?: ActionItem[];
  /** Show back button */
  showBackButton?: boolean;
  /** Back button text */
  backButtonText?: string;
  /** Back button destination */
  backButtonTo?: string;
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [],
  actions: () => [],
  showBackButton: false,
  backButtonText: "Back",
  backButtonTo: undefined,
});
</script>

<template>
  <nav
    class="flex items-center justify-between py-4 border-b border-neutral-500/10"
    aria-label="Page navigation"
  >
    <section class="flex items-center gap-4">
      <template v-if="breadcrumbs.length > 0">
        <slot name="breadcrumbs">
          <UBreadcrumb
            :items="breadcrumbs"
            separator-icon="i-tabler-chevron-right"
          />
        </slot>
      </template>
      <template v-else>
        <slot name="back">
          <BackButton
            v-if="showBackButton"
            :text="backButtonText"
            :to="backButtonTo"
          />
        </slot>
      </template>
    </section>
    <section>
      <slot name="actions"> </slot>
    </section>
  </nav>
  <slot />
</template>
