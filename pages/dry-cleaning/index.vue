<template>
    <div>
        <TheMeta :seoItems="seoItems" />
        <div>
            <BannerDryCleaning
                src="/img/DryCleaning/banner3.webp"
                :titleFirstLine="$t('London')"
                :titleSecondLine="$t('Specialist Dry Cleaning')"
                :description="
                    $t(
                        `Discover London's premier luxury dry cleaning service, where modern techniques meet timeless elegance. Entrust your couture garments to us for unparalleled care and rejuvenation.`
                    )
                "
                :firstButton="{
                    text: $t('‌Book Now'),
                    link: 'dry-cleaning-request',
                    id: 'book-now',
                }"
            />

            <div class="weoffer flex flex-col gap-2 text-center font-semibold mobile-sss:px-2 mobile-sss:text-[27px] mobile-sss:leading-8 text-[40px] text-p6 mobile:sss:mt-12 mobile-m:mt-0 mobile-m:-mt-12 mobile-l:mt-36 leading-none">
                <span>
                    We offer Quick and effective Dry Cleaning 
                </span>
                <span>
                    Services in <span class="text-p8">London</span>
                </span>
            </div>

            <div
                class="py-10 px-6 laptop:py-16 laptop:px-20 flex flex-col gap-14"
            >
            
            <div class="flex justify-center items-center">
                <div class="flex flex-col tablet:flex-row justify-between gap-8 tablet:gap-24 laptop:gap-36">

                    <div class="flex flex-col justify-center items-center gap-2">
                        <div class="flex justify-center items-center p-2.5 rounded-full bg-p1 w-24 h-24 laptop:w-24 laptop:h-24">
                            <div class="font-semibold text-2xl text-p10">
                                <svg width="57" height="53" viewBox="0 0 57 53" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.6864 1.8999C44.4939 1.8999 55.6864 13.0924 55.6864 26.8999C55.6864 40.7074 44.4939 51.8999 30.6864 51.8999C16.8789 51.8999 6.42907 41.4397 5.71777 28.2702" stroke="#50937D" stroke-width="2.09205" stroke-miterlimit="10"/><path d="M6.12598 22.2137C6.22012 21.7012 6.33518 21.1886 6.47116 20.6865" stroke="#50937D" stroke-width="2.09205" stroke-miterlimit="10"/><path d="M7.32812 17.9668C10.5813 9.46257 18.3532 3.19688 27.6942 2.07764" stroke="#50937D" stroke-width="2.09205" stroke-miterlimit="10" stroke-dasharray="6.28 4.18"/><path d="M29.1172 1.9522C29.6402 1.92082 30.1632 1.8999 30.6862 1.8999" stroke="#50937D" stroke-width="2.09205" stroke-miterlimit="10"/><path d="M16.3037 34.1279L16.5652 32.6425L23.1238 26.5442C23.8979 25.8329 24.5359 25.2053 25.0485 24.6718C25.561 24.1383 25.969 23.6362 26.2514 23.176C26.5338 22.7157 26.7326 22.2136 26.8163 21.7011C26.9104 21.1049 26.8581 20.5923 26.6594 20.1634C26.4606 19.7346 26.1363 19.3894 25.697 19.1592C25.2577 18.9291 24.7347 18.8036 24.1175 18.8036C23.469 18.8036 22.8727 18.9396 22.3497 19.2011C21.8163 19.4626 21.3769 19.8392 21.0213 20.3203C20.6656 20.8015 20.4355 21.3559 20.3309 21.994H18.3853C18.5527 21.0002 18.9292 20.132 19.515 19.3894C20.1008 18.6467 20.833 18.0609 21.7012 17.6425C22.5694 17.2241 23.4899 17.0149 24.4836 17.0149C25.4774 17.0149 26.3142 17.2241 26.9941 17.6425C27.674 18.0609 28.1761 18.6258 28.4899 19.3371C28.8037 20.0484 28.8769 20.8329 28.741 21.7011C28.6363 22.3287 28.4167 22.9354 28.0924 23.5212C27.7681 24.1069 27.2765 24.7659 26.6071 25.4877C25.9376 26.2095 25.038 27.0881 23.8979 28.1341L19.4418 32.1927L19.4104 32.3287H27.2556L26.9627 34.1383H16.3142L16.3037 34.1279Z" fill="#50937D"/><path d="M28.322 30.6655L28.5835 28.9814L37.9454 17.245H39.1693L38.7404 19.8496H37.914L30.822 28.7199V28.8559H40.8115L40.5186 30.6655H28.3115H28.322ZM35.6755 34.1278L36.3345 30.1425L36.4705 29.3789L38.4789 17.245H40.4245L37.6211 34.1278H35.6755Z" fill="#50937D"/><path d="M42.2867 30.6237L41.7114 34.1279H40.8223L42.1089 26.3768H42.998L42.5273 29.222H42.6005C42.7783 28.9187 43.0294 28.6781 43.3327 28.5003C43.6361 28.3224 44.0231 28.2388 44.4834 28.2388C44.8808 28.2388 45.2051 28.3224 45.4771 28.4793C45.749 28.6362 45.9373 28.8768 46.0524 29.2011C46.1675 29.5254 46.1779 29.9333 46.1047 30.4354L45.4875 34.1279H44.5984L45.2051 30.4877C45.2783 30.0275 45.2156 29.6718 45.0168 29.4103C44.8181 29.1593 44.5147 29.0337 44.0963 29.0337C43.8034 29.0337 43.5315 29.0965 43.2804 29.222C43.0294 29.3475 42.8202 29.5254 42.6424 29.766C42.4645 30.0065 42.3495 30.289 42.2972 30.6342L42.2867 30.6237Z" fill="#50937D"/><path d="M46.2614 34.1278L47.2342 28.3119H48.1024L47.9455 29.1906H48.0083C48.1652 28.8977 48.3953 28.6676 48.6987 28.4897C49.002 28.3119 49.3367 28.2178 49.6819 28.2178C49.7447 28.2178 49.8284 28.2178 49.933 28.2178C50.0271 28.2178 50.1003 28.2178 50.1526 28.2282L50.0062 29.1383C50.0062 29.1383 49.9121 29.1174 49.797 29.1069C49.6924 29.086 49.5773 29.086 49.4518 29.086C49.1694 29.086 48.9079 29.1487 48.6673 29.2638C48.4267 29.3789 48.228 29.5462 48.0606 29.745C47.9037 29.9542 47.7991 30.1843 47.7468 30.4458L47.1401 34.1278H46.251H46.2614Z" fill="#50937D"/><path d="M1.30371 33.3539L5.70748 28.0087L11.0527 32.4124" stroke="#50937D" stroke-width="2.09205" stroke-miterlimit="10"/></svg>
                            </div>
                        </div>
                        <div class="text-center">24hr service</div>
                    </div>
               

                    <div class="flex flex-col justify-center items-center gap-2">
                        <div class="flex justify-center items-center p-2.5 rounded-full bg-p1 w-24 h-24 laptop:w-24 laptop:h-24">
                            <div class="font-semibold text-2xl text-p10">
                                <svg width="66" height="45" viewBox="0 0 66 45" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_208_3455)"><path d="M46.6787 15.3021H58.5531C59.1986 15.3021 59.7805 15.684 60.0533 16.2659L64.5812 26.1218C64.7449 26.4855 64.8358 26.8856 64.8358 27.2856V36.7324C64.8358 37.6416 64.0993 38.3781 63.1901 38.3781H60.4534" stroke="#50937D" stroke-width="1.81844" stroke-linejoin="round"/><path d="M16.6113 26.3491V36.2869C16.6113 37.4416 17.5478 38.3781 18.7025 38.3781H21.6211" stroke="#50937D" stroke-width="1.81844" stroke-linejoin="round"/><path d="M50.8067 38.3781H31.2676" stroke="#50937D" stroke-width="1.81844" stroke-linejoin="round"/><path d="M46.7245 38.3326V11.0379C46.7245 9.88315 45.788 8.94666 44.6333 8.94666H40.8691" stroke="#50937D" stroke-width="1.81844" stroke-miterlimit="10"/><path d="M61.5533 19.53H57.1072C55.0887 19.53 53.4521 21.1666 53.4521 23.1851C53.4521 25.2036 55.0887 26.8401 57.1072 26.8401H64.8356" stroke="#50937D" stroke-width="1.81844" stroke-linejoin="round"/><path d="M26.4665 0.90918C32.8219 0.90918 37.9681 6.05535 37.9681 12.4108C37.9681 22.294 26.4665 29.0404 26.4665 29.0404C26.4665 29.0404 14.9648 22.294 14.9648 12.4108C14.9648 6.05535 20.111 0.90918 26.4665 0.90918Z" stroke="#50937D" stroke-width="1.81844" stroke-miterlimit="10"/><path d="M26.4668 18.0934C29.5249 18.0934 32.004 15.6144 32.004 12.5563C32.004 9.49823 29.5249 7.01917 26.4668 7.01917C23.4087 7.01917 20.9297 9.49823 20.9297 12.5563C20.9297 15.6144 23.4087 18.0934 26.4668 18.0934Z" stroke="#50937D" stroke-width="1.81844" stroke-miterlimit="10"/><path d="M15.4927 9.01941H8.97363" stroke="#50937D" stroke-width="1.81844" stroke-miterlimit="10"/><path d="M6.84552 9.01941H2.54492" stroke="#50937D" stroke-width="1.81844" stroke-miterlimit="10"/><path d="M14.9203 13.42H7.41016" stroke="#50937D" stroke-width="1.81844" stroke-miterlimit="10"/><path d="M16.3019 17.8025H10.6738" stroke="#50937D" stroke-width="1.81844" stroke-miterlimit="10"/><path d="M19.0658 22.1849H12.6104" stroke="#50937D" stroke-width="1.81844" stroke-miterlimit="10"/><path d="M10.4283 22.1849H7.10059" stroke="#50937D" stroke-width="1.81844" stroke-miterlimit="10"/><path d="M8.52802 17.8025H0.745117" stroke="#50937D" stroke-width="1.81844" stroke-miterlimit="10"/><path d="M55.6253 44.0606C58.3319 44.0606 60.526 41.8665 60.526 39.16C60.526 36.4534 58.3319 34.2593 55.6253 34.2593C52.9187 34.2593 50.7246 36.4534 50.7246 39.16C50.7246 41.8665 52.9187 44.0606 55.6253 44.0606Z" stroke="#50937D" stroke-width="1.81844" stroke-miterlimit="10"/><path d="M26.4485 44.0606C29.1551 44.0606 31.3492 41.8665 31.3492 39.16C31.3492 36.4534 29.1551 34.2593 26.4485 34.2593C23.742 34.2593 21.5479 36.4534 21.5479 39.16C21.5479 41.8665 23.742 44.0606 26.4485 44.0606Z" stroke="#50937D" stroke-width="1.81844" stroke-miterlimit="10"/></g><defs><clipPath id="clip0_208_3455"><rect width="65" height="44.9699" fill="white" transform="translate(0.745117)"/></clipPath></defs></svg>
                            </div>
                        </div>
                        <div class="text-center" >Free Pickup & Delivery</div>
                    </div>

                    <div class="flex flex-col justify-center items-center gap-2">
                        <div class="flex justify-center items-center p-2.5 rounded-full bg-p1 w-24 h-24 laptop:w-24 laptop:h-24">
                            <div class="font-semibold text-2xl text-p10">
                                <svg width="56" height="55" viewBox="0 0 56 55" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_208_3477)"><mask id="mask0_208_3477" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="56" height="55"><path d="M55.5 0H0.5V55H55.5V0Z" fill="white"/></mask><g mask="url(#mask0_208_3477)"><path d="M25.9203 32.6133C25.9203 32.6133 27.9807 31.5799 32.7481 26.9307C38.0719 21.7379 35.352 16.1198 31.7533 15.5655C28.5113 15.0649 26.9215 16.5989 25.8623 18.6657C24.8031 16.5989 23.2133 15.0649 19.9713 15.5655C16.3727 16.1219 13.6527 21.7401 18.9766 26.9307C23.744 31.5799 25.8043 32.6133 25.8043 32.6133" stroke="#50937D" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/><path d="M24.073 39.7354L20.208 42.7088" stroke="#50937D" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.2076 42.7088L15.1094 46.6297L15.567 41.5873" stroke="#50937D" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.8016 39.0286L15.5674 41.5874" stroke="#50937D" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.65332 36.8177C10.4752 37.7631 12.8063 38.5215 15.8012 39.0285" stroke="#50937D" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/><path d="M47.3377 13.46C49.2906 16.3238 49.484 19.8172 49.484 23.3148C49.484 31.5348 48.457 39.7547 25.8512 39.7547C25.241 39.7547 24.6523 39.7461 24.0723 39.7332" stroke="#50937D" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/><path d="M47.3381 13.46C44.6998 9.59063 38.841 6.875 25.8516 6.875C3.2457 6.875 2.21875 15.0949 2.21875 23.3148C2.21875 28.5098 2.64199 33.6982 8.65332 36.8178" stroke="#50937D" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/><path d="M47.3385 13.46C53.3627 16.5795 53.7816 21.7766 53.7816 26.9758C53.7816 33.7455 53.0727 40.5109 40.1992 42.6895" stroke="#50937D" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/><path d="M31.9273 43.3962C31.3473 43.4091 30.7607 43.4177 30.1484 43.4177" stroke="#50937D" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/><path d="M40.1992 42.6895L40.891 50.2928L31.9277 43.3963" stroke="#50937D" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/><path d="M30.1482 43.4177C28.1867 43.4177 26.3928 43.3554 24.7471 43.2351" stroke="#50937D" stroke-width="1.71875" stroke-linecap="round" stroke-linejoin="round"/></g></g><defs><clipPath id="clip0_208_3477"><rect width="55" height="55" fill="white" transform="translate(0.5)"/></clipPath></defs></svg>
                            </div>
                        </div>
                        <div class="text-center">24/7 Customer Support</div>
                    </div>

                </div>
            </div>
               
            </div>
            <div class="relative laptop:px-20 py-16 mt-10">
                <div
                    class="bg-p1 laptop:rounded-[40px] flex tablet:justify-center tablet:items-center laptop:justify-end laptop-l:justify-end w-full mobile-sss:px-2 mobile-l:px-6 py-8 laptop:px-20 laptop:py-16 laptop:h-[464px]"
                >
                    <div
                        class="flex flex-col gap-4 laptop:gap-0 items-center laptop:items-start justify-between h-full laptop:w-[40%]"
                    >
                        <NuxtImg
                            src="/img/DryCleaning/car.webp"
                            class="laptop-l:ml-40 laptop:ml-16 ml-0 mt-0 max-h-[300px] w-3/5 laptop:mt-0 laptop-l:w-auto laptop:h-full laptop:absolute top-30 left-0"
                        />
            
                        <div class="flex flex-col gap-6 laptop-x:ml-0 laptop-l:ml-8 laptop:ml-16 z-[1]">
                            <div
                                v-text="
                                    $t(
                                        'Professional Quality You Can Count On'
                                    )
                                "
                                class="font-semibold mobile-sss:text-[28px] text-[32px] laptop-l:text-[40px] text-p8 text-center laptop:text-start"
                            />
                            <div class="flex flex-col text-t7 laptop:text-2xl text-center laptop:text-start">
                                <span>We collect, clean, and deliver </span>
                                <span>your dry cleaning</span>
                            </div>
                        </div>

                        <NuxtLink :to="{ name: 'dry-cleaning-request' }" class="laptop:mt-10">
                            <BaseButton
                                text="Make your Order"
                                class="w-fit"
                                buttonId="make-your-first-order"
                            />
                        </NuxtLink>
                    </div>
                </div>
            </div>


            <div class="py-10 mobile-sss:px-2 px-6 laptop:py-16 laptop:px-20 flex flex-col gap-14">
                <div class="text-center font-semibold mobile-sss:text-[30px] mobile-l:text-[40px] text-p8">
                    Dry Cleaning Prices
                </div>
                <div class="flex flex-col text-t7 laptop:text-xl text-center laptop:text-center">
                    Discover our competitive dry cleaning prices today and experience pristine results
                </div>

                <div class="flex flex-wrap justify-center items-center gap-10 laptop:gap-[12px]">
                    <PriceCard
                        class="items-center justify-center w-[50%] mobile-sss:w-[100%] mobile-l:w-[30%] tablet:w-[16%] laptop:w-[16%] laptop-l:w-[12%]"
                        v-for="item in prices"
                        :key="item.title"
                        :beforeDiscount="+item.beforeDiscount"
                        :title="item.title"
                        :src="item.src"
                        :afterDiscount="+item.afterDiscount"
                    />
                </div>
            </div>

            <div class="w-full h-350 laptop:h-72 bg-p7 py-10">

                <div class="features flex flex-col laptop:flex-row gap-12 justify-center items-center h-full">
                    <div class="feature-1 h-full flex flex-col justify-center items-center gap-4">
                        <div class="feature-top">
                            <NuxtImg
                                src="/img/DryCleaning/features/Evening_Standard_50.png"
                                class="max-h-[200px] w-60 laptop:h-full"
                            />
                        </div>
                        <div class="feature-down text-sm text-white opacity-80 laptop:mt-6">
                            Best Digi Dry Cleaning
                        </div>
                    </div>

                    <div class="feature-2 h-full flex flex-col justify-center items-center gap-4">
                        <div class="feature-top">
                            <NuxtImg
                                src="/img/DryCleaning/features/gq_50.png"
                                class="max-h-[200px] w-28 laptop:h-full"
                            />
                        </div>
                        <div class="feature-down text-white text-sm opacity-80">
                            Bretain's best delivery service
                        </div>
                    </div>

                    <div class="feature-3 h-full flex flex-col justify-center items-center gap-4">
                        <div class="feature-top">
                            <NuxtImg
                                src="/img/DryCleaning/features/eco_50.png"
                                class="max-h-[200px] w-32 laptop:h-full"
                            />
                        </div>
                        <div class="feature-down text-white text-sm opacity-80 laptop:mt-3">
                            ECO Friendly Dry Cleaning
                        </div>
                    </div>

                    <div class="feature-4 h-full flex flex-col justify-center items-center gap-4">
                        <div class="feature-top">
                            <NuxtImg
                                src="/img/DryCleaning/features/5star_50.png"
                                class="max-h-[200px] w-48 laptop:h-full"
                            />
                        </div>
                        <div class="feature-down text-white text-sm opacity-80 laptop:mt-5">
                            4.7 average customer rating
                        </div>
                    </div>
                </div>
            </div>

            <div class="py-10 px-6 laptop:py-16 laptop:px-20 flex flex-col gap-14">
                <div class="text-center font-semibold text-[40px] text-p8">
                    Process of our service
                </div>
                <div class="flex flex-wrap justify-center gap-6 laptop:gap-[28px]">
                    <ProcessCard
                        class="mobile-sss:w-[90%] mobile-l:w-[46%] w-[46%] laptop:w-[17%]"
                        v-for="item in process"
                        :key="item.title"
                        :number="+item.number"
                        :title="item.title"
                        :line1="item.line1"
                        :line2="item.line2"
                        :svg="item.svg"
                    />
                </div>
                <NuxtLink :to="{ name: 'dry-cleaning-request' }" class="flex justify-center">
                    <BaseButton
                        text="Book Now"
                        class="w-fit"
                        buttonId="make-your-first-order"
                        size="l"
                    />
                </NuxtLink>
            </div>

            <div class="w-full bg-white">
                <WorkQualityWrapper 
                    :title="$t('Our Work Quality')"
                    :data="beforeAfter"
                    class="mobile-ss:w-3/4 mobile-l:w-auto bg-p1 border-p1 rounded-md mx-auto pb-20 mobile-ss:px-8 tablet:px-24 laptop:px-60"
                    :style="{ width: isMobile ? '100%' : 'auto' }"
                />
            </div>


            <LandingsReviewWrapper
                :title="$t('Customer reviews')"
                :data="reviewWrapper"
            />



            <NuxtLink :to="{ name: 'dry-cleaning-request' }" class="flex justify-center">
                <BaseButton
                    text="Book Now"
                    class="w-fit"
                    buttonId="make-your-first-order"
                    size="l"
                />
            </NuxtLink>


            <div class="w-full flex items-center justify-center mt-20 mobile-sss:px-4 laptop:px-0">
                <div class="flex flex-col max-w-4xl">
                    <div class="text-xl text-t7 border-b border-t1 mb-6 pb-4">
                        Dry Cleaning in London
                    </div>
                    <div class="text-left text-t7 leading-7 mb-10 laptop:mb-24">
                        Booking your dry cleaning online with us is incredibly simple. Download our app or visit our website to book a suitable time slot for your services.
                        Choose the specific services you require, confirm your order, and leave the rest to us. Our team will collect your items, bring them to our facility, and once they're washed, cleaned, and ironed, they will be delivered back to you within PI hours. With LovelLaundry on your side, you can rest assured that your clothes
                        are handled by industry professionals
                    </div>
                </div>
            </div>



        </div>

    </div>
</template>

<script setup>
import BannerDryCleaning from '~/components/landings/BannerDryCleaning.vue';
import PriceCard from '~/components/landings/PriceCard.vue';
import ProcessCard from '~/components/landings/ProcessCard.vue';
import WorkQualityWrapper from '~/components/landings/WorkQualityWrapper.vue';

definePageMeta({
    name: 'dry-cleaning',
    layout: 'default'
});

onMounted(() => {
  // Check for URL parameters
  const params = route.query

  // Create an object to hold the parameters
  const queryParams = {}

  // Iterate over the parameters and add them to the object
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      queryParams[key] = params[key]
    }
  }

  // Store the object in local storage under the key 'landing_query'
  localStorage.setItem('landing_query', JSON.stringify(queryParams))
})

