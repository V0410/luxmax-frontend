<template>
    <div class="flex laptop:flex-col items-center laptop:items-start gap-4 laptop:gap-6 p-6 laptop:p-0 laptop:w-[280px] bg-p1 laptop:bg-transparent">
        <div v-text="number" class="rounded-full bg-p7 flex items-center justify-center w-8 h-8 min-w-[32px] min-h-[32px] text-white laptop:font-semibold" />
        <div class="text-p10 text-sm laptop:text-base laptop:font-medium leading-normal" v-text="text" />
    </div>
</template>

<script setup>
defineProps({
    text: String,
    number: Number
})
</script>
