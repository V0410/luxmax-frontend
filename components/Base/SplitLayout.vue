<template>
    <div class="flex flex-col laptop:flex-row gap-8"  >
        <div class=" flex flex-col gap-6" :class="isReverse ? 'w-full laptop:w-[60%] laptop:min-w-[60%] laptop:max-w-[60%]' : 'flex-grow'">
            <slot name="left" />
        </div>
        <div class="flex flex-col gap-6" :class="isReverse ? 'flex-grow' : 'w-full laptop:w-2/3 laptop:min-w-[66%] laptop:max-w-[66%] '">
            <slot name="right" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    isReverse: Boolean,
})
</script>