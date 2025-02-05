<template>
    <div class="relative flex flex-col gap-8 mb-20">
        <!-- <BaseSplitLayout>
      <template #left>
        <BaseFoldable class="flex flex-col bg-p1 p-6">
          <template #title>
            <div class="text-p9 font-medium text-xl flex">
              <IconBalance class="me-3 fill-gold" />
              <div v-text="$t(`Sales Balance History`)" />
            </div>
          </template>
          <template #default>
            <template
              v-if="salesBalanceHistory && salesBalanceHistory.salesPrice > 0"
            >
              <div class="w-full mt-8">
                <div class="flex flex-col justify-between font-medium text-t9">
                  <div class="flex flex-col gap-6 text-sm">
                    <div class="flex justify-between items-center px-3">
                      <div class="text-p8" v-text="$t('Sales Price')" />
                      <div v-text="'+ £' + salesBalanceHistory.salesPrice" />
                    </div>
                    <div class="flex justify-between items-center px-3">
                      <div class="text-p8" v-text="$t('Our Commissions')" />
                      <div v-text="'- £' + salesBalanceHistory.commissions" />
                    </div>
                    <div class="flex justify-between items-center p-3 bg-p2">
                      <div class="text-p8" v-text="$t('Your profit')" />
                      <div
                        v-text="
                          '+ £' +
                          (+salesBalanceHistory.salesPrice -
                            +salesBalanceHistory.commissions)
                        "
                      />
                    </div>
                  </div>
                  <div
                    v-if="salesBalanceHistory.haveNotReceived !== 0"
                    class="flex justify-between items-center mt-10"
                  >
                    <div
                      v-text="
                        $t('You have not received', {
                          price: '£' + salesBalanceHistory.haveNotReceived,
                        })
                      "
                    />
                    <BaseButton :text="$t('receive')" size="s" @click="isReceivePaymentModalShow = true" />
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div
                class="mt-8 text-p8 leading-normal text-center"
                v-text="
                  $t('You have not yet submitted an item to us for repair')
                "
              />
            </template>
          </template>
        </BaseFoldable>
      </template>
      <template #right>
        <BaseFoldable
          class="flex flex-col shadow-s-3 py-6 px-8 laptop:p-8 gap-8"
          isAlwaysOpen
        >
          <template #title>
            <div class="flex items-center w-full laptop:justify-between flex-col laptop:flex-row gap-10">
              <div
                class="text-p8 font-semibold text-lg leading-10 bg-white pe-6"
                v-text="$t('Total summary of sales')"
              />
              <div class="w-full tablet:w-fit">
                <BaseSegmentedButton
                  v-model="chartTimePerid"
                  :options="chartTimePeriodOptions"
                  name="chartTimePeriod"
                  class="w-full laptop:w-fit"
                />
              </div>
            </div>
          </template>
          <template #default>
            <template v-if="salesBalanceHistory && salesBalanceHistory.salesPrice > 0">
              <div  class="hidden laptop:block" >
                <BaseChart :data="chartData" id="salesChart"/>
              </div>
              <div class="laptop:hidden">
                <BaseChart :data="chartData" id="responsiveSalesChart" isMobile  />
              </div>
            </template>
            <template v-else>
              <div class="text-p8 text-center" v-text="$t('You have not sold any items yet')" />
            </template>
          </template>
        </BaseFoldable>
      </template>
    </BaseSplitLayout> -->
        <div class="flex flex-col gap-8 p-4 laptop:p-8 shadow-s-3">
            <div class="flex laptop:items-center flex-col laptop:flex-row">
                <div
                    class="text-lg font-semibold text-p8 pe-8 whitespace-nowrap mb-2 laptop:mb-0"
                    v-text="$t('Sales history')"
                />
                <!-- <div class="flex-grow flex flex-col w-full">
          <BaseTab
            v-model="selectedTab"
            :data="tabData"
            isFullWidth
            class="justify-between laptop:justify-end"
          />
        </div> -->
            </div>
            <div class="flex flex-col gap-4">
                <template
                    v-if="items && Array.isArray(items) && items.length > 0"
                >
                    <div class="flex flex-col gap-4">
                        <BaseRepairRow
                            v-for="item in items"
                            :key="item.id"
                            :data="item"
                            @buttonClick="buttonClick"
                            @infoClick="showItemDetails"
                        />
                    </div>
                    <div class="py-6 laptop:py-20 flex justify-center">
                        <BasePagination
                            v-model="currentPage"
                            :totalPages="Math.ceil(+totalItems / 5)"
                        />
                    </div>
                </template>
                <div
                    v-else
                    class="flex flex-col items-center justify-between h-full gap-8"
                >
                    <IconNoOrder
                        class="w-[120px] h-[120px] laptop:w-[200px] laptop:h-[200px]"
                    />
                    <div
                        class="text-p8"
                        v-text="$t('You have not sold any items yet')"
                    />
                    <BaseButton
                        :text="$t('Sell')"
                        startIcon="IconSellSingle"
                        class="w-[144px]"
                        @click="$router.push({ name: 'identify' })"
                    />
                </div>
            </div>
        </div>
        <ModalOrderDetails
            :orderToShow="orderToShow"
            :isShow="isItemDetailsModalShow"
            @close="isItemDetailsModalShow = false"
        />
        <ModalRecievePayment
            :amount="salesBalanceHistory.haveNotReceived"
            :cards="cards"
            :isShow="isReceivePaymentModalShow"
            @close="isReceivePaymentModalShow = false"
        />
    </div>
