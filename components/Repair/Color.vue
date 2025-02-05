<template>
    <div class="py-1.5 px-2 bg-white flex flex-col gap-1.5 items-center border-2" :class="isSelected ? ' border-p7 cursor-default' : 'border-transparent cursor-pointer' ">
        <NuxtImg v-if="value === 'Pattern'" format="webp" quality="100" class="aspect-square w-full shadow-s-3" src="/img/repair/swatch.webp" />
        <div v-else class=" aspect-square w-full shadow-s-3" :style="value === 'Multi Color' ? 'background: linear-gradient(135deg, #FF1414 0%, #7C0E8D 17.71%, #0B8110 38.02%, #F5CF06 56.25%, #1163DF 75.52%, #0CBBBB 97.92%)' : `background-color: ${rgb};`" />
        <div class="text-[10px]" v-text="text" />
    </div>
</template>

<script setup>
defineProps({
    text: String,
    rgb: String,
    isSelected: Boolean,
    value: String
})
</script>