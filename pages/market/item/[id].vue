<template>
    <div>
        <TheMeta :seoItems="seoItems" />
        <div
            v-if="productDetail"
            class="pb-[120px] laptop:py-20 flex flex-col gap-6 laptop:gap-28 relative"
        >
            <div class="gridClass flex flex-col laptop:flex-row gap-10">
                <div class="flex-grow flex gap-4">
                    <div class="w-[160px] flex-col gap-6 hidden laptop:flex">
                        <NuxtImg
                            alt=""
                            v-for="(src, i) in productDetail?.images"
                            :key="src"
                            :src="config.public.BASE_URL + src?.file?.url"
                            quality="100"
                            format="webp"
                            class="w-full cursor-pointer"
                            @click="selectedImg = i"
                        />
                    </div>
                    <div class="flex-grow relative max-w-[700px]">
                        <NuxtImg
                            alt=""
                            :src="
                                config.public.BASE_URL +
                                productDetail?.images[selectedImg]?.file?.url
                            "
                            quality="100"
                            format="webp"
                            class="w-full"
                        />
                        <div
                            class="absolute laptop:hidden bottom-0 flex justify-center w-full"
                        >
                            <div class="flex items-center">
                                <div
                                    v-for="(img, i) in productDetail?.images"
                                    :key="img"
                                    class="p-1"
                                    @click="selectedImg = i"
                                >
                                    <div
                                        class="rounded-full"
                                        :class="
                                            i === selectedImg
                                                ? 'w-3 h-3 bg-p7 cursor-default'
                                                : 'w-2 h-2 bg-t1 cursor-pointer'
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="laptop:w-2/5 flex flex-col gap-6 laptop:gap-10">
                    <div class="flex flex-col gap-6">
                        <div class="flex flex-col gap-1">
                            <!-- <div
                v-if="data.isPopular"
                class="text-gold font-medium text-[10px] laptop:text-base"
                v-text="$t('Popular')"
              /> -->
                            <div
                                class="text-t9 font-medium line-clamp-2 text-xs laptop:text-base"
                            >
                                <h1 v-text="productDetail?.name" />
                            </div>
                        </div>
                        <div class="flex-col gap-2 flex">
                            <div
                                v-if="
                                    productDetail?.discountedPrice &&
                                    productDetail?.discountedPrice <
                                        productDetail?.price
                                "
                                class="text-t2 line-through text-sm hidden laptop:block laptop:text-base"
                                v-text="
                                    '£' + productDetail?.price?.toLocaleString()
                                "
                            />
                            <div class="flex gap-4 items-center">
                                <div
                                    class="text-t8 font-semibold laptop:text-3xl"
                                    v-text="
                                        '£' +
                                        productDetail?.price?.toLocaleString()
                                    "
                                />
                                <!-- <div
                  v-if="
                  productDetail?.discountedPrice &&
                  productDetail?.discountedPrice < productDetail?.price
                  "
                  class="text-success font-medium"
                  v-text="data.discountPercentage + '%' + ' ' + $t('off')"
                /> -->
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div class="flex flex-grow items-center">
                                <!-- <BaseBadge
                  v-for="badge in data.badges"
                  :key="badge.id"
                  :text="badge.text"
                  :color="badge.color"
                /> -->
                            </div>
                            <div v-if="token">
                                <div
                                    @click.stop="
                                        bookmark(productDetail?.id, isFavorite)
                                    "
                                    class="cursor-pointer"
                                    id="bookmark"
                                >
                                    <IconViewer
                                        v-if="isFavorite"
                                        name="IconBookmarked"
                                        class="w-8 h-8 fill-p7"
                                    />
                                    <IconViewer
                                        v-else
                                        name="IconBookmark"
                                        class="w-8 h-8 fill-p7"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div
                                v-if="productDetail?.userId"
                                class="flex items-center justify-between"
                            >
                                <div
                                    class="flex gap-2 items-center"
                                    :class="
                                        productDetail?.userId
                                            ? 'cursor-pointer'
                                            : 'cursor-default'
                                    "
                                    @click="
                                        productDetail?.user?.id
                                            ? $router.push({
                                                  name: 'seller',
                                                  params: {
                                                      id: productDetail?.user
                                                          ?.id,
                                                  },
                                              })
                                            : () => {}
                                    "
                                >
                                    <div
                                        class="text-t6 text-sm"
                                        v-text="$t('Seller:')"
                                    />
                                    <div
                                        class="text-t10 text-xl"
                                        v-text="
                                            `${productDetail?.user?.firstName} ${productDetail?.user?.lastName}`
                                        "
                                    />
                                </div>
                                <!-- <div
                  class="flex items-center gap-1 cursor-pointer"
                  @click="scrollTo('sellerInfo')"
                >
                  <IconInfoCircle class="fill-p9 h-5 w-5" />
                  <div class="text-p7 text-sm" v-text="$t('View Detail')" />
                </div> -->
                            </div>
                            <BaseButton
                                size="l"
                                :isLoading="isLoading"
                                :styleType="isAdded ? 'outlined' : 'fill'"
                                :text="
                                    isAdded
                                        ? $t('Remove from cart')
                                        : $t('Add to cart')
                                "
                                buttonId="add-and-remove-from-cart"
                                @click="
                                    token || refreshToken
                                        ? buttonClicked(productDetail?.id)
                                        : router.push({
                                              name: 'login',
                                              query: {
                                                  redirect: route.fullPath,
                                              },
                                          })
                                "
                            />
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <MarketExpandableRow
                            v-for="row in expandableRows"
                            :id="row.dataName"
                            v-model="row.isShow"
                            :key="row.id"
                            :options="row"
                            :data="row"
                        />
                    </div>
                </div>
            </div>
            <div
                v-if="
                    recommendedItems &&
                    Array.isArray(recommendedItems) &&
                    recommendedItems.length > 0
                "
                class="gridClass flex flex-col gap-6"
            >
                <div class="flex justify-between items-center">
                    <div
                        class="text-p9 text-xl first-letter:capitalize"
                        v-text="$t('recommended')"
                    />
                    <!-- <BaseButton styleType="text" :text="$t('VIEW ALL')" @click="$router.push({ name: 'market', query: { sort: 'featured' } })" /> -->
                </div>
                <div class="flex gap-6 overflow-x-auto overflow-y-hidden">
                    <MarketItem
                        v-for="item in $formatItems(recommendedItems)"
                        :key="item.id"
                        :isDisbaled="
                            item?.state && item?.state !== 'ready for sell'
                        "
                        :data="item"
                        isForRecommended
                        :hasAddFavorite="!!token"
                    />
                </div>
            </div>
            <div class="bg-p1">
                <div
                    class="p-6 laptop:gridClass laptop:px-20 flex flex-col gap-8 laptop:flex-row justify-between items-center w-full"
                >
                    <div
                        v-for="item in bottomItems"
                        :key="item.id"
                        class="flex laptop:flex-col laptop:justify-center items-center gap-4 w-full"
                    >
                        <IconViewer
                            :name="item.icon"
                            class="w-12 h-12 laptop:w-20 laptop:h-20 fill-p7"
                        />
                        <div class="text-t10" v-text="item.text" />
                    </div>
                </div>
            </div>
            <div class="laptop:hidden fixed bottom-0 py-6 bg-white w-full">
                <div class="gridClass flex justify-between items-center gap-4">
                    <template v-if="isAdded">
                        <div class="flex flex-col gap-2">
                            <div class="flex gap-4 items-center">
                                <div
                                    class="text-t8 font-medium laptop:font-bold laptop:text-lg"
                                    v-text="'£' + productDetail?.price"
                                />
                            </div>
                            <div
                                @click="buttonClicked(productDetail?.id)"
                                class="text-t4 text-sm cursor-pointer"
                                v-text="$t('Remove from Cart')"
                            />
                        </div>
                        <NuxtLink class="w-1/2" :to="{ name: 'buy' }">
                            <BaseButton
                                size="l"
                                :isLoading="isLoading"
                                styleType="outlined"
                                :text="$t('Checkout')"
                                buttonId="checkout-item"
                                class="w-full"
                            />
                        </NuxtLink>
                    </template>
                    <template v-else>
                        <div class="flex flex-col gap-2">
                            <div
                                v-if="
                                    productDetail?.price &&
                                    productDetail?.price >
                                        productDetail?.discountedPrice
                                "
                                class="text-t2 line-through text-sm laptop:text-base"
                                v-text="'£' + productDetail?.price"
                            />
                            <div class="flex gap-4 items-center">
                                <div
                                    class="text-t8 font-medium laptop:font-bold laptop:text-lg"
                                    v-text="
                                        '£' + productDetail?.discountedPrice
                                    "
                                />
                                <!-- <div
                v-if="
                  productDetail?.price &&
                  productDetail?.price > productDetail?.discountedPrice
                  "
                class="text-success font-medium"
                v-text="data.discountPercentage + '%' + ' ' + $t('off')"
                /> -->
                            </div>
                        </div>
                        <BaseButton
                            size="l"
                            :isLoading="isLoading"
                            :styleType="isAdded ? 'outlined' : 'fill'"
                            :text="
                                isAdded
                                    ? $t('Remove from cart')
                                    : $t('Add to cart')
                            "
                            buttonId="add-and-remove-from-cart"
                            @click="
                                token || refreshToken
                                    ? buttonClicked(productDetail?.id)
                                    : router.push({
                                          name: 'login',
                                          query: { redirect: route.fullPath },
                                      })
                            "
                            class="w-1/2"
                        />
                    </template>
                </div>
            </div>
            <transition>
                <div
                    v-show="isAdded"
                    class="hidden laptop:block fixed w-full bg-p2 bottom-0 py-6"
                >
                    <div class="gridClass flex justify-between items-center">
                        <div
                            class="text-p8 laptop:text-xl flex flex-row items-center gap-4"
                        >
                            <div v-if="cartList?.items?.length === 1">
                                {{ $t('1 Item in card') }}
                            </div>
                            <div v-else>
                                {{
                                    cartList?.items?.length +
                                    $t(' Items in card')
                                }}
                            </div>
                            <div>|</div>
                            <div v-text="`£ ` + totalPrice?.toLocaleString()" />
                        </div>
                        <div
                            class="flex flex-col laptop:flex-row items-center gap-4"
                        >
                            <NuxtLink :to="{ name: 'market' }">
                                <BaseButton
                                    styleType="outlined"
                                    :text="$t('Continue Shopping')"
                                />
                            </NuxtLink>
                            <div v-text="$t('Or')" />
                            <NuxtLink :to="{ name: 'buy' }">
                                <BaseButton
                                    :text="$t('Check Out')"
                                    buttonId="checkout-item"
                                />
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div
            v-else
            class="h-[calc(100svh-120px)] flex justify-center items-center"
        >
            <BaseAlert
                type="danger"
                title="unavailable"
                desc="Your selected item is currently unavailable."
                noClose
            />
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    name: 'single-product',
    layout: 'mobilenofooter',
    middleware: ['item-id'],
});

