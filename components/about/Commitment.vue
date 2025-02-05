<template>
    <div class="px-4 laptop:px-16 flex flex-col laptop:flex-row gap-6 laptop:gap-[60px] my-10 laptop:my-[60px]">
      <div class="w-full laptop:w-1/2 flex flex-col gap-2 laptop:gap-6 justify-center">
        <div
          class="text-[32px] laptop:text-[40px] font-bold text-t8 text-center"
          v-text="$t('Our Commitment to You')"
        />
        <div class="text-t7 text-center laptop:text-start laptop:text-xl">
          <div
            v-text="
              $t(
                `At LuxMax, our commitment to you is unwavering. We promise to provide exceptional customer service and support every step of the way, ensuring transparency and integrity in all our transactions and interactions. Your satisfaction is our top priority, and we strive to exceed your expectations with every experience. Trust LuxMax to uphold our commitment to quality, authenticity, and sustainability in everything we do.`
              )
            "
          />
        </div>
      </div>
      <div class="w-full laptop:w-1/2">
        <NuxtImg
          alt=""
          width="2520"
          height="1440"
          src="/img/aboutUs/our-commitment.webp"
          format="webp"
          quality="100"
          class="w-full rounded-3xl"
        />
      </div>
    </div>
</template>