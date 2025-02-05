<template>
    <div class="text-sm font-medium flex items-center" :class="[isLast ? 'text-t9 fill-t9' : 'text-t4 fill-t4 ', action ? 'hover:text-p7 hover:fill-p7 active:text-p9 active:fill-p9': '', hasBg ? 'py-0.5 px-2 bg-t1 rounded' : '', (hasBg && action) ? 'hover:bg-p2 active:bg-t1' : '' ]" @click="action">
        <IconViewer v-if="icon" :name="icon" class="w-[13px] h-[13px] me-1" />
        <div v-text="text" />
    </div>
</template>

<script setup>
defineProps({
    text: String,
    icon: String,
    hasBg: Boolean,
    action: Function,
    isLast: Boolean
})
</script>