<template>
    <div>
        <GuideTemplate :data="data" :breadcrumbData="breadcrumbData" />
    </div>
</template>

<script setup>
definePageMeta({
  name: "shoe-guide",
});
const { t } = useI18n();

const router = useRouter()
useHead({
  title: `LuxMax - Shoe size guide`,
  meta: [
    {
      name: 'title',
      content: `Pre-Owned Luxury Shoes - Heels, Boots & More | LuxMax`
    },
    {
      name: 'description',
      content: "Discover deals up to 70% off pre-owned luxury shoes in like-new condition. Jimmy Choo, Manolo Blahnik, Christian Louboutin and more top designers."
    }
  ]
})
const data = {
  title: t("Shoe Size Guideline"),
  optionsExtraText: t("Shoe"),
  categories: [
    { id: 0, name: t("Men"), text: t('For Men'), value: 0 },
    { id: 1, name: t("Women"), text: t('For Women'), value: 1 },
    { id: 2, name: t("Kids"), text: t('For Kids'), value: 2 },
  ],
  main: [
    {
      id: 0,
      title: t("Shoe size for Men"),
      desc: t(
        "Welcome to our comprehensive men's shoe size table, where we have curated a general guide for both UK and EU sizes to assist you in finding the perfect fit. While these measurements are a great starting point, we understand that each brand may have slight variations in sizing due to different designs and styles. For precise accuracy and to ensure an impeccable match, we encourage you to explore our detailed table of contents, where you can access specific brand guidelines for men's footwear. Elevate your shoe shopping experience with us and step into the world of comfort and style."
      ),
      tableData: {
        head: [
          t("UK Size"),
          t("EU Size"),
          t("Foot Size (cm)"),
          t("Foot Size (inch)"),
        ],
        body: [
          ["2.5", "35", "22.5", "8.86"],
          ["3.5", "36", "23", "9.05"],
          ["4", "37", "23.5", "9.25"],
          ["5", "38", "24", "9.44"],
          ["6", "39", "24.5", "9.65"],
          ["6.5", "40", "25", "9.84"],
          ["7.5", "41", "25.5", "10.04"],
          ["8.5", "42", "26", "10.24"],
          ["9", "43", "26.5", "10.43"],
          ["9.5", "44", "27", "10.63"],
          ["10.5", "45", "27.5", "10.83"],
          ["11.5", "46", "28", "11.02"],
          ["12.5", "47", "28.5", "11.22"],
        ],
      },
    },
    {
      id: 1,
      title: t("Shoe size for Women"),
      desc: t(
        "Introducing our comprehensive Women's Shoe Size Table, designed to help you find the perfect fit effortlessly. We provide a general guide for EU sizes, ranging from 35 to 42, accompanied by precise measurements in centimeters for each size. But that's not all! Delve into our extensive collection of specific brand guidelines, where you can discover shoe sizes tailored to your favorite brands. We believe that finding the right fit is essential for comfort and style, and our table aims to make your shoe shopping experience delightful and satisfying. Step into fashion with confidence, knowing you'll always have the ideal shoe size at your fingertips."
      ),
      tableData: {
        head: [
          t("UK Size"),
          t("EU Size"),
          t("Foot Size (cm)"),
          t("Foot Size (inch)"),
        ],
        body: [
          ["2.5", "35", "22.5", "8.86"],
          ["3.5", "36", "23", "9.05"],
          ["4", "37", "23.5", "9.25"],
          ["5", "38", "24", "9.44"],
          ["6", "39", "24.5", "9.65"],
          ["6.5", "40", "25", "9.84"],
          ["7.5", "41", "25.5", "10.04"],
          ["8", "42", "26", "10.24"]
        ],
      },
    },
    {
      id: 2,
      title: t("Shoe size for Kids"),
      desc: t(
        "Introducing our comprehensive Kids' Shoe Size Table, thoughtfully crafted to make finding the perfect fit for your little ones a breeze. From EU size 20 to EU size 35, we offer a general guide that covers a range of children's ages and foot measurements. But that's not all – we go the extra mile to cater to your preferences by including specific shoe sizes based on various renowned brands. Your child's comfort and style are our top priority, and our table ensures that their tiny feet are adorned with the finest footwear. Embrace the joy of hassle-free shoe shopping as you explore our inclusive collection, designed to meet the unique needs of your growing kids."
      ),
      tableData: {
        head: [
          t("UK Size"),
          t("EU Size"),
          t("Foot Size (cm)"),
          t("Foot Size (inch)"),
        ],
        body: [
          ["2.5", "35", "22.5", "8.86"],
          ["3.5", "36", "23", "9.05"],
          ["4", "37", "23.5", "9.25"],
          ["5", "38", "24", "9.44"],
          ["6", "39", "24.5", "9.65"],
          ["6.5", "40", "25", "9.84"],
          ["7.5", "41", "25.5", "10.04"],
          ["8", "42", "26", "10.24"]
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
  { id: 1, text: t("Shoe Size Guideline"), action: () => {} },
];
</script>
