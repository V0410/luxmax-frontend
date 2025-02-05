<template>
  <div class="px-4 py-8 laptop:p-16 flex flex-col gap-12 laptop:gap-[60px]">
    <div class="flex flex-col laptop:flex-row gap-6 laptop:gap-[60px]">
      <div class="w-full laptop:w-1/2 flex flex-col items-center laptop:items-start gap-2 laptop:gap-6 justify-center">
        <div
          class="text-[32px] laptop:text-[40px] font-bold text-t8"
          v-text="$t('What We Do')"
        />
        <div class="text-t7 laptop:text-xl text-center laptop:text-start">
          <div
            v-text="
              $t(
                `LuxMax specializes in curating an exclusive selection of premium preloved luxury items, offering expert restoration and repair services to breathe new life into cherished belongings, and providing a seamless online marketplace for buying and selling luxury goods. Our mission is to redefine luxury, promote sustainability, and celebrate the timeless allure of preloved treasures.`
              )
            "
          />
        </div>
      </div>
      <div class="w-full laptop:w-1/2">
        <NuxtImg 
          alt=""
          width="2560"
          height="1440"
          src="/img/aboutUs/what-we-do.webp"
          format="webp"
          quality="100"
          class="w-full rounded-3xl"
        />
      </div>
    </div>
    <div class="flex flex-col laptop:flex-row-reverse gap-6 laptop:gap-[60px]">
      <div class="w-full laptop:w-1/2 flex flex-col items-center laptop:items-start gap-2 laptop:gap-6 justify-center">
        <div
          class="text-[32px] laptop:text-[40px] font-bold text-t8"
          v-text="$t('Our Vision')"
        />
        <div class="text-t7 laptop:text-xl text-center laptop:text-start">
          <div
            v-text="
              $t(
                `At LuxMax, we envision a world where luxury is redefined to be more inclusive and sustainable. We strive to create a global community of luxury enthusiasts committed to environmental responsibility, ethical practices, and mindful consumption. Our vision is to lead the luxury industry in promoting positive change and fostering a more sustainable future`
              )
            "
          />
        </div>
      </div>
      <div class="w-full laptop:w-1/2 ">
        <NuxtImg 
          alt=""
          width="2560"
          height="1440"
          src="/img/aboutUs/our-vision.webp"
          format="webp"
          quality="100"
          class="w-full rounded-3xl"
        />
      </div>
    </div>
  </div>
</template>