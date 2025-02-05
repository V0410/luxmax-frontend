<template>
  <NuxtLayout name="header">
    <div class="w-full h-full overflow-x-hidden relative">
        <NuxtLayout name="empty">
          <NuxtPage />
        </NuxtLayout>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  name: "checkout",
});
useHead({
  title: `Checkout Made Simple with LuxMax`
})
</script>
