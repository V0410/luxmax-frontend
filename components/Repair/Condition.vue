<template>
    <div class="py-5 px-4 bg-p1 flex border-2 justify-between" :class="isSelected ? 'border-p7 cursor-default' : 'border-transparent cursor-pointer' ">
        <div class="flex items-center gap-4">
            <BaseInputRadio :modelValue="isSelected" size="m" />
            <div class="flex flex-col gap-1 text-start">
                <div v-if="text" v-text="text" class="text-[#0D0D0D] leading-normal text-sm laptop:text-base" />
                <div v-if="desc" v-text="desc" class="font-light text-[#808080] text-[10px] laptop:text-xs leading-normal" />
            </div>
        </div>
        <div v-if="feature" class="text-[#808080] text-xs font-light">
            <div v-text="feature" class="" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    text: String,
    desc: String,
    isSelected: Boolean,
    feature: String
})
</script>