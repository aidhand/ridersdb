<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const { loggedIn, user, clear } = useUserSession();

const userItems: DropdownMenuItem[] = [
  {
    label: "Dashboard",
    icon: "i-tabler-dashboard",
    to: "/user",
  },
  {
    label: "Settings",
    icon: "i-tabler-settings",
    to: "/user/settings",
  },
  {
    label: "Watchlist",
    icon: "i-tabler-list-check",
    to: "/user/watchlist",
  },
  {
    label: "Logout",
    icon: "i-tabler-logout",
    onSelect: clear,
  },
];
</script>

<template>
  <UDropdownMenu
    v-if="loggedIn"
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
    >
      {{ user?.name }}
    </UButton>
  </UDropdownMenu>

  <UButton
    v-else
    icon="i-tabler-login"
    color="neutral"
    variant="outline"
    aria-label="User menu"
    size="md"
    to="/auth/login"
    >Login</UButton
  >
</template>
