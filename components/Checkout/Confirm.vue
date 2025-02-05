<template>
    <div class="flex flex-col gap-10 text-center">
        <template v-if="!data?.hasPostalInfo || data?.isFail">
            <div class="flex flex-col gap-6">
                <div v-if="data?.isFail || data?.successTitle" class="flex gap-4 justify-center items-center flex-col laptop:flex-row">
                    <IconXCircle v-if="data?.isFail" class="h-14 w-14 laptop:h-8 laptop:w-8 fill-danger" />
                    <IconCheckCircle v-else class="h-14 w-14 laptop:h-8 laptop:w-8 fill-p9" />
                    <div class="text-2xl font-medium" :class="data?.isFail ? 'text-danger' : 'text-p8'" v-text="data?.isFail ? $t('Payment Failed') : data?.successTitle" />
                </div>
                <div v-if="data.showAddressDetails" class="flex mt-6 flex-col gap-4 w-full max-w-[762px] mx-auto">
                    <div v-text="$t('Our post information:')" class="text-t9 text-xl laptop:text-2xl font-bold" />
                    <div class="bg-p1 p-10 border border-p6 flex flex-col gap-10 text-start">
                        <div class="flex flex-col gap-4">
                            <div class="text-t9 font-medium text-lg laptop:text-xl" v-text="$t('LuxMax Address:')" />
                            <div class="text-t8 laptop:text-xl">SW18 2QE | 51 East hill | Wandsworth | London</div>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div class="text-t9 font-medium text-lg laptop:text-xl" v-text="$t('LuxMax Info:')" />
                            <div class="text-t8 laptop:text-xl">LuxMax | Support@LuxMax.ai</div>
                        </div>
                    </div>
                </div>
                <div class="w-full laptop:w-[377px] mx-auto">
                    <BaseButton v-if="data?.additionalButtonText" size="l" styleType="outlined" :text="data.additionalButtonText" @click="$emit('additionalButtonClick')"/>
                </div>
                <div v-if="!data?.noDesc" class=" text-t9 text-lg">
                    <span v-text="data?.isFail ? $t('Please try again later or use another payment method.') : $t('We have send order confirmation details to')" />
                    <span v-if="!data?.isFail" class="font-bold" v-text="' ' + (accountInfoState?.email || $t('your email address'))" />
                </div>
            </div>
            <div v-if="(data?.successButtonDesc && data?.successButtonText)" class="flex flex-col gap-6 items-center">
                <div v-if="!data.isFail" v-text="data?.successButtonDesc" />
                <div v-if="data?.successButtonText || data?.isFail" class="w-full laptop:w-[377px]">
                    <BaseButton v-if="data?.isFail" size="l" styleType="outlined" :text="$t('Try again')" @click="$emit('filureButtonClick')"/>
                </div>
            </div>
            </template>
            <div v-else class="flex flex-col gap-6 w-full max-w-[906px] mx-auto">
                <div class="text-center text-2xl font-medium text-p8 capitalize" v-text="$t('Next Step: send your item to us')" />
                <div class="flex flex-col gap-4 w-full">
                    <div class="border border-p2 p-6 w-full flex flex-col laptop:flex-row gap-6 items-center">
                        <div class="min-w-[40px] w-10 h-10 rounded-full bg-p1 flex justify-center items-center text-xl text-p7 font-semibold" v-text="1" />
                        <div class="text-t7 text-lg max-w-[400px] text-start" v-text="$t(`Scan the QR code and either print or write down the 16-digit code if you can't print it.`)" />
                        <div class="flex flex-row gap-2 w-full">
                            <BaseQRCode :link="$route.query?.order_uid || $route.query?.item_id" isSmall />
                            <div class="p-4 bg-p1 w-full my-3 flex flex-col justify-between items-start">
                                <div class="text-t7 text-xs" v-text="$t('Tracking Code:')" />
                                <div class="text-p8 font-medium" v-text="$route.query?.order_uid || $route.query?.item_id" />
                            </div>
                        </div>
                    </div>
                    <div class="border border-p2 p-6 w-full flex flex-col laptop:flex-row  gap-6 items-center">
                        <div class="min-w-[40px] w-10 h-10 rounded-full bg-p1 flex justify-center items-center text-xl text-p7 font-semibold" v-text="2" />
                        <div class="text-t7 text-lg max-w-[400px] text-start" v-text="$t(`Bring your item and the first step paper to your chosen post office and send them to our address.`)" />
                        <div class="flex flex-row gap-2 w-full">
                            <div class="p-4 bg-p1 w-full my-3 flex flex-col gap-4 items-start text-start">
                                <div class="flex flex-col items-start gap-2">
                                    <div class="text-t7 text-xs" v-text="$t('LuxMax Address:')" />
                                    <div class="text-t9 text-xs font-medium" v-text="'SW18 2QE - 51 East hill - Wandsworth - London'" />
                                </div>
                                <div class="flex flex-col items-start gap-2">
                                    <div class="text-t7 text-xs" v-text="$t('Receiver Info:')" />
                                    <div class="text-t9 text-xs font-medium" v-text="`LuxMax - Support@LuxMax.ai`" />
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="border border-p2 p-6 w-full flex flex-col laptop:flex-row  gap-6 items-center justify-between">
                        <div class="flex flex-col laptop:flex-row items-center gap-6">
                            <div class="min-w-[40px] w-10 h-10 rounded-full bg-p1 flex justify-center items-center text-xl text-p7 font-semibold" v-text="3" />
                            <div class="text-t7 text-lg text-start" v-text="data?.successButtonDesc" />
                        </div>
                        <BaseButton size="l" styleType="outlined" :text="data.successButtonText" @click="$emit('successButtonClick')"/>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
defineProps({
    data: Object
})
defineEmits(['filureButtonClick', 'successButtonClick'])

const accountInfoState = useState("account_info");
</script>