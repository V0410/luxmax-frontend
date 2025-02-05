<template>
    <div>
        <TheMeta :seoItems="seoItems" />
        <div class="flex flex-col py-16 gap-16">
            <div class="gridClass">
                <div
                    class="flex justify-between flex-col laptop:flex-row px-10 py-6 bg-p1 gap-10"
                >
                    <div class="flex gap-4 laptop:gap-6 items-center">
                        <NuxtImg
                            :alt="
                                sellerInfo.value?.firstName +
                                sellerInfo.value?.lastName
                            "
                            v-if="avatar?.url"
                            format="webp"
                            quality="100"
                            :src="config?.public?.BASE_URL + avatar?.url"
                            class="w-12 h-12 laptop:w-20 laptop:h-20 rounded-full"
                        />
                        <div class="flex flex-col gap-1 laptop:gap-2">
                            <h1
                                class="text-t9 font-bold text-lg"
                                v-text="
                                    `${sellerInfo?.firstName} ${sellerInfo?.lastName}`
                                "
                            />
                            <div
                                class="text-t6 text-sm"
                                v-text="
                                    $t(
                                        'Member since',
                                        dateToShow(
                                            Date.now(sellerInfo?.createdAt) ||
                                                Date.now() / 1000
                                        )
                                    )
                                "
                            />
                        </div>
                    </div>
                    <div class="flex justify-center gap-10 text-center">
                        <!-- <div class="flex flex-col items-center gap-2 my-auto">
            <div
              class="text-lg text-p7 font-semibold"
              v-text="(sellerInfo?.satisfaction || 100) + '%'"
            />
            <div class="text-xs" v-text="$t('Buyer satisfaction')" />
          </div>
          <div class="w-[1px] bg-p2 my-2" />
          <div class="flex flex-col items-center gap-2 my-auto">
            <div
              class=" text-lg text-p7 font-semibold"
              v-text="sellerInfo.performance || $t('Great')"
            />
            <div class="text-xs" v-text="$t('Seller performance')" />
          </div> -->
                    </div>
                </div>
            </div>
            <MarketTemplate
                :items="items"
                :totalItems="totalItems"
                :filters="filters"
                :isLoading="isLoading"
                :breadcrumbData="breadcrumbData"
            />
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    name: 'seller',
});
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();

const { $formatItems } = useNuxtApp();

const marketInfoRef = ref({});

const isLoading = ref(false);
const items = ref([]);
const totalItems = ref(0);
const { getUser, getFile } = useItem();
const { data: sellerInfo } = await getUser(route.params.id);
const avatar = ref(null);
if (sellerInfo?.value?.avatarId) {
    const { data } = await getFile(sellerInfo?.value?.avatarId);
    avatar.value = data.value;
}

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
        metaTitle: `Seller Profile | ${
            sellerInfo.value?.firstName + sellerInfo.value?.lastName || '...'
        }`,
        metaDescription: `Discover other certified pre-owned luxury products listed for sale from this trusted LuxMax Marketplace seller.`,
        metaRobots: 'index',
        metaViewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        canonicalUrl: `https://luxmax.co${route.fullPath}`,
    };
}

const fetchProducts = async (query) => {
    isLoading.value = true;
    const body = {};
    Object.keys(query).map((key) => {
        body[key] = Array.isArray(query[key])
            ? query[key].join('&')
            : query[key];
    });
    if (body.page) {
        body.page = body.page - 1;
    }
    if (body.Price) {
        const [min, max] = body.Price?.split('-');
        body.price_to = max;
        body.price_from = min;
        delete body.Price;
    }
    const { products } = useItem();
    const { data, error } = await products({
        body: {
            page: body.page || 1,
            limit: 12,
            userId: route.params.id,
            ...body,
        },
    });
    isLoading.value = false;
    if (!error.value) {
        items.value = data.value.data;
        totalItems.value = data.value.total;
    }
};

watch(
    () => router.currentRoute.value.query,
    (newVal) => {
        delete newVal.favorite;
        delete newVal.rand;
        fetchProducts(newVal);
    }
);
await fetchProducts(router.currentRoute.value.query);

const suggestedMaterials = ref([
    { id: 0, name: t('Canvas') },
    { id: 1, name: t('Fabric') },
    { id: 2, name: t('GG Canvas') },
    { id: 3, name: t('Leather') },
    { id: 4, name: t('Leather GG') },
    { id: 5, name: t('Metal') },
    { id: 6, name: t('Precious') },
    { id: 7, name: t('Velvet') },
    { id: 8, name: t('Suede') },
    { id: 9, name: t('Cashmere') },
    { id: 10, name: t('Wool') },
]);

const suggestedColors = ref([
    { id: 0, name: t('Black') },
    { id: 1, name: t('White') },
    { id: 2, name: t('Gray') },
    { id: 3, name: t('Yellow') },
    { id: 5, name: t('Olive') },
    { id: 5, name: t('Green') },
    { id: 3, name: t('Red') },
    { id: 3, name: t('Pink') },
    { id: 4, name: t('Purple') },
    { id: 6, name: t('Blue') },
    { id: 7, name: t('Teal') },
    { id: 8, name: t('Brown') },
    { id: 9, name: t('Beige') },
    { id: 10, name: t('Cream') },
    { id: 11, name: t('Multi Color') },
    { id: 12, name: t('Pattern') },
]);

const detail = computed(() =>
    allFilters.value?.detail ? allFilters.value?.detail : {}
);

const { categories, brands } = useItem();
let categoryList = useState('categories');
let brandList = useState('brands');
if (!categoryList.value) {
    await categories(1, 20);
    categoryList = useState('categories');
}
if (!brandList.value) {
    await brands(1, 20);
    brandList = useState('brands');
}

const allFilters = ref({
    detail: {
        Price_max: null,
        Price_min: null,
        Categories: categoryList.value.data,
        Brands: brandList.value.data,
        Materials: suggestedMaterials.value,
        Colors: suggestedColors.value,
    },
});
const filters = computed(() =>
    Object.keys(detail.value)
        .filter((key) => key !== 'Price_max')
        .map((key) =>
            !(key === 'Price_max' || key === 'Price_min')
                ? {
                      id: key,
                      title: key,
                      value: key,
                      type:
                          key === 'Sort By:' || key === 'Sort By'
                              ? 'sort'
                              : key === 'Sale and offers'
                              ? 'radio'
                              : 'checkbox',
                      options: detail.value[key].map((el) => {
                          return {
                              id: el,
                              text: el,
                              value: el,
                              count: 1,
                          };
                      }),
                  }
                : {
                      id: 'Price',
                      title: 'Price',
                      value: 'Price',
                      type: 'slider',
                      min: detail.value.Price_min,
                      max: detail.value.Price_max,
                  }
        )
);

const breadcrumbData = [
    {
        id: 0,
        text: t('Home'),
        action: () => {
            router.push({ name: 'home' });
        },
    },
    {
        id: 1,
        text: t('Market'),
        action: () => {
            router.push({ name: 'market' });
        },
    },
    { id: 2, text: t('Seller'), action: () => {} },
];

const dateToShow = (date) => {
    return {
        month: date
            ? new Intl.DateTimeFormat('en-US', { month: 'short' }).format(+date)
            : '',
        year: date
            ? new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(
                  +date
              )
            : '',
    };
};
</script>
