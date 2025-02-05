<template>
<div class="flex items-center ">
        <template v-for="(step, i) in steps" :key="step.id">
            <div class="flex flex-col relative">
                <div class="w-4 h-4 border-2 border-p2 rounded-full" :class="i <= currentStep ? (isDisable ? 'bg-t3' : 'bg-p6') : (isDisable ? 'bg-t1' : 'bg-p2')" />
                <div>
                    <div v-text="step.text" class="text-[9px] laptop-l:text-xs absolute top-5 whitespace-nowrap" :class="[isDisable ? 'text-t3' : 'text-p6', i === currentStep ? 'font-bold' : '', i === 0 ? 'start-0' : i === steps.length - 1 ? 'end-0' : 'text-center w-20 -end-8']" />
                </div>
            </div>
            <div v-if="i < steps.length - 1" class="flex-grow h-1" :class="i < currentStep ? (isDisable ? 'bg-t3' : 'bg-p6') : (isDisable ? 'bg-t1' : 'bg-p2')" />
        </template>
    </div>
</template>

<script setup>
defineProps({
    steps: Array,
    currentStep: {
        type: Number,
        default: 0
    },
    isDisable: Boolean
})
</script>