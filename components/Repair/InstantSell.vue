<template>
  <div>
    <div
      v-if="step === 1"
      class="w-full flex flex-col mb-6 gap-6 laptop:gap-12"
    >
      <div class="gridClass laptop:max-w-[672px]">
        <div
          class="mx-auto w-full flex flex-col gap-10 text-center items-center"
        >
          <div class="flex flex-col gap-4">
            <div
              class="text-p8 font-medium laptop:text-[28px] leading-normal text-start laptop:text-center"
              v-text="$t('What is Instant Sell?')"
            />
            <div
              class="flex flex-col gap-4 w-full text-t7 text-start text-sm laptop:text-base"
            >
              <div
                v-text="
                  $t(
                    'Instant Sell by Luxmax: Your luxury items purchased swiftly, at a fixed price, hassle-free.'
                  )
                "
              />
              <div
                v-text="
                  $t(
                    `Instant Sell, a premium service offered by Luxmax, redefines convenience. With Instant Sell, we provide a seamless solution to selling your luxury items. Say goodbye to the uncertainty of negotiations – our experts evaluate your product and offer an exact price. It's a swift and hassle-free process, ensuring you receive fair value for your luxury items without the wait. Experience the epitome of efficiency with Luxmax's Instant Sell service.`
                  )
                "
              />
            </div>
          </div>
          <div class="flex flex-col gap-4 text-start w-full">
            <div
              class="text-t9 text-lg font-medium"
              v-text="$t('Benefit of Instant Sell')"
            />
            <div
              class="grid laptop:grid-cols-2 gap-4 laptop:gap-8 text-p10 font-medium"
            >
              <div
                v-for="item in benefits"
                :key="item.id"
                class="flex gap-4 items-center"
              >
                <IconViewer :name="item.icon" class="h-10" />
                <div v-text="item.text" />
              </div>
            </div>
          </div>

          <div class="flex gap-4 w-full justify-center">
            <div class="w-full laptop:w-[120px]">
              <BaseButton
                buttonId="identify-instant-sell-back"
                size="m"
                styleType="outlined"
                :text="$t('Back')"
                @click="$emit('back')"
              />
            </div>
            <BaseButton
              buttonId="identify-instant-sell-submit"
              class="w-full laptop:w-[230px]"
              :isLoading="isLoading"
              size="m"
              :text="$t('Sell to Luxmax')"
              @click="step = 2"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="step === 2" class="flex flex-col gap-12" id="paymentAddress">
      <div class="flex flex-col items-center gap-6">
        <IconPackage class="w-20 h-20 fill-p7" />
        <div
          v-text="'Next Step: send your item to us'"
          class="text-p8 text-2xl text-center w-1/4"
        />
      </div>
      <div class="flex flex-col gap-4 px-32">
        <div class="p-6 rounded-2xl border border-p2 flex items-center gap-6">
          <div
            v-text="1"
            class="w-10 min-w-[40px] h-10 rounded-full bg-p1 flex items-center justify-center font-semibold text-xl text-p7"
          />
          <div
            v-text="
              `Scan the QR code and either print or write down the 16-digit code if you can't print it.`
            "
            class="w-[50%] min-w-[50%] text-lg text-t7"
          />
          <div class="flex w-full gap-2 items-center">
            <NuxtImg src="/img/QCode.png" class="w-[90px] h-[90px]" />
            <div class="flex flex-col rounded-xl p-4 bg-p1 w-full gap-4">
              <div v-text="'Tracking Code:'" />
              <div class="flex justify-between text-p8">
                <div v-text="9874" />
                <div v-text="6987" />
                <div v-text="1478" />
                <div v-text="3647" />
              </div>
            </div>
          </div>
        </div>
        <div class="p-6 rounded-2xl border border-p2 flex items-center gap-6">
          <div
            v-text="2"
            class="w-10 min-w-[40px] h-10 rounded-full bg-p1 flex items-center justify-center font-semibold text-xl text-p7"
          />
          <div
            v-text="
              `Bring your item and the first step paper to your chosen post office and send them to our address.`
            "
            class="w-[50%] min-w-[50%] text-lg text-t7"
          />
          <div class="flex flex-col rounded-xl p-4 bg-p1 w-full gap-4">
            <div class="flex flex-col gap-2">
              <div v-text="'LuxMax Address:'" class="text-t7 text-[10px]" />
              <div
                v-text="
                  '8272829 - 1410 Autocenter Dr - Walnut Creek - London - UK'
                "
                class="text-t9 text-xs"
              />
            </div>
            <div class="flex flex-col gap-2">
              <div v-text="'Receiver Info:'" class="text-t7 text-[10px]" />
              <div
                v-text="'Behdad barzegar | +44 9157634826'"
                class="text-t9 text-xs"
              />
            </div>
          </div>
        </div>
        <div class="p-6 rounded-2xl border border-p2 flex items-center gap-6">
          <div
            v-text="3"
            class="w-10 min-w-[40px] h-10 rounded-full bg-p1 flex items-center justify-center font-semibold text-xl text-p7"
          />
          <div
            v-text="
              `View the status of your item upon arrival on the sales history page and withdraw your profit after 5 days.`
            "
            class="w-full text-lg text-t7"
          />
          <NuxtLink :to="{ name: 'sale' }">
            <BaseButton
              buttonId="identify-instant-sell-history"
              styleType="outlined"
              text="Sales history"
            />
          </NuxtLink>
        </div>
        {{ productInfo }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
  suggestedPrice: String,
});
defineEmits(["back"]);
const { t } = useI18n();
const step = ref(2);
const route = useRoute();

const { product } = useItem();
const { data: productDetail, error } = await product(route.params?.id);

const benefits = [
  { id: 0, text: t("Quick sale of the product"), icon: "IconQuickSale" },
  { id: 1, text: t("No need for repair costs"), icon: "IconRepairCost" },
  {
    id: 2,
    text: t("No need to interact with other buyers"),
    icon: "IconBuyerIntract",
  },
  { id: 3, text: t("Higher price to sell"), icon: "IconHigherPrice" },
];

const isLoading = ref(false);

const submitForm = async () => {
  isLoading.value = true;
  isLoading.value = false;
};
</script>
