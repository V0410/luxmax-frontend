<template>
    <div class="flex flex-col gap-12 px-6 py-6">
        <div class="flex flex-col items-center gap-6">
            <IconXCircle
                class="w-14 laptop:w-20 h-14 laptop:h-20 fill-danger"
            />
            <div
                v-text="'Payment failed'"
                class="text-danger text-xl laptop:text-2xl text-center"
                id="payment-failed"
            />
            <div
                v-text="'Please try again later or use another payment method.'"
                class="laptop:text-lg text-t7 text-center"
            />
            <BaseButton
                text="Try again"
                :isLoading="isLoading"
                @click="tryAgain"
                buttonId="try-again-payment"
            />
        </div>
        <div class="flex flex-col laptop:flex-row gap-14">
            <div class="laptop:w-7/12 flex flex-col gap-4">
                <div
                    v-text="$t('Payment')"
                    class="text-p9 text-lg laptop:text-xl"
                />
                <div
                    class="p-6 border border-t1 flex flex-col gap-6 rounded-2xl"
                >
                    <div
                        v-if="data?.creditCard"
                        class="flex gap-6 items-center text-sm laptop:text-base"
                    >
                        <IconViewer :name="cardTypeComputed" class="h-[48px]" />
                        <div
                            class="text-t9"
                            v-text="data?.creditCard?.cardNumber"
                        />
                        <div class="h-full w-[1px] bg-t1" />
                        <div
                            class="text-t9"
                            v-text="`EXP : ${data?.creditCard?.expiry}`"
                        />
                    </div>
                    <div>
                        <div
                            class="text-sm laptop:text-base"
                            v-text="'Billing Address:'"
                        />
                        <div
                            v-text="
                                `${data?.address?.postalCode} | ${data?.address?.address} | ${data?.address?.city} | ${data?.address?.country}`
                            "
                            class="text-t8 text-xs laptop:text-sm"
                        />
                    </div>
                </div>
            </div>
            <div class="laptop:w-5/12 flex flex-col gap-20">
                <div class="flex flex-col gap-8">
                    <div
                        v-text="$t('Cost')"
                        class="text-lg laptop:text-xl text-p9"
                    />
                    <div class="flex flex-col gap-4 text-xs laptop:text-sm">
                        <div class="flex justify-between">
                            <div class="text-t6">Subtotal</div>
                            <div class="text-t9">£{{ data?.price }}</div>
                        </div>
                        <div class="flex justify-between">
                            <div class="text-t6">Discount</div>
                            <div class="text-t9">£{{ 15 * data?.price / 100 }}</div>
                        </div>
                        <div class="w-full h-[1px] bg-t1" ></div>
                        <div class="flex justify-between">
                            <div class="text-t6">Total</div>
                            <div class="text-danger">
                                £{{ data?.totalPrice }}(Failed)
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-8">
                    <div
                        v-text="$t('Summery')"
                        class="text-lg laptop:text-xl text-p9"
                    />
                    <div class="flex flex-col gap-4 text-xs laptop:text-sm">
                        <div class="flex justify-between">
                            <div class="text-t6">Order Number</div>
                            <div class="text-t9">{{ data?.id }}</div>
                        </div>
                        <div class="flex justify-between">
                            <div class="text-t6">Order Time</div>
                            <div class="text-t9">
                                {{
                                    data?.createdAt
                                        .replace("T", " ")
                                        .split(".")[0]
                                }}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="data?.type !== 'DRY_CLEANING'"
                    class="border-t border-p1 flex flex-col gap-6 pt-6"
                >
                    <div
                        v-for="(item, index) in data?.items"
                        :key="`item${index}`"
                        class="flex gap-4 items-center"
                    >
                        <NuxtImg
                            v-if="item.product.images.length"
                            :src="
                                config.public.BASE_URL +
                                item.product.images[0].file.url
                            "
                            class="w-24 h-24"
                        />
                        <div class="flex flex-col gap-2 w-full">
                            <div
                                v-text="
                                    data?.type
                                        .replaceAll('_', ' ')
                                        .toLowerCase()
                                "
                                class="text-sm"
                            />
                            <div
                                class="flex justify-between items-center gap-8 w-full"
                            >
                                <div
                                    v-text="item?.product?.name"
                                    class="text-sm text-t8"
                                />
                                <BaseBadge color="gold" text="Like New" />
                            </div>
                            <div
                                v-text="item?.product.brand?.name"
                                class="text-xs text-t5"
                            />
                            <div
                                class="flex gap-2 items-center text-xs text-t5"
                            >
                                <div v-text="item?.product.exteriorMaterial" />
                                <span class="h-4 w-[1px] bg-t1" />
                                <div v-text="item?.product.size" />
                                <span class="h-4 w-[1px] bg-t1" />
                                <div v-text="item?.product.exteriorColor" />
                            </div>
                            <div
                                v-text="`£${item.price}`"
                                class="text-sm text-t8"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { date } from 'yup';

const props = defineProps({
    data: Object,
});

console.log(props);

const config = useRuntimeConfig();

const isLoading = ref(false);
const { checkout } = useCheckout();

const tryAgain = async () => {
    isLoading.value = true;
    try {
        const { data } = await checkout(props.data?.id);
        if (data?.value) {
            location.replace(data?.value.paymentUrl);
        }
    } finally {
        isLoading.value = false;
    }
};

const cardTypeComputed = computed(() => {
    if (props.data?.creditCard?.cardNumber) {
        if (props.data?.creditCard?.cardNumber.startsWith("3")) {
            return "IconAmex";
        } else if (props.data?.creditCard?.cardNumber.startsWith("4")) {
            return "IconVisa";
        } else if (props.data?.creditCard?.cardNumber.startsWith("5")) {
            return "IconMaster";
        } else if (props.data?.creditCard?.cardNumber.startsWith("6")) {
            return "IconDiscover";
        } else {
            return null;
        }
    } else {
        return null;
    }
});
</script>