const { t } = useI18n();
const data = ref({});
const isLoading = ref(false);
const recommendedItems = ref([]);
const token = useCookie('token');
const refreshToken = useCookie('refreshToken');
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const {
    add_favorite,
    delete_favorite,
    favorite_list,
    product,
    getUser,
    getFile,
} = useItem();
const { data: productDetail } = await product(route.params.id);

const seoItems = ref(null);
const { getSeo } = useItem();
const { data: Seo } = await getSeo(route.fullPath);
if (Seo.value) {
    seoItems.value = {
        metaTitle: Seo.value?.metaTitle,
        metaDescription: Seo.value?.metaDescription,
        metaRobots: Seo.value?.metaRobots,
        metaViewport: Seo.value?.metaViewport,
        canonicalUrl:
            Seo.value?.canonicalUrl || `https://luxmax.co${route.fullPath}`,
    };
} else {
    seoItems.value = {
        metaTitle: `Buy Pre-Owned ${productDetail?.value?.name}`,
        metaDescription: `Buy pre-owned, restored ${productDetail?.value?.name}`,
        metaViewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        canonicalUrl: `https://luxmax.co${route.fullPath}`,
        metaRobots: productDetail.value ? 'index' : 'noindex',
    };
}

watch(
    () => productDetail?.value?.name,
    (newVal) => {
        useHead({
            title: `Price & Detail of ${newVal || 'Product'}`,
            meta: [
                {
                    name: 'title',
                    content: `${newVal || 'Product'} | LuxMax Marketplace`,
                },
                {
                    name: 'description',
                    content: `${newVal || 'Product'}`,
                },
            ],
        });
    }
);

