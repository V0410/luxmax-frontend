<template>
  <div class="w-full flex flex-col base-container">
    <div
      class="w-full h-[200px] bg-about laptop:h-[320px] bg-right bg-cover relative laptop:flex justify-center"
    >
      <div class="h-full w-full">
        <div
          class="gridClass flex h-full text-start text-white py-12 justify-center flex-col gap-1"
        >
          <h1
            class="font-static font-bold text-[32px] hidden laptop:block lowercase laptop:text-[68px]"
            v-text="$t('About LuxMax')"
          />
          <h1
            class="font-static font-bold text-[32px] laptop:hidden lowercase laptop:text-[68px]"
            v-text="$t('About Us')"
          />
          <div
            class="text-[20px] hidden laptop:block laptop:text-[38px] laptop:max-w-[622px] font-medium"
            v-text="$t('Elevating Luxury, Embracing Sustainability')"
          />
        </div>
      </div>
    </div>
    <BaseBreadcrumb
      :dataArray="breadcrumbData"
      class="gridClass laptop:hidden mt-8"
    />
    <div class="gridClass py-8 flex flex-col gap-[60px]">
      <div class="flex flex-col laptop:flex-row gap-[60px]">
        <div class="w-full laptop:w-1/2 flex flex-col gap-6 justify-center">
          <div
            class="font-static lowercase text-[40px] font-bold text-t8"
            v-text="$t('What We Do')"
          />
          <div class="text-t7 text-xl">
            <div
              v-text="
                $t(
                  'At LuxMax, we embody a passion for luxury, sustainability, and exceptional craftsmanship. Our mission is to create a world where the beauty of preloved luxury items is not only preserved but celebrated. We are not just an online marketplace; we are a sanctuary for luxury enthusiasts, a hub of craftsmanship, and a beacon of sustainability.'
                )
              "
            />
          </div>
        </div>
        <NuxtImg 
          alt=""
          width="2560"
          height="1440"
          src="/img/aboutUs/what-we-do.webp"
          format="webp"
          quality="100"
          class="w-full laptop:w-1/2"
        />
      </div>
      <div class="flex flex-col laptop:flex-row-reverse gap-[60px]">
        <div class="w-full laptop:w-1/2 flex flex-col gap-6 justify-center">
          <div
            class="font-static lowercase text-[40px] font-bold text-t8"
            v-text="$t('Our Vision')"
          />
          <div class="text-t7 text-xl">
            <div
              v-text="
                $t(
                  `Imagine a world where luxury items retain their timeless charm, where the allure of owning a piece of history is combined with the thrill of discovering a new treasure. That's the world LuxMax envisions, where every preloved luxury item finds a new home, and its story continues.`
                )
              "
            />
          </div>
        </div>
        <NuxtImg 
          alt=""
          width="2560"
          height="1440"
          src="/img/aboutUs/our-vision.webp"
          format="webp"
          quality="100"
          class="w-full laptop:w-1/2"
        />
      </div>
    </div>
    <div class="py-10 laptop:py-20 bg-p1">
      <div class="gridClass flex flex-col gap-[60px] text-center">
        <div class="flex flex-col gap-6">
          <div
            class="lowercase text-t8 font-static text-[40px] font-bold"
            v-text="$t('What Sets Us Apart')"
          />
          <div class="text-t7 text-2xl">
            <div
              v-text="
                $t(
                  `LuxMax is not your typical luxury marketplace; we are redefining the industry with our unique approach. Here's what makes us stand out:`
                )
              "
            />
          </div>
        </div>
        <div
          class="flex flex-col text-start laptop:flex-row gap-6 laptop:gap-[60px]"
        >
          <div class="w-full flex flex-col gap-8">
            <NuxtImg
              alt=""
              width="5276"
              height="3012"
              src="/img/aboutUs/set-us-apart.webp"
              format="webp"
              quality="100"
            />
          </div>
        </div>
        <div class="flex flex-col gap-6">
          <div
            class="lowercase text-t8 font-static text-[24px] laptop:text-[28px] laptop:font-bold"
            v-text="$t('Luxury Online Marketplace')"
          />
          <div class="text-t7 text-xl">
            <div
              v-text="
                $t(
                  `LuxMax is your gateway to a curated selection of preloved luxury items. From designer fashion and fine jewelry to collectible watches and exquisite accessories, our marketplace is a treasure trove for luxury connoisseurs.`
                )
              "
            />
          </div>
        </div>
        <div
          class="flex flex-col text-start laptop:flex-row gap-6 laptop:gap-[60px]"
        >
          <div class="w-full laptop:w-1/2 flex flex-col gap-8 text-center">
            <NuxtImg
              alt=""
              width="2521"
              height="1440"
              src="/img/aboutUs/repair-service.webp"
              format="webp"
              quality="100"
            />
            <div class="flex flex-col gap-4">
              <div
                class="lowercase font-static text-t8 text-[24px] laptop:text-[28px] laptop:font-bold"
                v-text="$t('Restoration & Repair Services')"
              />
              <div class="text-t7 text-xl">
                <div
                  v-text="
                    $t(
                      `We understand the sentimental and intrinsic value of your luxury possessions. Our expert craftsmen are dedicated to restoring and repairing your items to their former glory. Whether it's a vintage watch that needs a tune-up or a designer handbag requiring meticulous care, we've got you covered.`
                    )
                  "
                />
              </div>
            </div>
          </div>
          <div class="w-full laptop:w-1/2 flex flex-col gap-8 text-center">
            <NuxtImg
              alt=""
              width="2521"
              height="1440"
              src="/img/aboutUs/sustainability.webp"
              format="webp"
              quality="100"
            />
            <div class="flex flex-col gap-4">
              <div
                class="lowercase font-static text-t8 text-[24px] laptop:text-[28px] laptop:font-bold"
                v-text="$t('Sustainability')"
              />
              <div class="text-t7 text-xl">
                <div
                  v-text="
                    $t(
                      'Sustainability is at the heart of everything we do. By extending the lifecycle of luxury items, we are reducing waste and minimizing the environmental footprint. LuxMax is your partner in making sustainable choices without compromising on style.'
                    )
                  "
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col text-start laptop:flex-row gap-6 laptop:gap-[60px]"
        >
          <div class="w-full laptop:w-1/2 flex flex-col gap-8 text-center">
            <NuxtImg
              alt=""
              width="2521"
              height="1440"
              src="/img/aboutUs/instant-sell.webp"
              format="webp"
              quality="100"
            />
            <div class="flex flex-col gap-4">
              <div
                class="lowercase font-static text-t8 text-[24px] laptop:text-[28px] laptop:font-bold"
                v-text="$t('Instant Sell Option')"
              />
              <div class="text-t7 text-xl">
                <div>
                  {{
                    $t(
                      `We've introduced an industry-first feature, the "Instant Sell" option. With LuxMax, you can choose to sell your luxury items instantly, receiving a fair and competitive offer. It's the quickest way to part ways with your preloved treasures.`
                    )
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="w-full laptop:w-1/2 flex flex-col gap-8 text-center">
            <NuxtImg
              alt=""
              width="2521"
              height="1440"
              src="/img/aboutUs/flexible.webp"
              format="webp"
              quality="100"
            />
            <div class="flex flex-col gap-4">
              <div
                class="lowercase font-static text-t8 text-[24px] laptop:text-[28px] laptop:font-bold"
                v-text="$t('Flexible Options')"
              />
              <div class="text-t7 text-xl">
                <div
                  v-text="
                    $t(
                      'LuxMax offers flexibility in our repair and restoration services. You can opt to have your items repaired or restored and returned to you, or we can list them on our marketplace, giving them a chance to find a new home and continue their legacy.'
                    )
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gridClass flex flex-col laptop:flex-row gap-[60px] my-[60px]">
      <div class="w-full laptop:w-1/2 flex flex-col gap-6 justify-center">
        <div
          class="font-static lowercase text-[40px] font-bold text-t8"
          v-text="$t('Our Commitment to You')"
        />
        <div class="text-t7 text-xl">
          <div
            v-text="
              $t(
                `LuxMax is more than a marketplace; it's a commitment to luxury, sustainability, and craftsmanship. We are here to celebrate the artistry of luxury brands, preserve the stories behind preloved items, and provide you with exceptional services.`
              )
            "
          />
        </div>
      </div>
      <NuxtImg
        alt=""
        width="2520"
        height="1440"
        src="/img/aboutUs/our-commitment.webp"
        format="webp"
        quality="100"
        class="w-full laptop:w-1/2"
      />
    </div>
    <HomeTestimonials />
    <HomeJoinUs />
    <HomeAppAd />
  </div>
</template>

<script setup>
// definePageMeta({
//   name: "about",
// });

const { t } = useI18n();

useHead({
  title: `LuxMax - About us`,
  meta: [
    {
      name: 'title',
      content: 'About LuxMax - Reimagining Luxury'
    },
    {
      name: 'description',
      content: "LuxMax connects customers to luxury repair masters committed to specialized service and quality craftsmanship."
    }
  ]
})

const breadcrumbData = computed(() => [
  {
    id: 0,
    text: t("Home"),
    action: () => {
      router.push({ name: "home" });
    },
  },
  {
    id: 1,
    text: t("About Us"),
    action: () => {},
  },
]);
</script>