const bookNowButtonLink = ref(null);
const clickbox = ref(null)


const isMobile = ref(false);

// Function to update isMobile based on screen width
const checkScreenWidth = () => {
  isMobile.value = window.innerWidth < 640;
};

// Call checkScreenWidth on component mount
onMounted(() => {
    if(process.client) {
        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);
    }

});

// Remove resize listener on component unmount
onUnmounted(() => {
    if(process.client) {
        window.removeEventListener('resize', checkScreenWidth);
    }
});

const route = useRoute();
const seoItems = ref(null);
const { getSeo } = useItem();
const { data: Seo } = await getSeo(route.fullPath);
if (Seo.value) {
    seoItems.value = {
        metaTitle: Seo.value?.metaTitle,
        metaDescription: Seo.value?.metaDescription,
        metaRobots: Seo.value?.metaRobots,
        metaViewport: Seo.value?.metaViewport,
        canonicalUrl:
            Seo.value?.canonicalUrl || `https://luxmax.co${route.fullPath}`,
    };
} else {
    seoItems.value = {
        metaTitle: `Dry Cleaning`,
        metaDescription: `Dry Cleaning`,
        metaRobots: 'index',
        metaViewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        canonicalUrl: `https://luxmax.co${route.fullPath}`,
    };
}

const postalCode = ref('');
const address = ref('');
const isLondon = ref(false);

