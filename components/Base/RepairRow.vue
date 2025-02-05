<template>
    <div class="rounded-lg relative border border-p1 overflow-hidden">
        <div v-if="data?.plan" class="flex flex-row absolute top-0 end-0">
            <BaseBadge
                :color="data?.plan"
                :text="data?.plan?.replaceAll('_', ' ').toLowerCase()"
                :size="'repair'"
            />
        </div>
        <div class="flex flex-col p-4 pt-8">
            <div v-if="data?.step" class="flex items-center gap-4">
                <div
                    class="flex flex-col laptop:flex-row laptop:items-center gap-2 laptop:gap-4"
                >
                    <div class="flex items-center gap-2">
                        <IconViewer
                            :name="setStep?.icon"
                            class="w-5 h-5"
                            :class="setStep?.isDisabled ? 'fill-t3' : 'fill-p7'"
                        />
                        <div
                            class="text-sm font-semibold first-letter:capitalize"
                            :class="setStep?.isDisabled ? 'text-t3' : 'text-t8'"
                            v-text="setStep?.title"
                        />
                    </div>
                    <!-- <template v-if="data?.step">
                        <div class="w-1.5 h-1.5 rounded-full hidden laptop:block" :class="data?.isDisabled ? 'bg-t3' : 'bg-[#D9D9D9]'" />
                        <div class="text-t4 text-sm first-letter:capitalize" :class="data?.isDisabled ? 'text-t3' : 'text-t4'" v-text="data?.step" />
                    </template> -->
                </div>
                <div v-if="setStep?.next" class="flex items-center gap-4">
                    <span class="w-[6px] h-[6px] rounded-full bg-[#D9D9D9]" />
                    <div v-text="setStep?.next" class="text-t4 text-sm" />
                </div>
            </div>
            <div
                class="p-2 mt-4 laptop:mt-0 laptop:py-2 border border-p1 laptop:border-none flex flex-col laptop:flex-row items-center justify-between laptop:justify-start gap-4 laptop:gap-28"
                :class="data?.extraInfo ? 'border-b border-p1' : ''"
            >
                <div
                    class="flex items-center gap-4 min-w-[100%] laptop:min-w-[400px]"
                >
                    <NuxtImg
                        alt=""
                        v-if="data?.images[0]?.file?.url"
                        :class="setStep?.isDisabled ? 'grayscale' : ''"
                        class="h-[100px] w-[100px] object-contain"
                        :src="
                            config.public.BASE_URL + data?.images[0]?.file?.url
                        "
                        format="webp"
                        quality="100"
                    />
                    <div class="flex flex-col gap-2 justify-center">
                        <div
                            class="font-medium text-xs"
                            :class="setStep?.isDisabled ? 'text-t3' : 'text-t6'"
                            v-text="data?.brand?.name || ''"
                        />
                        <div
                            :class="setStep?.isDisabled ? 'text-t3' : 'text-t9'"
                            class="font-medium text-xs"
                            v-text="data?.name || ''"
                        />
                        <div
                            class="text-[10px]"
                            :class="setStep?.isDisabled ? 'text-t3' : 'text-t4'"
                            v-text="
                                [
                                    data?.size,
                                    data?.exteriorColor,
                                    data?.exteriorMaterial,
                                ]?.join(' - ')
                            "
                        />
                    </div>
                </div>
                <div
                    class="flex flex-col gap-4 w-full laptop:w-fit laptop:flex-row laptop:justify-between laptop:me-28 laptop:gap-28 flex-grow"
                >
                    <div
                        v-if="data?.price || data?.price == 0"
                        :class="setStep?.isDisabled ? 'text-t3' : 'text-t7'"
                        class="flex flex-col items-center justify-center whitespace-nowrap"
                        v-text="'£ ' + data?.price.toLocaleString()"
                    />
                    <div
                        v-if="
                            data?.buttons &&
                            Array.isArray(data?.buttons) &&
                            data?.buttons.length > 0
                        "
                        class="flex flex-row gap-0 items-center"
                    >
                        <BaseButton
                            v-for="button in data?.buttons"
                            :key="button.id"
                            :startIcon="button?.startIcon"
                            :isDisabled="button?.isDisabled"
                            :styleType="button?.type"
                            :size="button?.size"
                            :text="button?.text"
                            @click="
                                $emit('buttonClick', {
                                    emit: button.emit,
                                    id: data?.itemData?.id,
                                })
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
        <div
            :class="message?.color"
            class="py-4 px-6 text-sm flex items-center justify-between gap-10"
        >
            <div v-text="message?.text" />
            <BaseButton
                v-if="message?.btn"
                :styleType="message?.btn?.type"
                :text="message?.btn?.text"
                size="s"
                @click="
                    message?.btn?.link
                        ? $router.push(message?.btn?.link)
                        : message?.btn?.action()
                "
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
    idDisabled: Boolean,
});
const router = useRouter();
const config = useRuntimeConfig();

