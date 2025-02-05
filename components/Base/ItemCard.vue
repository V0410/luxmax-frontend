<template>
    <div class="w-[240px] p-4 bg-white relative flex flex-col items-center shadow-s-2 border-2 border-transparent hover:border-p8 hover:shadow-s-3">
        <div class="absolute start-4 top-0  bg-gold p-1.5 text-white rounded-b-lg text-[10px]" v-text="condition" />
        <IconBookmarked v-if="isBookmarked" class="absolute end-2 top-2 fill-p7 cursor-pointer" />
        <IconBookmark v-else class="absolute end-2 top-2 fill-p7" />
        <NuxtImg alt="" :src="img" format="webp" quality="100" class="w-[160px]" />
        <div class="mt-4 text-p8" v-text="showShortName ? shortName : name" />
        <div class="mt-4 flex justify-between items-center w-full">
            <div v-text="price" class="text-xl font-medium" />
            <BaseButton v-if="isAddedToCard" styleType="outlined" startIcon="IconCheckCircle" text="Added" size="s" />
            <BaseButton v-else text="Shop Now" size="s" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    condition: String,
    img: String,
    name: String,
    shortName: String,
    price: String,
    isBookmarked: Boolean,
    isAddedToCard: Boolean,
    showShortName: Boolean
})
</script>