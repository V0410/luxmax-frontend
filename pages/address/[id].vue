<template>
    <div
        class="flex flex-col items-center gap-12 px-4 laptop:px-0 py-6"
        id="paymentAddress"
    >
        <div class="flex flex-col items-center gap-6">
            <IconPackage class="w-14 laptop:w-20 h-14 laptop:h-20 fill-p7" />
            <div
                v-text="'Please send your item to the buyer'"
                id="payment-success"
                class="text-p8 text-xl laptop:text-2xl text-center"
            />
        </div>
        <div class="flex flex-col items-center gap-4">
            <div
                v-text="`Buyer post information:`"
                class="text-center text-p8 text-xl laptop:text-2xl pb-2"
            />
        </div>
        <div class="p-10 bg-p1 border border-p6 flex flex-col gap-10 w-fit">
            <div class="flex flex-col gap-4">
                <div v-text="'Buyer Address:'" class="text-2xl text-t9" />
                <div v-text="data.deliverItems" class="text-lg text-t8" />
            </div>
            <div class="flex flex-col gap-4">
                <div v-text="'Buyer Info:'" class="text-2xl text-t9" />
                <div class="text-lg text-t8" />
            </div>
        </div>
        <div class="flex flex-col w-fit gap-4">
            <div
                v-text="'After Sending Track your Item easily'"
                class="text-t9 px-5"
            />
            <nuxt-link to="/account/sale">
                <BaseButton text="Sales History" styleType="outlined" />
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
});
const route = useRoute();

const { product } = useItem();
const { data } = await product(route.params.id);
</script>
