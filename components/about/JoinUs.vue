<template>
    <div
        class="px-4 laptop:px-16 py-10 laptop:py-20 flex flex-col items-center gap-2 laptop:gap-8"
    >
        <div
            v-text="$t('join us')"
            class="text-t8 font-bold text-[32px] laptop:text-[40px] uppercase"
        />
        <div
            class="text-center text-t7 laptop:text-2xl"
            v-text="
                $t(
                    `Join LuxMax as we reimagine luxury, champion sustainability, and celebrate the timeless allure of preloved treasures. Welcome to a community that values elegance and quality. Together, let's create a new beginning for luxury`
                )
            "
        />
        <nuxt-link :to="{ name: 'login' }" class="mt-4 laptop:mt-0">
            <BaseButton
                :text="$t('Sign Up')"
                size="l"
                class="w-[200px]"
                buttonId="signup"
            />
        </nuxt-link>
    </div>
</template>
