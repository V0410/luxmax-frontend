<template>
    <div
        :class="
            firstButton?.text || secondButton?.text
                ? 'h-fit'
                : 'py-20 laptop:py-0 bg-p10 h-[560px] laptop:h-fit'
        "
    >
        <div
            class="backgroundImage h-full"
            :style="`background: url(${src}); background-size: cover;`"
        >
            <div
                :class="
                    firstButton?.text || secondButton?.text
                        ? 'px-6 py-8 laptop:pt-[114px] laptop:pb-[158px] laptop:px-20 gap-[300px] laptop:gap-0'
                        : 'py-8 px-6 laptop:p-20 linearColor'
                "
                class="flex flex-col items-center justify-between h-full laptop:justify-normal laptop:items-start laptop:gap-10"
            >
                <h1
                    v-text="title"
                    :class="firstButton?.text ? '' : '-mt-20'"
                    class="font-semibold laptop:mt-0 text-4xl laptop:text-6xl laptop:max-w-[50%] text-center laptop:text-start laptop:!leading-[76px] text-p1"
                />
                <div class="flex flex-col gap-10">
                    <div
                        v-text="description"
                        :class="firstButton?.text ? '' : '-mb-20'"
                        class="text-lg laptop:mb-0 laptop:text-xl text-p1 laptop:max-w-[50%] text-center laptop:!leading-8 laptop:text-start"
                    />
                    <div
                        v-if="firstButton?.text || secondButton?.text"
                        class="flex flex-col laptop:flex-row gap-6"
                    >
                        <NuxtLink
                            v-if="firstButton?.text"
                            :to="{ name: firstButton?.link }"
                            :id="firstButton?.id"
                            class="px-6 bg-[#447e69] text-white rounded-full flex items-center h-12 justify-center"
                        >
                            <button>
                                {{ firstButton?.text }}
                            </button>
                        </NuxtLink>
                        <NuxtLink
                            v-if="secondButton?.text"
                            :to="{ name: secondButton?.link }"
                            :id="secondButton?.id"
                            class="px-6 border-2 border-white text-white rounded-full flex items-center h-12 justify-center"
                        >
                            <button>
                                {{ secondButton?.text }}
                            </button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    src: String,
    title: String,
    description: String,
    firstButton: Object,
    secondButton: Object,
});
</script>

<style scoped>
@media (max-width: 1024px) {
    .linearColor {
        background: linear-gradient(
                180deg,
                #154033 0%,
                rgba(21, 64, 51, 0) 25.9%
            ),
            linear-gradient(180deg, rgba(21, 64, 51, 0) 67.07%, #154033 97%);
    }
    .backgroundImage {
        background-position: 70% !important;
    }
}
</style>
