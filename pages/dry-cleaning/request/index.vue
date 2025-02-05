<template>
  <div
    ref="container"
    class="flex flex-col-reverse laptop:flex-row gap-8 laptop:py-16 mobile-sss:pt-6 mobile-sss:pb-0 table:py-6 laptop:px-36 px-4"
  >
    <div class="w-full laptop:w-3/5">
      <dry-cleaning-step1 v-if="step == 1" @addressSelected="addressSelected" />
      <dry-cleaning-step2
        v-else-if="step == 2"
        @timeSelected="timeSelected"
        @back="back"
      />
      <dry-cleaning-step3
        v-else-if="step == 3"
        @servicesChanged="servicesChanged"
        @back="back"
        @servicesSelected="servicesSelected"
      />
      <dry-cleaning-step4
        v-else-if="step == 4"
        @infoSelected="infoSelected"
        @back="back"
        :address="itemData?.address"
      />
    </div>
    <div class="w-2/5 hidden laptop:flex flex-col gap-4">
      <div class="w-full">
        <div class="bg-p1 rounded-2xl p-6">
          <div
            v-for="(item, index) in menuList"
            :key="`item${index}`"
            class="px-4 py-3 rounded-lg"
            :class="step == index + 1 ? 'text-p10 bg-p2' : 'text-p4'"
          >
            <div v-if="index + 1 < step">
              <div class="flex gap-5">
                <IconCheckCircle class="fill-p7" />
                <div v-if="index == 0" class="pt-1 flex flex-col gap-2">
                  <div v-text="item.name" class="text-p7" />
                  <div
                    v-text="
                      `${itemData?.address?.postalCode} ${itemData?.address?.address}`
                    "
                    class="text-xs text-t4"
                  />
                </div>
                <div v-else-if="index == 1" class="flex flex-col gap-4">
                  <div class="flex flex-col gap-2">
                    <div v-text="'Collection time'" class="text-p7" />
                    <div
                      v-text="
                        `${itemData?.startCollection
                          .split('.')[0]
                          .replace('T', ' ')} - ${itemData?.endCollection
                          .split('.')[0]
                          .replace('T', ' ')}`
                      "
                      class="text-xs text-t4"
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <div v-text="'Delivery time'" class="text-p7" />
                    <div
                      v-text="
                        `${itemData?.startDelivery
                          .split('.')[0]
                          .replace('T', ' ')} - ${itemData?.endDelivery
                          .split('.')[0]
                          .replace('T', ' ')}`
                      "
                      class="text-xs text-t4"
                    />
                  </div>
                </div>
                <div v-if="index == 2" class="pt-1 flex flex-col gap-2">
                  <div v-text="'Selected services'" class="text-p7" />
                  <div class="text-xs text-t4">
                    <template
                      v-for="(servic, i) in itemData?.services"
                      :key="servic.itemId"
                    >
                      {{ i !== 0 ? "," : " " }}{{ servic.count }}x
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
        v-if="step == 3"
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
              <span class="text-p4">{{ servicesList[service].count }}x</span>
              {{ servicesList[service].name }}
            </div>
            <div class="text-t9">£{{ servicesList[service].price }}</div>
          </div>
        </div>
        <span class="h-[1px] w-full bg-t1" />
        <div class="flex justify-between items-center">
          <div class="text-p8">Total Price</div>
          <div class="text-t9">£{{ totalPrice }}</div>
        </div>
      </div>
    </div>
    <div class="laptop:hidden flex gap-1 text-sm items-center text-[#B0B1B1]">
      <nuxt-link to="/">Home</nuxt-link>
      <span>/</span>
      <nuxt-link :to="{name: 'dry-cleaning'}">Dry Cleaning</nuxt-link>
      <span>/</span>
      <div v-text="$t('Dry Cleaning Request')" class="text-[#4B4B4B]" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  name: "dry-cleaning-request",
  layout: "default"
});

const route = useRoute();
const router = useRouter();


const step = ref(1);
router.push({ query: { step: step.value } });

const itemData = ref(null);
const container = ref(null);

const getItemData = async () => {
  setTimeout(async () => {
    if (route.params.id) {
      const { getCleaning } = useItem();
      const { data } = await getCleaning(route.params.id);
      itemData.value = data.value;
    }
  }, 500);
};
await getItemData();

if (route.params.id && itemData.value) {
  if (itemData.value.step === "SELECT_TIMES") {
    step.value = 2;
    router.push({ query: { step: step.value } });
  } else if (itemData.value.step === "SELECT_SERVICES") {
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
    behavior: "smooth",
  });
};

const goToStep = (index) => {
  step.value = index;
  scrollToTop();
};


const menuList = ref([
  { name: "Address" },
  { name: "Collection and Delivery time" },
  { name: "Selected services" },
  { name: "Contact info" },
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
const servicesList = ref({});
const totalPrice = ref(0);
const servicesChanged = (services) => {
  servicesList.value = services;
  let price = 0;
  Object.keys(services).forEach((el) => {
    price += services[el].price * services[el].count;
  });
  totalPrice.value = price;
};

// step 4
const { createOrder, checkout } = useCheckout();
const infoSelected = async () => {
  const { data } = await createOrder({
    body: { dryCleaningItemId: route.params.id },
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
  }
);
</script>
