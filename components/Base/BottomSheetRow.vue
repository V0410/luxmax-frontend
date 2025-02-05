<template>
    <div class="py-5 px-4 flex justify-between items-center bg-p1 ">
        <div class="flex items-center">
            <IconViewer :name="icon" class="fill-p7 me-4 h-6 w-6" />
            <div v-text="text" class=" text-[#0D0D0D]" />
        </div>
        <IconArrowDown class="fill-p9 w-5 h-5 rotate-[270deg]" />
    </div>
</template>

<script setup>
defineProps({
    icon: String,
    text: String
})
</script>