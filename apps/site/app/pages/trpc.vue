<script setup lang="ts">
const { $trpc } = useNuxtApp();

const res = await $trpc.hello.useQuery({
  text: "World",
});
</script>

<template>
  <div>{{ res }}</div>
</template>
