<template>
    <div>
        <TheMeta :seoItems="seoItems" />
        <div>
            <LandingsBanner
                src="/img/repair/banner.webp"
                :title="$t('Luxury Cloth Repair & Restoration')"
                :description="
                    $t(
                        `LuxMax Repair Services is the epitome of luxury restoration. Ourseasoned artisans expertly revive your prized luxury goods.  With LuxMax,your treasures are in the hands of artisans who preserve elegance andlegacy`
                    )
                "
                :firstButton="{
                    text: 'Repair & Get back',
                    link: 'identify',
                    id: 'repair-and-get-back',
                }"
                :secondButton="{
                    text: 'Repair & Sell',
                    link: 'identify',
                    id: 'repair-and-sell',
                }"
            />
            <div
                class="py-10 px-6 laptop:py-16 laptop:px-20 flex flex-col gap-14"
            >
                <div
                    v-text="$t('Benefits Of Repair Service')"
                    class="text-center font-semibold text-[32px] laptop:text-[40px] text-p8"
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
                        src="/img/home/top-section/slide-2.webp"
                        class="w-full laptop:w-[50%] laptop:absolute relative left-[10%] laptop:left-auto bottom-20 laptop:bottom-auto laptop:-top-32 laptop:-right-28"
                    />
                    <div
                        class="flex flex-col gap-6 laptop:top-0 justify-between items-center laptop:items-start w-full h-1/2 laptop:h-full laptop:w-[40%]"
                    >
                        <div
                            class="flex flex-col gap-4 laptop:gap-6 -mt-20 laptop:m-0"
                        >
                            <div
                                v-text="$t('Repair is easier with LuxMax')"
                                class="font-semibold text-[32px] laptop:text-[40px] text-center laptop:text-start text-p8"
                            />
                            <div
                                v-text="
                                    $t(
                                        'Dependable Repair Services: Making repair and restoration more convenient than ever.'
                                    )
                                "
                                class="text-t7 text-center laptop:text-start laptop:text-2xl"
                            />
                        </div>
                        <NuxtLink :to="{ name: 'identify' }">
                            <BaseButton
                                text="Make your Order"
                                class="w-fit"
                                buttonId="make-your-first-order"
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
    name: 'repair',
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
            Seo.value?.canonicalUrl || `https://luxmax.co${route.fullPath}`,
    };
} else {
    seoItems.value = {
        metaTitle: `LuxMax | Repair`,
        metaDescription: `LuxMax repairs.`,
        metaRobots: 'index',
        metaViewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        canonicalUrl: `https://luxmax.co${route.fullPath}`,
    };
}

const sellSmart = ref([
    {
        src: 'IconRepairService1',
        title: 'Easy Identification with AI',
        description:
            'Say goodbye to confusion. Our advanced artificial intelligence technology ensures swift and accurate identification of your cherished items. No more mix-ups, just seamless service from start to finish.',
    },
    {
        src: 'IconRepairService2',
        title: 'Professional Expertise',
        description:
            'Trust matters. Our team of seasoned professionals brings a wealth of expertise to every repair. With years of experience, our experts treat your items with the care and precision they deserve.',
    },
    {
        src: 'IconRepairService3',
        title: 'Fast Turnaround',
        description:
            'Time matters. We understand the urgency of getting your items back in top shape. Our streamlined process ensures a swift turnaround with out compromising the quality of our meticulous work.',
    },
    {
        src: 'IconRepairService4',
        title: 'Instant Status Tracking',
        description:
            'Stay in the loop at all times. Our intuitive tracking system lets you monitor your item`s progress in real-time. From drop-off to pick-up, you`re always informed and in control.',
    },
]);

const reviewWrapper = ref([
    {
        rate: 5,
        text: 'Top service, My clothes was ready very swiftly, highly recommended.',
        author: 'Milad karimi',
        position: 'Legacy Solutions Engineer',
        src: '/img/DryCleaning/rate/milad_karimi_50.png'
    },
    {
        rate: 5,
        text: 'The service provided was of exceptional quality, and the results achieved were highly satisfactory. I am extremely pleased with the outcome and would highly recommend their services to others.',
        author: 'Prince Salon',
        position: 'Legacy Solutions Engineer',
        src: '/img/DryCleaning/rate/prince_salon_50.png'
    },
    {
        rate: 5,
        text: 'Hands down, best dry cleaning company in London! 24 hour service - and impeccable quality of dry cleaning. 10/10. Also, really good value for money.',
        author: 'Hassan Dahag',
        position: 'Legacy Solutions Engineer',
        src: '/img/DryCleaning/rate/hassan_dahamg_50.png'
    }
]);

const faqData = ref([
    {
        question:
            'How do I know if my luxury item can be repaired or restored?',
        awnser: 'Our experienced team of artisans will carefully assess your luxury item to determine its repair or restoration potential. We consider factors such as the extent of damage, the condition of the fabric or material, and the feasibility of restoring the item to its original state.',
    },
    {
        question:
            'What types of damage can be addressed through your repair and restoration services?',
        awnser: 'Our repair and restoration services can address a wide range of damage, including stains, tears, loose stitching, hardware replacement, and color restoration, among others.',
    },
    {
        question:
            'Are your repair and restoration techniques safe for delicate fabrics and materials?',
        awnser: 'Yes, our repair and restoration techniques are specifically tailored to be safe and gentle on delicate fabrics and materials commonly found in luxury items. We take extra precautions to ensure that your item is handled with the utmost care throughout the process.',
    },
    {
        question:
            'How long does the repair and restoration process typically take?',
        awnser: 'The repair and restoration process timeline can vary depending on the complexity of the work required and our current workload. We strive to provide accurate estimates and keep you informed of any delays that may arise.',
    },
    {
        question:
            'What kind of guarantee or warranty do you offer for your repair and restoration work?',
        awnser: 'We stand behind the quality of our repair and restoration work and offer a satisfaction guarantee. If you are not completely satisfied with the results, please contact us, and we will do our best to address your concerns.',
    },
    {
        question:
            'Do you specialize in specific luxury brands or types of designer items?',
        awnser: 'While we have experience working with a wide range of luxury brands and designer items, our focus is on providing expert repair and restoration services tailored to the unique needs of each individual item.',
    },
    {
        question:
            'Can you provide estimates for repair and restoration costs upfront?',
        awnser: 'Yes, we can provide estimates for repair and restoration costs based on the initial assessment of your item. Please note that final costs may vary depending on the extent of the work required.',
    },
    {
        question:
            'Do you offer pickup and delivery services for items in need of repair or restoration?',
        awnser: 'Yes, we offer convenient pickup and delivery services to make the repair and restoration process as hassle-free as possible for our customers. Please contact us to schedule a pickup or learn more about our delivery options.',
    },
    {
        question:
            'What steps do you take to ensure the security and confidentiality of my luxury items during the repair and restoration process?',
        awnser: 'We take the security and confidentiality of your luxury items very seriously. Our facilities are equipped with security measures to safeguard your items, and our team follows strict protocols to ensure their safe handling throughout the repair and restoration process.',
    },
    {
        question:
            'How can I schedule a consultation or send my items in for repair and restoration?',
        awnser: 'To schedule a consultation or send your items in for repair and restoration, please contact us via phone, email, or our website. Our friendly team will',
    },
]);
</script>
