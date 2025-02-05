<template>
    <div class="w-full m-1 bg-p1 flex flex-row justify-center rounded-full py-1">
        <div v-for="option in options" :key="option.id" :class="modelValue === option.value ? 'bg-p7 text-p1 cursor-default' : 'text-p7 cursor-pointer'" class="rounded-full h-10 w-[100px] flex justify-center items-center first-letter:capitalize" v-text="option.text" @click="click(option.value)" />
    </div>
</template>


<script setup>
import { useField } from 'vee-validate'

defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: String,
    options: Array,
    name: String
})

const name = toRef(props, 'name')
const { handleChange, errorMessage } = useField(name, undefined, {
    initialValue: props.modelValue,
})
const click = (value) => {
    handleChange(value)
}
</script>