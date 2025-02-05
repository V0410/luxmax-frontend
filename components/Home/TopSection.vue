<template>
    <div class="laptop:h-[500px] 2k:h-[1000px] 4k:h-[1000px] laptop-l:h-[700px] laptop:px-20 4k:pt-28 2k:pt-28 laptop-l:pt-20 laptop:pt-20 pt-20 tablet:pt-0 mobile-l:pt-0 relative">
        <div
            class="bg-[url('/img/home/top-section.webp')] bg-cover mobile-m:h-[640px] mobile-l:h[600px] tablet:h-[700px] laptop-l:h-full laptop:h-full laptop:rounded-b-[100px]"
        >
            <Swiper
                :modules="[SwiperAutoplay]"
                :loop="true"
                :autoplay="{
                    delay: 5000,
                }"
                :breakpoints="{
                    0: {
                        spaceBetween: '100px',
                    },
                    1024: {
                        spaceBetween: '500px',
                    },
                }"
                class="right-0 top-0 laptop-w-[60%] h-full overflow-x-hidden"
            >
                <SwiperSlide
                    v-for="(slide, index) in slideData"
                    :key="`slide${index}`"
                    class="relative "
                >
                    <div class="laptop:flex flex-col relative z-10 px-20 pb-11 justify-between h-full w-fit hidden">
                        <div class="w-[55%]">
                            <h1
                                class="font-semibold laptop:text-[60px] laptop-l:text-[72px] 2k:text-[72px] text-p8"
                                v-html="slide?.title"
                            />
                        </div>
                        <div class="flex flex-col tablet:gap-5 laptop:gap-5 laptop-l:gap:5 2k:gap-40" >
                            <nuxt-link :to="{ name: slide?.btn?.link }">
                                <BaseButton
                                    :text="slide?.btn?.text"
                                    class="w-fit"
                                />
                            </nuxt-link>
                            <div
                                class="text-t7 text-2xl laptop:w-1/2"
                                v-text="slide.description"
                            />
                        </div>
                    </div>
                    <div
                        class="w-full absolute -top-20 left-0 flex flex-col items-center tablet:hidden laptop:visible"
                    >
                        <div
                            class="font-semibold text-center text-4xl text-p8 mb-24 hidden laptop:visible"
                            v-html="slide.title"
                        />
                    </div>
                    <NuxtImg
                        :src="slide.image"
                        class="aspect-[1] laptop:aspect-[1.1] mx-auto relative w-full laptop-l:w-[] tablet:w-[60%] mobile-l:w-[70%] laptop:w-[55%] laptop:absolute -right-[7%] laptop:-right-20 laptop-l:-top-[10%] laptop:-top-[20%] desktop:w-[50%] 2k:w-[40%]"
                    />
                    <div
                        class="laptop:hidden flex flex-col items-center px-4 gap-3"
                    >
                        <div
                            class="text-t7 text-center"
                            v-text="
                                $t(
                                    'Restore Luxury, Reclaim Elegance with LuxMax'
                                )
                            "
                        />
                        <nuxt-link :to="{ name: slide?.btn?.link }">
                            <BaseButton
                                :text="slide?.btn?.text"
                                class="w-fit"
                                :buttonId="slide?.btn?.id"
                            />
                        </nuxt-link>
                    </div>
                </SwiperSlide>
                <home-top-section-controler :dots="slideData.length"/>
            </Swiper>
        </div>
    </div>
</template>

<script setup>
defineProps({
    slideData: {
        type: Array,
        default: () => [],
    },
});
</script>
