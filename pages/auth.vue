<template>
  <div
    class="bg-login w-full h-[100vh] overflow-x-hidden bg-no-repeat bg-cover relative"
  >
    <div class="bg-white h-full laptop:bg-transparent overflow-auto">
      <div class="gridClass h-full flex items-center gap-16">
        <div
          class="flex-grow backdrop-blur-lg text-white bg-p7 bg-opacity-30 p-10 pb-20 hidden laptop:flex flex-col gap-10"
        >
          <div class="flex items-center justify-between">
            <NuxtLink to="/" class="flex flex-row items-center min-w-[135px]">
              <IconArrowCircleRight class="rotate-180 fill-white h-4 w-4" />
              <div class="ms-1 text-sm" v-text="$t(`Back to website`)" />
            </NuxtLink>
            <div class="flex flex-row items-center cursor-default">
              <IconLogo class="stroke-white h-[18px] w-[18px] mx-5" />
              <div
                class="text-2xl text-white font-light tracking-wider uppercase"
                v-text="$t(`luxmax`)"
              />
            </div>
            <div class="laptop-l:min-w-[135px]" />
          </div>
          <div
            class="font-title font-medium text-5xl"
            v-text="$t(`Revive Your Luxury Items`)"
          />
          <div
            class="text-xl text-p2"
            v-text="
              $t(
                `Repair, Refurbish, and Sell Your Expensive Shoes, Bags, and Clothes with Ease`
              )
            "
          />
        </div>
        <div
          class="pb-12 laptop:p-10 w-screen min-h-screen max-h-screen laptop:h-fit laptop:min-w-[503px] laptop:max-w-[503px] bg-white shadow-[0px 4px 64px 0px #0000000D] flex flex-col justify-between laptop:justify-start gap-10 laptop:min-h-fit laptop:max-h-[90%] laptop:overflow-y-auto"
        >
          <NuxtLink
            to="/"
            class="start-7 mt-7 text-p7 flex laptop:hidden flex-row items-center min-w-[135px]"
          >
            <IconArrowLeft class="fill-p7 h-4 w-4" />
            <div class="ms-1 text-sm" v-text="$t(`Back to website`)" />
          </NuxtLink>
          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>

          <div class="flex text-p10 text-sm mb-4 laptop:mb-0 justify-center">

            <NuxtLink :to="{name: 'login'}">
              <BaseButton
                  size="l"
                  :text="$t(`Login`)"
                  :isLoading="false"
              />  
            </NuxtLink>
            <div class="border-r border-p2 w-[1px] mx-5" />
            <NuxtLink :to="{name: 'signup'}">
              <BaseButton
                  size="l"
                  :text="$t(`Signup`)"
                  :isLoading="false"
              />            
            </NuxtLink>

          </div>

          <div class="flex justify-center text-p7 text-sm mb-4 laptop:mb-0">

              <NuxtLink :to="{name: 'terms-of-use'}" target="_blanck">
                <div v-text="$t(`Terms of use`)" class="cursor-pointer" />
              </NuxtLink>
              <div class="border-r border-p2 w-[1px] mx-5" />
              <NuxtLink :to="{name: 'privacy-policy'}" target="_blanck">
                <div v-text="$t(`Privacy policy`)" class="cursor-pointer" />
              </NuxtLink>
    
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  name: "auth",
  layout: "empty",
  middleware: ["auth"],
});
useHead({
  title: `LuxMax | Login`
});

const route=useRoute();
</script>
