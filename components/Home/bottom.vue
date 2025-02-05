<template>
  <div class="relative">
    <div class="py-10 laptop:py-16 bg-p1 flex flex-col items-center text-center">
      <div class="gridClass flex flex-col gap-10">
        <div class="flex flex-col gap-6">
          <div class="lowercase font-static text-t8 font-bold text-2xl laptop:text-[40px]" v-text="$t('Elevate Your Style')" />
          <div class="laptop:text-2xl text-black" v-text="$t('LuxMax invites you to reimagine your fashion journey.')" />
        </div>
        <video ref="video" class="w-full" autoplay loop muted playsinline preload="none">
          <source src="/video/home.webm" type="video/webm" />
          <source src="/video/home.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  customText: String
})
const video = ref()
onMounted(() => {
  video.value.play()
})
</script>
