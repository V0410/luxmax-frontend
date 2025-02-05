<template>
  <div class="gap-10 py-10">
    <div class="text-p8 font-semibold text-[40px] mb-10 text-center">
      {{ title }}
    </div>

      <Swiper
        ref="swiperjs"
        class="!overflow-visible"
        :centeredSlides="true"
        :loop="true"
        :spaceBetween="data[0].src ? '34px' :  '56px'"
        :breakpoints="{
          0: {
            slidesPerView : 2,
            spaceBetween: '24px'
          },
          1024: {
            slidesPerView : 2.5,
            spaceBetween: data[0].src ? '34px' :  '56px'
          }
        }"
        @swiper="onSwiper"
      >
      <SwiperSlide v-for="(item, index) in data" :key="`item${index}`">
        <LandingsReviewCard
          :rate="item?.rate"
          :text="item?.text"
          :author="item?.author"
          :position="item?.position"
          :src="item?.src"
        />
      </SwiperSlide>
      <LandingsWrapperController class="mt-10" :dots="data.length"/>
    </Swiper>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  data: Array,
});

const swiperInstance = ref(null);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

onMounted(() => {
  const initialSlideIndex = Math.floor(props.data.length / 2);
  // Wait for the Swiper instance to be fully initialized
  // swiperInstance.value.on('init', () => {
    swiperInstance.value.slideTo(1, 1000);
  // });

});

</script>