const searchMenuIsShow = ref(false);
const addresses = ref([]);

const checkPostalCode = async () => {
    const { getPostCodes } = useItem();
    const { data } = await getPostCodes({ q: postalCode.value });
    addresses.value = data.value.data;
};

const setPostalCode = async (id) => {
    searchMenuIsShow.value = false;
    const { getPostCode } = useItem();
    const { data } = await getPostCode(id);
    if (data.value) {
        postalCode.value = data.value.postcode;
        address.value = data.value.formatted_address.join(' ');
        if (data.value.town_or_city === 'London') {
            isLondon.value = true;
        }
    }
};

const services = ref([
    { src: 'IconCleaningService1', title: 'Wet Cleaning' },
    { src: 'IconCleaningService2', title: 'Iron Clothes' },
    { src: 'IconCleaningService3', title: 'Wash & Fold' },
    { src: 'IconCleaningService4', title: 'Cloth Sewing' },
    { src: 'IconCleaningService5', title: 'Free Pickup' },
    { src: 'IconCleaningService6', title: 'Free Delivery' },
]);

const prices = ref([
    {src: '/img/DryCleaning/clothes/blazer_50.webp', title: 'Jacket/Blazer', beforeDiscount: 17, afterDiscount: 14.45},
    {src: '/img/DryCleaning/clothes/skirt_50.webp', title: 'Skirt', beforeDiscount: 15, afterDiscount: 12.75},
    {src: '/img/DryCleaning/clothes/shirt_50.webp', title: 'Shirt', beforeDiscount: 6, afterDiscount: 5.1},
    {src: '/img/DryCleaning/clothes/coat_50.webp', title: 'Coat', beforeDiscount: 38, afterDiscount: 32.3},
    {src: '/img/DryCleaning/clothes/cardigan_50.webp', title: 'Cardigan', beforeDiscount: 15, afterDiscount: 12.75},
    {src: '/img/DryCleaning/clothes/suit_50.webp', title: 'Suit', beforeDiscount: 25, afterDiscount: 21.25},

]);


