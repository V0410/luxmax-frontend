<template>
    <div class="w-[100px] h-[100px] laptop:w-[200px] laptop:h-[200px] rounded-full flex flex-col select-none justify-center items-center gap-2 laptop:gap-4 border laptop:border-2" :class="isSelected ? 'border-p7' : 'border-transparent'" style="background: linear-gradient(180deg, #F1F4F1 0%, rgba(241, 244, 241, 0.00) 100%);">
        <div v-if="icon">
            <IconViewer :name="icon" class="w-6 h-6 laptop:w-10 laptop:h-10 fill-p9" />
        </div>
        <div v-if="text" class="text-t9 text-sm laptop:text-xl font-medium max-w-[90%] text-center" v-text="text" />
    </div>
</template>

<script setup>
defineProps({
    icon: String,
    text: String,
    isSelected: Boolean
})
</script>