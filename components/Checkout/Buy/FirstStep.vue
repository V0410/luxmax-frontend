<template>
    <div class="flex flex-col gap-8 items-center">
        <template v-if="isLoading">
            <div
                class="border-t border-p1 w-full py-2.5 flex flex-col laptop:flex-row gap-4 justify-between items-center pe-6"
            >
                <div class="flex flex-col laptop:flex-row gap-4 items-center">
                    <div
                        class="w-[100px] h-[100px] rounded-2xl m-6 laptop:m-6"
                        :class="loadingColor"
                    />
                    <div
                        class="flex flex-col gap-4 justify-center items-center"
                    >
                        <div
                            class="h-4 w-[214px] rounded-2xl"
                            :class="loadingColor"
                        />
                        <div
                            class="h-2 w-[121px] rounded-2xl"
                            :class="loadingColor"
                        />
                        <div
                            class="h-3 w-[278px] rounded-2xl"
                            :class="loadingColor"
                        />
                    </div>
                </div>
                <div
                    class="flex flex-row gap-8 justify-between laptop:justify-normal items-center w-full"
                >
                    <div
                        class="h-3 w-[48px] rounded-2xl"
                        :class="loadingColor"
                    />
                    <div class="flex flex-row gap-4">
                        <div
                            class="h-6 aspect-square rounded-full"
                            :class="loadingColor"
                        />
                        <div
                            class="h-6 aspect-square rounded-full"
                            :class="loadingColor"
                        />
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <template v-if="items && Array.isArray(items) && items?.length > 0">
                <CheckoutProduct
                    v-for="item in items"
                    :key="item.id"
                    :data="item"
                    :buttons="buttons"
                    hasPrice
                    justReadyForSale
                    class="px-6"
                    @bookmark="bookmark"
                    @delete="deleteItem"
                />
            </template>
            <template v-else>
                <IconEmptyBox class="h-[200px] w-[200px]" />
                <div
                    class="text-p8"
                    v-text="$t('There are no items in your cart.')"
                />
            </template>
        </template>
    </div>
    <div
        class="z-20 laptop:hidden flex flex-col gap-2 laptop:flex-row p-6 pt-2 laptop:p-0 fixed bg-p1 shadow-s-1 laptop:bg-transparent laptop:shadow-transparent laptop:static bottom-0 start-0 end-0"
    >
        <BaseButton
            :text="$t('Summary')"
            buttonId="summary"
            size="m"
            styleType="text"
            endIcon="IconArrowDown"
            @click="$emit('showSummary')"
            rotateIcon
        />
        <BaseButton
            :text="$t('Checkout')"
            buttonId="checkout"
            size="l"
            :isDisabled="!items || !Array.isArray(items) || items?.length < 1"
            @click="$emit('checkoutClicked')"
        />
    </div>
</template>

<script setup>

defineProps({
    items: Array,
    isLoading: Boolean,
    cartId: String,
});
const emit = defineEmits(['showSummary', 'checkoutClicked']);

const loadingColor = ref("bg-p2");

const buttons = [
    { id: 0, icon: "IconBookmark", emit: "bookmark" },
    { id: 1, icon: "IconDelete", emit: "delete" },
];

const bookmark = async (id, isFavorite) => {
    const { add_favorite, delete_favorite, favorite_list } = useItem();
    const body = { item_id: id };
    if (isFavorite) {
        await delete_favorite({ body: body });
    } else {
        await add_favorite({ body: body });
    }
    const token = useCookie("token");
    if (token.value) {
        await favorite_list();
    }
};
const deleteItem = async (id) => {
    const { cart, deleteCart } = useCheckout();
    await deleteCart(id);
    await cart();
};

setInterval(() => {
    if (loadingColor.value === "bg-p2") {
        loadingColor.value = "bg-p1";
    } else {
        loadingColor.value = "bg-p2";
    }
}, 500);

const goCheckout = async () => {
    const { createOrder } = useCheckout();
    const { data } = await createOrder({
        cartId: props.cartId,
    });
};
</script>
