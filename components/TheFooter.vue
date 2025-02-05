<template>
    <div class="bg-white px-10 laptop:px-[240px] mobile-sss:pt-0 tablet: pt-20 laptop:py-20 pb-16"> 
        <!-- <div class="text-xl text-t7 border-b border-t1 mb-6 pb-4">
            Dry Cleaning in London
        </div>
        <div class="text-left text-t7 leading-7 mb-10 laptop:mb-24">
            Booking your dry cleaning online with us is incredibly simple. Download our app or visit our website to book a suitable time slot for your services.
            Choose the specific services you require, confirm your order, and leave the rest to us. Our team will collect your items, bring them to our facility, and once they're washed, cleaned, and ironed, they will be delivered back to you within PI hours. With LovelLaundry on your side, you can rest assured that your clothes
            are handled by industry professionals
        </div> -->

        <div class="mb-12" style="width: 100vw; margin-left: calc(50% - 50vw); border: none; height: 1px; background-color: #ccc;">
            <hr class="text-t1">
        </div>

        <div class="uppercase text-t6 text-xl mb-10 tracking-wider font-light flex justify-center gap-5">
            <IconLogo
                class="stroke-t6 w-[18px] h-[18px]"
            />
            <div v-text="'LUXMAX'" />
        </div>

        <div class="flex flex-col laptop:flex-row gap-10 laptop:gap-0 laptop:justify-between mb-24">
            <div class="flex flex-col items-center laptop:items-start">
                <div class="text-t10 font-semibold text-lg mb-4 laptop:mb-10" v-text="$t('Services')"/>
                <div class="flex flex-col items-center laptop:items-start gap-2 laptop:gap-4 text-t6">
                    <nuxt-link class="disable" :to="null" title="Coming Soon! Stay tuned for exciting updates on this feature." >
                        Repair (Coming soon)
                    </nuxt-link>
                    <nuxt-link :to="null" class="disable" title="Coming Soon! Stay tuned for exciting updates on this feature.">
                        Repair and Sell (Coming soon)
                    </nuxt-link>
                    <nuxt-link :to="null" class="disable" title="Coming Soon! Stay tuned for exciting updates on this feature.">
                        Sell to Luxmax (Coming soon)
                    </nuxt-link>
                    <nuxt-link :to="null" class="disable" title="Coming Soon! Stay tuned for exciting updates on this feature.">
                        Sell in Marketplace (Coming soon)
                    </nuxt-link>
                </div>
            </div>
            <div class="flex flex-col items-center laptop:items-start">
                <div class="text-t10 font-semibold text-lg mb-4 laptop:mb-10" v-text="$t('Support')"/>
                <div class="flex flex-col items-center laptop:items-start gap-2 laptop:gap-4 text-t6">
                    <!-- <nuxt-link>How it works</nuxt-link> -->
                    <nuxt-link :to="{ name: 'shoe-guide' }">Size Guideline</nuxt-link>
                    <!-- <nuxt-link>How took a photo</nuxt-link> -->
                    <nuxt-link :to="{ name: 'faq' }">FAQ</nuxt-link>
                </div>
            </div>
            <div class="flex flex-col items-center laptop:items-start">
                <div class="text-t10 font-semibold text-lg mb-4 laptop:mb-10" v-text="$t('Company')"/>
                <div class="flex flex-col items-center laptop:items-start gap-2 laptop:gap-4 text-t6">
                    <nuxt-link :to="{ name: 'about' }">About</nuxt-link>
                    <nuxt-link :to="{ name: 'contact' }">Contact</nuxt-link>
                    <nuxt-link :to="{ name: 'privacy-policy' }">Privacy & Policy</nuxt-link>
                    <nuxt-link :to="{ name: 'terms-of-use' }">Terms of Use</nuxt-link>
                </div>
            </div>
        </div>
        <div class="flex flex-col laptop:flex-row justify-between items-center gap-8">
            <div class="text-t7 text-lg" v-text="$t('© 2024 |  All rights reserved.')"></div>
            <div class="flex w-full laptop:w-fit items-center justify-between laptop:justify-normal laptop:gap-10">
                <NuxtLink to="https://www.facebook.com/" target="_blank" aria-label="LuxMax Facebook">
                    <IconFacebook class="fill-t7 w-5 h-5" />
                </NuxtLink>
                <NuxtLink to="https://www.instagram.com/" target="_blank" aria-label="LuxMax Instagram">
                    <IconInstagram class="fill-t7 w-5 h-5" />
                </NuxtLink>
                <NuxtLink to="https://www.linkedin.com/company/luxmaxltd/" target="_blank" aria-label="LuxMax Linkedin">
                    <IconLinkedin class="fill-t7 w-5 h-5" />
                </NuxtLink>
                <NuxtLink to="https://www.telegram.com/" target="_blank" aria-label="LuxMax Twitter">
                    <IconTelegram class="fill-t7 w-5 h-5" />
                </NuxtLink>
                <NuxtLink to="https://www.youtube.com/" target="_blank" aria-label="LuxMax Twitter">
                    <IconYoutube class="fill-t7 w-5 h-5" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<style>
.disable {
    color: gray;
}
</style>