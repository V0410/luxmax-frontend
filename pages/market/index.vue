<template>
    <div>
        <TheMeta :seoItems="seoItems" />
        <div ref="container">
            <div
                class="bg-identify w-full h-full overflow-x-hidden bg-no-repeat bg-cover relative hidden laptop:flex justify-center"
            >
                <div
                    class="flex h-full w-full max-w-[780px] text-center backdrop-blur-[6px] text-white bg-black bg-opacity-20 p-10 flex-col gap-10"
                >
                    <div
                        class="font-title font-medium text-5xl uppercase"
                        v-text="$t(`Market`)"
                    />
                    <h1
                        class="text-xl text-p2"
                        v-text="$t(`Shop iconic items from top brands`)"
                    />
                </div>
            </div>
            <MarketTemplate
                :items="items"
                :totalItems="totalItems"
                :filters="filters"
                :breadcrumbData="breadcrumbData"
                :isLoading="isLoading"
                class="my-6 laptop:my-16"
            />
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    name: 'market',
});

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const { $formatItems } = useNuxtApp();

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
        metaTitle: `LuxMax Market - Certified Pre-Owned Luxury Goods`,
        metaDescription: `Shop authenticated pre-owned luxury fashion from Chanel, Gucci, Cartier and other top designers at amazing savings with the LuxMax guarantee.`,
        metaRobots: 'index',
        metaViewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        canonicalUrl: `https://luxmax.co${route.fullPath}`,
    };
}

const { products, categories, brands } = useItem();
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

const isLoading = ref(false);
const items = ref(null);
const totalItems = ref(0);

const fetchProducts = async (query) => {
    isLoading.value = true;
    const body = {};
    Object.keys(query).map((key) => {
        body[key] = Array.isArray(query[key])
            ? query[key].join('&')
            : query[key];
    });
    if (body.price) {
        const [min, max] = body.price?.split('-');
        body.price_to = max;
        body.price_from = min;
        delete body.price;
    }
    const { data, error } = await products({
        body: { page: body.page || 1, limit: 12, ...body },
    });
    isLoading.value = false;
    if (!error.value) {
        items.value = data.value.data;
        totalItems.value = data.value.total;
    }
};

const fetchProductsWraper = async (query) => {
    const payload = { ...query };
    delete payload.redirect;
    payload.Type = payload['Product Type'];
    delete payload['Product Type'];
    payload.offers = payload['Sale and offers'];
    delete payload['Sale and offers'];
    await fetchProducts(payload);
};

watch(
    () => router.currentRoute.value.query,
    (newVal) => {
        delete newVal.favorite;
        delete newVal.rand;
        fetchProductsWraper(newVal);
    }
);

await fetchProductsWraper(router.currentRoute.value.query);

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

const filters = computed(() =>
    {
        const detail = {
            categories: categoryList.value?.data,
            brands: brandList.value?.data,
            materials: suggestedMaterials.value,
            colors: suggestedColors.value,
        }
        return [{
            id: 'price',
            title: 'price',
            value: 'price',
            type: 'slider',
            min: null,
            max: null,
        }, ...Object.keys(detail)
        .map((key) =>
            ({
                id: key,
                title: key,
                value: key,
                type:
                    key === 'Sort By:' || key === 'Sort By'
                        ? 'sort'
                        : key === 'Sale and offers'
                        ? 'radio'
                        : 'checkbox',
                options: Array.isArray(detail[key]) ? detail[key].map((el) => {
                    return {
                        id: el,
                        text: el,
                        value: el,
                        count: 1,
                    };
                }):[],
            })
        )]
    }
);

const breadcrumbData = [
    {
        id: 0,
        text: t('Home'),
        action: () => {
            router.push({ name: 'home' });
        },
    },
    { id: 1, text: t('Market'), action: () => {} },
];
</script>
