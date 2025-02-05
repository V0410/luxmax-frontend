<template>
    <div
        class="w-full flex p-3 justify-between items-center gap-2 bg-p1 cursor-pointer rounded-xl"
        @click.stop="isSelected = !isSelected"
    >
        <div class="flex items-center gap-2">
            <div class="flex items-center gap-4 capitalize">
                <BaseInputCheckbox
                    v-model="isSelected"
                    :text="details.name.toLowerCase()"
                    hasIcon
                    noUpdate
                    :isDisabled="details.max == 0"
                />
            </div>
            <div class="relative hidden">
                <IconInfoCircle
                    class="w-4 h-4 fill-t7"
                    @mouseenter="isHover = true"
                    @mouseleave="isHover = false"
                />
                <BaseTooltip
                    v-show="isHover"
                    class="absolute w-[250px] bottom-7 -left-[125px]"
                    type="bottom-center"
                    :text="details.tooltipText"
                />
            </div>
        </div>
        <div v-if="details.max > 1">
            <BaseInputIncrementStepper v-model="count" :max="details.max" />
        </div>
    </div>
</template>

<script setup>
const emits = defineEmits(['update:modelValue']);
const props = defineProps({
    details: Object,
    modelValue: {
        type: [Boolean, Number, null],
        default: null,
    },
});
const isHover = ref(false);

const isSelected = ref(Boolean(props.modelValue));
const count = ref(+props.modelValue);

watch(
    () => count.value,
    (newVal) => {
        if (props.details?.max > 1) {
            if (newVal === 0) {
                isSelected.value = false;
            } else {
                isSelected.value = true;
            }
            emits('update:modelValue', newVal);
        }
    },
    { immediate: true }
);
watch(
    () => isSelected.value,
    (newVal) => {
        if (props.details?.max > 1) {
            if (newVal) {
                count.value = 1;
            } else {
                count.value = 0;
            }
        } else {
            emits('update:modelValue', newVal);
        }
    }
);
</script>
