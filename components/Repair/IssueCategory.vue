<template>
    <div class="w-full flex flex-col gap-6 text-start">
        <div v-text="details.name" />
        <div class="grid gap-4 laptop:grid-cols-2">
            <RepairIssueItem v-for="item in details.problems" :key="item.id" :details="item" v-model="modelValue[item.id]" />
        </div>
    </div>
</template>

<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    details: Object,
    modelValue: Object
})

watch(() => props.modelValue, (newVal) => {
    emits('update:modelValue', newVal)
})

</script>