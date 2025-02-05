<template>
  <div
    class="gridClass laptop:my-16 flex flex-col gap-8 relative pb-[140px] laptop:pb-0"
  >
    <BaseBreadcrumb :dataArray="breadcrumbData" class="laptop:hidden mt-8" />
    <div class="flex flex-col gap-12 w-full">
      <CheckoutConfirm
        v-if="isLastStep"
        :data="confirmData"
        @successButtonClick="successButtonClick"
        @filureButtonClick="step = 1"
      />
      <BaseSplitLayout isReverse class="max-w-[1094px] w-full mx-auto">
        <template #left>
          <div class="flex flex-col gap-6 laptop:gap-12">
            <div v-show="!isLastStep" class="hidden laptop:flex flex-col gap-4">
              <div
                class="font-medium text-[28px] text-p8"
                v-text="$t('Ship To Us For Repair')"
              />
              <div
                class="text-t8"
                v-text="
                  $t('Print a free shipping label and send your items our way')
                "
              />
            </div>
            <div
              v-show="!isLastStep"
              class="laptop:hidden text-p8 font-medium"
              v-text="
                step === 1
                  ? $t('Your item is ready, help us send it to you')
                  : step === 2
                  ? $t('Checkout')
                  : step === 3
                  ? $t('Checkout')
                  : ''
              "
            />
            <!-- previous steps -->
            <template v-if="!isLastStep">
              <template
                v-for="previousStep in previousSteps"
                :key="previousStep.id"
              >
                <CheckoutPreviousStep
                  v-if="step > (previousStep?.step || 10000)"
                  :title="previousStep.title"
                  :type="previousStep.type"
                  :data="previousStep.data"
                  :isEditable="!isLastStep"
                  @edit="step = previousStep.step"
                />
              </template>
            </template>
            <div 
              ref="container">
            <!-- previous steps -->
            <CheckoutDeliveryInfo
              v-if="step === 1"
              @showSummary="isOrderSummaryShow = true"
              :items="items"
              :stores="stores"
              :savedAddresses="savedAddresses"
              :countryList="countryList"
              @checkoutClicked="addressSelected"
              isSendItem
            />
            <CheckoutReview
              v-else-if="step === 2"
              @showSummary="isOrderSummaryShow = true"
              @placeOrder="placeOrder"
            />
            </div>
          </div>
        </template>
        <template #right v-if="!isLastStep">
          <div
            class="flex flex-col"
            :class="isLastStep ? 'laptop:px-6 gap-20' : ' gap-8'"
          >
            <div
              v-text="$t('Your Item')"
              class="text-[28px] text-p8 font-medium"
            />
            <div class="flex flex-col gap-8">
              <CheckoutProduct
                v-for="item in items"
                :key="item.id"
                :title="$t('Repair request')"
                :data="item"
                isSideView
              />
            </div>
          </div>
        </template>
      </BaseSplitLayout>
    </div>
    <ModalOrderSummary
      :isShow="isOrderSummaryShow"
      :items="items"
      :dataRows="dataRows"
      @close="isOrderSummaryShow = false"
    />
  </div>
  <!-- <div v-if="isLastStep" class="pt-10 pb-20 bg-p1">
    <div class="gridClass">
      <div class="w-full flex flex-col gap-16 text-center">
        <div
          v-text="$t('Things to Know')"
          class="uppercase text-p10 font-title font-normal text-4xl"
        />
        <div class="w-full flex flex-col laptop:flex-row justify-between gap-8">
          <CheckoutItem
            class="laptop:w-1/4"
            v-for="item in confirmItems"
            :key="item.id"
            :icon="item.icon"
            :text="item.text"
          />
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup>
definePageMeta({
  name: "shipToUs",
  key: (route) => route.fullPath,
  middleware: ["auth", "item-id"],
  layout: false,
});

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const { info } = useCheckout();

// const {error, data} = await info({body: {item_id: route.query.item_id}})

// if(error.value){
//   router.push({name: 'items'})
// }else{

// }
const step = ref(3);
const container = ref();

const isLastStep = computed(() => {
  return step.value >= 3;
});

const isOrderSummaryShow = ref(false);

const dataRows = reactive([
  {
    text: t("Delivery"),
    amount: "-",
    isSubtract: false,
  },
]);

