<template>
  <div class="w-full bg-p1">
    <div class="gridClass flex flex-col justify-between py-10 laptop:py-20">
      <div class="mx-auto w-fit text-center flex flex-col gap-4">
        <div
          class="text-t8 font-bold text-[32px] laptop:text-[40px]"
          v-text="$t('Testimonials')"
        />
        <div
          class="text-p9 text-xl laptop:text-[28px] leading-normal"
          v-text="$t('See What Our Customers Have to Say')"
        />
      </div>
      <div class="mt-16 laptop:mt-[120px] flex flex-col">
        <div class="justify-start hidden laptop:flex">
          <IconViewer name="IconQoutes" />
        </div>
        <div
          class="laptop:px-28 text-center font-extralight min-h-[180px] laptop:font-normal text-sm laptop:text-3xl leading-normal text-p10"
          v-text="data[selectedTestimonial].text"
        />
        <div class="justify-end hidden laptop:flex">
          <IconViewer name="IconQoutes" class="rotate-180" />
        </div>
        <div class="mt-10 w-fit mx-auto text-center">
          <NuxtImg alt=""
            class="rounded-full mx-auto w-[120px] h-[120px] lazyload"
            :src="data[selectedTestimonial].author.pic"
            quality="100"
            format="webp"
          />
          <div
            class="text-p10 mt-4 mb-8 font-semibold"
            v-text="data[selectedTestimonial].author.name"
          />
          <div class="flex flex-row gap-3">
            <div
              v-for="(item, i) in data"
              :key="i"
              class="py-2 [&>*]:bg-p10"
              :class="
                i === selectedTestimonial ? ' ' : '[&>*]:bg-opacity-20 cursor-pointer [&>*]:hover:bg-p4'
              "
              @click="selectedTestimonial = i"
            >
            <div class="h-[3.2px] w-8" />
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const selectedTestimonial = ref(0);
const data = [
  {
    text: t(
      `LuxMax combines convenience and luxury perfectly. I've confidently sold and purchased luxury items on their platform, knowing their expert authentication ensures quality. LuxMax brings a touch of luxury to London.`
    ),
    author: {
      name: "Isabella L.",
      pic: "/img/aboutUs/testimonials/isabella.webp",
    },
  },
  {
    text: t(
      `As a Londoner, fashion is a way of life. LuxMax's repair and sell service keeps my style fresh. I can easily rotate my collection and explore new luxury finds in their marketplace.`
    ),
    author: {
      name: "Michael B.",
      pic: "/img/aboutUs/testimonials/micheal.webp",
    },
  },
  {
    text: t(
      `LuxMax's dedication to sustainability aligns with my values. Repairing and selling my luxury items with LuxMax has become a part of my sustainable fashion journey. I love being part of their London community.`
    ),
    author: { name: "Emily R.", pic: "/img/aboutUs/testimonials/emily.webp" },
  },
  {
    text: t(
      `I've experienced the convenience and luxury that LuxMax offers. Their instant sell feature helped me declutter my closet while putting some extra pounds in my pocket. It's a brilliant service for urbanites like me.`
    ),
    author: {
      name: "William H.",
      pic: "/img/aboutUs/testimonials/william.webp",
    },
  },
  {
    text: t(
      `LuxMax has brought a touch of luxury to my life in London. Their repair service not only saved my favorite bag but also gave me a more sustainable option. Plus, I've found some stunning pieces on their marketplace.`
    ),
    author: { name: "Sophia M.", pic: "/img/aboutUs/testimonials/sophia.webp" },
  },
];
</script>
