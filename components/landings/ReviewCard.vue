<template>
  <div :class="src ? 'mobile-sss:w-50 mobile:l:w-80 tablet:w-auto pt-12 mobile-sss:p-6 laptop:p-6 mt-5 laptop:mt-0 laptop:ml-6 flex flex-row gap-4 items-center justify-center' : ''" class="rounded-2xl bg-p8 flex flex-col tablet:flex-row justify-end relative p-6">
    <div v-if="src" class="h-full rounded-full">
      <NuxtImg format="webp" quality="100" :src="src" class="h-20 w-auto laptop:w-24 rounded-full"/>
    </div>
    <div :class="src ? 'tablet:w-full' : 'w-full'" class="flex flex-col gap-2 laptop:gap-5">
      <div class="flex flex-col gap-1 mobile-sss:itmes-center mobile-sss:text_center tablet:text-left tablet:items-left">
        <div v-text="author" class="text-white text-sm font-bol mobile-sss:text-center tablet:text-left"/>

        <div class="flex gap-[1px] mobile-sss:justify-center tablet:justify-start">
          <IconStar v-for="star in rate" :key="`star${star}`"/>
          <div class="text-p1 text-[10px] ml-1" v-text="`${rate}.0 rating`"/>
        </div>
        
      </div>
      <div v-text="text" class="text-white text-xs laptop:text-sm mobile-sss:text-center tablet:text-left"/>
      <div class="flex flex-col gap-2 laptop:gap-2">
        <!-- <div v-text="position" class="text-p1 text-[8px]"/> -->
      </div>
    </div>
    <div class="absolute right-0 top-11 bg-white py-2 px-1 flex gap-0.5 rounded-[10px] translate-x-1/2">
      <span class="w-[5px] h-[5px] rounded-full bg-p3"/>
      <span class="w-[5px] h-[5px] rounded-full bg-p3"/>
      <span class="w-[5px] h-[5px] rounded-full bg-p3"/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    rate: Number,
    text: String,
    author: String,
    position: String,
    src: String,
})
</script>