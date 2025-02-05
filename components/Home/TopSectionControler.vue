<template>
  <div class="flex w-full laptop-l:w-fit flex-row-reverse laptop:flex-row-reverse laptop:justify-start 2k:justify-center 4k:justify-center laptop-l:justify-center mobile-l:justify-start mobile-s:jusftify-center laptop:flex-row z-10 absolute bottom-3 laptop:bottom-3 right-0 left-1/2 transform -translate-x-1/2 items-center gap-5">
      <IconArrowFillRight @click="swiper.slideNext()" class="cursor-pointer"/>
      <div class="flex laptop:flex-row gap-2 items-center">
        <span 
          @click="swiper.slideTo(dot - 1)" 
          v-for="dot in dots" 
          :key="`dot${dot}`" 
          class="transition-all rounded-full" 
          :class="dot - 1 == swiper.realIndex ? 'bg-p8 w-3 h-3' : 'cursor-pointer w-2 h-2 bg-p3'"
        />
      </div>
      <IconArrowFillLeft @click="swiper.slidePrev()" class="cursor-pointer"/>
  </div>
</template>

<script setup>
  const props = defineProps({
    dots: Number
  })
  const swiper = useSwiper()
</script>