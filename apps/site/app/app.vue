<script lang="ts" setup>
const { site } = useAppConfig();

useHead({
  titleTemplate: (title) => {
    return title ? `${title} | ${site.name}` : site.name;
  },
  meta: [
    // TODO: Add meta tags for SEO
    // { name: "description", content: site.description },
    // { name: "keywords", content: site.keywords },
    // { name: "og:title", content: site.name },
    // { name: "og:description", content: site.description },
    // { name: "og:image", content: site.image },
    // { name: "og:url", content: site.url },
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
