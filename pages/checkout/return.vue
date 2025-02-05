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
        @filureButtonClick="step = 2"
      />
      <BaseSplitLayout isReverse class="max-w-[1094px] w-full mx-auto">
        <template #left>
          <div class="flex flex-col gap-6 laptop:gap-12">
            <div v-show="!isLastStep" class="hidden laptop:flex flex-col gap-4">
              <div
                class="font-medium text-[28px] text-p8"
                v-text="$t('Your item is ready')"
              />
              <div class="text-t8" v-text="$t('Help us send it to you')" />
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
            <!-- previous steps -->
            <div ref="container">
              <CheckoutDeliveryInfo
              v-if="step === 1"
              @showSummary="isOrderSummaryShow = true"
              :items="items"
              :stores="stores"
              :savedAddresses="savedAddresses"
              :countryList="countryList"
              @checkoutClicked="addressSelected"
              />
              <CheckoutArrivalTime
              v-else-if="step === 2"
              :times="times"
              @showSummary="isOrderSummaryShow = true"
              @continue="timeSelected"
              />
              <CheckoutPaymentMethod
              v-else-if="step === 3"
              @showSummary="isOrderSummaryShow = true"
              :paymentMethods="paymentMethods"
              :cards="cards"
              @continue="cardSelected"
              />
              <CheckoutReview
              v-else-if="step === 4"
              @showSummary="isOrderSummaryShow = true"
              @placeOrder="placeOrder"
              />
            </div>
            </div>
        </template>
        <template #right>
          <div
            class="flex flex-col"
            :class="isLastStep ? 'laptop:px-6 gap-20' : ' gap-8'"
          >
            <CheckoutSummary
              :title="
                step === 1
                  ? $t('Cost summary')
                  : isLastStep
                  ? $t('Payment')
                  : $t('In your cart')
              "
              :dataRows="dataRows"
              :isEditable="step !== 1"
              @editClicked="step = 1"
              :summaryData="summaryData"
              :isLastStep="isLastStep"
              :isFail="confirmData.isFail"
            />
            <div class="flex flex-col gap-8">
              <CheckoutProduct
                v-for="item in items"
                :key="item.id"
                :data="item"
                isSideView
              />
            </div>
          </div>
        </template>
      </BaseSplitLayout>
      <!-- <div v-if="isLastStep" class="flex laptop:justify-center">
        <BaseButton
          :text="$t('Print Order Confirmation')"
          styleType="outlined"
          class="w-full laptop:w-fit "
        />
      </div> -->
    </div>
    <ModalOrderSummary
      :isShow="isOrderSummaryShow"
      :items="items"
      :dataRows="dataRows"
      @close="isOrderSummaryShow = false"
    />
  </div>
</template>

<script setup>
definePageMeta({
  name: "returnItem",
  key: (route) => route.fullPath,
  middleware: ["auth", "item-id"],
  layout: false,
});

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const { info } = useCheckout();

const { error, data } = await info({ body: { item_id: route.query.item_id } });

if (error.value) {
  router.push({ name: "items" });
} else {
}
const step = ref(1);
const container = ref();

const isLastStep = computed(() => {
  return step.value >= 5;
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

const timeSelected = (time) => {
  goToStep(3);
};

const times = [
  { id: 0, text: "Mon, Aug 22", value: Date.now() },
  { id: 1, text: "Mon, Aug 23", value: Date.now() },
  { id: 2, text: "Mon, Aug 24", value: Date.now() },
  { id: 3, text: "Mon, Aug 25", value: Date.now() },
];

//// step 3

const paymentMethods = [
  { id: 0, value: 0, text: t("Credit or Debit Card"), icon: "IconCreditCard" },
  {
    id: 1,
    value: 1,
    isDisabled: true,
    text: t("PayPal"),
    icon: "IconPaypal",
    url: "https://www.paypal.com/",
  },
  {
    id: 2,
    value: 2,
    isDisabled: true,
    text: t("Google Pay"),
    icon: "IconGooglePay",
    url: "https://pay.google.com/",
  },
];

const cards = reactive([
  {
    id: 1,
    type: "visa",
    bank: "ADRBank",
    number: "8763 2736 9873 0329",
    name: "BEHDAD BARZEGAR",
    expiredDate: "10/28",
    addressArray: [
      "8272829",
      "1410 Autocenter Dr",
      "Walnut Creek",
      "California",
      "United States",
    ],
  },
  {
    id: 2,
    type: "visa",
    bank: "ADRBank",
    number: "6737 7689 4287 5610",
    name: "BEHDAD BARZEGAR",
    expiredDate: "12/28",
    addressArray: [
      "8272829",
      "1410 Autocenter Dr",
      "Walnut Creek",
      "California",
      "United States",
    ],
  },
  {
    id: 3,
    type: "visa",
    bank: "ADRBank",
    number: "6737 7689 4287 5610",
    name: "BEHDAD BARZEGAR",
    expiredDate: "01/28",
    addressArray: [
      "8272829",
      "1410 Autocenter Dr",
      "Walnut Creek",
      "California",
      "United States",
    ],
  },
]);

const cardSelected = (id) => {
  const selectedCard = cards.find((el) => el.id === id);
  const index = previousSteps.findIndex((el) => el.type === "payment");
  previousSteps[index].data = selectedCard;
  goToStep(4);
};

///// step 4

const placeOrder = () => {
  goToStep(5);
};

//// step 5

const summaryData = reactive({
  orderNumber: "C371783712",
  orderDate: new Date().getTime(),
});

const confirmData = reactive({
  isFail: false,
  successTitle: t("Your repairs have been successfully paid"),
  successButtonDesc: t("You can track the status of your item"),
  successButtonText: t("My Items"),
});

const successButtonClick = () => {
  router.push({ name: "items" });
};

//// previous steps

const previousSteps = reactive([
  {
    id: 0,
    title: t("Delivery Information"),
    step: 1,
    type: "deliveryInfo",
    data: [
      {
        id: 0,
        text: t("Receiver Information"),
        array: ["Behdad barzegar", "Behdadbrz1@gmail.com", "+98 9157634826"],
      },
      {
        id: 1,
        text: t("Ship to"),
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
  {
    id: 1,
    title: t("Estimated arrival date"),
    step: 2,
    type: "arrivalDate",
    data: {},
  },
  {
    id: 2,
    title: t("Payment"),
    step: 3,
    type: "payment",
    data: {},
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
    text: t("Account"),
    action: () => {
      router.push({ name: "info" });
    },
  },
  {
    id: 2,
    text: t("Deposit the cost"),
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