//// step 1

const stores = [
  {
    id: 0,
    value: 0,
    text: "Store name",
    desc: "1410 Autocenter Dr | Walnut Creek | London | United Kingdom",
    distance: "0.5 mi",
  },
  {
    id: 1,
    value: 1,
    text: "Store name",
    desc: "1410 Autocenter Dr | Walnut Creek | London | United Kingdom",
    distance: "0.5 mi",
  },
  {
    id: 2,
    value: 2,
    text: "Store name",
    desc: "1410 Autocenter Dr | Walnut Creek | London | United Kingdom",
    distance: "0.5 mi",
  },
];

const savedAddresses = [
  {
    id: 0,
    text: "Post code | 1410 Autocenter Dr | Walnut Creek | London | United Kingdom",
    value: 1,
  },
  {
    id: 1,
    text: "Post code | 1410 Autocenter Dr | Walnut Creek | London | United Kingdom",
    value: 2,
  },
  {
    id: 2,
    text: "Post code | 1410 Autocenter Dr | Walnut Creek | London | United Kingdom",
    value: 3,
  },
];

const countryList = [{ id: 0, text: "United Kingdom", value: "uk" }];

const items = [
  {
    id: 0,
    name: "GG Marmont Shoulder Bag",
    brand: "Gucci",
    condition: { text: "Like New", color: "success" },
    features: [
      { text: "Matelasse Leather" },
      { text: "Small (7” Width)" },
      { text: "Brown", color: "#994900" },
    ],
    img: "/img/temp/itemProduct.webp",
  },
];

const addressSelected = (id) => {
  // const selectedAddress = savedAddresses.find((el) => el.id === id);
  // const index = previousSteps.findIndex((el) => el.type === "deliveryInfo");
  // previousSteps[index].data = selectedAddress;
  goToStep(2);
};

//// step 2

const placeOrder = () => {
  goToStep(3);
};

//// step 3

const confirmData = reactive({
  isFail: false,
  // additionalButtonText: t('Download Now'),
  noDesc: true,
  hasPostalInfo: true,
  successButtonDesc: t("After Sending Track your Item easily"),
  successButtonText: t("Instant Sales History"),
});

const successButtonClick = () => {
  router.push({ name: "sale" });
};

const confirmItems = [
  { id: 0, icon: "IconClock", text: "Items take 5 - 7 days to process" },
  {
    id: 1,
    icon: "IconTag",
    text: "Our experts price your item based on market demand",
  },
  {
    id: 2,
    icon: "IconHandsIcon",
    text: "the repair cost will be determined for you in the account section",
  },
];

//// previous steps

const previousSteps = reactive([
  {
    id: 0,
    title: t("Address Information"),
    step: 1,
    type: "deliveryInfo",
    data: [
      {
        id: 0,
        text: t("Sender"),
        array: ["Behdad barzegar", "Behdadbrz1@gmail.com", "+98 9157634826"],
      },
      {
        id: 1,
        text: t("Address"),
        array: [
          "8272829",
          "1410 Autocenter Dr",
          "Walnut Creek",
          "California",
          "United States",
        ],
      },
    ],
  },
]);

// breadcrumb data

const breadcrumbData = computed(() => [
  {
    id: 0,
    text: t("Home"),
    action: () => {
      router.push({ name: "home" });
    },
  },
  {
    id: 1,
    text: t("Repair"),
    action: () => {
      router.push({ name: "identify" });
    },
  },
  {
    id: 2,
    text: t("Ship to us for repair"),
    action: () => {},
  },
]);

//  handling router back

if (typeof window !== "undefined") {
  window.onpopstate = function (event) {
    step.value = +event.state.step;
  };
}

const goToStep = (value) => {
  step.value = value;
  // updateHistory(value);
};

const updateHistory = (newVal) => {
  if (+newVal) {
    history.pushState(
      { step: +newVal },
      "",
      router.currentRoute.value.fullPath
    );
  }
};

//// scroll and mounted

const scrollToTop = () => {
  window.scrollTo({ top: container.value?.offsetTop - 100, behavior: "smooth" });
};

onMounted(() => {
  watch(
    () => step.value,
    () => {
      scrollToTop();
    }
  );
});
</script>
