<template>
    <div class=" flex justify-center laptop:px-6" >
        <div class="pb-2.5 border-b-2 flex justify-center items-center " :class="[isSelected ? 'fill-p8 text-p8 border-b-p8 cursor-default' : 'fill-t9 text-t9  border-white cursor-pointer', isFullWidth ? 'text-sm' : ' text-lg flex-col w-fit', isFullWidth ? 'w-full' : '']">
            <IconViewer v-if="icon" :name="icon" class="w-6 h-6 m-0.5" />
            <div v-if="text" v-text="text" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    text: String,
    icon: String,
    isSelected: Boolean,
    isFullWidth: Boolean
})
</script>