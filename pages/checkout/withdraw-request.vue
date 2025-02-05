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
            <div
              v-show="!isLastStep"
              class="text-p8 font-medium text-[28px] hidden laptop:block"
              v-text="$t('Withdrawal Request')"
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
            <CheckoutWithdrawalFirstStep
              v-if="step === 1"
              v-model="form.value"
              :maxValue="dataRows.find((el) => el.id === 0).amount"
              @showSummary="isOrderSummaryShow = true"
              :items="items"
              @checkoutClicked="goToStep(2)"
            />
            <CheckoutPaymentMethod
              v-else-if="step === 2"
              @showSummary="isOrderSummaryShow = true"
              :paymentMethods="paymentMethods"
              :cards="cards"
              @continue="cardSelected"
            />
            <CheckoutReview
              v-else-if="step === 3"
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
              :title="$t('Balance')"
              :lastRowText="$t('Remaining')"
              :dataRows="dataRows"
              :hasCheckoutButton="false"
              @checkoutClicked="goToStep(2)"
              :isEditable="step !== 1"
              @editClicked="step = 1"
              :summaryData="summaryData"
              :isLastStep="isLastStep"
              :isFail="confirmData.isFail"
            />
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
      :dataRows="dataRows"
      @close="isOrderSummaryShow = false"
    />
  </div>
</template>

<script setup>
definePageMeta({
  name: "withdraw-request",
  key: (route) => route.fullPath,
  middleware: ["auth"],
  layout: false,
});

const { t } = useI18n();
const router = router();
const step = ref(1);
const container = ref();

const isLastStep = computed(() => {
  return step.value >= 4;
});

const isOrderSummaryShow = ref(false);

const { account_info } = useAccount();
const { data } = await account_info()

const dataRows = reactive([
  {
    id: 0,
    text: t("Account balance"),
    amount: data.value?.balance,
    isSubtract: false,
  },
  {
    id: 1,
    text: t("Withdrawal amount"),
    amount: "-",
    isSubtract: true,
  },
]);

//// step 1

const form = reactive({
  value: 0,
});

watch(
  () => form.value,
  (newVal) => {
    if (newVal) {
      dataRows.find((el) => el.id === 1).amount = newVal;
    } else {
      dataRows.find((el) => el.id === 1).amount = "-";
    }
  },
  { immediate: true }
);

//// step 2

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
  goToStep(3);
};

///// step 3

const placeOrder = () => {
  goToStep(4);
};

//// step 4

const summaryData = reactive({
  orderNumber: "C371783712",
  orderDate: new Date().getTime(),
});

const confirmData = reactive({
  isFail: false,
  successTitle: t("Your Withdraw was placed successfully"),
  successButtonDesc: t("Following confirmation by the administration, kindly review your bank account to ensure the receipt of the transferred funds."),
  // successButtonText: t("Sale History"),
});

const successButtonClick = () => {
  router.push({ name: "sale" });
};

//// previous steps

const previousSteps = reactive([
  {
    id: 0,
    title: t("Payment"),
    step: 2,
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