</template>

<script setup>
definePageMeta({
    name: "sale",
    key: (route) => route.fullPath,
    layout: false,
});

const { t } = useI18n();
const { transaction } = useItem();

//// sales balance history

const salesBalanceHistory = {
    salesPrice: 0,
    commissions: 0,
    haveNotReceived: 0,
};

const route = useRoute();
const router = useRouter();

const currentPage = ref(+route.query.page || 1);
const items = ref([]);
const totalItems = ref(0);

const getMyItems = async () => {
    const { my_items } = useItem();
    const { data, error } = await my_items(
        `?mine=true&page=${currentPage.value}&limit=5&plan=INSTANT_SELL`
    );
    items.value = data.value?.data;
    totalItems.value = data.value?.total ? data.value?.total : 0;
};

watch(
    () => currentPage.value,
    async (newVal) => {
        await router.replace({ query: { ...route.query, page: newVal } });
        scrollToTop();
    }
);

await getMyItems();

const isReceivePaymentModalShow = ref(false);

const cards = [
    {
        id: 1,
        bank: "ADRBank",
        number: "8763 2736 9873 0329",
        name: "BEHDAD BARZEGAR",
        expiredDate: "10/28",
    },
    {
        id: 2,
        bank: "ADRBank",
        number: "6737 7689 4287 5610",
        name: "BEHDAD BARZEGAR",
        expiredDate: "12/28",
    },
    {
        id: 3,
        bank: "ADRBank",
        number: "6737 7689 4287 5610",
        name: "BEHDAD BARZEGAR",
        expiredDate: "01/28",
    },
];
//// tab

const selectedTab = ref("current");

const tabData = [
    { id: 0, value: "current", text: t("Current") },
    // { id: 1, value: "completed", text: t("Completed") },
    // { id: 2, value: "cenceled", text: t("Canceled") },
];

//// chart

const chartTimePeriodOptions = [
    { id: 0, text: "Daily", value: "daily" },
    { id: 1, text: "Weekly", value: "weekly" },
    { id: 2, text: "Monthly", value: "monthly" },
];

const chartTimePerid = ref("weekly");

const dailyChart = [];

const weeklyChart = [
    { time: "MON", salePrice: 5700, commission: 1000 },
    { time: "TUE", salePrice: 4800, commission: 860 },
    { time: "WED", salePrice: 4000, commission: 750 },
    { time: "THU", salePrice: 5400, commission: 900 },
    { time: "FRI", salePrice: 1000, commission: 100 },
    { time: "SAT", salePrice: 3200, commission: 400 },
    { time: "SUN", salePrice: 500, commission: 50 },
];
const monthlyChart = [
    { time: "1-5", salePrice: 5700, commission: 1000 },
    { time: "6-10", salePrice: 4800, commission: 860 },
    { time: "11-15", salePrice: 4000, commission: 750 },
    { time: "16-20", salePrice: 5400, commission: 900 },
    { time: "21-25", salePrice: 1000, commission: 100 },
    { time: "25-30", salePrice: 3200, commission: 400 },
];

const chartData = computed(() => {
    if (chartTimePerid.value === "daily") {
        return dailyChart;
    }
    if (chartTimePerid.value === "weekly") {
        return weeklyChart;
    }
    if (chartTimePerid.value === "monthly") {
        return monthlyChart;
    }
    return [];
});



//// details modal

const isItemDetailsModalShow = ref(false);

const toggleItemDetailsModalShow = () => {
    isItemDetailsModalShow.value = !isItemDetailsModalShow.value;
};

const orderToShow = ref({});

const showDetail = (row) => {
    orderToShow.value = row;
    toggleItemDetailsModalShow();
};

//// sales history table

const salesHistoryHeaders = [
    { id: 0, name: "item", label: t("Items"), type: "text" },
    {
        id: 1,
        name: "date",
        label: t("Date"),
        sort: { method: "date", isASC: true },
        type: "date",
    },
    { id: 2, name: "buyerInfo", label: t("Buyer Info"), type: "text" },
    {
        id: 3,
        name: "price",
        label: t("Price"),
        sort: { method: "number", isASC: true },
        type: "price",
    },
    {
        id: 3,
        name: "commissions",
        label: t("Commissions"),
        sort: { method: "number", isASC: true },
        type: "price",
    },
    { id: 4, name: "actions", label: "", type: "actions" },
];

const { data } = await transaction(1, 12);
const currentData = ref(data.value?.data);
const completedData = ref([]);
const canceledData = ref([]);

const tableData = computed(() => {
    if (selectedTab.value === "current") return currentData.value;
    else if (selectedTab.value === "completed") return completedData.value;
    else if (selectedTab.value === "canceled") return canceledData.value;
});
const buttonClick = (data) => {
    const router = useRouter();
    if (data?.emit === "deposit") {
        router.push({ name: "deposit", query: { item_id: data?.id } });
    } else {
    }
};
</script>
