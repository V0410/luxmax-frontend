<template>
  <div
    class="bg-home-texture base-container overflow-hidden pb-4 laptop:py-0"
  >
    <div
      class="flex flex-col-reverse laptop:flex-row gap-4 laptop-l:gap-6 relative text-center laptop:text-start min-h-[80vh] laptop:min-h-fit"
    >
      <div
        class="flex-grow flex flex-col justify-between gap-6 laptop:my-auto mx-6 laptop:ms-16"
      >
        <div class="flex flex-col gap-6 w-full min-h-[240px] laptop-l:min-h-[280px] laptop:min-h-fit">
          <div
            class="font-static text-white text-[32px] laptop:text-[32px] laptop-l:text-[40px] lowercase font-semibold laptop:min-h-[96px] laptop-l:min-h-[120px]"
            v-text="sliderArray[selectedSlider].title"
          />
          <h1
            class="text-p2 text-xl laptop-l:text-2xl laptop:min-h-[64px]"
            v-text="sliderArray[selectedSlider].desc"
          />
        </div>
        <div class="flex justify-center laptop:justify-start h-[48px]">
          <BaseButton
          v-if="sliderArray[selectedSlider].buttonText"
          styleType="outlined"
          class="bg-white"
            :text="sliderArray[selectedSlider].buttonText"
            @click="
              $router.push({ name: sliderArray[selectedSlider].routeName })
            "
          />
        </div>
        <div
          class="flex gap-2 items-center justify-center laptop:justify-start"
        >
          <IconCaretUp
            class="w-8 h-8 fill-white cursor-pointer p-1.5"
            @click="
              selectedSlider <= 0
                ? (selectedSlider = sliderArray.length - 1)
                : (selectedSlider = selectedSlider - 1)
            "
          />
          <div
            v-for="(item, i) in sliderArray.length"
            :key="item.id"
            class="rounded-full"
            :class="
              selectedSlider === i
                ? 'w-6 h-1 bg-t1'
                : 'w-1 h-1 bg-t7 cursor-pointer'
            "
            @click="selectedSlider = i"
          />
          <IconCaretUp
            class="w-8 h-8 fill-white cursor-pointer rotate-180 p-1.5"
            @click="
              selectedSlider >= sliderArray.length - 1
                ? (selectedSlider = 0)
                : (selectedSlider = selectedSlider + 1)
            "
          />
        </div>
      </div>
      <div class="laptop:min-w-[57%] laptop:w-[57%] aspect-[1.63] relative">
        <transition mode="in-out">
          <NuxtImg
            fetchPriority="high"
            alt="sliderArray[0].title"
            v-if="0 === selectedSlider"
            :src="sliderArray[0].img"
            width="1920"
            height="1184"
            format="webp"
            quality="100"
            sizes="100vw laptop:57vw"
            class="w-full absolute top-0 laptop:rounded-s-[350px] overflow-hidden lazyload"
          />
          <NuxtImg
            fetchPriority="high"
            alt="sliderArray[1].title"
            v-else-if="1 === selectedSlider"
            :src="sliderArray[1].img"
            width="1920"
            height="1184"
            format="webp"
            quality="100"
            sizes="100vw laptop:57vw"
            class="w-full absolute top-0 laptop:rounded-s-[350px] overflow-hidden lazyload"
          />
          <NuxtImg 
            fetchPriority="high"
            alt="sliderArray[2].title"
            v-else-if="2 === selectedSlider"
            :src="sliderArray[2].img"
            width="1920"
            height="1184"
            format="webp"
            quality="100"
            sizes="100vw laptop:57vw"
            class="w-full absolute top-0 laptop:rounded-s-[350px] overflow-hidden lazyload"
          />
          <NuxtImg
            fetchPriority="high"
            alt="sliderArray[3].title"
            v-else-if="3 === selectedSlider"
            :src="sliderArray[3].img"
            width="1920"
            height="1184"
            format="webp"
            quality="100"
            sizes="100vw laptop:57vw"
            class="w-full absolute top-0 laptop:rounded-s-[350px] overflow-hidden lazyload"
          />
        </transition>
      </div>
    </div>
    <NuxtImg
      v-for="slider in sliderArray"
      :key="slider.id"
      :src="slider.img"
      width="1920"
      height="1184"
      format="webp"
      quality="100"
      sizes="100vw laptop:57vw"
      class="hidden"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  sliderArray: Array,
});

const router = useRouter();
const selectedSlider = ref(0);
let interval = null;

watch(
  () => selectedSlider.value,
  () => {
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => {
      if (props.sliderArray.length - 1 > selectedSlider.value) {
        selectedSlider.value = selectedSlider.value + 1;
      } else {
        selectedSlider.value = 0;
      }
    }, 3000);
  },
  { immediate: true }
);
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.6s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
