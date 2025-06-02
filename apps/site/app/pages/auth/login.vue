<script setup lang="ts">
// Meta tags for SEO
useSeoMeta({
  title: "Login",
  description:
    "Sign in to your RidersDB account to manage your motorcycle gear collection, watchlist, and preferences.",
});
</script>

<template>
  <div
    class="flex-1 flex flex-col md:flex-row justify-center items-center gap-12"
  >
    <section>
      <div class="text-center space-y-4">
        <div class="flex justify-center">
          <div class="p-4 bg-primary-500/10 rounded-xl">
            <UIcon
              name="i-tabler-user-circle"
              class="text-3xl text-primary-500"
            />
          </div>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
            Welcome to RidersDB
          </h1>
          <p class="text-lg text-neutral-500/70 mt-2">
            Sign in to manage your motorcycle gear collection
          </p>
        </div>
      </div>
    </section>
    <section class="flex flex-col items-center gap-8">
      <div class="flex flex-col gap-4">
        <UButton
          icon="i-tabler-brand-github"
          color="neutral"
          variant="solid"
          size="lg"
          class="w-64 justify-center"
          to="/api/auth/github"
          external
        >
          <span>Continue with GitHub</span>
        </UButton>
        <UButton
          icon="i-tabler-brand-twitter"
          color="neutral"
          variant="solid"
          size="lg"
          class="w-64 justify-center"
          disabled
        >
          <span>Continue with Twitter</span>
        </UButton>
        <UButton
          icon="i-tabler-brand-google"
          color="neutral"
          variant="solid"
          size="lg"
          class="w-64 justify-center"
          disabled
        >
          <span>Continue with Google</span>
        </UButton>
        <UButton
          icon="i-tabler-phone"
          color="neutral"
          variant="solid"
          size="lg"
          class="w-64 justify-center"
          disabled
        >
          <span>Continue with Phone</span>
        </UButton>
      </div>

      <!-- Separator -->
      <hr class="w-full border-neutral-400/30" />

      <!-- Email Sign In Card -->
      <UCard>
        <form class="space-y-6">
          <UFormField
            label="Email Address"
            required
          >
            <UInput
              type="email"
              placeholder="Enter your email address"
              icon="i-tabler-mail"
              size="lg"
            />
          </UFormField>

          <UButton
            type="submit"
            icon="i-tabler-login"
            color="primary"
            variant="solid"
            size="lg"
            class="w-64 justify-center"
          >
            <span>Sign In</span>
          </UButton>
        </form>
      </UCard>
    </section>
  </div>
</template>