const beforeAfter = ref([
    '/img/DryCleaning/beforeafter/clothe/before_shirt_50.webp',
    '/img/DryCleaning/beforeafter/clothe/after_shirt_50.webp',
    '/img/DryCleaning/beforeafter/clothe/before_boot_50.webp',
    '/img/DryCleaning/beforeafter/clothe/after_boot_50.webp',
    '/img/DryCleaning/beforeafter/clothe/before_shoe_50.webp',
    '/img/DryCleaning/beforeafter/clothe/after_shoe_50.webp',
]);

const process = ref([
    {
        number: 1,
        title: 'You Order',
        line1: 'Select clothes for',
        line2: 'Dry Cleaning',
        svg: '<svg width="40" height="55" viewBox="0 0 49 65" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_208_4168)"><path d="M3.12911 58.0339V5.32328C3.12911 3.62951 4.75921 2.25411 6.74589 2.25411H32.6109C34.6103 2.25411 36.2277 3.62951 36.2277 5.32328V35.1871H38.4818V5.32328C38.4818 2.38147 35.8456 0 32.6109 0H6.74589C3.51117 0 0.875 2.3942 0.875 5.32328V58.0339C0.875 60.9757 3.51117 63.3572 6.74589 63.3572H21.0092V61.1031H6.74589C4.74647 61.1031 3.12911 59.7277 3.12911 58.0339Z" fill="white"/><path d="M17.7866 54.4681H7V56.7222H17.7866V54.4681Z" fill="white"/><path d="M24.3458 5.88361H16.1953V8.13772H24.3458V5.88361Z" fill="white"/><path d="M44.4548 39.8481C43.7162 39.8481 43.0412 40.0773 42.4681 40.4594C41.8186 39.4533 40.6979 38.8038 39.4372 38.8038C38.4693 38.8038 37.5778 39.1986 36.9283 39.8354C36.2789 39.1986 35.3874 38.8038 34.4195 38.8038C33.9356 38.8038 33.4644 38.9057 33.0441 39.084V30.2968C33.0441 28.2464 31.414 26.5781 29.4019 26.5781C27.3897 26.5781 25.7597 28.2464 25.7597 30.2968V44.853C24.4989 42.8154 22.6268 40.5613 20.4236 40.1538C19.0228 39.899 17.9658 40.1538 17.2908 40.9179C16.2465 42.1022 16.7559 43.8851 16.8451 44.1398L21.2387 56.149C21.5698 57.066 22.0665 57.8938 22.716 58.6197L24.1932 60.2752C25.072 61.2686 25.5686 62.5421 25.5686 63.8665C25.5686 64.1976 25.7087 64.5033 25.9634 64.7198C26.1672 64.8981 26.4346 64.9872 26.7021 64.9872C26.7403 64.9872 26.7657 64.9872 26.8039 64.9872C27.5171 64.949 37.9726 64.9745 44.875 64.9872C45.168 64.9872 45.4609 64.8726 45.6774 64.6561C45.8939 64.4396 46.0085 64.1594 46.0085 63.8538C46.0085 62.8732 46.2632 61.6633 46.607 60.9884L47.231 59.7785C47.7914 58.6961 48.0843 57.4735 48.0843 56.2637V43.5668C48.0843 41.5164 46.4542 39.8481 44.4421 39.8481H44.4548ZM45.8429 56.2764C45.8429 57.1296 45.6392 57.9956 45.2444 58.7597L44.6203 59.9696C44.1874 60.8101 43.9454 61.8416 43.8308 62.7458C33.579 62.7204 29.4401 62.7204 27.7463 62.7458C27.5298 61.2813 26.8803 59.9059 25.887 58.7979L24.4097 57.1424C23.9513 56.633 23.6074 56.0472 23.3655 55.3977L18.9846 43.4267C18.8954 43.0828 18.7553 42.6116 18.9846 42.4461C19.0483 42.4079 19.3157 42.2805 20.0161 42.4079C21.4042 42.6626 23.2254 44.7002 24.7791 47.7439C25.0465 48.2787 25.5814 48.6353 26.1799 48.6735C26.7912 48.7245 27.3515 48.4443 27.7081 47.9476C27.9119 47.6547 28.0138 47.3236 28.0138 46.967V30.335C28.0138 29.5199 28.6378 28.8704 29.3892 28.8704C30.1405 28.8704 30.7646 29.5327 30.7646 30.335V44.8657C30.7646 45.4898 31.274 45.9992 31.898 45.9992C32.522 45.9992 33.0314 45.4898 33.0314 44.8657V42.5607C33.0314 41.7456 33.6554 41.0961 34.4068 41.0961C35.1582 41.0961 35.7822 41.7584 35.7822 42.5607V44.8657C35.7822 45.4898 36.2916 45.9992 36.9156 45.9992C37.5396 45.9992 38.049 45.4898 38.049 44.8657V42.5607C38.049 41.7456 38.6731 41.0961 39.4244 41.0961C40.1758 41.0961 40.7998 41.7584 40.7998 42.5607V44.8657C40.7998 45.4898 41.3092 45.9992 41.9332 45.9992C42.5573 45.9992 43.0667 45.4898 43.0667 44.8657V43.605C43.0667 42.7899 43.6907 42.1404 44.4421 42.1404C45.1934 42.1404 45.8174 42.8027 45.8174 43.605V56.3019L45.8429 56.2764Z" fill="white"/></g><defs><clipPath id="clip0_208_4168"><rect width="47.2218" height="65" fill="white" transform="translate(0.875)"/></clipPath></defs></svg>'
    },
    {
        number: 2,
        title: 'We Collect',
        line1: 'Collection of your',
        line2: 'clothes',
        svg: '<svg width="45" height="40" viewBox="0 0 61 72" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_208_4194)" filter="url(#filter0_dd_208_4194)"><path d="M17.51 63.8163C16.9233 63.8163 16.4513 63.3444 16.4513 62.7576V34.8877L15.4182 36.1122C15.2141 36.3546 14.9207 36.4949 14.6018 36.4949C14.3723 36.4949 14.1554 36.4184 13.9768 36.2908L7.42072 31.4056C7.19113 31.2398 7.03807 30.9719 6.9998 30.6913C6.96154 30.4107 7.03807 30.1173 7.22939 29.9005L12.7651 23.0255C12.9054 22.8214 16.4258 17.8214 23.7472 17.8214C24.1299 17.8214 24.487 18.0255 24.6656 18.3571C24.7421 18.4847 26.6427 21.699 30.2651 21.699C33.8876 21.699 35.8518 18.3826 35.8646 18.3571C36.0559 18.0255 36.4131 17.8214 36.783 17.8214C44.1171 17.8214 47.6631 22.8724 47.8161 23.0893L53.3136 29.9005C53.4921 30.1301 53.5814 30.4107 53.5432 30.7041C53.5049 30.9847 53.3518 31.2525 53.1222 31.4184L46.5661 36.2908C46.3748 36.4311 46.158 36.4949 45.9284 36.4949C45.6095 36.4949 45.3161 36.3546 45.112 36.1122L44.0789 34.8877V46.8903L41.8467 47.7449L41.9615 31.9796C41.9615 31.5331 42.2421 31.1377 42.6631 30.9847C42.7779 30.9464 42.8927 30.9209 43.0202 30.9209C43.3391 30.9209 43.6325 31.0612 43.8238 31.3036L46.0177 33.9184L50.8646 30.4362L46.1069 24.352C45.8008 23.9184 43.0075 20.2066 37.3952 19.9515C35.4437 22.477 32.9819 23.8163 30.2523 23.8163C26.4258 23.8163 24.0916 21.227 23.1988 20.0025C17.4845 20.2194 14.7294 23.8801 14.436 24.301L9.6146 30.2831L14.334 33.9311L16.6682 31.3036C16.8595 31.074 17.1656 30.9337 17.4717 30.9337C17.5993 30.9337 17.7141 30.9592 17.8289 30.9974C18.2498 31.1505 18.5304 31.5459 18.5304 31.9923V61.5969L41.834 61.7117L41.9488 49.301L44.1809 50.449L44.0661 62.7831C44.0661 63.3699 43.5942 63.8418 43.0075 63.8418H17.51V63.8163Z" fill="white"/><path d="M33.0595 13.4082V12.3495C33.0595 9.96429 31.1207 8.01275 28.7227 8.01275H27.6641V5.89541H28.7227C31.1079 5.89541 33.0595 3.95663 33.0595 1.55867V0.5H35.1768V1.55867C35.1768 3.94388 37.1283 5.89541 39.5136 5.89541H40.5722V8.01275H39.5136C37.1283 8.01275 35.1768 9.95153 35.1768 12.3495V13.4082H33.0595ZM32.3579 6.89031C33.1232 7.56633 33.6717 8.21684 34.0416 8.89286C34.5136 8.21684 35.2278 7.45153 35.9421 7.01786C35.2151 6.48214 34.5646 5.79337 34.1054 5.09184C33.6462 5.79337 33.0467 6.40561 32.3579 6.87755V6.89031Z" fill="white"/><path d="M46.2981 58.2169V57.9618C46.2981 53.3572 42.5609 49.6199 37.9563 49.6199H37.7012V47.5026H37.9563C42.5609 47.5026 46.2981 43.7653 46.2981 39.1607V38.9056H48.4155V39.1607C48.4155 43.7526 52.1527 47.5026 56.7573 47.5026H57.0124V49.6199H56.7573C52.1655 49.6199 48.4155 53.3572 48.4155 57.9618V58.2169H46.2981ZM42.5354 48.5613C44.6272 49.5817 46.3236 51.2781 47.344 53.3699C48.3772 51.2781 50.0609 49.5817 52.1655 48.5613C50.0736 47.5408 48.3772 45.8444 47.344 43.7398C46.3236 45.8317 44.6272 47.5281 42.5354 48.5613Z" fill="white"/><path d="M11.0536 19.7245V19.4694C11.0536 15.7194 8.0051 12.6709 4.2551 12.6709H4V10.5536H4.2551C8.0051 10.5536 11.0536 7.5051 11.0536 3.7551V3.5H13.1709V3.7551C13.1709 7.5051 16.2194 10.5536 19.9694 10.5536H20.2245V12.6709H19.9694C16.2194 12.6709 13.1709 15.7194 13.1709 19.4694V19.7245H11.0536ZM8.47704 11.6122C10.0077 12.4413 11.2959 13.7168 12.125 15.2602C12.9541 13.7296 14.2296 12.4413 15.773 11.6122C14.2423 10.7832 12.9541 9.50765 12.125 7.96428C11.2959 9.4949 10.0204 10.7832 8.47704 11.6122Z" fill="white"/></g><defs><filter id="filter0_dd_208_4194" x="0" y="0.5" width="61" height="71" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_208_4194"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="effect1_dropShadow_208_4194" result="effect2_dropShadow_208_4194"/><feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_208_4194" result="shape"/></filter><clipPath id="clip0_208_4194"><rect width="53" height="63" fill="white" transform="translate(4 0.5)"/></clipPath></defs></svg>'
    },
    {
        number: 3,
        title: 'We clean',
        line1: 'Professional Dry',
        line2: 'Cleaning',
        svg: '<svg width="55" height="40" viewBox="0 0 72 50" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_208_4182)"><path d="M71.3753 28.58L66.3953 17.73C65.9253 16.74 64.9253 16.09 63.8353 16.09H51.8153V12.4C51.8153 10.58 50.3353 9.10004 48.5153 9.10004H44.3753V11.1H48.5153C49.2353 11.1 49.8153 11.68 49.8153 12.4V41.47H34.6253C33.8253 38.86 31.3953 36.95 28.5153 36.95C25.6353 36.95 23.2053 38.86 22.4053 41.47H19.9953C19.2753 41.47 18.6953 40.89 18.6953 40.17V29.24H16.6953V40.17C16.6953 41.99 18.1753 43.47 19.9953 43.47H22.1353C22.2053 46.93 25.0353 49.72 28.5153 49.72C31.9953 49.72 34.8253 46.93 34.8953 43.47H54.2353C54.3053 46.93 57.1353 49.72 60.6153 49.72C64.0953 49.72 66.9253 46.93 66.9953 43.47H68.9353C70.4853 43.47 71.7453 42.21 71.7453 40.66V30.27C71.7453 29.7 71.6153 29.11 71.3753 28.57V28.58ZM28.5253 47.73C26.1053 47.73 24.1353 45.76 24.1353 43.34C24.1353 40.92 26.1053 38.95 28.5253 38.95C30.9453 38.95 32.9153 40.92 32.9153 43.34C32.9153 45.76 30.9453 47.73 28.5253 47.73ZM69.2753 28.79H62.2453C60.5753 28.79 59.2253 27.44 59.2253 25.77C59.2253 24.1 60.5753 22.75 62.2453 22.75H66.4953L69.2653 28.79H69.2753ZM60.6153 47.73C58.1953 47.73 56.2253 45.76 56.2253 43.34C56.2253 40.92 58.1953 38.95 60.6153 38.95C63.0353 38.95 65.0053 40.92 65.0053 43.34C65.0053 45.76 63.0353 47.73 60.6153 47.73ZM68.9353 41.48H66.7253C65.9253 38.87 63.4953 36.96 60.6153 36.96C57.7353 36.96 55.3053 38.87 54.5053 41.48H51.8153V18.1H63.8353C64.1453 18.1 64.4453 18.29 64.5753 18.58L65.5753 20.75H62.2453C59.4753 20.75 57.2253 23 57.2253 25.77C57.2253 28.54 59.4753 30.79 62.2453 30.79H69.7453V40.67C69.7453 41.12 69.3853 41.48 68.9353 41.48Z" fill="white"/><path d="M6.96535 9.19H2.23535V11.19H6.96535V9.19Z" fill="white"/><path d="M9.5852 25.67H16.4752C17.1652 26.22 18.0352 26.56 18.9852 26.56H38.1252C40.3652 26.56 42.1952 24.73 42.1952 22.49V4.34002C42.1952 2.10002 40.3652 0.27002 38.1252 0.27002H18.9852C16.7452 0.27002 14.9152 2.10002 14.9152 4.34002V9.19002H9.3052V11.19H14.9152V14.03H7.5752V16.03H14.9152V18.85H11.1652V20.85H14.9152V22.49C14.9152 22.9 14.9952 23.3 15.1152 23.67H9.5852V25.67ZM32.4652 2.27002V9.06002L28.5452 6.32002L24.6252 9.06002V2.27002H32.4652ZM16.9252 4.34002C16.9252 3.20002 17.8552 2.27002 18.9952 2.27002H22.6352V12.91L28.5552 8.77002L34.4752 12.91V2.27002H38.1352C39.2752 2.27002 40.2052 3.20002 40.2052 4.34002V22.49C40.2052 23.63 39.2752 24.56 38.1352 24.56H18.9952C17.8552 24.56 16.9252 23.63 16.9252 22.49V4.34002Z" fill="white"/><path d="M7.19516 23.67H3.53516V25.67H7.19516V23.67Z" fill="white"/><path d="M8.81488 18.85H0.254883V20.85H8.81488V18.85Z" fill="white"/><path d="M36.3353 19.62H29.4453V21.62H36.3353V19.62Z" fill="white"/></g><defs><clipPath id="clip0_208_4182"><rect width="71.49" height="49.46" fill="white" transform="translate(0.254883 0.27002)"/></clipPath></defs></svg>'
    },
    {
        number: 4,
        title: 'We Return',
        line1: 'Delivery of your',
        line2: 'clean clothes',
        svg: '<svg width="55" height="40" viewBox="0 0 73 50" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_208_4205)"><path d="M71.9954 28.76L67.0154 17.91C66.5554 16.92 65.5454 16.27 64.4554 16.27H52.4354V12.58C52.4354 10.76 50.9554 9.28003 49.1354 9.28003H44.9954V11.28H49.1354C49.8554 11.28 50.4354 11.86 50.4354 12.58V41.65H35.2454C34.4454 39.04 32.0154 37.13 29.1354 37.13C26.2554 37.13 23.8254 39.04 23.0254 41.65H20.6154C19.8954 41.65 19.3154 41.07 19.3154 40.35V29.42H17.3154V40.35C17.3154 42.17 18.7954 43.65 20.6154 43.65H22.7554C22.8254 47.11 25.6554 49.9 29.1354 49.9C32.6154 49.9 35.4454 47.11 35.5154 43.65H54.8554C54.9254 47.11 57.7554 49.9 61.2354 49.9C64.7154 49.9 67.5454 47.11 67.6154 43.65H69.5554C71.1054 43.65 72.3654 42.39 72.3654 40.84V30.45C72.3654 29.88 72.2354 29.29 71.9954 28.75V28.76ZM29.1454 47.9C26.7254 47.9 24.7554 45.93 24.7554 43.51C24.7554 41.09 26.7254 39.12 29.1454 39.12C31.5654 39.12 33.5354 41.09 33.5354 43.51C33.5354 45.93 31.5654 47.9 29.1454 47.9ZM67.1154 22.92L69.8854 28.96H62.8554C61.1854 28.96 59.8354 27.61 59.8354 25.94C59.8354 24.27 61.1854 22.92 62.8554 22.92H67.1054H67.1154ZM61.2354 47.9C58.8154 47.9 56.8454 45.93 56.8454 43.51C56.8454 41.09 58.8154 39.12 61.2354 39.12C63.6554 39.12 65.6254 41.09 65.6254 43.51C65.6254 45.93 63.6554 47.9 61.2354 47.9ZM70.3654 40.84C70.3654 41.29 70.0054 41.65 69.5554 41.65H67.3454C66.5454 39.04 64.1154 37.13 61.2354 37.13C58.3554 37.13 55.9254 39.04 55.1254 41.65H52.4354V18.27H64.4554C64.7654 18.27 65.0654 18.46 65.1954 18.75L66.1954 20.92H62.8654C60.0954 20.92 57.8454 23.17 57.8454 25.94C57.8454 28.71 60.0954 30.96 62.8654 30.96H70.3654V40.84Z" fill="white"/><path d="M7.59547 9.35999H2.85547V11.36H7.59547V9.35999Z" fill="white"/><path d="M11.5252 23.84H7.86523V25.84H11.5252V23.84Z" fill="white"/><path d="M9.435 19.02H0.875V21.02H9.435V19.02Z" fill="white"/><path d="M39.2351 28.25C40.5151 28.25 41.5451 27.21 41.5451 25.94V14.13H39.5451V25.94C39.5451 26.11 39.4051 26.25 39.2351 26.25H31.7051V12.5H41.2051C42.1151 12.5 42.8651 11.76 42.8651 10.84V8.87C42.8651 7.6 41.8251 6.56 40.5551 6.56H36.6551C36.7551 6.34 36.8451 6.1 36.8951 5.86C37.0651 5.01 36.8951 4.14 36.4051 3.41C35.7751 2.47 34.7151 1.93 33.5851 1.97C33.0751 1.99 32.5851 2.12 32.1351 2.36C31.6151 0.98 30.3051 0 28.7451 0C27.1851 0 25.8651 0.99 25.3551 2.38C24.9051 2.13 24.4051 1.99 23.8851 1.97C22.7551 1.95 21.6951 2.48 21.0651 3.42C20.5751 4.14 20.4051 5.01 20.5751 5.86C20.6251 6.11 20.7051 6.34 20.8151 6.56H16.9151C15.6351 6.56 14.6051 7.6 14.6051 8.87V9.36H9.92508V11.36H14.6951C14.9151 12.02 15.5251 12.5 16.2651 12.5H25.7651V26.25H18.2351C18.0651 26.25 17.9251 26.11 17.9251 25.94V14.2H8.20508V16.2H15.9251V19.02H11.7951V21.02H15.9251V23.84H13.9251V25.84H15.9251V25.94C15.9251 27.22 16.9651 28.25 18.2351 28.25H39.2351ZM40.5451 8.56C40.7151 8.56 40.8551 8.7 40.8551 8.87V10.5H31.6951V8.56H40.5351H40.5451ZM31.5051 6.24C31.6651 6.03 31.8451 5.75 32.0351 5.46C32.2951 5.06 32.7751 4.32 32.9751 4.17C33.1751 4.04 33.3951 3.97 33.6351 3.96C34.0751 3.95 34.4951 4.16 34.7351 4.52C34.9251 4.8 34.9851 5.13 34.9251 5.45C34.8551 5.78 34.6651 6.06 34.3851 6.24C33.9951 6.5 33.5051 6.55 33.1551 6.55H31.2751C31.3551 6.45 31.4351 6.34 31.5051 6.23V6.24ZM29.7051 26.25H27.7651V8.56H29.7051V26.25ZM28.7451 2C29.6451 2 30.3651 2.73 30.3651 3.63C30.3651 4.72 29.4451 5.74 28.7451 6.32C28.1051 5.79 27.1151 4.78 27.1151 3.63C27.1151 2.73 27.8451 2 28.7351 2H28.7451ZM22.7251 4.53C22.9751 4.17 23.3451 3.95 23.8251 3.97C24.0651 3.97 24.2951 4.05 24.4851 4.18C24.6651 4.31 25.0751 4.93 25.3251 5.29C25.5351 5.61 25.7451 5.92 25.9451 6.16C26.0351 6.3 26.1251 6.43 26.2251 6.56H24.3051C23.9551 6.56 23.4651 6.51 23.0751 6.25C22.7951 6.07 22.6051 5.79 22.5351 5.46C22.4651 5.14 22.5351 4.8 22.7251 4.53ZM16.6051 10.5V8.87C16.6051 8.7 16.7451 8.56 16.9151 8.56H25.7551V10.5H16.5951H16.6051Z" fill="white"/></g><defs><clipPath id="clip0_208_4205"><rect width="71.49" height="49.9" fill="white" transform="translate(0.875)"/></clipPath></defs></svg>'
    }
]);