const { $detailNameMapper, $formatItems } = useNuxtApp();

const { addCart, deleteCart, cart } = useCheckout();

const buttonClicked = async (id) => {
    isLoading.value = true;
    const body = { productId: id };
    if (isAdded.value) {
        const { deleteCart } = useCheckout();
        await deleteCart(id);
    } else {
        const { error } = await addCart({ body: body });
        if (!error.value) {
            const { create } = useToast();
            create({
                id: Math.random(),
                type: 'success',
                title: t('Item has been added to the cart'),
                noClose: true,
                time: 5,
            });
        }
    }
    await cart();
    isLoading.value = false;
};

let cartList = useState('cartList');
if (!cartList.value) {
    const { data, error } = await cart();
    cartList = useState('cartList');
}
const isAdded = computed(
    () =>
        cartList.value &&
        Array.isArray(cartList.value.items) &&
        !!cartList.value.items.find(
            (item) => item.product.id === productDetail?.value.id
        )
);
const totalPrice = computed(() => {
    return (
        cartList.value?.items
            ?.map((el) => el.product.price)
            .reduce((accumulator, Value) => accumulator + Value, 0) || 0
    );
});

const bookmark = async (id, isFavorite) => {
    const body = { productId: id };
    if (isFavorite) {
        await delete_favorite({ body: body });
    } else {
        await add_favorite({ body: body });
    }
    await favorite_list();
};
let favoriteState = useState('favoriteState');
if (!favoriteState.value && token.value) {
    const { data } = await favorite_list();
    favoriteState = useState('favoriteState');
}
const isFavorite = computed(
    () =>
        favoriteState.value &&
        Array.isArray(favoriteState.value?.data) &&
        !!favoriteState.value.data.find(
            (item) => item.product.id === productDetail?.value.id
        )
);

