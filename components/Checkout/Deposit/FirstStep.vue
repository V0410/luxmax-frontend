<template>
    <div class="flex flex-col gap-8 items-center">
        <template v-if="items && Array.isArray(items) && items.length > 0">
            <CheckoutProduct
                v-for="item in items"
                :key="item.id"
                :data="item"
                :buttons="buttons"
                hasPrice
                class="px-6"
                @bookmark="bookmark"
                @delete="deleteItem"
                noClick
            />
        </template>
        <template v-else>
            <IconEmptyBox class="h-[200px] w-[200px]" />
            <div class="text-p8" v-text="$t('There is no item for Deposit.')" />
        </template>
    </div>
    <div
        class="z-20 laptop:hidden flex flex-col gap-2 laptop:flex-row p-6 pt-2 laptop:p-0 fixed bg-p1 shadow-s-1 laptop:bg-transparent laptop:shadow-transparent laptop:static bottom-0 start-0 end-0"
    >
        <BaseButton
            :text="$t('Summary')"
            size="m"
            styleType="text"
            endIcon="IconArrowDown"
            @click="$emit('showSummary')"
            rotateIcon
        />
        <BaseButton
            :text="$t('Checkout')"
            size="l"
            @click="$emit('checkoutClicked')"
        />
    </div>
</template>

<script setup>
defineProps({
    items: Array,
});
</script>
