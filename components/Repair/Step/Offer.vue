<template>
  <div class="gridClass mb-6 laptop:mb-12">
    <div
      class="laptop:max-w-[672px] mx-auto w-full flex flex-col gap-4 text-center items-center"
    >
      <template v-if="step === 1">
        <div
          class="text-p8 font-medium laptop:text-[28px] leading-normal"
          v-text="$t('Choose Our Offers')"
        />
        <div class="w-full flex flex-col gap-4">
          <div
            class="flex flex-col laptop:flex-row w-full items-center justify-center laptop:p-10 gap-4"
          >
            <NuxtImg
              alt=""
              v-if="product.images[0].file.url"
              class="w-[160px] min-w-[160px]"
              :src="$config.public.BASE_URL + product.images[0].file.url"
              format="webp"
              quality="100"
            />
            <div
              class="flex flex-col gap-4 leading-normal text-center laptop:text-start"
            >
              <div
                class="font-title font-medium text-2xl laptop:text-3xl text-t10"
                v-text="product.brand?.name"
              />
              <div
                class="text-t7"
                v-text="
                  `${product?.name ? product?.name + ' - ' : ''}${
                    product.exteriorMaterial
                  } - ${product.exteriorColor}${
                    product.size ? ' - ' + product.size : ''
                  }`
                "
              />
            </div>
          </div>
          <div class="my-4 flex flex-col gap-4 w-full">
            <RepairOffer
              v-for="option in plans?.data.filter((el) => el?.primary)"
              isMain
              :key="option.plan"
              :title="option.plan.replaceAll('_', ' ').toLowerCase()"
              :payAtFirst="option?.payAtFirst || null"
              :price="
                option.repairPrice
                  ? option.repairPrice
                  : option.sellPrice > 0
                  ? option.sellPrice
                  : ''
              "
              :isDisabled="!option.repairPrice && option.sellPrice < 0"
              :desc="descriptions[option.plan]"
              @selected="selectOffer(option.plan)"
              :buttonText="
                option.plan == 'REPAIR_AND_SELL_IN_OUR_COMMUNITY'
                  ? 'Purchase'
                  : option.plan == 'INSTANT_SELL'
                  ? 'Sell to Luxmax'
                  : option.plan == 'REPAIR_AND_GET_BACK'
                  ? 'Purchase Product'
                  : 'Sell in Community'
              "
            />
            <div class="grid gap-4 laptop:grid-cols-3">
              <RepairOffer
                v-for="option in plans?.data.filter(
                  (el) => el !== plans?.data[0]
                )"
                :key="option.plan"
                :title="option.plan.replaceAll('_', ' ').toLowerCase()"
                :payAtFirst="option?.payAtFirst || null"
                :price="
                  option.repairPrice
                    ? option.repairPrice
                    : option.sellPrice > 0
                    ? option.sellPrice
                    : ''
                "
                :isDisabled="!option.repairPrice && option.sellPrice < 0"
                :desc="descriptions[option.plan]"
                @selected="selectOffer(option.plan)"
                :buttonText="
                  option.plan == 'REPAIR_AND_SELL_IN_OUR_COMMUNITY'
                    ? 'Purchase'
                    : option.plan == 'INSTANT_SELL'
                    ? 'Sell to Luxmax'
                    : option.plan == 'REPAIR_AND_GET_BACK'
                    ? 'Purchase Product'
                    : 'Sell in Community'
                "
              />
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="step === 2">
        <div
          class="text-p8 font-medium laptop:text-[28px] leading-normal capitalize"
          v-text="$t('Thank you for trusting us')"
        />
        <div class="w-full flex flex-col gap-4">
          <div
            class="text-t9"
            v-text="
              $t(
                'Our experts will contact you within the next 2 days to continue the process'
              )
            "
          />
          <a
            href="mailto:Support@LuxMax.ai"
            class="bg-p1 rounded-lg p-4 flex flex-row justify-center items-center gap-2 fill-p10 text-p10"
          >
            <IconMail class="w-6 h-6" />
            <div v-text="'Support@LuxMax.ai'" />
          </a>
        </div>
        <Form
          @submit="submitForm"
          :validation-schema="Schema"
          v-slot="{ meta }"
          class="flex-grow flex flex-col gap-4 w-full"
        >
          <div class="flex flex-col laptop:flex-row gap-4 [&>*]:w-full w-full">
            <BaseInputPhone
              v-model="form.phone"
              :maxlength="10"
              name="phone"
              :label="$t('Phone Number')"
              :placeholder="$t('Input text')"
              :selectedCountryCode="selectedCountryCode"
              @selectCountry="(code) => (selectedCountryCode = code)"
              noCountryChange
            />
            <BaseInput
              v-model="form.mail"
              :maxlength="40"
              name="mail"
              :label="$t('Email Address')"
              :placeholder="$t('Input text')"
            />
          </div>
          <div
            class="flex flex-row justify-center gap-4 [&>*]:w-full [&>*]:laptop:w-[120px] w-full"
          >
            <BaseButton
              styleType="outlined"
              buttonId="identify-back-offer"
              :text="$t('Back')"
              :isLoading="isLoading"
              @click="step = 1"
            />
            <BaseButton
              :text="$t('Submit')"
              buttonId="identify-select-offer"
              :isDisabled="!meta.valid"
              :isLoading="isLoading"
            />
          </div>
        </Form>
      </template>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import * as Yup from "yup";

const props = defineProps({
  offerOptions: Array,
  product: Object,
});

const emits = defineEmits(["offerSelected"]);

const { t } = useI18n();
const isLoading = ref(false);
const route = useRoute();
const router = useRouter();

const selectedCountryCode = ref("44");
const { $UKPhoneRegExp, $emailRegex } = useNuxtApp();
const account_info = useState("account_info");
if (!account_info.value) {
  const { account_info } = useAccount();
  const { data } = await account_info();
}
const step = ref(1);

const { productPlans } = useItem();
const { data: plans } = await productPlans(route.params.id);
const form = reactive({
  mail: account_info.value?.email,
  phone:
    (account_info.value?.phone &&
    account_info.value?.phone.split(" ").length === 2
      ? account_info.value?.phone.split(" ")[1]
      : "") || "",
});

const Schema = Yup.object().shape({
  phone: Yup.string()
    .matches($UKPhoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  mail: Yup.string().matches($emailRegex, "Email is not valid").required(),
});

const selectOffer = async (selectedOption) => {
  const { editProduct } = useItem();
  const { createOrder } = useCheckout();

  const { data, error } = await editProduct(route.params.id, {
    body: { plan: selectedOption },
  });
  if (data.value) {
    if (selectedOption === "REPAIR_AND_GET_BACK") {
      const { data: order } = await createOrder({
        body: { repairProductId: route.params.id },
      });
      if (order.value) {
        router.push(`/repair/${order.value.id}`);
      }
    } else {
      emits("offerSelected", selectedOption);
    }
  }
};

const descriptions = ref({
  REPAIR_AND_SELL_IN_OUR_COMMUNITY:
    "50% upfront payment, balance due upon item sale",
  INSTANT_SELL: "Estimate provided, final repair cost after expert inspection",
  SELL_WITHOUT_REPAIR:
    "Sell your item to us and receive payment just 5 days after we receive it",
  REPAIR_AND_GET_BACK:
    "Estimate provided, final repair cost after expert inspection",
});
</script>
