<script setup lang="ts">
interface Props {
  /** The text to display next to the back arrow */
  text?: string;
  /** The route to navigate to when clicked */
  to?: string;
  /** Custom click handler (if not using 'to' prop) */
  onClick?: () => void;
  /** Button variant */
  variant?: "outline" | "ghost" | "soft";
  /** Button size */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const props = withDefaults(defineProps<Props>(), {
  text: "Back",
  to: undefined,
  onClick: undefined,
  variant: "outline",
  size: "lg",
});

const router = useRouter();

const handleClick = () => {
  if (props.onClick) {
    props.onClick();
  } else if (props.to) {
    router.push(props.to);
  } else {
    router.back();
  }
};
</script>

<template>
  <UButton
    icon="i-tabler-arrow-left"
    :variant="variant"
    color="neutral"
    :size="size"
    @click="handleClick"
  >
    {{ text }}
  </UButton>
</template>
