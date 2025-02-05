<template>
  <div class="flex w-full justify-center items-center gap-2">
    <span 
      v-for="dot in dots" :key="`dot${dot}`" 
      @click="swiper.slideTo(dot - 1)" 
      class="transition-all rounded-full" 
      :class="dot - 1 == swiper.realIndex ? 'bg-p8 w-10 h-2' : 'cursor-pointer w-2 h-2 bg-p3'"/>
  </div>
</template>

<script setup>
  const props = defineProps({
    dots: Number
  })
  const swiper = useSwiper()
</script>