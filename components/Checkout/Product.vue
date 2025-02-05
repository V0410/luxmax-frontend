<template>
    <div
        class="p-6 laptop:py-6 w-full flex gap-6 border-t border-p1 flex-col justify-between laptop:flex-row items-center text-center laptop:text-start"
        :class="isSideView ? ' shadow-s-3 laptop:shadow-transparent' : ''"
    >
        <div
            class="flex w-full gap-4 flex-col laptop:flex-row items-center cursor-pointer laptop:items-start"
            @click="
                noClick || isDisabled
                    ? ''
                    : $router.push({
                          name: 'single-product',
                          params: { id: data.product.id },
                      })
            "
        >
            <div>
                <NuxtImg
                    alt=""
                    v-if="data?.product?.images[0]?.file?.url"
                    :class="[isSideView ? 'w-[96px]' : 'w-[120px]']"
                    :src="
                        config.public.BASE_URL +
                        data?.product?.images[0]?.file?.url
                    "
                />
            </div>
            <div
                class="flex flex-col gap-4 justify-between w-full laptop:flex-grow"
            >
                <div
                    class="flex flex-col"
                    :class="isSideView ? 'gap-2' : 'gap-4 laptop:gap-1.5'"
                >
                    <div
                        class="font-medium"
                        :class="[
                            isSideView ? ' text-sm' : '',
                            isDisabled ? 'text-t3' : 'text-t10',
                        ]"
                    >
                        {{ data?.product?.name }}
                    </div>
                    <div
                        class="flex gap-4 leading-normal"
                        :class="[
                            isSideView
                                ? ' text-sm justify-between'
                                : 'justify-center laptop:justify-start',
                            ,
                            isDisabled ? 'text-t3' : 'text-t8',
                        ]"
                    >
                        <div v-text="data?.product?.name" />
                        <!-- <div class="hidden laptop:block">
                            <BaseBadge v-if="isSideView" :color="data.condition.color" :text="data.condition.text" size="s" />
                            <BaseBadge v-else :color="data.condition.color" :text="data.condition.text" size="l" />
                        </div> -->
                    </div>
                    <div
                        class="flex justify-between"
                        :class="[
                            isSideView ? ' text-xs' : 'text-sm',
                            isDisabled ? 'text-t3' : 'text-t5',
                        ]"
                    >
                        <div v-text="data?.product?.brand?.name" />
                        <!-- <div class="laptop:hidden">
                            <BaseBadge v-if="isSideView" :color="data.condition.color" :text="data.condition.text" size="s" />
                            <BaseBadge v-else :color="data.condition.color" :text="data.condition.text" size="l" />
                        </div> -->
                    </div>
                </div>
                <div
                    class="flex flex-wrap"
                    :class="[
                        isSideView
                            ? 'text-xs line-clamp-1'
                            : 'text-sm line-clamp-2',
                        isDisabled ? 'text-t3' : 'text-[#8B8B8B]',
                    ]"
                >
                    <template
                        v-for="(feature, i) in data?.features"
                        :key="feature.text"
                    >
                        <div class="flex items-center gap-1">
                            <div
                                v-if="feature.color"
                                class="rounded-full w-3 h-3"
                                :style="`background-color: ${feature.color};`"
                            />
                            <div>{{ feature.text }}</div>
                        </div>
                        <div
                            v-if="i < data?.features?.length - 1"
                            class="border-r border-t1 mx-2"
                        />
                    </template>
                </div>
                <div v-if="isSideView" class="flex justify-start">
                    <div
                        class="text-t8 font-medium laptop:font-bold laptop:text-lg"
                        v-text="
                            '£' + (data?.product?.price?.toLocaleString() || 0)
                        "
                    />
                </div>
            </div>
        </div>

        <div class="flex justify-between w-full laptop:w-fit laptop:gap-6">
            <div
                v-if="!isSideView"
                class="flex justify-center"
                :class="isDisabled ? 'text-t3' : 'text-t8'"
            >
                <div class="flex flex-col gap-1 items-start">
                    <div
                        v-if="
                            data?.product?.discountedPrice &&
                            data?.product?.discountedPrice >
                                data?.product?.price
                        "
                        class="text-t2 line-through text-sm laptop:text-base"
                        v-text="
                            '£' +
                            (data?.product?.discountedPrice?.toLocaleString() ||
                                0)
                        "
                    />
                    <div class="flex gap-4 items-center">
                        <div
                            class="font-medium laptop:font-bold laptop:text-lg"
                            :class="isDisabled ? 'text-t3' : 'text-t8'"
                            v-text="
                                '£' +
                                (data?.product?.price?.toLocaleString() || 0)
                            "
                        />
                        <!-- <div
              v-if="
                data.priceBeforeDiscount &&
                data.priceBeforeDiscount > data.price
              "
              class="text-success font-medium whitespace-nowrap"
              v-text="data.discountPercentage + '%' + ' ' + $t('off')"
            /> -->
                    </div>
                </div>
            </div>
            <div v-if="buttons" class="flex justify-center gap-4 items-center">
                <template v-for="button in buttons" :key="button.id">
                    <template v-if="button.icon === 'IconBookmark'">
                        <template v-if="!isDisabled">
                            <IconViewer
                                v-if="isFavorite"
                                name="IconBookmarked"
                                @click="
                                    $emit(button.emit, data?.product?.id, true)
                                "
                                class="fill-p7 cursor-pointer h-6 w-6"
                            />
                            <IconViewer
                                v-else
                                name="IconBookmark"
                                @click="
                                    $emit(button.emit, data?.product?.id, false)
                                "
                                class="fill-p7 cursor-pointer h-6 w-6"
                            />
                        </template>
                    </template>
                    <IconViewer
                        v-else
                        :name="button.icon"
                        @click="$emit(button.emit, data?.product?.id)"
                        class="fill-p9 cursor-pointer h-6 w-6"
                    />
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
    title: String,
    isSideView: Boolean,
    buttons: Array,
    noClick: Boolean,
    justReadyForSale: Boolean,
});
const config = useRuntimeConfig();
const favoriteState = useState("favoriteState");
const isFavorite = computed(
    () =>
        favoriteState.value &&
        favoriteState.value.favorite_list &&
        Array.isArray(favoriteState.value?.favorite_list) &&
        !!favoriteState.value.favorite_list.find(
            (item) => item.item_id === props.data?.product?.id
        )
);
const isDisabled = computed(
    () =>
        props.justReadyForSale &&
        props.data?.product?.state !== "ready for sell"
);
</script>
