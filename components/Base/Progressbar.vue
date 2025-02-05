<template>
    <div class="relative flex flex-col items-start">
        <div class=" rounded w-full h-2" :class="color === 'gold' ? 'bg-gold bg-opacity-30' : 'bg-p2'" />
        <div class=" absolute top-0 start-0 rounded h-2" :class="color === 'gold' ? 'bg-gold' : 'bg-p5 hover:bg-p7'" :style="`width:${Math.round((current / total) * 100)}%`" />
    </div>
</template>

<script setup>
defineProps({
    total: Number,
    current: Number,
    color: String
})
</script>