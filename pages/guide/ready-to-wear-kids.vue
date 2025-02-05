<template>
    <div>
        <GuideTemplate :data="data" :breadcrumbData="breadcrumbData" />
    </div>
</template>

<script setup>
definePageMeta({
  name: "ready_to_wear-kids-guide",
});

const { t } = useI18n();

const router = useRouter()
useHead({
  title: `LuxMax - Ready to wear kids guide`,
  meta: [
    {
      name: 'title',
      content: `Luxury Children's Fashion - LuxMax Pre-Owned Boutique`
    },
    {
      name: 'description',
      content: "Kids' luxury clothing and accessories with detailed garment measurements."
    }
  ]
})
const data = {
  title: t("Kids Ready to Wear Guideline"),
  optionsExtraText: t("Ready to Wear"),
  categories: [
    { id: 0, name: t("Boy"), text: t('Boy'), value: 0 },
    { id: 1, name: t("Girl"), text: t('Girl'), value: 1 },
  ],
  desc: t("Welcome to our informative page dedicated to kids' clothing sizes. Here, we delve into the world of sizing, offering valuable insights to help you find the perfect fit for your little ones. Whether you're looking for adorable outfits for toddlers or trendy styles for older kids, we've got you covered. We'll discuss the conversion between UK and EU sizes, making your shopping experience a breeze. With our expert tips and guidance, you can confidently select the right size and ensure your kids' comfort and style are always top-notch. Let's embark on this journey of finding the ideal fit for your children's fashion needs."),
  main: [
    {
      id: 0,
      title: t("Boy"),
      desc: t(
        "Welcome to our page dedicated to boys' clothing sizes. From toddlers to older boys, we'll guide you through finding the perfect fit with expert tips and comprehensive size charts. Shop with confidence for stylish and comfortable clothes. Let's begin!"
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
      title: t("Girl"),
      desc: t(
        "Welcome to our girls' clothing size guide. From cute outfits to trendy styles, we've got you covered with expert tips and size charts for a perfect fit. Let's get started!"
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
  { id: 1, text: t("Ready To Wear (Kids)"), action: () => {} },
];
</script>
