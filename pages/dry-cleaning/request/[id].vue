<template>
    <div
        ref="container"
        class="flex flex-col-reverse laptop:flex-row gap-8 laptop:py-16 py-6 laptop:px-36 px-4"
    >
        <div class="w-full laptop:w-3/5 mobile-sss:mb-64 laptop:mb-0">
            <dry-cleaning-step1
                v-if="step == 1"
                @addressSelected="addressSelected"
                :data="itemData"
            />
            <dry-cleaning-step2
                v-else-if="step == 2"
                @timeSelected="timeSelected"
                @back="back"
                :data="itemData"
            />
            <dry-cleaning-step3
                v-else-if="step == 3"
                @servicesChanged="servicesChanged"
                @back="back"
                @servicesSelected="servicesSelected"
                :data="itemData"
                :canProceed="canProceed"
                @openServices="isBottomSheetShow = true"
            />
            <dry-cleaning-step4
                v-else-if="step == 4"
                @infoSelected="infoSelected"
                @back="back"
                :servicesList="servicesList"
                :address="itemData?.address"
                :itemData="itemData"
                :totalPrice="totalPrice"
            />
        </div>
        <div class="w-2/5 hidden laptop:flex flex-col gap-4">
            <div class="w-full">
                <div class="bg-p1 rounded-2xl p-6">
                    <div
                        v-for="(item, index) in menuList"
                        :key="`item${index}`"
                        class="px-4 py-3 rounded-lg"
                        :class="
                            step == index + 1 ? 'text-p10 bg-p2' : 'text-p4'
                        "
                    >
                        <div v-if="index + 1 < step">
                            <div class="flex gap-5">
                                <div>
                                    <IconCheckCircle
                                        class="fill-p7 min-w-7 max-w-7 min-h-7 max-h-7"
                                    />
                                </div>
                                <div
                                    v-if="index == 0"
                                    class="pt-1 flex flex-col gap-2"
                                >
                                    <div v-text="item.name" class="text-p7" />
                                    <div
                                        v-text="
                                            `${itemData?.address?.postalCode} ${itemData?.address?.address}`
                                        "
                                        class="text-xs text-t4"
                                    />
                                </div>
                                <div
                                    v-else-if="index == 1"
                                    class="flex flex-col gap-4"
                                >
                                    <div class="flex flex-col gap-2">
                                        <div
                                            v-text="'Collection time'"
                                            class="text-p7"
                                        />
                                        <div
                                            v-text="
                                                `${DateTime.fromISO(
                                                    itemData?.startCollection
                                                )
                                                    .setZone('Europe/London')
                                                    .toLocaleString({
                                                        day: 'numeric',
                                                        month: 'long',
                                                        hour: 'numeric',
                                                        minute: '2-digit',
                                                    })}-${DateTime.fromISO(
                                                    itemData?.endCollection
                                                )
                                                    .setZone('Europe/London')
                                                    .toLocaleString({
                                                        day: 'numeric',
                                                        month: 'long',
                                                        hour: 'numeric',
                                                        minute: '2-digit',
                                                    })}`
                                            "
                                            class="text-xs text-t4"
                                        />
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <div
                                            v-text="'Delivery time'"
                                            class="text-p7"
                                        />
                                        <div
                                            v-text="
                                                `${DateTime.fromISO(
                                                    itemData?.startDelivery
                                                )
                                                    .setZone('Europe/London')
                                                    .toLocaleString({
                                                        day: 'numeric',
                                                        month: 'long',
                                                        hour: 'numeric',
                                                        minute: '2-digit',
                                                    })}-${DateTime.fromISO(
                                                    itemData?.endDelivery
                                                )
                                                    .setZone('Europe/London')
                                                    .toLocaleString({
                                                        day: 'numeric',
                                                        month: 'long',
                                                        hour: 'numeric',
                                                        minute: '2-digit',
                                                    })}`
                                            "
                                            class="text-xs text-t4"
                                        />
                                    </div>
                                </div>
                                <div
                                    v-if="index == 2"
                                    class="pt-1 flex flex-col gap-2"
                                >
                                    <div
                                        v-text="'Selected services'"
                                        class="text-p7"
                                    />
                                    <div class="text-xs text-t4">
                                        <template
                                            v-for="(
                                                servic, i
                                            ) in itemData?.services"
                                            :key="servic.itemId"
                                        >
                                            {{ i !== 0 ? ',' : ' '
                                            }}{{ servic.count }}x
                                            {{ servic.service.name }}
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>Step {{ index + 1 }}: {{ item.name }}</div>
                    </div>
                </div>
            </div>
            <div
                v-if="step >= 3"
                class="w-full bg-p1 rounded-2xl p-6 flex flex-col gap-8"
            >
                <div v-text="$t('Selected services')" class="text-xl text-p9" />
                <div
                    v-for="(service, index) in Object.keys(servicesList)"
                    :key="`service${index}`"
                    v-show="servicesList[service].count !== 0"
                    class="flex flex-col gap-6"
                >
                    <div class="flex justify-between items-center">
                        <div class="text-p8">
                            <span class="text-p4"
                                >{{ servicesList[service].count }}x</span
                            >
                            {{ servicesList[service].name }}
                        </div>
                        <div class="text-t9">
                            £{{ servicesList[service].price }}
                        </div>
                    </div>
                </div>
                <span class="h-[1px] w-full bg-t1" />
                <div class="flex justify-between items-center line-through">
                    <div class="text-p8">Total Price before discount</div>
                    <div class="text-t9">£{{ totalPrice }}</div>
                </div>
                <div class="coupon-area">
                    <Coupon @changeCoupon="couponChange" />
                </div>
                <div class="coupon_discount flex justify-between items-center" v-if="selectedCoupon">
                    <div class="text-p8">
                        Coupon Discount
                        <span :style="{ color: '#c09522' }" v-if="selectedCoupon && selectedCoupon.type === 'PERCENTAGE'">
                         (Extra {{ selectedCoupon.value }}% applied)
                        </span>
                    </div>
                    <div class="text-t9">£{{ couponDiscount  }}</div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-p8">Discount(15%)</div>
                    <div class="text-t9">£{{ totalPrice * 15 / 100  }}</div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-p8">Total Price</div>
                    <div class="text-t9">£{{ finalPrice }}</div>
                </div>
            </div>
        </div>
        <BaseBottomSheet
            isMobileOnly
            :isShow="isBottomSheetShow"
            @close="isBottomSheetShow = false"
            :title="$t('Selected services')"
        >
            <template #body>
                <div class="flex flex-col gap-6 w-full">
                    <div
                        v-for="(service, index) in Object.keys(servicesList)"
                        :key="`service${index}`"
                        v-show="servicesList[service].count !== 0"
                    >
                        <div class="flex justify-between items-center">
                            <div class="text-p8">
                                <span class="text-p4"
                                    >{{ servicesList[service].count }}x</span
                                >
                                {{ servicesList[service].name }}
                            </div>
                            <div class="text-t9">
                                £{{ servicesList[service].price }}
                            </div>
                        </div>
                    </div>
                    <span class="h-[1px] w-full bg-t1" />
                    <div class="flex justify-between items-center">
                        <div class="text-p8">Total Price</div>
                        <div class="text-t9">£{{ totalPrice }}</div>
                    </div>
                </div>
            </template>
        </BaseBottomSheet>
        <div
            class="laptop:hidden flex gap-1 text-sm items-center text-[#B0B1B1]"
        >
            <nuxt-link to="/">Home</nuxt-link>
            <span>/</span>
            <nuxt-link :to="{ name: 'dry-cleaning'}">Dry Cleaning</nuxt-link>
            <span>/</span>
            <div v-text="$t('Dry Cleaning Request')" class="text-[#4B4B4B]" />
        </div>
    </div>
