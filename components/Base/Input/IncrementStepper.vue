<template>
    <div dir="ltr" class="flex flex-row gap-4 items-center">
        <IconMinusCircle class="w-6 h-6 fill-p7" :class="min < modelValue ? 'cursor-pointer' : 'cursor-not-allowed'" @click.stop="decrease" />
        <div v-text="modelValue" class=" text-sm text-t7 font-medium select-none" />
        <IconPlusCircle class="w-6 h-6 fill-p7" :class="max > modelValue ? 'cursor-pointer' : 'cursor-not-allowed'" @click.stop="increase" />
    </div>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: Number,
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 10
    },
})

const decrease = () => {
    if(props.min < props.modelValue){
        emits("update:modelValue", props.modelValue - 1)
    }
}
const increase = () => {
    if(props.max > props.modelValue){
        emits("update:modelValue", props.modelValue + 1)
    }
}
</script>