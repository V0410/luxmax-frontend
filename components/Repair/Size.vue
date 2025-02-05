<template>
    <div
        class="py-5 ps-4 pe-6 bg-p1 flex justify-between items-center whitespace-nowrap border-2 overflow-hidden"
        :class="
            isSelected
                ? 'border-p7 cursor-default'
                : 'border-transparent cursor-pointer'
        "
    >
        <BaseInputRadio :modelValue="isSelected" size="m" :text="text" />
        <div
            v-if="desc"
            v-text="desc"
            class="font-light text-[#808080] text-sm"
        />
    </div>
</template>

<script setup>
defineProps({
    text: String,
    desc: String,
    isSelected: Boolean,
});
</script>
