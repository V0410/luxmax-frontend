<template>
  <div class="w-full flex flex-col my-6 gap-6 laptop:gap-12 text-center">
    <div class="gridClass flex flex-col gap-12 items-center">
      <div class="flex flex-col gap-8 max-w-[672px] w-full">
        <div
          class="text-p8 font-medium laptop:text-[28px] leading-normal"
          v-text="$t('Choose Item Brand')"
        />
      </div>
      <div class="flex gap-6 flex-wrap justify-center w-full max-w-[672px]">
        <div
          class="grid gap-4 w-full grid-cols-2 laptop:grid-cols-3"
          :class="isShowAllBrands ? '' : '[&>*:nth-child(n+13)]:hidden'"
        >
          <RepairSize
            v-if="
              brands_List?.data.filter((el) => props?.model === el.name)
                .length === 0 && props?.model
            "
            :text="props?.model"
            :isSelected="form.brand_name === props?.model"
            @click="
              (form.brand_name = props?.model), (form.brandId = props.brandId)
            "
            class="w-full"
          />
          <RepairSize
            v-for="brand in brands_List?.data.filter(
              (el) => props?.model === el.name
            )"
            :key="brand.id"
            :text="brand.name"
            :isSelected="form.brand_name === brand.name"
            @click="(form.brand_name = brand.name), (form.brandId = brand.id)"
            class="w-full"
          />
          <RepairSize
            v-for="brand in brands_List?.data.filter(
              (el) => props?.model !== el.name
            )"
            :key="brand.id"
            :text="brand.name"
            :isSelected="form.brand_name === brand.name"
            @click="(form.brand_name = brand.name), (form.brandId = brand.id)"
            class="w-full"
          />
          <RepairSize
            :text="'Other'"
            :isSelected="form.brand_name === 'Other'"
            @click="form.brand_name = 'Other'"
            class="w-full"
          />
        </div>
        <div
          class="w-full flex flex-col gap-4 text-start"
          v-show="form.brand_name === 'Other'"
        >
          <BaseAlert
            class="w-full cursor-default"
            type="warning"
            :desc="
              $t(
                'Luxmax cannot buy or sell unsupported brands, but we provide repair services. For more information, please see our terms and conditions.'
              )
            "
            noClose
          />
          <BaseInput
            v-model="form.customBrand"
            :maxlength="50"
            class="w-full"
            :label="$t('Name of the Brand')"
            :placeholder="$t('e.g Mullberry')"
          />
        </div>
        <div
          class="w-full flex items-center gap-4 cursor-pointer"
          v-show="
            brands_List?.data &&
            Array.isArray(brands_List?.data) &&
            brands_List?.data.length > 12
          "
          @click="isShowAllBrands = !isShowAllBrands"
        >
          <div class="w-full border-b border-p4" />
          <div
            class="flex items-center gap-2.5 whitespace-nowrap leading-normal"
          >
            <div v-text="isShowAllBrands ? $t('Show Less') : $t('Show more')" />
            <IconArrowDown
              class="w-6 h-6 fill-t9"
              :class="isShowAllBrands ? 'rotate-180' : ''"
            />
          </div>
          <div class="w-full border-b border-p4" />
        </div>
      </div>
      <!-- <div class="flex flex-col gap-8 max-w-[672px] w-full">
      <div
        class="text-p8 font-medium laptop:text-[28px] leading-normal"
        v-text="$t('Submit Series Detail')"
      />
    </div>
    <div
      class="flex gap-6 flex-col justify-center w-full max-w-[672px]"
    >
        <BaseAlert v-show="isSeriesAlertShow" noClose class="w-full" type="info" :desc="$t('You have the option to fill out a form that can assist us in identifying your product.')" noIcon />
        <div class="flex flex-col laptop:flex-row gap-4 [&>*]:w-full w-full">
            <BaseInput v-model="form.yearOfManufacturing" :maxlength="10" :label="$t('Year of Manufacturing')" :placeholder="$t('e.g 1990')" />
            <BaseInputDropdown :options="countryOfOriginOptions" v-model="form.countryOfOrigin" :label="$t('Country of Origin')" :placeholder="$t('Choose Country')" />
        </div>
    </div> -->
      <div
        class="flex gap-4 justify-center [&>*]:w-full [&>*]:laptop:w-[120px] w-full"
      >
        <BaseButton
          buttonId="identify-select-brand"
          styleType="outlined"
          :text="$t('Back')"
          @click="$emit('back')"
        />
        <BaseButton
          buttonId="identify-back-brand"
          :text="$t('Next')"
          @click="submit"
          :isLoading="isLoading"
          :isDisabled="
            form.brand_name === 'other' ? !form.customBrand : !form.brand_name
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import countryCodes from "country-calling-code";

const props = defineProps({
  model: String,
  isLoading: Boolean,
});

const emits = defineEmits(["modelEnterd"]);

const { brands } = useItem();
const { data: brands_List } = await brands(1, 60);
// const brands_List = ref(null)
// brands_List.value = data.value

const countryCodesArray = Array.isArray(countryCodes)
  ? countryCodes
  : countryCodes.codes;

const { t } = useI18n();

const isShowAllBrands = ref(false);
const isSeriesAlertShow = ref(true);

const form = reactive({
  brand_name: props?.model || "",
  brandId: brands_List.value?.data.filter((el) => props?.model === el.name)[0]
    ?.id,
  customBrand: "",
});
const countryOfOriginOptions = countryCodesArray.map((el) => {
  return { id: el.country, text: el.country, value: el.country };
});

const submit = () => {
  emits("modelEnterd", form);
};

// onBeforeMount(async () => {
//   const brandsList = useState('brandsList')

//   if(!brandsList.value){
//     await brands_List()
//   }
//   brands.value = brandsList.value.map(el => {
//     return { id: el.id, value: el.name, label: el.name}
//   })
//   brands.value.push({ id: 500000, value: "other", label: t("Other")})
// });
</script>
