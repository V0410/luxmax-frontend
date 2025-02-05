<template>
    <div
        class="gridClass laptop:my-16 flex flex-col gap-8 relative pb-[140px] laptop:pb-0"
    >
        <BaseBreadcrumb
            :dataArray="breadcrumbData"
            class="laptop:hidden mt-8"
        />
        <div class="flex flex-col gap-12 w-full">
            <CheckoutConfirm
                v-if="isLastStep"
                :data="confirmData"
                @successButtonClick="successButtonClick"
                @filureButtonClick="$router.push({ name: 'buy' })"
            />
            <BaseSplitLayout isReverse class="max-w-[1094px] w-full mx-auto">
                <template #left>
                    <div class="flex flex-col gap-6 laptop:gap-12">
                        <div
                            v-show="!isLastStep"
                            class="hidden laptop:flex flex-col gap-4"
                        >
                            <div
                                class="font-medium text-[28px] text-p8"
                                v-text="
                                    step === 1 ? $t('Cart') : $t('Checkout')
                                "
                            />
                        </div>
                        <div
                            v-show="!isLastStep"
                            class="laptop:hidden text-p8 font-medium"
                            v-text="
                                step === 1
                                    ? $t(
                                          'Your item is ready, help us send it to you'
                                      )
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
                                :title="previousStep?.title"
                                :type="previousStep?.type"
                                :data="previousStep?.data"
                                :isEditable="
                                    !isLastStep && previousStep?.isEditable
                                "
                                @edit="step = previousStep?.step"
                            />
                        </template>
                        <div ref="container">
                            <!-- previous steps -->
                            <CheckoutBuyFirstStep
                                v-if="step === 1"
                                @showSummary="isOrderSummaryShow = true"
                                @checkoutClicked="addOrder"
                                :items="cartList?.items"
                                :cartId="cartList?.id"
                                :isLoading="isLoading"
                            />
                            <CheckoutDeliveryInfo
                                v-if="step === 2"
                                @showSummary="isOrderSummaryShow = true"
                                :items="cartList?.items"
                                :countryList="countryList"
                                @saveClicked="addressSelected"
                            />
                            <!-- <CheckoutArrivalTime v-else-if="step === 3" 
                  :times="times"
                  @showSummary="isOrderSummaryShow = true"
                  @continue="timeSelected"
                  /> -->
                            <CheckoutPaymentMethod
                                v-else-if="step === 3"
                                @showSummary="isOrderSummaryShow = true"
                                :paymentMethods="paymentMethods"
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
                                    ? $t('Cost summary')
                                    : isLastStep
                                    ? $t('Payment')
                                    : $t('In your cart')
                            "
                            :isCheckoutButtonDisabled="
                                !cartList?.items ||
                                !Array.isArray(cartList?.items) ||
                                cartList?.items.length < 1
                            "
                            :dataRows="dataRows"
                            :items="cartList?.items"
                            :hasCheckoutButton="step === 1"
                            @checkoutClicked="addOrder"
                            :isEditable="step !== 1"
                            @editClicked="step = 1"
                            :summaryData="summaryData"
                            :isLastStep="isLastStep"
                            :isFail="confirmData.isFail"
                        />
                        <div v-if="step !== 1" class="flex flex-col">
                            <CheckoutProduct
                                v-for="item in cartList?.items"
                                :key="item.id"
                                :data="item"
                                isSideView
                            />
                        </div>
                    </div>
                </template>
            </BaseSplitLayout>
            <template v-if="step === 1">
                <div class="gridClass overflow-auto">
                    <div class="max-w-[1094px] w-full mx-auto">
                        <div
                            v-if="
                                favoriteState?.favorite_list &&
                                Array.isArray(favoriteState?.favorite_list) &&
                                favoriteState?.favorite_list.length > 0
                            "
                            class="flex flex-col gap-12"
                        >
                            <div
                                v-text="$t('Favorites')"
                                class="text-p8 text-[28px] font-medium"
                            />
                            <div class="flex flex-col gap-6">
                                <div class="flex gap-6">
                                    <!-- <MarketItem
                      v-for="(favorite, i) in $formatItems(
                        favoriteState.favorite_list.map((el) => el.Item)
                      )"
                      :key="favorite.id"
                      :isDisbaled="!(favorite?.state && favorite?.state === 'ready for sell')"
                      :data="favorite"
                      :isAdded="false"
                      :hasAddToCart="true"
                      :hasAddFavorite="true"
                      :isForFavorite="true"
                      :class="[
                        i > 1 ? 'hidden laptop:flex' : '',
                        i > 3 ? 'hidden' : '',
                      ]"
                    /> -->
                                </div>
                                <BaseButton
                                    styleType="text"
                                    :text="$t('View all favorites')"
                                    @click="
                                        $router.push({
                                            name: 'purchase',
                                            query: { favorite: true },
                                        })
                                    "
                                />
                            </div>
                        </div>
                        <!-- <div
                v-else-if="
                  cartList?.recommend &&
                  Array.isArray(cartList?.recommend) &&
                  cartList?.recommend.length > 0
                "
                class="flex flex-col gap-12"
              >
                <div
                  v-text="$t('You Might Also Like')"
                  class="text-p8 text-[28px] font-medium"
                />
                <div class="flex gap-6 overflow-x-auto">
                  <MarketItem
                    v-for="item in $formatItems(cartList?.recommend)"
                    :key="item.id"
                    :data="item"
                    :isDisbaled="item?.state && item?.state !== 'ready for sell'"
                    :hasAddToCart="true"
                    :isForFavorite="true"
                    @buttonClicked="item.id;"
                    :hasAddFavorite="true"
                  />
                </div>
              </div> -->
                    </div>
                </div>
            </template>
            <!-- <div v-if="isLastStep" class="flex laptop:justify-center">
          <BaseButton
            :text="$t('Print Order Confirmation')"
            styleType="outlined"
            class="w-full laptop:w-fit"
          />
        </div> -->
        </div>
        <!-- <ModalOrderSummary
        :isShow="isOrderSummaryShow"
        :items="items"
        :dataRows="dataRows"
        @close="isOrderSummaryShow = false"
      /> -->
    </div>
