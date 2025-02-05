<template>
    <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-8">
            <div class="flex flex-col gap-6 laptop:gap-4">
                <div
                    v-text="$t('Select Payment Method')"
                    class="leading-normal text-xl text-p9"
                />
                <div class="flex gap-4 flex-col laptop:flex-row">
                    <BaseButton
                        v-for="method in paymentMethods"
                        :key="method?.id"
                        :isDisabled="method?.isDisabled"
                        class="w-full"
                        @click="methodClicked(method?.url)"
                        styleType="outlined"
                        :text="method?.text"
                        :startIcon="method?.icon"
                        :buttonId="method?.text.replaceAll(' ', '-')"
                    />
                </div>
            </div>
        </div>
        <div ref="cards">
            <CommonCards
                v-model="selectedCard"
                :cards="cardsList?.data"
                isSelectable
                :title="$t('Select a card')"
            />
        </div>
        <div class="flex flex-col gap-4 text-t9 leading-normal">
            <div v-text="$t('Billing Address')" class="text-xl font-medium" />
            <div
                v-text="
                    $t(
                        'The billing address must be the same as the shipping address'
                    )
                "
            />
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
                :text="$t('Continue to Order Review')"
                :isDisabled="!selectedCard"
                :isLoading="isLoading"
                size="l"
                @click="$emit('continue', selectedCard)"
                buttonId="continue-to-order-review"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    paymentMethods: Array,
    isLoading: Boolean,
});
const cards = ref();

const methodClicked = (url) => {
    if (url) {
        window.open(url, "_blank", "noreferrer");
    } else {
        cards.value.scrollIntoView({ behavior: "smooth", block: "center" });
    }
};
const cardsList = useState("cards");
onBeforeMount(async () => {
    const cardsList = useState("cards");
    const { cards } = useCheckout();
    if (!cardsList.value) {
        const { data, error } = await cards();
    }
});
const selectedCard = ref(null);
watch(
    () => cardsList.value,
    (newVal, oldVal) => {
        if (
            (!oldVal || !Array.isArray(oldVal) || oldVal?.length === 0) &&
            newVal &&
            Array.isArray(newVal) &&
            newVal.length > 0
        ) {
            selectedCard.value = newVal[0].id;
        }
    },
    { immediate: true }
);
</script>
