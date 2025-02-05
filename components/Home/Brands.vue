<template>
  <div class="brandsSwiper bg-p2 py-2">
    <Swiper :modules="[SwiperAutoplay]" :loop="true"   
      :breakpoints="{
        0: {
          slidesPerView : 3
        },
        1024: {
          slidesPerView : 6
        }
      }"  
      :autoplay="{
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }"
    >
      <SwiperSlide v-for="(brand, index) in items" :key="`brand${index}`" class="!flex justify-center">
        <NuxtImg :src="brand" class="max-h-14 laptop:max-h-20"/>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
defineProps({
  items: Array,
});
</script>

<style >
.brandsSwiper .swiper-wrapper {
    align-items: center;
}
</style>