<template>
    <TheMeta :seoItems="seoItems" />
    <div>
        <landings-banner
            src="/img/aboutUs/banner.webp"
            :title="$t('About LuxMax')"
            :description="
                $t(
                    `At LuxMax, we're more than just an online marketplace. We're a passionate community committed to redefining luxury, promoting sustainability, and cherishing the timeless allure of preloved treasures. Our mission is to provide a platform where elegance, quality, and environmental consciousness intersect harmoniously. Join us on this journey as we pave the way for a new era of luxury.`
                )
            "
        />
        <BaseBreadcrumb
            :dataArray="breadcrumbData"
            class="gridClass laptop:hidden mt-8"
        />
        <about-top-section />
        <about-apart />
        <about-commitment />
        <about-testimonials />
        <about-join-us />
    </div>
</template>

<script setup>
definePageMeta({
    name: 'about',
});

const { t } = useI18n();

const router = useRouter();

const breadcrumbData = computed(() => [
    {
        id: 0,
        text: t('Home'),
        action: () => {
            router.push({ name: 'home' });
        },
    },
    {
        id: 1,
        text: t('About Us'),
        action: () => {},
    },
]);

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
            Seo.value?.canonicalUrl || `https://luxmax.co${route.fullPath}`,
    };
} else {
    seoItems.value = {
        metaTitle: `About LuxMax - Reimagining Luxury`,
        metaDescription: `LuxMax connects customers to luxury repair masters committed to specialized service and quality craftsmanship.`,
        metaRobots: 'index',
        metaViewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        canonicalUrl: `https://luxmax.co${route.fullPath}`,
    };
}
</script>
