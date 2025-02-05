<template>
    <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-4">
            <div
                v-text="$t('Order Review')"
                class="leading-normal text-xl text-p9"
            />
        </div>
        <div>
            <BaseInputCheckbox
                size="m"
                v-model="isConditionsAccepted"
                name="termsAndConditions"
                :text="$t('I have read and agree to the')"
                :clickableText="$t('Terms and Conditions')"
                :text2="$t('of LuxMax')"
                @clickableTextClick="isModalShow = true"
                hasIcon
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
                rotateIcon
                @click="$emit('showSummary')"
            />
            <BaseButton
                buttonId="place-order"
                class="min-w-[120px]"
                :text="$t('Place Order')"
                :isLoading="isLoading"
                size="m"
                :isDisabled="!isConditionsAccepted"
                @click="$emit('placeOrder')"
            />
        </div>
        <ModalTermsAndConditions
            v-model="isConditionsAccepted"
            :title="$t('Terms and conditions')"
            :isShow="isModalShow"
            class="min-w-[120px]"
            @close="isModalShow = false"
            @decline="decline"
            :buttonText="$t('Accept')"
            @confirm="confirm"
        />
    </div>
</template>

<script setup>
defineProps({
    isLoading: Boolean,
});

const isConditionsAccepted = ref(false);

const isModalShow = ref(false);

const decline = () => {
    isConditionsAccepted.value = false;
    isModalShow.value = false;
};
const confirm = () => {
    isConditionsAccepted.value = true;
    isModalShow.value = false;
};
</script>
