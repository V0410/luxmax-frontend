<template>
    <div>
        <GuideTemplate :data="data" :breadcrumbData="breadcrumbData" />
    </div>
</template>

<script setup>
definePageMeta({
  name: "ready_to_wear-women-guide",
});

const { t } = useI18n();

const router = useRouter()
useHead({
  title: `LuxMax - Ready to wear women guide`,
  meta: [
    {
      name: 'title',
      content: `Women’s Designer Fashion Pre-Owned - LuxMax`
    },
    {
      name: 'description',
      content: "Women's luxury fashion displayed with personalized garment measurements."
    }
  ]
})
const data = {
  title: t("Women Ready to Wear Guideline"),
  optionsExtraText: t("Ready to Wear"),
  categories: [
    { id: 0, name: t("Coat"), text: t('Coat'), value: 0 },
    { id: 1, name: t("Pant"), text: t('Pant'), value: 1 },
    { id: 2, name: t("Shirt"), text: t('Shirt'), value: 2 },
  ],
  desc: t("Unveiling a tailored guide for your shopping journey, this article simplifies the process of measuring clothing sizes for men, women, and kids. With expert insights at your fingertips, say goodbye to uncertainty and hello to confidently curated wardrobes. Let's delve into precise measurements and discover the perfect fit together."),
  main: [
    {
      id: 0,
      title: t("Coat for Women"),
      desc: t(
        "Within this section, we present you with a comprehensive men's coat size table. Navigating the intricacies of sizing is now effortless, as we offer a clear breakdown of EU sizes ranging from 44 to 58, along with their corresponding UK equivalents. Whether you're in search of the perfect overcoat or a stylish jacket, our precise measurements ensure a fit that embraces both style and comfort. Explore our table to confidently select the ideal coat size, making your shopping experience a seamless and satisfying one."
      ),
      imgs: [ '/img/guide/men_size-1.webp', '/img/guide/men_size-2.webp'],
      tableData: {
        head: [
          t("UK Size"),
          t("EU Size"),
          t('Shoulders (cm)'),
          t("Arms (cm)"),
          t("Chest (cm)"),
          t("Waist (cm)"),
          t("Hips (cm)")
        ],
        body: [
          ["34", "44", "44.5", "86", "90.5", "74", "91"],
          ["36", "46", "45.5", "87.5", "94.5", "78", "95"],
          ["38", "48", "46.5", "89", "98.5", "82", "99"],
          ["40", "50", "47.5", "90.5", "102.5", "86", "103"],
          ["42", "52", "48.5", "92", "106.5", "90", "107"],
          ["44", "54", "49.5", "93.5", "110.5", "94", "111"],
          ["46", "56", "50.5", "95", "114.5", "98", "115"],
          ["48", "58", "51.5", "96.5", "118.5", "102", "119"],
        ],
      },
    },
    {
      id: 1,
      title: t("Pants for Women"),
      desc: t(
        "Within this section, we present you with a comprehensive men's coat size table. Navigating the intricacies of sizing is now effortless, as we offer a clear breakdown of EU sizes ranging from 44 to 58, along with their corresponding UK equivalents. Whether you're in search of the perfect overcoat or a stylish jacket, our precise measurements ensure a fit that embraces both style and comfort. Explore our table to confidently select the ideal coat size, making your shopping experience a seamless and satisfying one."
      ),
      imgs: [ '/img/guide/men_size-1.webp', '/img/guide/men_size-2.webp'],
      tableData: {
        head: [
          t("UK Size"),
          t("EU Size"),
          t("Waist (cm)"),
          t("Hips (cm)"),
        ],
        body: [
          ["26", "36", "74", "91"],
          ["28", "38", "78", "95"],
          ["30", "40", "82", "99"],
          ["32", "42", "86", "103"],
          ["34", "44", "90", "107"],
          ["36", "48", "94", "111"],
          ["38", "50", "98", "115"],
          ["40", "52", "102", "119"]
        ],
      },
    },
    {
      id: 2,
      title: t("Shirt for Women"),
      desc: t(
        "Introducing our T-shirt size table – your guide to the perfect fit. Explore and choose with confidence."
      ),
      imgs: [ '/img/guide/men_size-1.webp', '/img/guide/men_size-2.webp'],
      tableData: {
        head: [
          t("UK Size"),
          t("EU Size"),
          t('Shoulders (cm)'),
          t("Arms (cm)"),
          t("Chest (cm)"),
          t("Hips (cm)")
        ],
        body: [
          ["XXS", "44", "44.5", "86", "90.5", "91"],
          ["XS", "46", "45.5", "87.5", "94.5", "95"],
          ["S", "48", "46.5", "89", "98.5", "99"],
          ["M", "50", "47.5", "90.5", "102.5", "103"],
          ["L", "52", "48.5", "92", "106.5", "107"],
          ["XL", "54", "49.5", "93.5", "110.5", "111"],
          ["XXL", "56", "50.5", "95", "114.5", "115"],
          ["XXXL", "58", "51.5", "96.5", "118.5", "119"],
        ],
      },
    },
  ],
};


const breadcrumbData = [
  {
    id: 0,
    text: t("Home"),
    action: () => {
      router.push({ name: "home" });
    },
  },
  { id: 1, text: t("Ready To Wear (Women)"), action: () => {} },
];
</script>
