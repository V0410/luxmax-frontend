<template>
    <div class="flex flex-col gap-6 text-center">
        <div class="flex justify-center">
            <IconViewer :name="icon" class="fill-p9 w-20 h-20" />
        </div>
        <div v-text="text" class="text-p10 font-medium" />
    </div>
</template>

<script setup>
defineProps({
    icon: String,
    text: String
})
</script>