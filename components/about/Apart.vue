<template>
    <div class="py-10 laptop:py-20 bg-p1">
      <div class="px-4 laptop:px-16 flex flex-col gap-6 laptop:gap-[60px] text-center">
        <div class="flex flex-col gap-4 laptop:gap-6">
          <div
            class="text-t8 text-[32px] laptop:text-[40px] font-bold"
            v-text="$t('What Sets Us Apart')"
          />
          <div class="text-t7 laptop:text-2xl text-center laptop:text-start">
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
              class="rounded-[40px]"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2 laptop:gap-6">
          <div
            class="text-t8 text-[24px] laptop:text-[28px] font-bold"
            v-text="$t('Luxury Online Marketplace')"
          />
          <div class="text-t7 laptop:text-xl">
            <div
              v-text="
                $t(
                  `Discover a world of luxury at LuxMax, where you can explore a curated selection of high-end fashion, accessories, and collectibles from renowned brands and designers. Our online marketplace offers a secure and convenient shopping experience, with each item authenticated for quality and authenticity. Join our community of luxury enthusiasts and sellers to buy, sell, and connect with like-minded individuals.`
                )
              "
            />
          </div>
        </div>
        <div
          class="flex flex-col text-start laptop:flex-row gap-6 laptop:gap-[60px]"
        >
          <div class="w-full laptop:w-1/2 flex flex-col gap-4 laptop:gap-8 text-center">
            <NuxtImg
              alt=""
              width="2521"
              height="1440"
              src="/img/aboutUs/repair-service.webp"
              format="webp"
              quality="100"
              class="rounded-3xl"
            />
            <div class="flex flex-col gap-2 laptop:gap-4">
              <div
                class="text-t8 text-[24px] laptop:text-[28px] font-bold"
                v-text="$t('Restoration & Repair Services')"
              />
              <div class="text-t7 laptop:text-xl">
                <div
                  v-text="
                    $t(
                      `LuxMax offers expert restoration and repair services to bring new life to your beloved luxury items. Our skilled artisans specialize in handling delicate repairs with precision and care, ensuring that your cherished belongings are restored to their former glory. Whether it's repairing a tear, replacing a zipper, or refreshing the color of a handbag, we're here to help you preserve the value and beauty of your luxury items.`
                    )
                  "
                />
              </div>
            </div>
          </div>
          <div class="w-full laptop:w-1/2 flex flex-col gap-4 laptop:gap-8 text-center">
            <NuxtImg
              alt=""
              width="2521"
              height="1440"
              src="/img/aboutUs/sustainability.webp"
              format="webp"
              quality="100"
              class="rounded-3xl"
            />
            <div class="flex flex-col gap-2 laptop:gap-4">
              <div
                class="text-t8 text-[24px] laptop:text-[28px] font-bold"
                v-text="$t('Sustainability')"
              />
              <div class="text-t7 laptop:text-xl">
                <div
                  v-text="
                    $t(
                      `At LuxMax, sustainability is at the core of everything we do. By giving preloved items a new lease on life through our restoration and repair services, we help reduce waste and promote circular fashion. We believe in making ethical and environmentally responsible fashion choices, and we're committed to supporting a more sustainable future for generations to come.`
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
          <div class="w-full laptop:w-1/2 flex flex-col gap-4 laptop:gap-8 text-center">
            <NuxtImg
              alt=""
              width="2521"
              height="1440"
              src="/img/aboutUs/instant-sell.webp"
              format="webp"
              quality="100"
              class="rounded-3xl"
            />
            <div class="flex flex-col gap-2 laptop:gap-4">
              <div
                class="text-t8 text-[24px] laptop:text-[28px] font-bold"
                v-text="$t('Instant Sell Option')"
              />
              <div class="text-t7 laptop:text-xl">
                <div>
                  {{
                    $t(
                      `With LuxMax's instant sell option, you can get immediate cash offers for your luxury items without the wait. Skip the hassle of traditional selling methods and enjoy a streamlined process with quick evaluations and instant payouts. Whether you're looking to sell your items quickly or simply want to explore your options, our instant sell option provides a convenient and hassle-free solution.`
                    )
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="w-full laptop:w-1/2 flex flex-col gap-4 laptop:gap-8 text-center">
            <NuxtImg
              alt=""
              width="2521"
              height="1440"
              src="/img/aboutUs/flexible.webp"
              format="webp"
              quality="100"
              class="rounded-3xl"
            />
            <div class="flex flex-col gap-2 laptop:gap-4">
              <div
                class="text-t8 text-[24px] laptop:text-[28px] font-bold"
                v-text="$t('Flexible Options')"
              />
              <div class="text-t7 laptop:text-xl">
                <div
                  v-text="
                    $t(
                      `LuxMax offers a range of flexible buying and selling options to suit your needs. Whether you're looking to buy or sell luxury items, we provide customizable solutions tailored to your lifestyle and preferences. From convenient payment and delivery options to personalized services, we strive to make your experience with us as seamless and enjoyable as possible.`
                    )
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>