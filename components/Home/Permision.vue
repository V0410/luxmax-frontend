<template>
    <div
        v-if="data?.length"
        class="bg-p1 laptop:px-20 py-12 flex flex-col gap-8"
    >
        <div class="flex items-center justify-center laptop:justify-between">
            <div v-text="title" class="font-semibold text-5xl text-p8" />
            <NuxtLink :to="{ name: btn?.link }" class="hidden laptop:block">
                <button
                    class="py-4 px-6 rounded-full border-2 border-p7 text-p7 text-lg"
                >
                    All Items
                </button>
            </NuxtLink>
        </div>
        <Swiper
            class="w-full"
            :centeredSlides="true"
            :breakpoints="{
                0: {
                    spaceBetween: '16px',
                    slidesPerView: 1.5,
                },
                1024: {
                    spaceBetween: '42px',
                    slidesPerView: 3,
                },
            }"
        >
            <SwiperSlide v-for="(slide, index) in data" :key="`slide${index}`">
                <NuxtLink
                    :to="{
                        name: 'single-product',
                        params: { id: slide.productId },
                    }"
                >
                    <div
                        class="w-full h-[560px] rounded-[40px] bg-white overflow-hidden"
                        :style="`background: url(${
                            config.public.BASE_URL +
                            slide.product.images[0]?.file?.url
                        }); background-size: cover`"
                    >
                        <div
                            class="flex flex-col w-full h-full justify-end px-8 py-6"
                            style="
                                background: linear-gradient(
                                    0deg,
                                    rgba(58, 126, 105, 0.5) 0%,
                                    rgba(58, 126, 105, 0) 100%
                                );
                            "
                        >
                            <div
                                v-text="slide.product.name"
                                class="text-[32px] text-white"
                            />
                            <div
                                v-if="slide.product.discountedPrice"
                                v-text="`£${slide.product.discountedPrice}`"
                                class="text-[24px] text-white"
                            />
                        </div>
                    </div>
                </NuxtLink>
            </SwiperSlide>
        </Swiper>
        <div class="flex justify-center laptop:hidden">
            <NuxtLink :to="{ name: btn?.link }">
                <button
                    class="py-4 px-6 rounded-full border-2 border-p7 text-p7 text-lg"
                >
                    All Items
                </button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    btn: Object,
    data: Array,
});

const config = useRuntimeConfig();
</script>