</template>

<script setup>
import { loadStripe } from "@stripe/stripe-js";
definePageMeta({
    name: "buy",
    key: (route) => route.fullPath,
    middleware: ["auth"],
    layout: false,
});
useHead({
    title: `LuxMax Cart: Your Choices Await`,
});

const config = useRuntimeConfig();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const step = ref(1);
const container = ref();
const { $formatItems } = useNuxtApp();

const isLoading = ref(true);

const cartList = useState("cartList");
const favoriteState = useState("favoriteState");
const addressesState = useState("addresses");
const cardsList = useState("cards");

const { cards } = useCheckout();
if (!cardsList.value) {
    const { data, error } = await cards();
}
const orderItems = ref([]);
const isLastStep = computed(() => {
    return step.value >= 5;
});

// const items = computed(() =>
//   isLastStep.value
//     ? $formatItems(orderItems.value)
//     : $formatItems(cartList.value?.data.map((el) => el.Item))
// );

const isOrderSummaryShow = ref(false);

const totalPrice = computed(
    () =>
        items?.value
            .filter((el) => !el.state || el.state === "ready for sell")
            ?.map((item) => item.price)
            .reduce((accumulator, Value) => accumulator + Value, 0) || 0
);

const finalForm = reactive({});
const finalTotalPrice = ref(0);

// const priceToShowComputed = computed(() =>
//   totalPrice.value !== 0 ? totalPrice.value : finalTotalPrice.value
// );
let dataRows = ref(null);

