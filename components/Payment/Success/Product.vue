<template>
    <div class="flex flex-col items-center gap-12 py-6 px-6 laptop:px-0">
        <div class="flex flex-col items-center gap-6">
            <IconCheckCircle
                class="w-14 laptop:w-20 h-14 laptop:h-20 fill-p7"
            />
            <div
                v-text="'Your order was placed successfully'"
                class="text-p8 text-xl laptop:text-2xl text-center"
                id="payment-success"
            />
            <div
                v-text="
                    `We have sent you order confirmation details to this email: ${data?.user.email}`
                "
                class="laptop:text-lg text-t9 max-w-[420px] text-center"
            />
            <div
                v-text="`Easily track your package From:`"
                class="text-t9 text-center"
            />
            <NuxtLink :to="{ name: 'purchase' }">
                <BaseButton text="Purchase History" />
            </NuxtLink>
        </div>
        <div class="flex flex-col laptop:flex-row gap-14 laptop:w-5/6">
            <div class="laptop:w-7/12 flex flex-col gap-12">
                <div class="flex flex-col gap-4">
                    <div
                        v-text="$t('Delivery Information')"
                        class="text-p9 text-lg laptop:text-xl"
                    />
                    <div
                        class="p-4 text-sm laptop:text-base laptop:p-6 border border-t1 rounded-xl laptop:rounded-2xl gap-6 flex flex-col"
                    >
                        <div class="flex flex-col gap-2">
                            <div
                                v-text="'Delivery Information:'"
                                class="text-t9"
                            />
                            <div
                                v-text="
                                    `${data?.user.firstName} ${
                                        data?.user.firstName
                                    } | ${data?.user.email} | ${
                                        data?.user.phone || ''
                                    }`
                                "
                                class="text-sm text-t8"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <div v-text="'Ship to:'" class="text-t9" />
                            <div
                                v-text="
                                    `${data?.address.postalCode} | ${data?.address.address} | ${data?.address.city} | ${data?.address.country}`
                                "
                                class="text-sm text-t8"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-4">
                    <div
                        v-text="$t('Estimated arrival Time')"
                        class="text-p9 text-lg laptop:text-xl"
                    />
                    <div
                        class="p-4 text-sm laptop:text-base laptop:p-6 border border-t1 rounded-xl laptop:rounded-2xl gap-6 flex flex-col"
                    >
                        <div v-text="'2-3 Days'" class="text-t9" />
                    </div>
                </div>
                <div class="flex flex-col gap-4">
                    <div
                        v-text="$t('Payment')"
                        class="text-p9 text-lg laptop:text-xl"
                    />
                    <div
                        class="p-4 text-sm laptop:text-base laptop:p-6 border border-t1 flex flex-col gap-6 rounded-xl laptop:rounded-2xl"
                    >
                        <div
                            v-if="data?.creditCard"
                            class="flex gap-6 items-center"
                        >
                            <IconViewer
                                :name="cardTypeComputed"
                                class="h-[48px]"
                            />
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
                            <div v-text="'Billing Address:'" />
                            <div
                                v-text="
                                    `${data?.address?.postalCode} | ${data?.address?.address} | ${data?.address?.city} | ${data?.address?.country}`
                                "
                                class="text-t8 text-sm"
                            />
                        </div>
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
                        <div class="w-full h-[1px] bg-t1" />
                        <div class="flex justify-between">
                            <div class="text-t6">Total</div>
                            <div class="text-t9">£{{ data?.totalPrice }}</div>
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
                            <div class="text-t6">Order Date</div>
                            <div class="text-t9">
                                {{
                                    data?.creditCard.createdAt
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
                            class="w-16 laptop:w-24 h-16 laptop:h-24"
                        />
                        <div class="flex flex-col gap-2 w-full">
                            <div
                                v-text="
                                    data?.type
                                        .replaceAll('_', ' ')
                                        .toLowerCase()
                                "
                                class="text-xs laptop:text-sm"
                            />
                            <div
                                class="flex justify-between items-center gap-8 w-full"
                            >
                                <div
                                    v-text="item?.product?.name"
                                    class="text-xs laptop:text-sm text-t8"
                                />
                                <BaseBadge color="gold" text="Like New" />
                            </div>
                            <div
                                v-text="item?.product.brand?.name"
                                class="text-[10px] laptop:text-xs text-t5"
                            />
                            <div
                                class="flex gap-2 items-center text-[10px] laptop:text-xs text-t5"
                            >
                                <div v-text="item?.product.exteriorMaterial" />
                                <span class="h-4 w-[1px] bg-t1" />
                                <div v-text="item?.product.size" />
                                <span class="h-4 w-[1px] bg-t1" />
                                <div v-text="item?.product.exteriorColor" />
                            </div>
                            <div
                                v-text="`£${item.price}`"
                                class="text-xs laptop:text-sm text-t8"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
});
const config = useRuntimeConfig();

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
