<template>
  <div class="w-full flex flex-col mb-6 gap-6 laptop:gap-12">
    <div class="gridClass laptop:max-w-[672px]">
      <Form
        @submit="submitForm"
        :validation-schema="Schema"
        v-slot="{ meta, errors }"
      >
        <div
          class="mx-auto w-full flex flex-col gap-6 laptop:gap-10 text-center items-center"
        >
          <div class="flex flex-col gap-4 w-full justify-center">
            <div
              class="text-p8 font-medium laptop:text-[28px] leading-normal"
              v-text="$t('Set a price for your product')"
            />
            <div
              class="flex flex-col laptop:flex-row justify-center items-center gap-4 laptop:p-10"
            >
              <NuxtImg
                alt=""
                class="w-[160px] min-w-[160px]"
                :src="config?.public?.BASE_URL + data?.images[0]?.file?.url"
                format="webp"
                quality="100"
              />
              <div
                class="flex flex-col gap-4 leading-normal text-center laptop:text-start"
              >
                <div
                  class="font-title font-medium text-2xl laptop:text-3xl text-t10"
                  v-text="data.brand?.name"
                />
                <!-- <div
                  class="text-t7 text-sm laptop:text-base"
                  v-text="data?.features?.join(' - ')"
                /> -->
              </div>
            </div>
            <div class="flex flex-col gap-2 text-start">
              <BaseInput
                name="price"
                :maxlength="10"
                v-model="form.price"
                size="l"
                startText="£"
                :label="$t('Enter the price')"
                noErrorMessage
              />
              <div
                v-if="maxAndMinPrice.min && maxAndMinPrice.max"
                class="text-sm"
                :class="errors.price ? 'text-danger' : 'text-t6 '"
                v-text="
                  $t('Valid price range for this product:', {
                    min: maxAndMinPrice.min,
                    max: maxAndMinPrice.max,
                  })
                "
              />
            </div>
          </div>
          <div
            v-if="
              meta.dirty &&
              meta?.valid &&
              maxAndMinPrice.min &&
              maxAndMinPrice.max
            "
            class="bg-p1 p-6 w-full flex flex-col gap-10 text-start"
          >
            <div class="flex flex-col gap-6">
              <div
                class="text-t9 text-sm laptop:text-lg font-medium"
                v-text="
                  probabilityOfSelling.value > 75
                    ? $t(`The price you've set for your product is high`)
                    : probabilityOfSelling.value > 50
                    ? $t(
                        `Congratulations on setting a good price for your product!`
                      )
                    : $t(
                        `You've priced your product quite low, which may attract buyers.`
                      )
                "
              />
              <div class="flex flex-col">
                <div
                  class="h-10"
                  style="
                    background: linear-gradient(
                      90deg,
                      rgba(255, 0, 0, 0.6) 0%,
                      rgba(255, 245, 0, 0.6) 50%,
                      rgba(4, 195, 0, 0.6) 100%
                    );
                  "
                />
                <div
                  class="flex"
                  :class="
                    probabilityOfSelling.value > 75
                      ? 'justify-start'
                      : probabilityOfSelling.value > 50
                      ? 'justify-center'
                      : 'justify-end'
                  "
                >
                  <div class="flex flex-col gap-2 items-center">
                    <IconTriangle
                      class="fill-p7 w-4 h-4 laptop:w-5 laptop:h-5"
                    />
                    <div
                      class="text-p7 text-xs laptop:text-sm font-medium leading-normal"
                      v-text="$t('Probability of Selling')"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="text-t7 text-xs laptop:text-base"
              v-text="
                probabilityOfSelling.value > 75
                  ? $t(
                      `This price may result in a lower chance of selling or a longer time to sell, consider adjusting the price to attract more potential buyers.`
                    )
                  : probabilityOfSelling.value > 50
                  ? $t(
                      `However, by slightly reducing the price, you can increase the chances of selling it and potentially shorten the time it takes to find a buyer.`
                    )
                  : $t(
                      `However, keep in mind that asking for a higher price could decrease the chances of selling the product and potentially extend the time it takes to find a buyer.`
                    )
              "
            />
            <div class="flex gap-2">
              <div class="text-t7 text-sm" v-text="$t('Luxmax Suggestion:')" />
              <div
                class="text-t10 font-bold text-sm laptop:text-base"
                v-text="`£${maxAndMinPrice.min} - £${maxAndMinPrice.max}`"
              />
            </div>
          </div>
          <div class="text-start w-full flex flex-col gap-2">
            <div class="text-xs laptop:text-base">
              <span
                class=""
                v-text="
                  $t(
                    'Write the details and interesting points of your ad completely and accurately'
                  )
                "
              />
              <span class="text-t4" v-text="' ' + $t('(optional)')" />
            </div>
            <textarea
              name="productdetails"
              v-model="form.productdetails"
              rows="5"
              class="border border-t9 p-2 ps-4 rounded-lg placeholder:text-t4 text-xs laptop:text-base"
              :placeholder="$t('Description')"
            />
          </div>
          <div class="bg-p1 p-4 w-full flex flex-col gap-4 text-start">
            <div class="text-lg text-t9 font-medium" v-text="$t('Hint')" />
            <ul class="list-disc ms-4 [&>*]:my-2.5 text-t7">
              <li
                v-text="
                  $t(
                    'Products with accurate and detailed descriptions have a sales rate of 96% within one week.'
                  )
                "
              />
              <li
                v-text="
                  $t(
                    'Feel free to provide specific details about the product, such as dimensions or materials used.'
                  )
                "
              />
            </ul>
          </div>
          <div
            class="flex gap-4 w-full justify-center [&>*]:w-full laptop:[&>*]:w-[120px]"
          >
            <div>
              <BaseButton
                buttonId="identify-repair-and-sell-back"
                size="s"
                styleType="outlined"
                :text="$t('Back')"
                @click="$emit('back')"
              />
            </div>
            <BaseButton
              buttonId="identify-repair-and-sell-submit"
              size="s"
              type="submit"
              :text="$t('Submit')"
              @click="selectSize"
              :isLoading="isLoading"
              :isDisabled="!meta?.valid"
            />
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
  suggestedPrice: String,
});
import { Form } from "vee-validate";
import * as Yup from "yup";
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const config = useRuntimeConfig();

