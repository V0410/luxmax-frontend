<template>
  <div class="relative">
    <!-- <div class="py-10 laptop:py-20  bg-p1 flex flex-col items-center text-center">
      <div class="gridClass flex flex-col gap-12">
        <div class="flex flex-col gap-8 laptop:max-w-[450px] laptop-l:max-w-[550px] mx-auto">
          <div class="flex flex-col gap-6 items-center">
            <div
              class="w-fit uppercase py-0.5 px-1.5 border border-[#CD4631] text-sm font-bold text-[#CD4631] rounded"
              v-text="$t('BETA')"
            />
            <h1
              class="lowercase text-t8 text-bold font-static text-[40px]"
              v-html="customText ? $t('Make easier with LuxMax app', { text: `<strong>${customText}</strong>` }) : $t('Available now LuxMax App')"
            />
          </div>
          <div
            class="text-t6 text-2xl font-medium"
            v-text="$t('We just launched our app!')"
          />
        </div>
        <div class="flex flex-col laptop:flex-row justify-center gap-4 w-fit mx-auto">
          <NuxtLink to="https://play.google.com/" target="_blank">
            <div
              class="p-2 flex gap-2 border items-center border-p10 rounded-lg min-w-[235px] cursor-pointer"
            >
              <IconGooglePlay class="w-12 h-12" />
              <div class="flex flex-col text-start">
                <div class="uppercase text-p10" v-text="$t('Get it on')" />
                <div
                  class="text-[28px] font-semibold -mt-2"
                  v-text="$t('Google Play')"
                />
              </div>
            </div>
          </NuxtLink>
          <NuxtLink to="https://www.apple.com/uk/app-store/" target="_blank">
            <div
              class="p-2 flex gap-2 border items-center border-p10 rounded-lg min-w-[235px] cursor-pointer"
            >
              <IconAppStore class="w-12 h-12" />
              <div class="flex flex-col text-start">
                <div class="text-p10" v-text="$t('Download on the')" />
                <div
                  class="text-[28px] font-semibold -mt-2"
                  v-text="$t('App Store')"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <NuxtImg src="/img/home/app/left.webp" width="404" height="419" sizes="300px laptop-l:390px" loading="lazy" format="webp" quality="100" alt="luxmax app" class="hidden lazyload laptop:block absolute left-0 bottom-0 w-[300px] laptop-l:w-[390px]" />
    <NuxtImg src="/img/home/app/right.webp" width="396" height="492" sizes="300px laptop-l:390px" loading="lazy" format="webp" quality="100" alt="luxmax app" class="hidden lazyload laptop:block absolute right-0 bottom-0 w-[300px] laptop-l:w-[390px]" /> -->
  </div>
</template>

<script setup>
defineProps({
  customText: String
})
</script>
