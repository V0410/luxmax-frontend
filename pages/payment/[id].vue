<template>
    <div class="mobile-sss:px-2 mobile-sss:py-10 tablet:px-36 tablet:py-16">
        <PaymentSuccessProduct
            v-if="
                retrieveData?.status?.toLowerCase() !== 'failed' &&
                retrieveData?.type?.toLowerCase() === 'product'
            "
            :data="retrieveData"
        />
        <PaymentSuccessAddress
            v-if="
                retrieveData?.status?.toLowerCase() !== 'failed' &&
                retrieveData?.type?.toLowerCase() === 'repair'
            "
            :data="retrieveData"
        />
        <PaymentSuccessDryCleaning
            v-if="
                retrieveData?.status?.toLowerCase() !== 'failed' &&
                retrieveData?.type?.toLowerCase() === 'dry_cleaning'
            "
            :data="retrieveData"
        />
        <PaymentFailed
            v-if="retrieveData?.status?.toLowerCase() === 'failed'"
            :data="retrieveData"
        />
    </div>
</template>

<script setup>
const data = ref('address');
const route = useRoute();
const router = useRouter();

const { retrieve, markPaymentAsSuccessfull } = useCheckout();
const { data: retrieveData } = await retrieve(route.params.id);

const status = retrieveData.value?.status ? retrieveData.value?.status?.toLowerCase() : "failed";

if(status !== "failed") {
    await markPaymentAsSuccessfull({
        orderId: route.params.id
    });
}

router.push({
    query: {
        status: retrieveData.value.status?.toLowerCase(),
        type: retrieveData.value.type.toLowerCase(),
    },
});
</script>
