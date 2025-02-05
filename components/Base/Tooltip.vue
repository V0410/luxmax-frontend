<template>
    <div>
        <div class="bg-white shadow-s-1 px-4 py-3 text-xs text-t9 leading-normal relative">
            <div v-text="text" class="w-full" />
            <IconTooltipArrowDown class="absolute" :class="type === 'bottom-left' ? '-bottom-2 left-2' : type === 'bottom-center' ? '-bottom-2 left-1/2' : type === 'bottom-right' ? '-bottom-2 right-2' : type === 'top-left' ? '-top-2 left-2 rotate-180' : type === 'top-center' ? '-top-2 left-1/2 rotate-180' : type === 'top-right' ? '-top-2 right-2 rotate-180' : type === 'right-top' ? '-right-3 top-3 rotate-[270deg]' : type === 'right-center' ? '-right-3 top-1/2 rotate-[270deg]' : type === 'right-bottom' ? '-right-3 bottom-3 rotate-[270deg]' : type === 'left-top' ? '-left-3 top-3 rotate-90' : type === 'left-center' ? '-left-3 top-1/2 rotate-90' : type === 'left-bottom' ? '-left-3 bottom-3 rotate-90' : '' "/>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        text: String,
        type: String
    })
</script>
