<template>
    <GuideLandingTemplate :data="data" />
</template>

<script setup>
definePageMeta({
  name: "repair-and-sell",
});
const router = useRouter()
const { t } = useI18n();
useHead({
  title: `LuxMax - Repair and sell`,
  meta: [
    {
      name: 'title',
      content: `Repair & Sell Your Luxury Items - LuxMax`
    },
    {
      name: 'description',
      content: "Have your designer items repaired and restored to sell on the LuxMax marketplace for top dollar. Luxury consignment made easy."
    }
  ]
})
const data = {
  type: 'repair-and-sell',
  top: {
    title: t(`Repair & Sell`),
    desc: t(`Revive, Transform, Thrive: Repair & Sell with LuxMax`),
    // isComingSoon: true
  },
  howWorks: [{
    title: t("How Repair & Sell works?"),
    text: t(
      "Introducing Instant Sell, a seamless service offered by Luxmax that streamlines the process of selling your luxury products. With Instant Sell, you have the opportunity to effortlessly part ways with your cherished high-end items. Simply submit details about your luxury products."
    ),
    button: {
      text: t("Repairs & sell with LuxMax"),
      routeName: "identify",
    },
    img: "/img/guide/repair-and-sell-landing/top.webp"
  }],
  benefits: {
    title: t("Benefits of Repair & Sell Service"),
    childs: [
      {
        id: 0,
        icon: "IconBenefitsIdentify",
        title: t("Easy Identification with AI"),
        text: t(
          "Say goodbye to confusion. Our advanced artificial intelligence technology ensures swift and accurate identification of your cherished items. No more mix-ups, just seamless service from start to finish."
        ),
      },
      {
        id: 1,
        icon: "IconBenefitsExpertAdvice",
        title: t("Professional Expertise"),
        text: t(
          "Trust matters. Our team of seasoned professionals brings a wealth of expertise to every repair. With years of experience, our experts treat your items with the care and precision they deserve."
        ),
      },
      {
        id: 2,
        icon: "IconBenefitsTracking",
        title: t("Instant Status Tracking"),
        text: t(
          "Stay in the loop at all times. Our intuitive tracking system lets you monitor your item's progress in real-time. From drop-off to pick-up, you're always informed and in control."
        ),
      },
      {
        id: 3,
        icon: "IconBenefitsCommunuty",
        title: t("large community to buy your Item"),
        text: t(
          "Join LuxMax's vibrant community to explore and purchase curated luxury products from our marketplace. Elevate your style and be part of a community that values elegance and quality."
        ),
      },
    ],
  },
  testimonials: {
    title: t("Testimonials"),
    childs: [
      {
        id: 0,
        img: "/img/guide/repair-and-sell-landing/testimonial-1.webp",
        name: "Emily T.",
        profileImg: "/img/guide/repair-and-sell-landing/profile-1.webp",
        text: t(
          "LuxMax's repair service is nothing short of exceptional! I was hesitant to trust anyone with my cherished designer bag, but their team of experts not only restored it to its former glory but also went above and beyond in ensuring every detail was perfect. My heartfelt gratitude to LuxMax for treating my luxury goods with such care and expertise."
        ),
      },
      {
        id: 1,
        img: "/img/guide/repair-and-sell-landing/testimonial-2.webp",
        name: "Michael R.",
        profileImg: "/img/guide/repair-and-sell-landing/profile-2.webp",
        text: t(
          "Trust matters. Our team of seasoned professionals brings a wealth of expertise to every repair. With years of experience, our experts treat your items with the care and precision they deserve."
        ),
      },
      {
        id: 2,
        img: "/img/guide/repair-and-sell-landing/testimonial-3.webp",
        name: "Sarah L.",
        profileImg: "/img/guide/repair-and-sell-landing/profile-3.webp",
        text: t(
          "Stay in the loop at all times. Our intuitive tracking system lets you monitor your item's progress in real-time. From drop-off to pick-up, you're always informed and in control."
        ),
      },
    ],
  },
  donwloadAppCustomText: t("repairs & sell"),
    breadcrumbData: [
    {
        id: 0,
        text: t("Home"),
        action: () => {
        router.push({ name: "home" });
        },
    },
    { id: 1, text: t("Repair and Sell"), action: () => {} },
  ]
};
</script>
