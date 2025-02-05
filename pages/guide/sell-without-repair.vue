<template>
    <GuideLandingTemplate :data="data" />
</template>

<script setup>
definePageMeta({
  name: "sell-without-repair",
});
const router = useRouter()
const { t } = useI18n();
useHead({
  title: `LuxMax - Sell without repair`,
  meta: [
    {
      name: 'title',
      content: `Sell Luxury Items Without Repair - LuxMax`
    },
    {
      name: 'description',
      content: "Skip clothing repairs. LuxMax buys designer ready-to-wear in sellable condition for instant payment via cash or consignment."
    }
  ]
})
const data = {
  type: "sell-without-repair",
  top: {
    title: t(`Sell Without Repair`),
    desc: t(`Sell Elegance As Is, Seamlessly`),
    // isComingSoon: true
  },
  howWorks: [
    {
      title: t("Sell in LuxMax Marketplace"),
      text: t("Unlock the LuxMax marketplace – a haven for luxury enthusiasts. Sell your cherished items effortlessly, while buyers can explore curated selections backed by our commitment to quality. Join us in celebrating the essence of luxury through seamless and secure exchanges."),
      button: {
        text: t("Sell in LuxMax Marketplace"),
        routeName: "identify",
      },
      img: "/img/guide/sell-without-repair-landing/top-1.webp",
    },
    {
      title: t("How to Sell in Luxmax"),
      text: t(
        "Selling in the LuxMax marketplace is a breeze. Begin by sharing your product's details, and let our advanced AI work its magic in identifying your luxury item. Once the AI and our experts give the green light, your product gracefully takes center stage in our marketplace. Shoppers from around the world can now explore and purchase your luxury treasure. From hassle-free identification to expert approval, LuxMax simplifies the selling process, ensuring that your items find the perfect new owner within our community of discerning enthusiasts."
      ),
      button: {
        text: t("Sell in LuxMax Marketplace"),
        routeName: "identify",
      },
      img: "/img/guide/sell-without-repair-landing/top-2.webp",
      isReverse: true,
    },
  ],
  benefits: {
    title: t("Benefit of LuxMax Marketplace"),
    isLean: true,
    childs: [
      {
        id: 0,
        icon: "IconBenefitsUsers",
        title: t("Join a Community of Discerning Enthusiasts"),
      },
      {
        id: 1,
        icon: "IconBenefitsEyeglasses",
        title: t("Expert Validation and Seamless Transactions"),
      },
      {
        id: 2,
        icon: "IconBenefitsDress",
        title: t("Curated Showcase for Elegance and Style"),
      },
      {
        id: 3,
        icon: "IconBenefitsWorld",
        title: t("Global Exposure for Your Luxury Treasures"),
      },
    ],
  },
  extraHowWorks: [
    {
      title: t("Trade easily"),
      text: t(
        "Elevate your luxury lifestyle with LuxMax marketplace – not just a platform, but a haven for trading your coveted luxury goods. Unlock the potential to earn by seamlessly sharing your treasures with a global community of discerning enthusiasts. Whether it's that iconic designer bag, those timeless shoes, or that exquisite dress, LuxMax empowers you to turn your pre-loved luxury items into a rewarding venture. Join us in celebrating elegance, style, and the joy of trading within a community that values the allure of luxury."
      ),
      button: {
        text: t("Sell in LuxMax Marketplace"),
        routeName: "identify",
      },
      img: "/img/guide/sell-without-repair-landing/top-3.webp",
    },
  ],
  donwloadAppCustomText: t("sell"),
    breadcrumbData: [
    {
        id: 0,
        text: t("Home"),
        action: () => {
        router.push({ name: "home" });
        },
    },
    { id: 1, text: t("Sell Without Repair"), action: () => {} },
  ]
};
</script>
