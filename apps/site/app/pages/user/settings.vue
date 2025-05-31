<script setup lang="ts">
useSeoMeta({
  title: "User Settings - RideDB",
  description: "Manage your account and preferences.",
});
</script>

<template>
  <PageWrapper>
    <!-- Page Header Navigation -->
    <PageHeaderNav
      :breadcrumbs="[
        { label: 'User', icon: 'i-tabler-user' },
        { label: 'Settings' },
      ]"
    />

    <h1 class="text-2xl font-bold mb-6">User Settings</h1>
    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">Profile</h2>
        </template>
        <p class="text-neutral-500/70">Update your profile information here.</p>
      </UCard>
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">Preferences</h2>
        </template>
        <p class="text-neutral-500/70">
          Customize your experience and notification settings.
        </p>
      </UCard>
    </div>
  </PageWrapper>
</template>