</template>

<script setup>
import { DateTime } from 'luxon';
import { ref, computed, provide } from "vue";
import Coupon from "~/components/Checkout/coupon/coupon.vue"

const calcTotal = (services) => {
    let price = 0;

    Object.keys(services).forEach((el) => {
        const count = services[el].count;
        const p = services[el]?.price ? services[el]?.price : services[el]?.service?.price;
        price += p * count;
    });

    return price;
}


const router = useRouter();

const token = useCookie('token').value;
// const { ifPhoneExists } = useUser();

// if (!token) {
//     router.push({
//         name: 'login'
//     });

// }


definePageMeta({
    name: 'single-dry-cleaning-request',
    layout: 'default'
});


const isBottomSheetShow = ref(false);

const step = ref(2);
const defaultDiscountPercent = ref(15);

const itemData = ref(null);
const container = ref(null);
const selectedCoupon = ref(null);

const route = useRoute();

let sl = {};
let tp = 0;
let cp = false;

const getItemData = async () => {
    if (route.params.id) {
        const { getCleaning } = useItem();

        const { data, error } = await getCleaning(route.params.id);

        if (process.server) {
            console.log('Running on the server');
        } else {
            console.log('Running on the client');
        }

        if (data.value) {
            itemData.value = data.value;
            sl = data.value.services;
            tp = calcTotal(data.value.services);
            cp = tp > 30 ? true : false;
        }
    }
};

