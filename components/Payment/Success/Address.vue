<template>
    <div class="flex flex-col gap-12 px-4 laptop:px-0 py-6" id="paymentAddress">
        <div class="flex flex-col items-center gap-6">
            <IconCheckCircle
                class="w-14 laptop:w-20 h-14 laptop:h-20 fill-p7"
            />
            <div
                v-text="
                    'First payment of Your request have been successfully paid'
                "
                id="payment-success"
                class="text-p8 text-xl laptop:text-2xl text-center laptop:w-1/4"
            />
            <div class="laptop:text-lg text-t9 laptop:w-1/2 text-center">
                <div
                    v-text="
                        `Your order number is ${route.params.id}, We have sent order confirmation details to`
                    "
                />
                <div v-text="data?.user?.email" class="font-semibold" />
            </div>
            <BaseButton
                styleType="outlined"
                :text="'Print Order Confirmation'"
                @click="printPage"
            />
        </div>
        <div class="flex flex-col items-center gap-4">
            <div
                v-text="`Next Step: send your item to us`"
                class="text-center text-p8 text-xl laptop:text-2xl pb-2"
            />
            <div
                class="p-3 laptop:p-6 rounded-2xl border border-p2 flex flex-col laptop:flex-row laptop:items-center gap-6 laptop:w-2/3"
            >
                <div
                    v-text="1"
                    class="w-10 min-w-[40px] h-10 rounded-full bg-p1 flex items-center justify-center font-semibold text-lg laptop:text-xl text-p7"
                />
                <div
                    v-text="
                        `Scan the QR code and either print or write down the 16-digit code if you can't print it.`
                    "
                    class="laptop:w-[50%] laptop:min-w-[50%] laptop:text-lg text-t7"
                />
                <div class="flex w-full gap-2 items-center">
                    <div
                        class="flex flex-col rounded-xl p-4 bg-p1 w-full gap-4"
                    >
                        <div v-text="'Tracking Code:'" />
                        <div class="flex justify-between text-p8">
                            <div
                                v-if="
                                    data?.items?.length &&
                                    data?.items[0]?.product?.deliverItems
                                        ?.length
                                "
                                v-text="
                                    data?.items[0]?.product?.deliverItems[0]
                                        ?.trackingId
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="p-3 laptop:p-6 rounded-2xl border border-p2 flex flex-col laptop:flex-row laptop:items-center gap-6 laptop:w-2/3"
            >
                <div
                    v-text="2"
                    class="w-10 min-w-[40px] h-10 rounded-full bg-p1 flex items-center justify-center font-semibold text-xl text-p7"
                />
                <div
                    v-text="
                        `Bring your item and the first step paper to your chosen post office and send them to our address.`
                    "
                    class="laptop:w-[50%] laptop:min-w-[50%] laptop:text-lg text-t7"
                />
                <div class="flex flex-col rounded-xl p-4 bg-p1 w-full gap-4">
                    <div class="flex flex-col gap-2">
                        <div
                            v-text="'LuxMax Address:'"
                            class="text-t7 text-[10px]"
                        />
                        <div
                            v-text="
                                '8272829 - 1410 Autocenter Dr - Walnut Creek - London - UK'
                            "
                            class="text-t9 text-xs"
                        />
                    </div>
                    <div class="flex flex-col gap-2">
                        <div
                            v-text="'Receiver Info:'"
                            class="text-t7 text-[10px]"
                        />
                        <div
                            v-text="'Behdad barzegar | +44 9157634826'"
                            class="text-t9 text-xs"
                        />
                    </div>
                </div>
            </div>
            <div
                class="p-3 laptop:p-6 rounded-2xl border border-p2 flex flex-col laptop:flex-row laptop:items-center gap-6 laptop:w-2/3"
            >
                <div
                    v-text="3"
                    class="w-10 min-w-[40px] h-10 rounded-full bg-p1 flex items-center justify-center font-semibold text-xl text-p7"
                />
                <div
                    v-text="
                        `Monitor your item's status on the My Items page after it arrives.`
                    "
                    class="w-full laptop:text-lg text-t7"
                />
                <NuxtLink :to="{ name: 'items' }">
                    <BaseButton styleType="outlined" text="My Items" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
});
const route = useRoute();
const printPage = () => {
    var printContent = document.getElementById('paymentAddress').innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
};
</script>