const selectedImg = ref(0);

const scrollTo = (id) => {
    document
        .getElementById(id)
        .scrollIntoView({ behavior: 'smooth', block: 'center' });
    const foundRow = expandableRows.find((el) => el.dataName === id);
    if (foundRow) {
        foundRow.isShow = true;
    }
};

const bottomItems = [
    { id: 0, icon: 'IconLock', text: t('100% secured payment') },
    {
        id: 1,
        icon: 'IconLocalShiping',
        text: t('Shipping all orders in 24-48 hours'),
    },
    { id: 2, icon: 'IconAutoRenew', text: t('30 days return policy') },
];

const expandableRows = reactive([
    {
        id: 0,
        title: t('Product Detail'),
        type: 'list',
        isShow: false,
        dataName: 'productDetails',
    },
    {
        id: 1,
        title: t('Product Description'),
        type: 'desc',
        isShow: false,
        dataName: 'productDescription',
    },
    {
        id: 2,
        title: t('Seller Note'),
        type: 'desc',
        isShow: false,
        dataName: 'sellerNote',
    },
    {
        id: 3,
        title: t('Seller Information'),
        type: 'seller-info',
        isShow: false,
        dataName: 'sellerInfo',
    },
    {
        id: 4,
        title: t('Carbon Foot Print'),
        type: 'carbon',
        isShow: false,
        dataName: 'carbon',
    },
]);

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: all 1s ease-in-out;
    bottom: 0;
}

.v-enter-from {
    bottom: -200px;
    opacity: 0;
}
.v-leave-to {
    bottom: -200px;
    opacity: 0;
}
</style>
