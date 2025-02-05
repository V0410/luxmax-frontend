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
        @filureButtonClick="resetPayment"
      />
      <template v-if="!isLastStep || (isLastStep && confirmData.isFail)">
      <BaseSplitLayout isReverse class="max-w-[1094px] w-full mx-auto">
        <template #left>
          <div class="flex flex-col gap-6 laptop:gap-12">
            <div
              v-show="!isLastStep"
              class="text-p8 font-medium text-[28px] hidden laptop:block"
              v-text="$t('Deposit the cost')"
            />
            <div
              v-show="!isLastStep"
              class="laptop:hidden text-p8 font-medium"
              v-text="
                step === 1
                  ? $t('Our Services')
                  : step === 2
                  ? $t('Checkout')
                  : step === 3
                  ? $t('Checkout')
                  : ''
              "
            />
            <!-- previous steps -->
            <template
              v-for="previousStep in isLastStep
                ? finalStepPreviousStepsComputed
                : previousSteps"
              :key="previousStep.id"
            >
              <CheckoutPreviousStep
                v-if="step > (previousStep?.step || 10000)"
                :title="previousStep.title"
                :type="previousStep.type"
                :data="previousStep.data"
                :isEditable="!isLastStep && previousStep.isEditable"
                @edit="step = previousStep.step"
              />
            </template>
            <!-- previous steps -->
            <div ref="container">
            <CheckoutDepositFirstStep
              v-if="step === 1"
              @showSummary="isOrderSummaryShow = true"
              :items="items"
              @checkoutClicked="goToStep(2)"
            />
            <CheckoutDeliveryInfo
              v-if="step === 2"
              @showSummary="isOrderSummaryShow = true"
              :items="items"
              :countryList="countryList"
              @saveClicked="addressSelected"
            />
            <CheckoutPaymentMethod
              v-else-if="step === 3"
              @showSummary="isOrderSummaryShow = true"
              :paymentMethods="paymentMethods"
              :cards="cardsList"
              @continue="cardSelected"
            />
            <CheckoutReview
              v-else-if="step === 4"
              @showSummary="isOrderSummaryShow = true"
              @placeOrder="placeOrder"
              :isLoading="isLoading"
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
                  ? $t('Summary')
                  : isLastStep
                  ? $t('Cost')
                  : $t('In your cart')
              "
              :dataRows="dataRows"
              :items="items"
              :hasCheckoutButton="step === 1"
              @checkoutClicked="goToStep(2)"
              :isEditable="step !== 1"
              @editClicked="step = 1"
              :summaryData="summaryData"
              :isLastStep="isLastStep"
              :isFail="confirmData.isFail"
            />
            <div v-if="step !== 1" class="flex flex-col gap-8">
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
      </template>
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
import { loadStripe } from "@stripe/stripe-js";
definePageMeta({
  name: "deposit",
  key: (route) => route.fullPath,
  middleware: ["auth"],
  layout: false,
});

const config = useRuntimeConfig();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const addressesState = useState("addressesState");
const cardsList = useState("cardsList");
const step = ref(1);
const container = ref();
const orderItems = ref([]);
const itemsFromBack = ref([]);

const isLoading = ref(false);

const { $formatItems } = useNuxtApp();
const isLastStep = computed(() => {
  return step.value >= 5;
});

const items = computed(() =>
  isLastStep.value
    ? $formatItems(orderItems.value)
    : $formatItems(itemsFromBack.value)
);
const isOrderSummaryShow = ref(false);

const totalPrice = computed(
  () =>
    items?.value
      ?.map((item) => item?.price || 0)
      .reduce((accumulator, Value) => accumulator + Value, 0) || 0
);

const finalForm = reactive({});
const finalTotalPrice = ref(0);

const priceToShowComputed = computed(() =>
  totalPrice.value !== 0 ? totalPrice.value : finalTotalPrice.value
);

const dataRows = reactive([
  {
    text: t("Subtotal"),
    amount: priceToShowComputed,
    isSubtract: false,
  },
]);

//// step 2

const addressSelected = (data) => {
  Object.keys(data).forEach((key) => {
    finalForm[key] = data[key];
  });
  goToStep(3);
};

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

const cardSelected = (id) => {
  finalForm.card_id = id;
  goToStep(4);
};

//// step 5

const summaryData = reactive({
  orderNumber: "",
  orderDate: 0,
});

const confirmData = reactive({
  isFail: true,
  successTitle: t("Your repairs have been successfully paid"),
  hasPostalInfo: true,
  successButtonDesc: t("You can track the status of your item"),
  successButtonText: t("My Items"),
});

const successButtonClick = () => {
  router.push({ name: "items" });
};

//// previous steps

const finalStepPreviousStepsComputed = ref([]);

const previousSteps = computed(() => {
  const selectedAddress =
    addressesState?.value?.find((el) => el.id === finalForm.address_id) || {};
  const selectedCard =
    cardsList?.value?.find((el) => el.id === finalForm.card_id) || {};

  return [
    {
      id: 0,
      title: t("Delivery Information"),
      isEditable: true,
      step: 2,
      type: "deliveryInfo",
      data: [
        {
          id: 0,
          text: t("Receiver Information"),
          array: [
            `${finalForm.first_name} ${finalForm.last_name}`,
            finalForm.phone_number,
          ],
        },
        {
          id: 1,
          text: t("Ship to"),
          array: [
            selectedAddress?.postal_code || "",
            selectedAddress?.address || "",
            selectedAddress?.city || "",
            selectedAddress?.country || "",
          ],
        },
      ],
    },
    {
      id: 2,
      title: t("Payment"),
      isEditable: true,
      step: 3,
      type: "payment",
      data: {
        type: selectedCard.type || "",
        card_number: selectedCard.card_number,
        expiry: selectedCard?.expiry,
        // addressArray: [ selectedCard?.postal_code, selectedCard?.address, selectedCard?.city, selectedCard?.country ]
      },
    },
  ];
});

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

const resetPayment = () => {
  router.push({ query: { item_id: route?.query?.order_uid } })
}

if (route?.query?.step === "failed" || route?.query?.step === "success") {
  step.value = 5;
} else {
  const { getCards } = useCheckout();
  if (!cardsList.value) {
    await getCards();
  }
}

onMounted(async () => {
  watch(
    () => step.value,
    () => {
      scrollToTop();
    }
  );
});
</script>
