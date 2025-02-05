<template>
    <div class="bg-p1 py-5 px-4 flex gap-4 items-center">
        <IconViewer :name="icon" class="w-6 h-6 fill-p8" />
        <div class="text-[#0D0D0D] leading-normal whitespace-nowrap" v-text="text" />
    </div>
</template>

<script setup>
defineProps({
    text: String,
    icon: String
})
</script>