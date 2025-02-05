<template>
    <div
        class="p-6 flex flex-col gap-4 laptop:gap-10 leading-normal text-start"
        :class="isMain ? 'bg-p2 laptop:flex-row' : 'bg-p1'"
    >
        <div class="flex-grow flex flex-col gap-4">
            <div
                class="flex flex-col gap-4 text-sm laptop:text-base first-letter:capitalize"
                :class="isDisabled ? 'text-t4' : 'text-[#0D0D0D]'"
                v-text="title?.replace(/./, (c) => c.toUpperCase())"
            />
            <div
                class="text-[10px] laptop:text-xs font-light"
                :class="
                    isDisabled
                        ? 'text-t4'
                        : isMain
                        ? 'text-t9'
                        : 'text-[#808080]'
                "
                v-text="desc"
            />
            <div
                class="flex items-center"
                :class="
                    isMain
                        ? 'justify-center laptop:justify-start'
                        : 'justify-between'
                "
            >
                <div
                    v-if="isMain && price"
                    class="bg-p4 text-white px-2 py-1.5 flex gap-2 w-fit text-xs font-medium rounded-[4px]"
                >
                    <div
                        v-text="
                            isPay
                                ? $t('Approximate Cost:', { price: price })
                                : $t('Cost Estimate:', { price: price })
                        "
                        :class="
                            isDisabled
                                ? 'text-t4'
                                : isMain
                                ? 'text-white'
                                : 'text-[#808080]'
                        "
                    />
                    <!-- <IconInfoCircle class="w-4 h-4 fill-p3" /> -->
                </div>
                <template v-else>
                    <div
                        v-if="price"
                        class="text-[10px] laptop:text-xs font-light"
                        :class="
                            isDisabled
                                ? 'text-t4'
                                : isMain
                                ? 'text-t9'
                                : 'text-[#808080]'
                        "
                        v-text="
                            isPay
                                ? $t('Approximate Cost:', { price: price })
                                : $t('Get almost', { price: price })
                        "
                    />
                    <div class="laptop:hidden">
                        <BaseButton
                            buttonId="identify-offer-select"
                            :class="isMain ? 'w-full laptop:w-fit' : ''"
                            :text="
                                payAtFirst && price !== 'in progress'
                                    ? $t('First payment:', {
                                          payAtFirst: payAtFirst,
                                      })
                                    : buttonText
                            "
                            size="s"
                            endIcon="IconArrowDown"
                            :isDisabled="isDisabled"
                            rotateIcon270
                            :styleType="isMain ? 'fill' : 'text'"
                            @click="$emit('selected')"
                        />
                    </div>
                </template>
            </div>
        </div>
        <div
            :class="isMain ? '' : 'hidden w-full '"
            class="laptop:flex justify-end items-center laptop:w-fit"
        >
            <div
                v-if="isComingSoon"
                class="flex justify-center laptop:justify-start"
            >
                <BaseBadge :text="$t('Coming Soon')" color="info" size="l" />
            </div>
            <BaseButton
                buttonId="identify-offer-select"
                v-else-if="!isDisabled"
                :class="isMain ? 'w-full laptop:w-fit' : ''"
                :text="
                    payAtFirst && price !== 'in progress'
                        ? $t('First payment:', { payAtFirst: payAtFirst })
                        : buttonText
                "
                size="s"
                endIcon="IconArrowDown"
                rotateIcon270
                :isDisabled="isDisabled"
                :styleType="isMain ? 'fill' : 'text'"
                @click="$emit('selected')"
            />
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    desc: String,
    price: Object,
    isPay: Boolean,
    isComingSoon: Boolean,
    isMain: Boolean,
    buttonText: String,
    isDisabled: Boolean,
    payAtFirst: String || null,
});
</script>