const reviewWrapper = ref([
    {
        rate: 5,
        text: 'Top service, My clothes was ready very swiftly, highly recommended.',
        author: 'Milad karimi',
        position: 'Legacy Solutions Engineer',
        src: '/img/DryCleaning/rate/milad_karimi_50.png'
    },
    {
        rate: 5,
        text: 'The service provided was of exceptional quality, and the results achieved were highly satisfactory. I am extremely pleased with the outcome and would highly recommend their services to others.',
        author: 'Prince Salon',
        position: 'Legacy Solutions Engineer',
        src: '/img/DryCleaning/rate/prince_salon_50.png'
    },
    {
        rate: 5,
        text: 'Hands down, best dry cleaning company in London! 24 hour service - and impeccable quality of dry cleaning. 10/10. Also, really good value for money.',
        author: 'Hassan Dahag',
        position: 'Legacy Solutions Engineer',
        src: '/img/DryCleaning/rate/hassan_dahamg_50.png'
    }
]);

const faqData = ref([
    {
        question: 'What type of fabrics do you specialize in cleaning?',
        awnser: 'We specialize in cleaning a wide range of fabrics, including delicate materials such as silk, wool, and cashmere, as well as more robust fabrics like cotton and polyester.',
    },
    {
        question: 'Are your cleaning methods environmentally friendly?',
        awnser: 'Yes, we prioritize environmentally friendly cleaning methods and use eco-friendly solvents and detergents whenever possible to minimize our environmental impact.',
    },
    {
        question:
            'How do you ensure the safety of delicate or sensitive fabrics?',
        awnser: 'Our experienced team carefully inspects each garment before cleaning to identify any delicate or sensitive fabrics. We then tailor our cleaning process to suit the specific needs of each fabric, ensuring gentle yet effective cleaning.',
    },
    {
        question: 'What is your turnaround time for dry cleaning services?',
        awnser: 'Our turnaround time for dry cleaning services typically ranges from 1-2 days, depending on the volume and complexity of the order.',
    },
    {
        question: 'Do you offer pickup and delivery options?',
        awnser: 'Yes, we offer convenient pickup and delivery options to make the dry cleaning process as hassle-free as possible for our customers.',
    },
    {
        question:
            'Are there any special treatments available for stains or odors?',
        awnser: ' Yes, we offer specialized stain removal treatments and odor-neutralizing techniques to ensure your garments come back fresh and clean.',
    },
    {
        question:
            'What precautions do you take to prevent damage to clothing during the cleaning process?',
        awnser: 'We take several precautions to prevent damage to clothing, including using gentle cleaning methods, separating garments by color and fabric type, and employing skilled professionals who are trained to handle delicate items with care.',
    },
    {
        question:
            'How do you handle garments with special embellishments or details?',
        awnser: 'Garments with special embellishments or details are handled with extra care. Our team is trained to identify and address any potential risks to these garments during the cleaning process.',
    },
    {
        question: 'Can you provide references or customer testimonials?',
        awnser: 'Yes, we can provide references or customer testimonials upon request to showcase the quality of our services and the satisfaction of our customers.',
    },
    {
        question:
            'What are your pricing options and are there any package deals available?',
        awnser: 'We offer competitive pricing for our dry cleaning services, and we also provide package deals and discounts for regular customers. Please contact us for more information on pricing and package options.',
    },
    {
        question:
            'Do you offer any guarantees or refunds if customers are not satisfied with the results?',
        awnser: 'Yes, we stand behind the quality of our work and offer a satisfaction guarantee. If you are not satisfied with the results of our services, please contact us, and we will do our best to address your concerns.',
    },
    {
        question: 'How do you handle lost or damaged items?',
        awnser: 'While we take every precaution to prevent loss or damage to items, accidents can occasionally occur. In the rare event that an item is lost or damaged during the cleaning process, we will work with you to resolve the issue promptly and fairly.',
    },
    {
        question:
            'Are your cleaning products and methods safe for individuals with allergies or sensitivities?',
        awnser: 'Yes, our cleaning products and methods are safe for individuals with allergies or sensitivities. We use hypoallergenic detergents and solvents to ensure the safety and comfort of all our customers.',
    },
    {
        question:
            'Do you offer any additional services such as alterations or repairs?',
        awnser: ' Yes, we offer additional services such as alterations and repairs to help you maintain and prolong the life of your garments. Please inquire about these services when placing your order.',
    },
    {
        question:
            'Are there any special promotions or discounts available for regular customers?',
        awnser: 'Yes, we offer special promotions and discounts for our regular customers as a token of appreciation for their loyalty. Be sure to sign up for our newsletter or follow us on social media to stay updated on our latest offers.',
    },
]);

const checkModal = (e) => {
    if (!clickbox.value?.contains(e.target)) {
        searchMenuIsShow.value = false;
        focusInput.value = false;
    }
};

onMounted(() => {
    bookNowButtonLink.value = isLondon ? {name: 'dry-cleaning-request', query: { postalCode, address }}: '';
    // window.addEventListener('click', checkModal);
});
</script>