const { productPlans } = useItem();
const { data: plans } = await productPlans(route.params.id);

const sellPlan = plans.value.data.filter(
  (el) => el.plan === "REPAIR_AND_SELL_IN_OUR_COMMUNITY"
)[0];

defineEmits(["back"]);
const form = reactive({
  price: "",
  productdetails: "",
});

const probabilityOfSelling = computed(() => {
  return {
    value:
      ((+form.price - maxAndMinPrice.value.min) /
        (maxAndMinPrice.value.max - maxAndMinPrice.value.min)) *
      100,
  };
});

const maxAndMinPrice = computed(() => {
  return { min: sellPlan?.minSellPrice, max: sellPlan?.maxSellPrice };
});

const Schema = Yup.object().shape({
  price:
    maxAndMinPrice.value.min && maxAndMinPrice.value.max
      ? Yup.number()
          .min(maxAndMinPrice.value.min, "less than min")
          .max(maxAndMinPrice.value.max, "more than max")
      : "",
  productdetails: Yup.string(),
});

const isLoading = ref(false);

const submitForm = async () => {
  isLoading.value = true;
  const { editProduct } = useItem();
  const { data, error } = await editProduct(route.params.id, {
    body: { price: parseInt(form.price) },
  });
  const { createOrder } = useCheckout();
  const { data: order } = await createOrder({
    body: { repairProductId: route.params.id },
  });
  if (order.value) {
    router.push(`/repair/${order.value.id}`);
  }
  isLoading.value = false;
};
</script>
