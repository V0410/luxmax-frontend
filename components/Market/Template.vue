<template>
    <div ref="container" class="flex flex-col items-center">
        <div class="gridClass mb-4 laptop:hidden">
            <BaseBreadcrumb
                :dataArray="breadcrumbData"
                class="w-full laptop:max-w-[672px]"
            />
        </div>
        <div class="w-full flex flex-col mb-6 laptop:mb-0 gap-6 laptop:gap-16">
            <div class="gridClass flex flex-col gap-8 laptop:gap-16">
                <div class="justify-between hidden laptop:flex">
                    <div class="flex gap-6 items-center">
                        <div class="flex gap-3">
                            <BaseTag
                                v-for="tag in sortTagsComputed"
                                size="s"
                                :key="tag.id"
                                :text="tag.text"
                                :isSelected="
                                    ($router.currentRoute.value.query.sort ||
                                        'Newest') === tag.value
                                "
                                @click="
                                    $router.push({
                                        query: {
                                            ...$router.currentRoute.value.query,
                                            sort: tag.value,
                                        },
                                    })
                                "
                            />
                        </div>
                    </div>
                    <!-- <div
            class="text-[#5D5E5E]"
            v-text="`${pageData.start}-${pageData.end}, of ${pageData.total}`"
          /> -->
                </div>
                <div class="flex justify-between items-center laptop:hidden">
                    <div
                        class="text-sm text-t6 font-medium"
                        v-text="' ' || pageData.total + ' ' + $t('Results')"
                    />
                    <BaseTag
                        :text="$t('Filter and Sort')"
                        @click="isFiltersShow = true"
                        id="filter-and-sort"
                    />
                </div>
                <div class="flex justify-between gap-10">
                    <div
                        class="min-w-[248px] max-w-[248px] flex-col gap-10 hidden laptop:flex"
                    >
                        <div class="flex justify-between items-center w-full">
                            <div
                                class="text-t10 text-xl font-medium"
                                v-text="$t('Filters')"
                            />
                            <div
                                class="text-p7 border-b border-p7 cursor-pointer"
                                v-text="$t('Clear Filters')"
                                @click="clearFilters"
                            />
                        </div>
                        <div
                            v-if="$route.query.keyword"
                            class="flex flex-row w-full"
                        >
                            <BaseTag
                                :text="$route.query.keyword"
                                hasClose
                                size="s"
                                @close="
                                    $router.push({
                                        query: { ...$route.query, keyword: '' },
                                    })
                                "
                            />
                        </div>
                        <div class="flex flex-col w-full">
                            <MarketFilter
                                v-for="filter in filtersComputed"
                                :key="filter.id"
                                :data="filter"
                                :values="values[filter.value]"
                                @updateFilter="updateFilter"
                            />
                        </div>
                    </div>
                    <div
                        v-if="isLoading"
                        class="flex flex-col flex-grow items-center gap-4 text-center w-full"
                    >
                        <div
                            class="grid grid-cols-1 tablet:grid-cols-2 laptop-l:grid-cols-3 gap-x-6 gap-y-10 mx-auto tablet:mx-0 w-full"
                        >
                            <div
                                v-for="i in 6"
                                :key="i"
                                class="flex flex-col gap-3"
                            >
                                <div
                                    class="w-full aspect-square"
                                    :class="loadingColor"
                                />
                                <div
                                    class="mt-2 w-4/5 h-4 rounded-2xl"
                                    :class="loadingColor"
                                />
                                <div
                                    class="w-1/5 h-4 rounded-2xl"
                                    :class="loadingColor"
                                />
                                <div
                                    class="mt-4 w-[15%] h-4 rounded-2xl"
                                    :class="loadingColor"
                                />
                                <div
                                    class="w-1/3 h-4 rounded-2xl"
                                    :class="loadingColor"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        v-else-if="
                            items && Array.isArray(items) && items.length > 0
                        "
                        class="flex flex-col flex-grow"
                    >
                        <div
                            class="grid grid-cols-2 laptop-l:grid-cols-3 gap-x-6 gap-y-10 mx-auto tablet:mx-0"
                        >
                            <MarketItem
                                v-for="item in items"
                                :key="item?.id"
                                :data="item"
                                isForHomePage
                                :isDisbaled="
                                    item?.state &&
                                    item?.state !== 'ready for sell'
                                "
                                :hasAddFavorite="!!token"
                            />
                        </div>
                        <div class="py-6 laptop:py-20 flex justify-center">
                            <BasePagination
                                v-model="currentPage"
                                :totalPages="Math.ceil(+totalItems / 12)"
                            />
                        </div>
                    </div>
                    <div
                        v-else
                        class="flex flex-col flex-grow items-center gap-4 text-center"
                    >
                        <div
                            class="flex flex-col justify-center items-center max-w-full laptop:max-w-[480px]"
                        >
                            <IconNoResult
                                class="w-[160px] h-[160px] laptop:w-[280px] laptop:h-[280px]"
                            />
                            <div
                                class="text-t10 text-xl laptop:text-2xl"
                                v-text="
                                    $t(
                                        `We couldn't find any products that match your current filters.`
                                    )
                                "
                            />
                        </div>
                        <div
                            class="text-t7 text-sm laptop:text-base"
                            v-text="
                                $t(
                                    'Try adjusting your search or filter to find what you’re looking for.'
                                )
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
        <ModalFilters
            :filters="filtersComputed"
            :sort="sortTagsComputed"
            :isShow="isFiltersShow"
            :values="values"
            @updateFilter="updateFilter"
            @clearFilters="clearFilters"
            @close="isFiltersShow = false"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    items: Array,
    filters: Array,
    breadcrumbData: Array,
    totalItems: Number,
    isLoading: Boolean,
});

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const token = useCookie('token');

