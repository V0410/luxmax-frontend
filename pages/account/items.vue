<template>
    <div class="relative">
        <BaseSplitLayout class="mb-20">
            <template #left>
                <!-- <BaseInputSearch size="s" noErrorMessage :maxlength="50" /> -->
                <BaseFoldable class="flex flex-col bg-p1 p-6">
                    <template #title>
                        <div class="text-p9 font-medium text-xl flex">
                            <IconChartLineUp class="me-3 fill-success" />
                            <div
                                v-text="
                                    $t(`Estimated Time for Providing Insights`)
                                "
                            />
                        </div>
                    </template>
                    <template #default>
                        <div
                            class="mt-2 text-p6 leading-normal"
                            v-text="
                                $t('Track Repair Performance and Efficiency')
                            "
                        />
                        <template
                            v-if="
                                items &&
                                Array.isArray(items) &&
                                items?.length === 0
                            "
                        >
                            <div
                                class="mt-8 text-p8 leading-normal text-center"
                                v-text="
                                    $t(
                                        'You have not yet submitted an item to us for repair'
                                    )
                                "
                            />
                        </template>
                        <template v-else>
                            <div
                                class="mt-8 flex flex-col items-center text-p8 w-full gap-6"
                            >
                                <div
                                    class="flex justify-between items-center w-full"
                                >
                                    <div v-text="$t('Average Repair Time')" />
                                    <div
                                        class="text-t9"
                                        v-text="$t('Days', { day: 9 })"
                                    />
                                </div>
                                <div class="flex justify-between w-full">
                                    <div>
                                        <div
                                            v-text="$t('Repair Success Rate')"
                                        />
                                        <div
                                            class="mt-2 text-t5 text-xs font-light"
                                            v-text="
                                                $t(
                                                    'This metric indicates the percentage of bags that were successfully repaired and returned to a sellable condition'
                                                )
                                            "
                                        />
                                    </div>
                                    <div class="text-t9" v-text="`90%`" />
                                </div>
                            </div>
                        </template>
                    </template>
                </BaseFoldable>
            </template>
            <template #right>
                <!-- <BaseInputDropdown
            class="w-fit"
            size="s"
            v-model="selectedStatus"
            :options="statusOptions"
            :placeholder="$t('Item status')"
          /> -->
                <BaseFoldable class="flex flex-col gap-8" isAlwaysOpen>
                    <template #title>
                        <div class="flex items-center w-full">
                            <div
                                class="text-p8 font-semibold text-lg leading-10 bg-white pe-6"
                                v-text="$t('My Items')"
                            />
                            <div class="border-b border-t1 flex-grow" />
                            <div
                                v-if="items?.length > 0"
                                class="text-p7 fill-p7 cursor-pointer text-sm bg-white ps-6 flex items-center gap-1"
                            >
                                <IconPlus class="w-4 h-4" />
                                <NuxtLink :to="{ name: 'identify' }">
                                    <div v-text="$t(`New Request`)" />
                                </NuxtLink>
                            </div>
                        </div>
                    </template>
                    <template #default>
                        <template v-if="items?.length === 0">
                            <div
                                class="flex flex-col items-center justify-between h-full gap-8"
                            >
                                <IconNoItem
                                    class="w-[120px] h-[120px] laptop:w-[200px] laptop:h-[200px]"
                                />
                                <div
                                    class="text-p8"
                                    v-text="
                                        $t(
                                            'You have not yet submitted an item to us for repair'
                                        )
                                    "
                                />
                                <BaseButton
                                    :text="$t('New Request')"
                                    startIcon="IconPlus"
                                    @click="$router.push({ name: 'identify' })"
                                />
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex flex-col gap-4">
                                <BaseRepairRow
                                    v-for="item in items"
                                    :key="item?.id"
                                    :data="item"
                                    @buttonClick="buttonClick"
                                    @infoClick="showItemDetails"
                                />
                            </div>
                        </template>
                        <div class="py-6 laptop:py-20 flex justify-center">
                            <BasePagination
                                v-model="currentPage"
                                :totalPages="Math.ceil(+totalItems / 5)"
                            />
                        </div>
                    </template>
                </BaseFoldable>
            </template>
        </BaseSplitLayout>
        <ModalRepairDetails
            :itemToShow="itemToShow"
            :isShow="isItemDetailsModalShow"
            @close="isItemDetailsModalShow = false"
        />
    </div>
</template>

<script setup>
definePageMeta({
    name: 'items',
    key: (route) => route.fullPath,
    layout: false,
});
const route = useRoute();
const router = useRouter();

const currentPage = ref(+route.query.page || 1);
const items = ref([]);
const totalItems = ref(0);

const getMyItems = async () => {
    const { my_items } = useItem();
    const { data, error } = await my_items(
        `?mine=true&page=${currentPage.value}&limit=5&plan=REPAIR_AND_GET_BACK&plan=SELL_WITHOUT_REPAIR&plan=REPAIR_AND_SELL_IN_OUR_COMMUNITY`
    );
    items.value = data?.value?.data;
    totalItems.value = data?.value?.total;
};

watch(
    () => currentPage.value,
    async (newVal) => {
        await router.replace({ query: { ...route.query, page: newVal } });
        scrollToTop();
    }
);

await getMyItems();
const { $formatItems } = useNuxtApp();
const { t } = useI18n();

const selectedStatus = ref(null);

const statusOptions = [
    { id: 0, text: 'option1', value: 1 },
    { id: 1, text: 'option2', value: 2 },
    { id: 2, text: 'option3', value: 3 },
];

const { addCart, cart, orders } = useCheckout();

const buttonClick = (data) => {
    if (data?.emit === 'deposit') {
        router.push({ name: 'deposit', query: { item_id: data?.id } });
    } else {
    }
};

//// details modal

const isItemDetailsModalShow = ref(false);

const itemToShow = ref({});

const showItemDetails = (id) => {
    itemToShow.value = items.find((el) => el.id === id);
    isItemDetailsModalShow.value = true;
};
</script>
