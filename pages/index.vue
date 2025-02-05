<template>
    <div>
        <TheMeta :seoItems="seoItems" />
        <div class="w-full">
            <HomeTopSection :slideData="slideData" />
            <HomeCategories
                :title="$t('Categories')"
                :categories="categoryList?.data"
            />
            <HomePermision
                title="Flash Sale"
                :btn="{
                    text: 'All Items',
                    link: 'market',
                }"
                :data="
                    promotionState?.data.filter((el) => el.order === 0)[0]
                        ?.products
                "
            />
            <HomeBanner />
            <HomeBrands
                :title="$t('Top Selling Brands')"
                :items="bestSellerBrands"
            />
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    name: 'home',
});

const router = useRouter();
const route = useRoute();

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
            Seo.value?.canonicalUrl ||
            `https://luxmax.co${route.fullPath}`,
    };
} else {
    seoItems.value = {
        metaTitle: `LuxMax | Luxury Goods Repair, Restore & Resale`,
        metaDescription: `LuxMax repairs, restores and resells luxury products like leather goods, jewelry, watches and clothing from brands like Chanel, Rolex and Louis Vuitton.`,
        metaRobots: 'index',
        metaViewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        canonicalUrl: `https://luxmax.co${route.fullPath}`,
    };
}

const { t } = useI18n();
const { promotion } = useItem();
const promotionState = useState('promotionState');
if (!promotionState?.value) {
    await promotion();
}

//// slider
const slideData = [
    {
        title: 'Care for Your Luxury Items',
        description: 'Show your luxury items some love with our professional dry cleaning services. Keep them looking pristine for years to come.',
        image: '/img/home/top-section/slide-2_50.webp',
        btn: {
            text: 'Dry Cleaning',
            link: 'dry-cleaning',
            id: 'refresh-wardrobe',
        },
    },
    {
        title: 'Expert Repairs, Exceptional Results',
        description: 'Our skilled artisans will repair your luxury items with precision and care. Experience the difference of expert craftsmanship.',
        image: '/img/home/top-section/slide-1_50.webp',
        btn: {
            text: 'Restore Now',
            link: 'repair',
            id: 'restore-now',
        },
    },
    {
        title: 'Sell Today, Get Cash Now',
        description: 'Get immediate cash for your luxury items. With our instant sell option, you can turn your items into cash in no time',
        image: '/img/home/top-section/slide-3_50.webp',
        btn: {
            text: 'Quick Cash Now',
            link: 'sellpage',
            id: 'quick-cash-now',
        },
    },
    {
        title: 'Instant Cash for Your Items',
        description: `Skip the repair process and sell your items instantly for cash. It's quick, easy, and hassle-free.`,
        image: '/img/home/top-section/slide-4_50.webp',
        btn: {
            text: 'Sell Now',
            link: 'sellpage',
            id: 'sell-now',
        },
    },
    {
        title: 'Renew for Resale',
        description:
            'Restore your luxury items and sell them for top dollar. Get the best of both worlds with our repair and sell services.',
        image: '/img/home/top-section/slide-5_50.webp',
        btn: {
            text: 'Get Selling',
            link: 'repair',
            id: 'get-selling',
        },
    },
];
//// slider

const { $formatItems } = useNuxtApp();

//// categories

let categoryList = useState('categories');
if (!categoryList.value) {
    const { categories } = useItem();
    const { data, error } = await categories(1, 15);
    categoryList.value = data.value;
}

//// best seller brands
const bestSellerBrands = [
    '/img/home/gucci.webp',
    '/img/home/dior.webp',
    '/img/home/prada.webp',
    '/img/home/chanel.webp',
    '/img/home/louis-vuitton.webp',
    '/img/home/balenciaga.webp',
    '/img/home/gucci.webp',
    '/img/home/dior.webp',
    '/img/home/prada.webp',
    '/img/home/chanel.webp',
    '/img/home/louis-vuitton.webp',
    '/img/home/balenciaga.webp',
];
//// best seller brands
</script>