const sortTagsComputed = computed(() => {
    return props.filters.filter((el) => el.type === 'sort')[0]?.options;
});

const filtersComputed = computed(() => {
    return props.filters.filter((el) => el.type !== 'sort');
});

const currentPage = ref(+route.query.page || 1);

watch(
    () => currentPage.value,
    async (newVal) => {
        // await router.replace({ query: { ...route.query, page: newVal } });
        scrollToTop();
    }
);

const pageData = reactive({
    start: 1,
    end: 50,
    total: props.totalItems,
});

const container = ref();

const scrollToTop = () => {
    window.scrollTo({
        top: container.value?.offsetTop - 100,
        behavior: 'smooth',
    });
};

const isFiltersShow = ref(false);

const clearFilters = async () => {
    await router.replace({ name: 'market', query: {} });
    setFilters();
    isFiltersShow.value = false;
};

const values = reactive({});

const updateFilter = (newVal, key, group) => {
    values[group][key] = newVal;
};

const setFilters = () => {
    if (
        props.filters &&
        Array.isArray(props.filters) &&
        props.filters.length > 0
    ) {
        props.filters.forEach((filter) => {
            if (
                (filter.type === 'checkbox' || filter.type === 'radio') &&
                filter.options &&
                Array.isArray(filter.options) &&
                filter.options.length > 0
            ) {
                filter.options.forEach((el) => {
                    if (!values[filter.value]) {
                        values[filter.value] = {};
                    }
                    values[filter.value][el.value.slug || el.value.name] =
                        (router.currentRoute.value.query[filter.value] &&
                            router.currentRoute.value.query[filter.value] ===
                                el.value?.slug) ||
                        router.currentRoute.value.query[filter.value] ===
                            el.value?.name ||
                        (router.currentRoute.value.params.id &&
                            router.currentRoute.value?.params?.id ===
                                el.value?.slug) ||
                        (
                            router.currentRoute.value.query[filter.value] || []
                        ).includes(el.value.slug || el.value.name);
                    if (el.value?.categories?.length) {
                        el.value.categories.forEach((subCategory) => {
                            if (!values[filter.value]) {
                                values[filter.value] = {};
                            }
                            values[filter.value][
                                subCategory.slug || subCategory.name
                            ] =
                                router.currentRoute.value.query[
                                    filter.value
                                ] === subCategory?.slug ||
                                router.currentRoute.value.query[
                                    filter.value
                                ] === subCategory?.name ||
                                router.currentRoute.value.params.id ===
                                    subCategory?.slug ||
                                (
                                    router.currentRoute.value.query[
                                        filter.value
                                    ] || []
                                ).includes(
                                    subCategory.slug || subCategory.name
                                );
                        });
                    }
                });
            }
        });
    }
};
setFilters();
const loadingColor = ref('bg-p2');
setInterval(() => {
    if (loadingColor.value === 'bg-p2') {
        loadingColor.value = 'bg-p1';
    } else {
        loadingColor.value = 'bg-p2';
    }
}, 500);
</script>
