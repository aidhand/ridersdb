<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const userItems: DropdownMenuItem[] = [
  {
    label: "Settings",
    icon: "i-tabler-settings",
    to: "/user/settings",
  },
  {
    label: "Watchlist",
    icon: "i-tabler-list-check",
    to: "/watchlist",
  },
  {
    label: "Login",
    icon: "i-tabler-login",
    to: "/login",
  },
  {
    label: "Logout",
    icon: "i-tabler-logout",
    to: "/logout",
  },
];
</script>

<template>
  <UDropdownMenu
    :items="userItems"
    :ui="{
      content: 'w-32',
    }"
  >
    <UButton
      icon="i-tabler-user"
      color="neutral"
      variant="outline"
      aria-label="User menu"
      size="md"
      >User</UButton
    >
  </UDropdownMenu>
</template>
