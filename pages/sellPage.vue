<template>
    <div>
        <TheMeta :seoItems="seoItems" />
        <div>
            <LandingsBanner
                src="/img/sell/banner.webp"
                :title="
                    $t(
                        'Sell Your Pre-Loved Fashion: Turn Clothes into Cash Now'
                    )
                "
                :description="
                    $t(
                        `Welcome to our pre-owned fashion paradise! Turn your closet into cash instantly by selling your pre-loved clothing with us. Snap a pic, list your items, and watch the cash roll in. It's that easy`
                    )
                "
                :firstButton="{
                    text: 'Sell to our community',
                    link: 'identify',
                    id: 'sell-to-our-community',
                }"
                :secondButton="{
                    text: 'Instant sell',
                    link: 'identify',
                    id: 'instant-sell',
                }"
            />
            <div
                class="py-10 laptop:py-16 px-6 laptop:px-20 flex flex-col gap-14"
            >
                <div
                    v-text="$t('Sell Smart: The Advantages Await')"
                    class="text-center font-semibold text-3xl laptop:text-[40px] text-p8"
                />
                <div class="flex flex-col laptop:flex-row gap-[28px]">
                    <LandingsCard
                        v-for="item in sellSmart"
                        :key="item.title"
                        :src="item.src"
                        :title="item.title"
                        :description="item.description"
                    />
                </div>
            </div>
            <LandingsReviewWrapper
                :title="$t('Customer reviews')"
                :data="reviewWrapper"
            />
            <landings-faq title="Frequently Asked Questions" :data="faqData" />
            <div class="relative laptop:px-20 laptop:py-16 mt-10 laptop:mt-0">
                <div
                    class="bg-p1 laptop:rounded-[40px] w-full px-6 laptop:px-20 py-8 laptop:py-16 laptop:h-[484px]"
                >
                    <NuxtImg
                        src="/img/home/top-section/slide-4.webp"
                        class="w-full laptop:w-[50%] laptop:absolute relative left-6 bottom-20 laptop:left-auto laptop:bottom-auto laptop:-top-20 laptop:right-0"
                    />
                    <div
                        class="flex flex-col gap-6 laptop:top-0 justify-between items-center laptop:items-start w-full h-1/2 laptop:h-full laptop:w-[40%]"
                    >
                        <div
                            class="flex flex-col gap-4 laptop:gap-6 -mt-20 laptop:m-0"
                        >
                            <div
                                v-text="$t('Sell is easier with  LuxMax')"
                                class="font-semibold text-[32px] laptop:text-[40px] text-center laptop:text-start text-p8"
                            />
                            <div
                                v-text="
                                    $t(
                                        'Your Pre-Owned Fashion, Your Cash: Start Selling Today!'
                                    )
                                "
                                class="text-t7 text-center laptop:text-start laptop:text-2xl"
                            />
                        </div>
                        <NuxtLink :to="{ name: 'identify' }">
                            <BaseButton
                                text="Make your Sell"
                                class="w-fit"
                                ButtonId="make-your-first-sell"
                            />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    name: 'sellpage',
});

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
            `https://stage2.luxmax.ai${route.fullPath}`,
    };
} else {
    seoItems.value = {
        metaTitle: `LuxMax | Sell`,
        metaDescription: `LuxMax sells.`,
        metaRobots: 'index',
        metaViewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        canonicalUrl: `https://stage2.luxmax.ai${route.fullPath}`,
    };
}

const sellSmart = ref([
    {
        src: 'IconTimer',
        title: 'Quick sale of the product',
        description:
            'Say goodbye to confusion. Our advanced artificial intelligence technology ensures swift and accurate identification of your cherished items. No more mix-ups, just seamless service from start to finish.',
    },
    {
        src: 'IconMoneyStroke',
        title: 'No need for repair costs',
        description:
            'Trust matters. Our team of seasoned professionals brings a wealth of expertise to every repair. With years of experience, our experts treat your items with the care and precision they deserve.',
    },
    {
        src: 'IconEyeglasses',
        title: 'Expert Validation and Seamless Transactions',
        description:
            'Time matters. We understand the urgency of getting your items back in top shape. Our streamlined process ensures a swift turnaround with out compromising the quality of our meticulous work.',
    },
    {
        src: 'IconDress',
        title: 'Curated Showcase for Elegance and Style',
        description:
            'Stay in the loop at all times. Our intuitive tracking system lets you monitor your item`s progress in real-time. From drop-off to pick-up, you`re always informed and in control.',
    },
]);

const reviewWrapper = ref([
    {
        rate: 5,
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
        author: 'Elisa Grant',
        position: 'Legacy Solutions Engineer',
    },
    {
        rate: 5,
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
        author: 'Elisa Grant',
        position: 'Legacy Solutions Engineer',
    },
    {
        rate: 5,
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
        author: 'Elisa Grant',
        position: 'Legacy Solutions Engineer',
    },
    {
        rate: 5,
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
        author: 'Elisa Grant',
        position: 'Legacy Solutions Engineer',
    },
    {
        rate: 5,
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
        author: 'Elisa Grant',
        position: 'Legacy Solutions Engineer',
    },
    {
        rate: 5,
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
        author: 'Elisa Grant',
        position: 'Legacy Solutions Engineer',
    },
]);

const faqData = ref([
    {
        question: 'How do I sell my item?',
        awnser: " Selling your item with us is easy! Simply visit our website and follow the prompts to list your item for sale. You'll need to provide details such as the brand, condition, and photos of the item, as well as any relevant documentation such as authenticity certificates.",
    },
    {
        question: 'How long does it take to receive cash from you?',
        awnser: 'Once your item sells, you can expect to receive payment within 1-2 days, depending on the payment method you choose. We strive to process payments as quickly as possible to ensure a seamless experience for our sellers.',
    },
    {
        question: 'How long does it typically take to sell an item?',
        awnser: 'The time it takes to sell an item can vary depending on factors such as demand, pricing, and the condition of the item. While some items may sell quickly, others may take longer to find the right buyer. We recommend pricing your item competitively and providing detailed descriptions and photos to attract potential buyers.',
    },
    {
        question: 'What types of items can I sell?',
        awnser: "We accept a wide range of luxury items for sale, including designer clothing, handbags, accessories, jewelry, watches, and more. If you're unsure whether your item qualifies, feel free to reach out to our team for assistance.",
    },
    {
        question: 'How do I send my item to the buyer?',
        awnser: "Once your item sells, we'll provide you with instructions on how to ship it to the buyer. We recommend using a secure shipping method with tracking and insurance to ensure the safe delivery of your item.",
    },
    {
        question: 'How can I ensure the validity of my item before listing it?',
        awnser: "Ensuring the validity of your item is important to maintain the integrity of our marketplace. We recommend verifying the authenticity of your item through reputable sources or professional authentication services before listing it for sale. Additionally, providing detailed photos and descriptions can help reassure potential buyers of the item's authenticity.",
    },
]);
</script>