const message = computed(() => {
    if (props?.data?.plan === 'INSTANT_SELL' && props?.data?.step === 'DONE') {
        return {
            text: `Sold for £${props?.data?.price} | Please navigate to the 'Bank Account' tab to facilitate the funds transfer.`,
            color: 'text-gold bg-[#F7F4EB]',
        };
    } else if (props?.data?.plan === 'REPAIR_AND_SELL_IN_OUR_COMMUNITY') {
        if (props?.data?.step === 'REPAIR_REVIEW') {
            return {
                text: 'The list of required repairs for your item will be ready, In the next 24 hours',
                color: 'bg-[#F0F7FE] text-info',
            };
        } else if (props?.data?.step === 'REPAIR_PAYMENT') {
            return {
                text: `Remaining cost of repairs: £${props?.data?.price}`,
                color: 'bg-p1 text-p8',
                btn: {
                    text: 'Checkout & Repair',
                    action: async () => {
                        const { createOrder } = useCheckout();
                        const { data } = await createOrder({
                            body: { repairProductId: props?.data?.id },
                        });
                        router.push(`/order/${data.value.id}`);
                    },
                },
            };
        } else if (props?.data?.step === 'REPAIRING') {
            return {
                text: `Your item will be ready in the next 3 to 5 days`,
                color: 'bg-[#65ACF01A] text-info',
            };
        } else if (props?.data?.step === 'LUXMAX_DELIVERY') {
            return {
                color: 'bg-[#65ACF01A] text-info',
                text: 'After the approval of the buyer, we will inform you and you can withdraw the profit.',
            };
        } else if (props?.data?.step === 'DONE') {
            return {
                text: `Sold for £${props?.data?.price} | please navigate to the "Bank Account" tab to facilitate the funds transfer.`,
                color: 'bg-p1 text-p8',
            };
        }
    } else if (props?.data?.plan === 'REPAIR_AND_GET_BACK') {
        if (props?.data?.step === 'REPAIR_REVIEW') {
            return {
                text: 'The list of required repairs for your item will be ready, In the next 24 hours',
                color: 'bg-[#F0F7FE] text-info',
            };
        } else if (props?.data?.step === 'REPAIR_PAYMENT') {
            return {
                text: `Remaining cost of repairs: £${props?.data?.price}`,
                color: 'bg-p1 text-p8',
                btn: {
                    text: 'Checkout & Repair',
                    action: async () => {
                        const { createOrder } = useCheckout();
                        const { data } = await createOrder({
                            body: { repairProductId: props?.data?.id },
                        });
                        router.push(`/order/${data.value.id}`);
                    },
                },
            };
        } else if (props?.data?.step === 'REPAIRING') {
            return {
                text: `Your item will be ready in the next 3 to 5 days`,
                color: 'bg-[#65ACF01A] text-info',
            };
        }
    } else if (props?.data?.plan === 'SELL_WITHOUT_REPAIR') {
        if (props?.data?.step === 'DELIVERY') {
            return {
                color: 'bg-p1',
                btn: {
                    text: 'Send to buyer',
                    link: `/address/${props?.data?.id}`,
                },
            };
        } else if (props?.data?.step === 'DONE') {
            return {
                text: `Sold for £${props?.data?.price} | please navigate to the "Bank Account" tab to facilitate the funds transfer.`,
                color: 'bg-p1 text-p8',
            };
        }
    }
});

