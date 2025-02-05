<template>
    <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-8">
            <div class="flex flex-col gap-6 laptop:gap-4">
                <div
                    v-text="$t('Arrival Time')"
                    class="leading-normal text-xl text-p9"
                />
                <div class="flex gap-4 flex-col">
                    <RepairCondition
                        :isSelected="selectedTime === time.value"
                        @click="
                            (selectedTime = time.value) && (timeInput = null)
                        "
                        class="w-full"
                        v-for="time in times"
                        :key="time.id"
                        :text="time.text"
                    />
                    <BaseInputDate
                        v-model="timeInput"
                        @focus="selectedTime = null"
                        :label="$t('Pick a date')"
                        size="m"
                        :placeholder="$t('Input date')"
                    />
                </div>
            </div>
        </div>
        <div
            class="z-20 laptop:justify-end flex flex-col gap-2 laptop:flex-row p-6 pt-2 laptop:p-0 fixed bg-p1 shadow-s-1 laptop:bg-transparent laptop:shadow-transparent laptop:static bottom-0 start-0 end-0"
        >
            <BaseButton
                class="laptop:hidden"
                :text="$t('In your cart')"
                size="m"
                styleType="text"
                endIcon="IconArrowDown"
                @click="$emit('showSummary')"
                rotateIcon
            />
            <BaseButton
                :text="$t('Continue to payment')"
                :isDisabled="!selectedTime && !timeInput"
                size="l"
                @click="$emit('continue', selectedTime || timeInput)"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    times: Array,
});

const selectedTime = ref(null);

const timeInput = ref(null);
</script>
