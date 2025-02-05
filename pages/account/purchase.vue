<template>
  <div class="relative flex flex-col gap-8 mb-20">
    <div class="flex flex-col gap-8 p-4 laptop:p-8 shadow-s-3">
      <div class="flex laptop:items-center flex-col laptop:flex-row">
        <div
          class="text-lg font-semibold text-p8 pe-8 whitespace-nowrap mb-2 laptop:mb-0"
          v-text="$t('Order history')"
        />
        <div class="flex-grow flex flex-col w-full">
          <BaseTab
            v-model="selectedTab"
            :data="tabData"
            isFullWidth
            class="justify-between laptop:justify-end"
          />
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <template
          v-if="tableData && Array.isArray(tableData) && tableData.length > 0"
        >
          <BaseOrderCard
            v-for="item in tableData"
            :key="item?.id"
            :data="item"
            @buttonClick="buttonClick"
            @infoClick="showItemDetails"
          />
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
            v-text="$t('There are no purchased items in the current status')"
          />
          <BaseButton :text="$t('Buy')" startIcon="IconBasket" class="w-[144px]" @click="$router.push({ name: 'market' })" />
        </div>
      </div>
    </div>

    <ModalOrderDetails 
      :orderToShow="orderToShow"
      :isShow="isItemDetailsModalShow"
      @close="isItemDetailsModalShow = false"/>
  </div>
</template>

<script setup>
definePageMeta({
  name: "purchase",
  key: (route) => route.fullPath,
  layout: false

});

const { t } = useI18n();
const route = useRoute()
const { $formatItems } = useNuxtApp()
//// tab

const selectedTab = ref("current");

const tabData = [
  { id: 0, value: "current", text: t("Current") },
  { id: 1, value: "delivered", text: t("Delivered") },
  { id: 2, value: "returned", text: t("Returned") },
  { id: 3, value: "cenceled", text: t("Canceled") },
];

//// order history table

const currentData = ref([])

const deliveredData = ref([]);

const returnedData = ref([]);

const canceledData = ref([]);

const currentPage = ref(+route.query.page || 1);


const tableData = computed(() => {
  if (selectedTab.value === "current") return ordersList.value?.data;
  else if (selectedTab.value === "delivered") return deliveryList.value?.data;
  else if (selectedTab.value === "returned") return canceledList.value?.data;
  else if (selectedTab.value === "canceled") return returnedList.value?.data;
});

const tableTotal = computed(() => {
  if (selectedTab.value === "current") return ordersList.value?.total;
  else if (selectedTab.value === "delivered") return deliveryList.value?.total;
  else if (selectedTab.value === "returned") return canceledList.value?.total;
  else if (selectedTab.value === "canceled") return returnedList.value?.total;
});

//// details modal

const isItemDetailsModalShow = ref(false);

const toggleItemDetailsModalShow = () => {
  isItemDetailsModalShow.value = !isItemDetailsModalShow.value;
};

const orderToShow = ref({});

const showOrderDetails = (row) => {
  orderToShow.value = row;
  toggleItemDetailsModalShow();
};

const { addCart, cart, orders } = useCheckout()
const addToBasket = async(id) => {
  const body = { productId: String(id) }
  const { error } = await addCart({ body: body });
  if( !error.value ) {
    const { create } = useToast();
    create({
      id: Math.random(),
      type: "success",
      title: t("Item has been added to the cart"),
      noClose: true,
      time: 5,
    });
  }
  await cart();
}

const container = ref()

const {data: ordersList, error} = await orders({page:currentPage.value, limit:5, type: 'PRODUCT'})
const {data: deliveryList} = await orders({page:currentPage.value, limit:5, status: 'COMPLETED', type: 'PRODUCT'})
const {data: canceledList} = await orders({page:currentPage.value, limit:5, status: 'CANCELLED', type: 'PRODUCT'})
const {data: returnedList} = await orders({page:currentPage.value, limit:5, status: 'REFUNDED', type: 'PRODUCT'})


const buttonClick = async (data) => {
  const router = useRouter()
  if (data?.emit === 'deposit') {
    router.push({ name: 'deposit', query: { item_id: data?.id } })
  } else if (data?.emit === 'addToBasket') {
    await addToBasket(data?.id)
  }
  else {
  }
}

</script>
