
<template>
  <Head>
    <Title>{{ props?.seoItems?.metaTitle }}</Title>
    <Meta name="description" :content=" props?.seoItems?.metaDescription "/>
    <Meta name="robots" :content=" props?.seoItems?.metaRobots "/>
    <Meta name="viewport" :content=" props?.seoItems?.metaViewport "/>
  </Head>
</template>

<script setup>
  const props = defineProps({
    seoItems: {
      type: Object, 
      default: () => {}
    }
  })
  useHead({
    link: [{ rel: 'canonical', href: props?.seoItems?.canonicalUrl }],
  });
</script>