const setStep = computed(() => {
    if (props?.data?.plan === 'INSTANT_SELL') {
        if (props?.data?.step === 'INSTANCE_SELL_REVIEW') {
            return {
                title: 'Awaiting Admin Approval',
                icon: 'IconClockCountdown',
            };
        } else if (props?.data?.step === 'DONE') {
            return {
                title: 'Sold to LuxMax',
                icon: 'IconMoney',
            };
        } else {
            return {
                title: props?.data?.step.replaceAll('_', ' ').toLowerCase(),
            };
        }
    } else if (props?.data?.plan === 'REPAIR_AND_SELL_IN_OUR_COMMUNITY') {
        if (props?.data?.step === 'DELIVERY') {
            return {
                title: 'Your item is on the way',
                icon: 'IconTruck',
                next: 'Await status update',
            };
        } else if (props?.data?.step === 'REPAIR_REVIEW') {
            return {
                title: 'Your item received',
                icon: 'IconPackage',
                next: 'Next step: Expert review report',
            };
        } else if (props?.data?.step === 'REPAIR_PAYMENT') {
            return {
                title: 'Expert review is ready',
                icon: 'IconScroll',
                next: 'Next step: Repair',
            };
        } else if (props?.data?.step === 'REPAIRING') {
            return {
                title: 'Item is in the repair process',
                icon: 'IconMajicWand',
                next: 'Next step: Item is ready for use',
            };
        } else if (props?.data?.step === 'SELL') {
            return {
                title: 'Your item is on the market',
                icon: 'IconStoreFront',
                next: 'After the sale, you can withdraw the profit',
            };
        } else if (props?.data?.step === 'LUXMAX_DELIVERY') {
            return {
                title: 'Your item have a buyer',
                icon: 'IconHandCoins',
                next: 'You can withdraw the profit after buyer approval',
            };
        } else if (props?.data?.step === 'DONE') {
            return {
                title: 'Your item sold',
                icon: 'IconChecks',
                next: 'You can withdraw the profit from this sale',
                isDisabled: true,
            };
        } else {
            return {
                title: props?.data?.step.replaceAll('_', ' ').toLowerCase(),
                next: props?.data?.next.replaceAll('_', ' ').toLowerCase(),
            };
        }
    } else if (props?.data?.plan === 'REPAIR_AND_GET_BACK') {
        if (props?.data?.step === 'DELIVERY') {
            return {
                title: 'Your item is on the way',
                icon: 'IconTruck',
                next: 'Await status update',
            };
        } else if (props?.data?.step === 'REPAIR_REVIEW') {
            return {
                title: 'Your item received',
                icon: 'IconPackage',
                next: 'Next step: Expert review report',
            };
        } else if (props?.data?.step === 'REPAIR_PAYMENT') {
            return {
                title: 'Expert review is ready',
                icon: 'IconScroll',
                next: 'Next step: Repair',
            };
        } else if (props?.data?.step === 'REPAIRING') {
            return {
                title: 'Item is in the repair process',
                icon: 'IconMajicWand',
                next: 'Next step: Item is ready for use',
            };
        } else if (props?.data?.step === 'REPAIR_CONFIRM') {
            return {
                title: 'Your item is Ready for Use',
                icon: 'IconCheckCircle',
                next: 'Next step: Return the item',
            };
        } else if (props?.data?.step === 'LUXMAX_DELIVERY') {
            return {
                title: 'Your item is on its way back',
                icon: 'IconTruck',
                next: 'Your item will be delivered to you within 24 hours',
            };
        } else if (props?.data?.step === 'DONE') {
            return {
                title: 'The item has been repaired',
                icon: 'IconChecks',
                next: 'It was delivered on November 24, 2023',
                isDisabled: true,
            };
        } else {
            return {
                title: props?.data?.step.replaceAll('_', ' ').toLowerCase(),
                next: props?.data?.next.replaceAll('_', ' ').toLowerCase(),
            };
        }
    } else if (props?.data?.plan === 'SELL_WITHOUT_REPAIR') {
        if (props?.data?.step === 'SELL_REVIEW') {
            return {
                title: 'Await admin approval',
                icon: 'IconSpinnerGap',
                next: 'Next step: on the market',
            };
        } else if (props?.data?.step === 'SELL') {
            return {
                title: 'Your item is on the market',
                icon: 'IconStoreFront',
                next: 'After the sale, you can withdraw the profit',
            };
        } else if (props?.data?.step === 'DELIVERY') {
            return {
                title: 'Your item have a buyer',
                icon: 'IconHandCoins',
                next: 'You can withdraw the profit after buyer approval',
            };
        } else if (props?.data?.step === 'DONE') {
            return {
                title: 'Your item sold',
                icon: 'IconChecks',
                next: 'You can withdraw the profit from this sale',
                isDisabled: true,
            };
        } else {
            return {
                title: props?.data?.step.replaceAll('_', ' ').toLowerCase(),
                next: props?.data?.next.replaceAll('_', ' ').toLowerCase(),
            };
        }
    }
});
</script>
