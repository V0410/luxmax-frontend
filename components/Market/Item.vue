<template>
    <div
        class="flex flex-col gap-4 bg-white justify-between relative"
        :class="isDisbaled ? 'cursor-default' : 'cursor-pointer'"
    >
        <div
            class="flex gap-4"
            :class="
                isForHomePage
                    ? 'flex-col max-w-[350px]'
                    : isForBigSale
                    ? 'flex-col max-w-[300px] p-6'
                    : isForRecommended
                    ? 'flex-col max-w-[350px]'
                    : isForFavorite
                    ? 'flex-col max-w-[350px]'
                    : ' laptop:flex-col'
            "
        >
            <!-- <BaseBadge :text="data.badge" :color="data.badgeColor" class="absolute top-0 start-4" /> -->
            <div
                v-if="hasAddFavorite && (isForFavorite || !isDisbaled)"
                @click.stop="bookmark(data.id, isFavorite)"
                class="absolute top-4 end-4"
            >
                <IconViewer
                    v-if="isFavorite"
                    name="IconBookmarked"
                    class="w-6 h-6 fill-p7"
                />
                <IconViewer
                    v-else
                    name="IconBookmark"
                    class="w-6 h-6 fill-p7"
                />
            </div>
            <Nuxt-Link
                :to="
                    isDisbaled
                        ? '#'
                        : {
                              name: 'single-product',
                              params: { id: data.id },
                          }
                "
                class="flex items-center justify-center"
                :class="
                    isForHomePage
                        ? 'bg-white '
                        : isForBigSale
                        ? 'bg-white'
                        : isForRecommended
                        ? 'bg-white '
                        : isForFavorite
                        ? 'bg-white'
                        : 'bg-white'
                "
            >
                <div
                    :class="
                        isForHomePage
                            ? 'w-[300px] aspect-square'
                            : isForBigSale
                            ? 'w-[300px] aspect-square'
                            : isForRecommended
                            ? 'w-[300px] aspect-square'
                            : isForFavorite
                            ? 'w-[300px] aspect-square'
                            : 'min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] laptop:min-w-[240px] laptop:min-h-[240px] laptop:max-w-[240px] laptop:max-h-[240px]'
                    "
                >
                    <NuxtImg
                        alt=""
                        v-if="data?.images[0]?.file?.url"
                        :src="config.public.BASE_URL + data.images[0].file.url"
                        :class="isDisbaled ? 'grayscale' : ''"
                        format="webp"
                        quality="100"
                        class="w-full h-full aspect-square object-contain"
                    />
                </div>
            </Nuxt-Link>
            <Nuxt-Link
                :to="
                    isDisbaled
                        ? '#'
                        : {
                              name: 'single-product',
                              params: { id: data.id },
                          }
                "
                class="flex flex-col gap-5 justify-between h-full"
                :class="
                    isForBigSale || isForHomePage ? '' : 'laptop:justify-start'
                "
            >
                <div class="flex flex-col gap-1">
                    <div
                        v-if="data.isPopular && !isDisbaled"
                        class="text-gold font-medium text-[10px] laptop:text-base"
                        v-text="$t('Popular')"
                    />
                    <div
                        class="font-medium line-clamp-2 text-xs laptop:text-base"
                        :class="isDisbaled ? 'text-t3' : 'text-t9 '"
                    >
                        <span
                            v-if="data?.brand?.name"
                            v-text="data?.brand?.name"
                        />
                        <span
                            v-if="data?.brand?.name && data?.name"
                            class="text-t1"
                            v-text="` | `"
                        />
                        <span v-text="data?.name" />
                    </div>
                    <div
                        v-if="data.color && !isDisbaled"
                        class="text-t4 text-[10px] laptop:text-base"
                        v-text="$t('Color:', { color: data.color })"
                    />
                </div>
                <div class="flex flex-col gap-1">
                    <div
                        v-if="
                            data.priceBeforeDiscount &&
                            data.priceBeforeDiscount > data.price
                        "
                        class="text-t2 line-through text-sm laptop:text-base"
                        v-text="
                            '£' + data.priceBeforeDiscount?.toLocaleString()
                        "
                    />
                    <div class="flex gap-4 items-center">
                        <div
                            class="font-medium laptop:font-bold laptop:text-lg"
                            :class="isDisbaled ? 'text-t3' : 'text-t8'"
                            v-text="'£' + data.price?.toLocaleString()"
                        />
                        <div
                            v-if="
                                data.priceBeforeDiscount &&
                                data.priceBeforeDiscount > data.price
                            "
                            class="text-success font-medium"
                            v-text="
                                data.discountPercentage + '%' + ' ' + $t('off')
                            "
                        />
                    </div>
                </div>
            </Nuxt-Link>
        </div>
        <BaseButton
            v-if="hasAddToCart"
            styleType="outlined"
            size="s"
            :isDisabled="isDisbaled"
            :isLoading="isLoading"
            :text="isAdded ? $t('Remove from cart') : $t('Add to cart')"
            buttonId="add-and-remove-from-cart"
            @click="
                token || refreshToken
                    ? buttonClicked
                    : router.push({
                          name: 'login',
                          query: { redirect: route.fullPath },
                      })
            "
        />
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
    isForRecommended: Boolean,
    isForBigSale: Boolean,
    isForHomePage: Boolean,
    isForFavorite: Boolean,
    hasAddToCart: Boolean,
    hasAddFavorite: Boolean,
    isDisbaled: Boolean,
});
const router = useRouter();

const config = useRuntimeConfig();
const { addCart, deleteCart, cart } = useCheckout();
const token = useCookie('token');
const refreshToken = useCookie('refreshToken');

const isLoading = ref(false);
const { t } = useI18n();

const cartList = useState('cartList');
const isAdded = computed(
    () =>
        cartList.value &&
        cartList.value.user_bag_list &&
        Array.isArray(cartList.value.user_bag_list) &&
        !!cartList.value.user_bag_list.find(
            (item) => item.item_id === props?.data.id
        )
);

const buttonClicked = async () => {
    isLoading.value = true;
    if (isAdded.value) {
    } else {
    }
    await cart();
    isLoading.value = false;
};

const bookmark = async (id, isFavorite) => {
    const { add_favorite, delete_favorite, favorite_list } = useItem();
    const body = { productId: id };
    if (isFavorite) {
        await delete_favorite({ body: body });
    } else {
        await add_favorite({ body: body });
    }
    if (token.value) {
        await favorite_list();
    }
};

const favoriteState = useState('favoriteState');
if (!favoriteState.value && token.value) {
    const { favorite_list } = useItem();
    await favorite_list();
}
const isFavorite = computed(
    () =>
        favoriteState.value &&
        favoriteState.value?.data &&
        Array.isArray(favoriteState.value?.data) &&
        !!favoriteState.value?.data.find(
            (item) => item.product.id === props?.data.id
        )
);
</script>
