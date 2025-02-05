<template>
  <div>
    <!-- <HomeAppAd />
    <div class="gridClass my-20 flex flex-col-reverse laptop:flex-row gap-10">
      <div class="flex-grow flex flex-col justify-center gap-10">
        <div
          class="font-static text-[40px] text-center laptop:text-start lowercase font-bold text-t8"
          v-text="$t('Why LuxMax Application')"
        />
        <div
          class="flex flex-col gap-8 text-t6 text-[24px] font-medium laptop:text-[28px]"
        >
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-t6 w-3 h-3" />
            <div v-text="$t('Buy Everywhere')" />
          </div>
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-t6 w-3 h-3" />
            <div v-text="$t('First one to see promotions')" />
          </div>
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-t6 w-3 h-3" />
            <div v-text="$t('Request for repair easily')" />
          </div>
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-t6 w-3 h-3" />
            <div v-text="$t('Track you purchase anytime')" />
          </div>
        </div>
      </div>
      <NuxtImg
        alt=""
        width="2460"
        height="2972"
        class="w-full laptop:w-1/2"
        format="webp"
        quality="100"
        src="/img/guide/donwload-app/why.webp"
      />
    </div> -->
  </div>
</template>
<script setup>
definePageMeta({
  name: "downloadApp",
});
useHead({
  title: `LuxMax - Download app`,
  meta: [
    {
      name: 'title',
      content: 'LuxMax App'
    },
    {
      name: 'description',
      content: "The LuxMax app makes booking specialized pickups, repairs and tracking simple for all your luxury items."
    }
  ]
})
</script>
