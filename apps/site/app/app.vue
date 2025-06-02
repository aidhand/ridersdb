<script lang="ts" setup>
const { loggedIn } = useUserSession();
const { site } = useAppConfig();

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo("/");
  }
});

useHead({
  titleTemplate: (title) => {
    return title ? `${title} | ${site.name}` : site.name;
  },
  meta: [
    {
      name: "description",
      content:
        site.description || "Explore the world of motorcycles with RidersDB",
    },
    {
      name: "keywords",
      content: "motorcycles, bikes, riders, database, brands, models",
    },
    { name: "author", content: "RidersDB Team" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: site.name },
    {
      property: "og:description",
      content:
        site.description || "Explore the world of motorcycles with RidersDB",
    },
    { property: "og:site_name", content: site.name },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: site.name },
    {
      name: "twitter:description",
      content:
        site.description || "Explore the world of motorcycles with RidersDB",
    },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  ],
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
