<template>
    <GuideLandingTemplate :data="data"  />
</template>

<script setup>
definePageMeta({
  name: "repair-and-get-back",
});
const router = useRouter()
const { t } = useI18n();
useHead({
  title: `LuxMax - Repair and get back`,
  meta: [
    {
      name: 'title',
      content: `Luxury Repair & Restoration Services - LuxMax`
    },
    {
      name: 'description',
      content: "LuxMax specializes in luxury product restoration. Get a quote to professionally repair your designer bag, shoes, jewelry or watches."
    }
  ]
})
const data = {
  type: 'repair',
  top: {
    title: t(`Repair`),
    desc: t(`Restoring Luxury, Preserving Elegance`),
  },
  howWorks: [
    {
        title: t("How repair service works?"),
        text: t(
        "LuxMax Repair Services is the epitome of luxury restoration. Our seasoned artisans expertly revive your prized luxury goods. From vintage watches to designer handbags, our fusion of modern techniques and timeless craftsmanship ensures meticulous restoration. With LuxMax, your treasures are in the hands of artisans who preserve elegance and legacy."
        ),
        button: {
        text: t("Repairs with LuxMax"),
        routeName: "identify",
        },
        img: "/img/guide/repair-landing/top.webp"
    }
  ],
  benefits: {
    title: t("Benefits of Repair Service"),
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
        icon: "IconBenefitsTurnaround",
        title: t("Fast Turnaround"),
        text: t(
          "Time matters. We understand the urgency of getting your items back in top shape. Our streamlined process ensures a swift turnaround without compromising the quality of our meticulous work."
        ),
      },
    ],
  },
  testimonials: {
    title: t("Testimonials"),
    childs: [
      {
        id: 0,
        img: "/img/guide/repair-landing/testimonial-1.webp",
        name: "Emily T.",
        profileImg: "/img/guide/repair-landing/profile-1.webp",
        text: t(
          "LuxMax's repair service is nothing short of exceptional! I was hesitant to trust anyone with my cherished designer bag, but their team of experts not only restored it to its former glory but also went above and beyond in ensuring every detail was perfect. My heartfelt gratitude to LuxMax for treating my luxury goods with such care and expertise."
        ),
      },
      {
        id: 1,
        img: "/img/guide/repair-landing/testimonial-2.webp",
        name: "Michael R.",
        profileImg: "/img/guide/repair-landing/profile-2.webp",
        text: t(
          "Trust matters. Our team of seasoned professionals brings a wealth of expertise to every repair. With years of experience, our experts treat your items with the care and precision they deserve."
        ),
      },
      {
        id: 2,
        img: "/img/guide/repair-landing/testimonial-3.webp",
        name: "Sarah L.",
        profileImg: "/img/guide/repair-landing/profile-3.webp",
        text: t(
          "Stay in the loop at all times. Our intuitive tracking system lets you monitor your item's progress in real-time. From drop-off to pick-up, you're always informed and in control."
        ),
      },
    ],
  },
  donwloadAppCustomText: t("REPAIRS"),
  breadcrumbData: [
    {
        id: 0,
        text: t("Home"),
        action: () => {
        router.push({ name: "home" });
        },
    },
    { id: 1, text: t("Repair"), action: () => {} },
  ]
};
</script>