await getItemData();

const servicesList = ref(sl);
const totalPrice = ref(tp);
const canProceed = ref(cp);


const couponDiscount = computed(() => {
    let discount = 0;
    if(!selectedCoupon.value) return discount;
    if(selectedCoupon.value.type === "FIXED") {
        discount = selectedCoupon.value.value;
    } else if(selectedCoupon.value.type === "PERCENTAGE") {
        discount = selectedCoupon.value.value * totalPrice.value * 0.01
    }

    return discount;
});

const finalPrice = computed(() => {
    if(defaultDiscountPercent.value > 100 || defaultDiscountPercent.value < 0) {
        throw new Error('discount percent cannot be out of (0,100)');
    }

    const priceAfterDiscount = totalPrice.value * ((100 - defaultDiscountPercent.value) / 100);
    
    const price = couponDiscount.value ?
        (priceAfterDiscount - couponDiscount.value) :
        priceAfterDiscount;


    if(price <= 0) {
        selectedCoupon.value = null;
        return priceAfterDiscount;
    }

    return Math.round(price * 100) / 100;
});

if (route.params.id && itemData.value) {
    if (itemData.value.step === 'SELECT_TIMES') {
        step.value = 2;
        router.push({ query: { step: step.value } });
    } else if (itemData.value.step === 'SELECT_SERVICES') {
        step.value = 3;
        router.push({ query: { step: step.value } });
    } else {
        step.value = 4;
        router.push({ query: { step: step.value } });
    }
}

const back = () => {
    goToStep(step.value - 1);
};

const scrollToTop = () => {
    window.scrollTo({
        top: container.value?.offsetTop - 100,
        behavior: 'smooth',
    });
};

const goToStep = (index) => {
    step.value = index;
    scrollToTop();
};

const menuList = ref([
    { name: 'Address' },
    { name: 'Collection and Delivery time' },
    { name: 'Selected services' },
    { name: 'Contact info' },
]);
// step 1
const addressSelected = () => {
    goToStep(2);
};

//step 2
const timeSelected = () => {
    goToStep(3);
};

// step 3

// if(itemData.value) {
//     servicesList.value = itemData.value.servics;
//     totalPrice.value = calcTotal(itemData.value.servics);
//     canProceed.value = totalPrice.value > 30 ? true : false;
// }


provide("totalPrice", totalPrice);
provide("coupon", selectedCoupon);

const servicesChanged = (services) => {
    servicesList.value = services;
    
    totalPrice.value = calcTotal(services);

    if(totalPrice.value < 30) {
        canProceed.value = false;
    } else {
        canProceed.value = true;
    }
};


// step 4
const { createOrder, checkout } = useCheckout();

const infoSelected = async () => {
    const { data } = await createOrder({
        body: { 
            dryCleaningItemId: route.params.id,
            totalPrice,
            coupon: selectedCoupon.value
        },
    });
    const { data: checkoutData } = await checkout(data.value.id);

    location.replace(checkoutData.value.paymentUrl);
};
const servicesSelected = async () => {
    goToStep(4);
};

watch(
    () => step.value,
    () => {
        getItemData();
        router.push({ query: { step: step.value } });
    }
);

watch(
    () => route.query.step,
    () => {
        step.value = route.query.step;
    }
);

function isBeforeTomorrow(dateString) {
  // Parse the given date string
  const givenDate = new Date(dateString);

  // Get today's date
  const today = new Date();

  // Create a new Date object for tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  // Set the time of tomorrow to the start of the day (00:00:00)
  tomorrow.setHours(0, 0, 0, 0);

  // Compare the given date with tomorrow
  return givenDate < tomorrow;
}

function couponChange(couponData) {
    selectedCoupon.value = couponData;
}
</script>
