<template>
    <div>
        <div class="w-full h-16 bg-p10 text-white flex justify-center items-center gap-4 ">
            <IconLogo class="stroke-white w-4 h-4" />
            <div class=" text-xl font-light tracking-[4px]" v-text="`LUXMAX`" />
        </div>
        <div class="gridClass flex flex-col gap-6 my-8">
            <div class="flex flex-col gap-4 justify-center items-center">
                <IconXCircle v-if="route?.query?.status === 'failed'" class="h-14 w-14 fill-danger" />
                <IconCheckCircle v-else class="h-14 w-14 fill-p9" />
                <div class=" text-xl font-medium text-center" :class="route?.query?.status === 'failed' ? 'text-danger' : 'text-p8'" v-text="route?.query?.status === 'failed' ? $t('Payment Failed') : $t('Your Order Was Placed Successfully')" />
            </div>
            <div class="p-4 flex flex-col gap-4 text-sm" :class="route?.query?.status === 'failed' ? 'bg-[#F64B3C1A]' : 'bg-p1'">
                <div class="flex justify-between items-center">
                    <div class="text-t6">Order payment</div>
                    <div class="text-t9">£{{ route?.query?.payment }}</div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-t6">Order Number</div>
                    <div class="text-t9">{{ route?.query?.number }}</div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-t6">Order Date</div>
                    <div class="text-t9">{{ new Date(+route.query.date).toISOString()?.split('T')[0] }} {{ new Date(+route.query.date).toISOString().split('T')[1]?.split('.')[0] }}</div>
                </div>
            </div>
            <div class="text-t9 text-center" v-text="route?.query?.status === 'failed' ? 'Please try again later or use another payment method.' : 'Easily track your package from purchase history'" />
            <a :href="`luxmax://com.luxmax/${route?.query?.number}`">
                <BaseButton styleType="outlined" text="Back to app"/>
            </a>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    name: 'app',
    layout: 'empty'
})
const route = useRoute()
if ((route?.query?.status === "failed" || route?.query?.status === "success") && route?.query?.date && route?.query?.number && route?.query?.payment) {

}
else{
    throw Error
}
</script>