setTimeout(() => {
    dataRows.value = [
        {
            text: t("Subtotal"),
            amount: cartList?.value?.totalPrice ? cartList?.value?.totalPrice : 0,
            isSubtract: false,
        },
        {
            text: t("Delivery"),
            amount: "-",
            isSubtract: false,
        },
    ];
}, 1000);

//// step 2

const addressSelected = (data) => {
    Object.keys(data).forEach((key) => {
        finalForm[key] = data[key];
    });
    goToStep(3);
};

//// step 2.5

// const timeSelected = (time) => {
//   goToStep(4)
// }

// const times = [
//   {id: 0, text: 'Mon, Aug 22', value: Date.now()},
//   {id: 1, text: 'Mon, Aug 23', value: Date.now()},
//   {id: 2, text: 'Mon, Aug 24', value: Date.now()},
//   {id: 3, text: 'Mon, Aug 25', value: Date.now()},
// ]

//// step 3

const paymentMethods = [
    {
        id: 0,
        value: 0,
        text: t("Credit or Debit Card"),
        icon: "IconCreditCard",
    },
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

///// step 4

const { createOrder, checkout } = useCheckout();
const placeOrder = async () => {
    isLoading.value = true;
    const body = {
        cartId: cartList.value?.id,
        addressId: finalForm.addressId,
        creditCardId: finalForm.card_id,
    };
    const { data } = await createOrder({ body: body });
    const { data: checkoutData, error } = await checkout(data.value.id);
    if (!error.value) {
        location.replace(checkoutData.value.paymentUrl);
    }
    isLoading.value = false;
};

//// step 5

const summaryData = reactive({
    orderNumber: "",
    orderDate: 0,
});

const confirmData = reactive({
    isFail: true,
    successTitle: t("Your order has been successfully paid."),
    successButtonDesc: t("You can track the status of your item"),
    successButtonText: t("Order History"),
});

const successButtonClick = () => {
    router.push({ name: "purchase" });
};

//// previous steps

const finalStepPreviousStepsComputed = ref([]);

const previousSteps = computed(() => {
    const selectedAddress =
        addressesState?.value?.data.find(
            (el) => el.id === finalForm.addressId
        ) || {};
    const selectedCard =
        cardsList?.value?.data?.find((el) => el.id === finalForm.card_id) || {};

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
                        `${finalForm?.first_name} ${finalForm?.last_name}`,
                        finalForm?.phone_number,
                    ],
                },
                {
                    id: 1,
                    text: t("Ship to"),
                    array: [
                        selectedAddress?.postalCode || "",
                        selectedAddress?.address || "",
                        selectedAddress?.city || "",
                        selectedAddress?.country || "",
                    ],
                },
            ],
        },
        {
            id: 1,
            title: t("Estimated arrival date"),
            isEditable: false,
            step: 2,
            type: "arrivalDate",
            data: t("5-7 business days"),
        },
        {
            id: 2,
            title: t("Payment"),
            isEditable: true,
            step: 3,
            type: "payment",
            data: {
                type: selectedCard?.type || "",
                card_number: selectedCard?.cardNumber,
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
        text: t("Market"),
        action: () => {
            router.push({ name: "market" });
        },
    },
    {
        id: 2,
        text: t("Bag"),
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

//// scroll and mounted

const scrollToTop = () => {
    window.scrollTo({
        top: container.value?.offsetTop - 100,
        behavior: "smooth",
    });
};
if (route?.query?.step === "failed" || route?.query?.step === "success") {
    step.value = 5;
}

const addOrder = async () => {
    const { createOrder } = useCheckout();
    const { data } = await createOrder({
        body: {
            cartId: cartList.value?.id,
        },
    });
    router.push(`/order/${data.value.id}`);
};

onMounted(async () => {
    watch(
        () => step.value,
        () => {
            scrollToTop();
        }
    );
});

onBeforeMount(async () => {
    const { favorite_list } = useItem();
    const { cart } = useCheckout();
    isLoading.value = true;
    await cart();
    isLoading.value = false;
    await favorite_list();
});
</script>
