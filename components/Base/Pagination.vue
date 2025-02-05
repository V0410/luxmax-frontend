<template>
    <div
        v-show="totalPages > 1"
        class="flex gap-2 stroke-t10 text-t10 [&>*]:w-10 [&>*]:h-10 [&>*]:flex [&>*]:justify-center [&>*]:items-center"
    >
        <Nuxt-Link
            :to="{ query: { page: modelValue - 1 } }"
            v-show="modelValue !== 1"
            class="bg-p1 cursor-pointer"
            @click="changeCurrent('minus')"
        >
            <IconArrowRightThin class="h-6 w-6 rotate-180" />
        </Nuxt-Link>
        <Nuxt-Link
            :to="{ query: { page: 1 } }"
            :class="
                modelValue === 1
                    ? 'bg-p6 cursor-default text-p1'
                    : 'bg-p1 cursor-pointer'
            "
            @click="changeCurrent(1)"
            >1
        </Nuxt-Link>
        <Nuxt-Link v-show="modelValue > 3" class="bg-p1 cursor-default"
            >...</Nuxt-Link
        >
        <Nuxt-Link
            :to="{ query: { page: modelValue - 1 } }"
            v-if="modelValue > 2"
            class="bg-p1 cursor-pointer"
            @click="changeCurrent(modelValue - 1)"
        >
            {{ modelValue - 1 }}</Nuxt-Link
        >
        <Nuxt-Link
            v-show="modelValue !== 1 && modelValue !== totalPages"
            class="bg-p6 cursor-default text-p1"
            >{{ modelValue }}</Nuxt-Link
        >
        <Nuxt-Link
            :to="{ query: { page: modelValue + 1 } }"
            v-show="modelValue < totalPages - 1"
            class="bg-p1 cursor-pointer"
            @click="changeCurrent(modelValue + 1)"
            >{{ modelValue + 1 }}</Nuxt-Link
        >
        <Nuxt-Link
            v-show="modelValue < totalPages - 2"
            class="bg-p1 cursor-default"
            >...</Nuxt-Link
        >
        <Nuxt-Link
            :to="{ query: { page: totalPages } }"
            :class="
                modelValue === totalPages
                    ? 'bg-p6 cursor-default text-p1'
                    : 'bg-p1 cursor-pointer'
            "
            @click="changeCurrent(totalPages)"
            >{{ totalPages }}</Nuxt-Link
        >
        <Nuxt-Link
            :to="{ query: { page: modelValue + 1 } }"
            v-show="modelValue !== totalPages"
            class="bg-p1 cursor-pointer"
            @click="changeCurrent('plus')"
        >
            <IconArrowRightThin class="h-6 w-6" />
        </Nuxt-Link>
    </div>
</template>

<script setup>
const emits = defineEmits('update:modelValue');
const props = defineProps({
    totalPages: Number,
    modelValue: Number,
});
const changeCurrent = (arg) => {
    switch (arg) {
        case 'plus':
            props.modelValue < props.totalPages
                ? emits('update:modelValue', props.modelValue + 1)
                : '';
            break;
        case 'minus':
            props.modelValue > 1
                ? emits('update:modelValue', props.modelValue - 1)
                : '';
            break;
        default:
            emits('update:modelValue', arg);
    }
};
</script>
