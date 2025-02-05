<template>
    <div class="flex flex-col gap-20">
        <div
            class="flex flex-col"
            :class="isLastStep ? 'bg-white gap-6' : 'bg-p1 p-6 gap-8'"
        >
            <div
                class="flex justify-between items-center font-medium text-xl text-p9"
            >
                <div class="flex gap-3 items-center">
                    <IconBasketDual
                        v-show="!isLastStep"
                        class="fill-p7 w-6 h-6"
                    />
                    <div v-text="title" />
                </div>
                <BaseButton
                    v-if="isEditable && !isLastStep"
                    :text="$t('Edit')"
                    buttonId="edit"
                    size="s"
                    styleType="text"
                    @click="$emit('editClicked')"
                />
            </div>
            <div
                v-for="row in dataRows"
                :key="row.id"
                class="flex justify-between items-center font-medium"
                :class="isLastStep ? 'text-sm' : ''"
            >
                <div
                    :class="isLastStep ? 'text-t6 text-sm' : 'text-p8'"
                    v-text="row?.text"
                />
                <div
                    class="text-t9"
                    v-text="
                        row?.amount === '-'
                            ? '-'
                            : row?.isSubtract
                            ? '- £' + row?.amount?.toLocaleString()
                            : '£' + row?.amount?.toLocaleString()
                    "
                />
            </div>
            <div class="border-b border-t1" />
            <div
                class="flex justify-between items-center font-medium"
                :class="isLastStep ? 'text-sm' : ''"
            >
                <div
                    :class="isLastStep ? 'text-t6 text-sm' : 'text-p8'"
                    v-text="lastRowText || $t('Total')"
                />
                <div
                    class="flex"
                    :class="isLastStep && isFail ? 'text-danger' : 'text-t9'"
                >
                    <div v-text="'£' + totalComputed?.toLocaleString()" />
                    <div
                        v-if="isLastStep && isFail"
                        v-text="' (' + $t('Failed') + ')'"
                    />
                </div>
            </div>
            <BaseButton
                v-if="hasCheckoutButton"
                class="hidden laptop:block"
                :text="$t('Checkout')"
                buttonId="checkout"
                :isDisabled="
                    isCheckoutButtonDisabled ||
                    !items ||
                    !Array.isArray(items) ||
                    items.length < 1
                "
                size="l"
                @click="$emit('checkoutClicked')"
            />
        </div>
        <div v-if="isLastStep" class="flex flex-col gap-6">
            <div class="text-xl font-medium text-p9" v-text="$t('Summery')" />
            <div class="flex flex-col gap-4">
                <div
                    class="flex justify-between items-center text-sm font-medium"
                >
                    <div class="text-t6" v-text="$t('Order Number')" />
                    <div class="text-t9" v-text="summaryData.orderNumber" />
                </div>
                <div
                    class="flex justify-between items-center text-sm font-medium"
                >
                    <div class="text-t6" v-text="$t('Order Date')" />
                    <div
                        class="text-t9"
                        v-text="dateToShow(summaryData.orderDate)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    items: Array,
    dataRows: Array,
    hasCheckoutButton: Boolean,
    isEditable: Boolean,
    isLastStep: Boolean,
    summaryData: Object,
    isFail: Boolean,
    lastRowText: String,
    isCheckoutButtonDisabled: Boolean,
});

const dateToShow = (date) => new Date(+date * 1000).toDateString();

const totalComputed = computed(() => {
    let total = 0;
    props.dataRows?.forEach((el) => {
        if (el.amount !== "-") {
            if (el.isSubtract) {
                total = total - +el.amount;
            } else {
                total = total + +el.amount;
            }
        }
    });
    return total;
});
</script>
