<template>
    <div class="gap-10 py-10 relative">
      <div class="text-p8 font-semibold text-[40px] mb-10 text-center">
        {{ title }}
      </div>
  
        <Swiper
          v-if="shouldShowSwiper"
          ref="swiperjs"
          :modules="[SwiperAutoplay]"
          :loop="true"
          :spaceBetween="'0px'"
          :slidesPerView="2"
          :slidesPerGroup="2"
          :breakpoints="{
            0: {
              slidesPerView : 2,
              slidesPerGroup : 1,
              spaceBetween: '0px'
            },
            1024: {
              slidesPerView : 2,
              slidesPerGroup : 2,
              spaceBetween: '0px'
            }
          }"
          @swiper="onSwiper"
        >

        <SwiperSlide v-for="(item, index) in data" :key="`item${index}`" class="flex flex-col laptop:flex-row">
            <div class="flex justify-center items-center h-full">
                <NuxtImg :src="item" class="max-w-full max-h-full rounded-2xl custom-size px-4"/>
            </div>
        </SwiperSlide>

    <!-- Custom navigation arrows -->
    <div style="color:#276B58;" class="invisible laptop:visible w-10 h-10 max-h-20 absolute top-32 left-0 text-p7 font-bold swiper-button-prev" @click="swiperPrev">
    </div>
    <div style="color:#276B58" class="invisible laptop:visible w-10 h-10 max-h-20 absolute top-32 right-0 text-p7 font-bold swiper-button-next" @click="swiperNext">
    </div>

        </Swiper>

        <div class="flex flex-col gap-6 items-center justify-center" v-if="!shouldShowSwiper">
            <div>
                <NuxtImg :src="data[0]" class="max-w-full max-h-full rounded-2xl custom-size"/>
            </div>
            <div>
                <NuxtImg :src="data[1]" class="max-w-full max-h-full rounded-2xl custom-size"/>
            </div>
        </div>
    </div>
  </template>

<style>
  @media (min-width: 425px) {
    .custom-size {
      width: 388.43px;
      height: 288.37px;
    }
  }

  @media (max-width: 425px) {
    .custom-size {
      width: 100%;
      height: auto;
    }
  }
</style>


<script setup>

const props = defineProps({
    title: String,
    data: Array,
});

// Reactive ref to determine if Swiper should be shown
const shouldShowSwiper = ref(false);

// Function to check screen width and update shouldShowSwiper
const checkScreenWidth = () => {
  shouldShowSwiper.value = window.innerWidth >= 640;
};

// Call checkScreenWidth on component mount
onMounted(() => {
  checkScreenWidth();
  window.addEventListener('resize', checkScreenWidth);
});

// Remove resize listener on component unmount
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenWidth);
});

// Ref to store Swiper instance
const swiperInstance = ref(null);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

// Method to navigate to the previous slide
const swiperPrev = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev();
  }
};

// Method to navigate to the next slide
const swiperNext = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext();
  }
};

</script>