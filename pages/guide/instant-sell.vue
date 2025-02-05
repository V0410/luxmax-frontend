<template>
  <GuideLandingTemplate :data="data" />
</template>

<script setup>
definePageMeta({
  name: "instant-sell",
});
const router = useRouter()
const { t } = useI18n();
useHead({
  title: `LuxMax - Instant sell`,
  meta: [
    {
      name: 'title',
      content: 'LuxMax - Get a Quote to Sell Your Luxury Item'
    },
    {
      name: 'description',
      content: "Get a free instant quote to sell your luxury handbag, shoe, or ready to wear. LuxMax makes luxury resale easy."
    }
  ]
})
const data = {
  type: "instant-sell",
  top: {
    title: t(`Instant sell`),
    desc: t(`Sell your Product to LuxMax `),
  },
  howWorks: [
    {
      title: t("What is Instant Sell"),
      text: t("Introducing Luxmax's Exquisite Restoration & Resale Services: We specialize in meticulously reviving your luxury items to their former glory, ensuring they radiate opulence. Subsequently, you can choose to showcase your restored treasures on our exclusive online marketplace or opt for an instant buy offer from Luxmax."),
      button: {
        text: t("Sell to LuxMax"),
        routeName: "identify",
      },
      img: "/img/guide/instant-sell-landing/top-1.webp",
    },
    {
      title: t("How to Sell to Luxmax"),
      text: t(
        "At Luxmax, our user-centric process begins with simplicity and precision. As a first step, users provide product information, which our AI processes with remarkable accuracy. Once identified, users send the product to Luxmax. Our team of experts meticulously surveys the item, ensuring its quality and authenticity. Once approved, Luxmax promptly compensates users, providing a seamless and rewarding experience. From submission to payment, Luxmax stands by its commitment to reliability, transparency, and excellence in luxury product transactions."
      ),
      button: {
        text: t("Sell to LuxMax"),
        routeName: "identify",
      },
      img: "/img/guide/instant-sell-landing/top-2.webp",
      isReverse: true,
    },
  ],
  benefits: {
    title: t("Benefit of Instant Sell"),
    isLean: true,
    childs: [
      {
        id: 0,
        icon: "IconBenefitsQuickSale",
        title: t("Quick sale of the product"),
      },
      {
        id: 1,
        icon: "IconBenefitsNoNeed",
        title: t("No need for repair costs"),
      },
      {
        id: 2,
        icon: "IconBenefitsCommunuty",
        title: t("No need to interact with other buyers"),
      },
      {
        id: 3,
        icon: "IconBenefitsHigherCost",
        title: t("Higher price to sell"),
      },
    ],
  },
  extraHowWorks: [
    {
      title: t("Instant Cash"),
      text: t(
        "Unlock the speed of instant cash with our product buying service. With Luxmax's streamlined process, selling your items has never been quicker. Experience the efficiency of Instant Sell, where we swiftly assess your products, offer competitive prices, and initiate prompt payments. Say goodbye to waiting and hello to rapid transactions with Luxmax."
      ),
      button: {
        text: t("Sell to LuxMax"),
        routeName: "identify",
      },
      img: "/img/guide/instant-sell-landing/top-3.webp",
    },
  ],
  donwloadAppCustomText: t("Instant sell"),
  breadcrumbData: [
        {
            id: 0,
            text: t("Home"),
            action: () => {
            router.push({ name: "home" });
            },
        },
        { id: 1, text: t("Instant Sell"), action: () => {} },
    ]
};
</script>
