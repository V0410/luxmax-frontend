<template>
  <div class="couponWrapper">
    <div class="couponSelectWrapper" v-if="!isCouponSelected">
      <p>Do you have any coupon ?</p>
      <div class="couponSelect my-2" @click="openCouponList">
        <button class="flex justify-between p-4 w-full" v-if="selectedCoupon">
          <p class="title">{{ selectedCoupon.code }}</p>
          <p class="underline">Change</p>
        </button>
        <button class="flex justify-between p-4 w-full" v-if="!selectedCoupon">
          <p class="title">Apply coupon</p>
          <p class="underline">Select</p>
        </button>
        <Alert
          v-if="!canApplyCoupon"
          title="Select items above 30 pounds"
          type="warning"
          description="You should select some items and sum should go above 30 pounds!"
          show-icon
          @close="canApplyCoupon = true"
        />
      </div>
    </div>
    <div class="couponListWrapper my-2" v-if="isCouponSelected">
      <div class="backHeader mb-2">
        <p
          class="flex items-center cursor-pointer"
          @click="isCouponSelected = false"
        >
          <IconArrowLeft /> <span class="ms-1">Apply Coupon</span>
        </p>
      </div>
      <div class="CouponControl">
        <label for="couponcode" class="w-full block">Coupon Code</label>
        <input
          type="text"
          name="couponcode"
          id="couponcode"
          class="p-3 w-full my-1"
          v-model="inputCoupon"
          placeholder="Enter Coupon Code"
        />
        <button class="couponBtn w-full my-1 p-2" @click="applyInputCoupon">
          Apply
        </button>
      </div>
      <!-- <template v-if="couponList && couponList.length">
        <button
          class="couponBtn btn-small w-full my-1"
          v-for="(coupon, index) in couponList"
          :key="coupon.code + index"
          @click="applyCoupon(coupon)"
        >
          <p class="flex justify-between mb-2">
            <span class="couponCode text-sm" v-if="coupon.code">{{
              coupon.code
            }}</span
            ><span class="font-semibold text-sm">Apply</span>
          </p>
          <p class="flex justify-between">
            <span class="description text-sm" v-if="coupon.description">{{
              coupon.description
            }}</span
            ><span class="font-semibold text-sm" v-if="coupon.endAt"
              >Exp: {{ coupon.endAt }}</span
            >
          </p>
        </button>
      </template> -->
    </div>
    <Alert
      v-if="isInValidCoupon"
      title="Invalid Coupon"
      type="danger"
      description="The coupon code you entered is not valid. Please try again."
      show-icon
      @close="isInValidCoupon = false"
    />
  </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import Alert from "~/components/Base/Alert.vue";

const isCouponSelected = ref(false);
const canApplyCoupon = ref(true);
const couponList = ref([]);
const selectedCoupon = ref(null);
const inputCoupon = ref("");
const isInValidCoupon = ref(false);
let errorMsg = ref('Invalid Coupon');

// Start interval when component is mounted
let intervalId = null;

const startInterval = () => {
  intervalId = setInterval(() => {
    if (!canApplyCoupon.value) {
      canApplyCoupon.value = true;
    }
  }, 2500);
};

const stopInterval = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
};

onMounted(() => {
  startInterval();
});

onUnmounted(() => {
  stopInterval();
});

const emit = defineEmits(["changeCoupon"]);

const totalPrice = inject("totalPrice");

const couponDiscount = computed(() => {
  let discount = 0;
  if (!selectedCoupon.value) return discount;
  if (selectedCoupon.value.type === "FIXED") {
    discount = selectedCoupon.value;
  } else if (selectedCoupon.value.type === "PERCENTAGE") {
    discount = selectedCoupon.value * totalPrice.value * 0.01;
  }
  return discount;
});

const shouldApplyCoupon = computed(() => {  
  const price = couponDiscount.value
    ? (totalPrice.value * 85) / 100 - couponDiscount.value
    : (totalPrice.value * 85) / 100;
  if (price <= 0) {
    selectedCoupon.value = null;
    return (totalPrice.value * 85) / 100;
  }
  return price;
});

async function applyCoupon(coupondetails) {
  const data = await checkCoupon(coupondetails.code);
  selectedCoupon.value = coupondetails;
  // if (!shouldApplyCoupon.value) return;
  isCouponSelected.value = false;
  emit("changeCoupon", coupondetails);
}

async function openCouponList() {
  if (!totalPrice.value || totalPrice.value < 30) {
    canApplyCoupon.value = false;
    return;
  }
  isCouponSelected.value = true;
  try {
    const { getCoupons } = useCheckout();
    const { data } = await getCoupons();
    couponList.value = data.value.data;
  } catch (error) {
    console.warn("There was some error while getting coupon list", error);
  }
}

async function applyInputCoupon() {
  if (!inputCoupon.value) return;
  const data = await checkCoupon(inputCoupon.value);
  if (data) {
    selectedCoupon.value = data.value;
    isCouponSelected.value = false;
    emit("changeCoupon", selectedCoupon.value);
  } else {
    isInValidCoupon.value = true;
  }
}

async function checkCoupon(code) {
  const { getCouponDetail } = useCheckout();
  const { data, error } = await getCouponDetail(code);
  if (data?.statusCode == 404 || error?.value){
    isInValidCoupon.value = true;
    errorMsg = error?.value;
  }
  return data;
}
</script>

<style>
.couponSelect {
  border: 1px dashed #3a7e69;
  border-radius: 4px;
}
.couponBtn {
  background-color: #fff9e6;
  padding: 20px;
  border-radius: 4px;
}
.btn-small {
  padding: 0.5rem;
}
</style>
