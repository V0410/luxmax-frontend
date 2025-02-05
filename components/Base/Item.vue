<template>
    <div class="text-center max-w-[180px]">
        <div class="bg-p7 mx-auto rounded-full h-8 w-8 flex justify-center items-center text-white font-semibold" v-text="data.step || 0"/>
        <IconViewer :name="data.icon" class="mt-6 mb-2 mx-auto" />
        <div class=" font-medium text-p10" v-text="data.text" />
    </div>
</template>

<script setup>
defineProps({
    data: Object
})
</script>