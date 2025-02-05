<template>
  <Form
    @submit="submitForm"
    :validation-schema="isAddAddressManualy ? manualSchema :Schema"
    v-slot="{ errors }"
    class="flex-grow flex flex-col gap-8"
  >
    <BaseModal
      type="left"
      hasClose
      isDesktopOnly
      size="l"
      :isShow="isShow"
      @close="$emit('close')"
      :title="$t('Add Address')"
    >
      <template #body>
        <div class="flex flex-col">
          <div class="flex flex-col gap-4">
            <BaseInputDropdown
              v-if="!isAddAddressManualy"
              name="postal_code"
              :label="$t('Post code')"
              v-model="form.postal_code"
              :options="postalCodeOptions"
            />
            <div class="flex flex-col gap-4">
              <BaseInput name="house_name" 
                :maxlength="30"
                :isDisabled="!isAddAddressManualy && (!form.postal_code || errors.postal_code)" :label="$t('House name/number')" />
              <div class="flex justify-between [&>*]:w-full gap-4">
                <BaseInput
                  name="Address1"
                  :maxlength="50"
                  v-model="form.address1"
                  :isDisabled="!isAddAddressManualy && (!form.postal_code || errors.postal_code)"
                  :label="$t('Address 1')"
                />
                <BaseInput
                  name="Address2"
                  :maxlength="50"
                  v-model="form.address2"
                  :isDisabled="!isAddAddressManualy && (!form.postal_code || errors.postal_code)"
                  :label="$t('Address 2 (Optional)')"
                />
              </div>
              <div class="flex justify-between [&>*]:w-full gap-4">
                <BaseInput
                  name="city"
                  :maxlength="30"
                  v-model="form.city"
                  :isDisabled="!isAddAddressManualy && (!form.postal_code || errors.postal_code)"
                  :label="$t('City')"
                />
                <BaseInputDropdown
                  name="Country"
                  v-model="form.country"
                  :label="$t('Country')"
                  :isDisabled="!isAddAddressManualy && (!form.postal_code || errors.postal_code)"
                  :options="countryList"
                />
              </div>
            </div>
            <div class="flex flex-row justify-end">
              <!-- <BaseButton styleType="text" startIcon="IconPlus" :text="isAddAddressManualy ? $t('Add address by postal code') : $t('Add address manually')" @click="toggleAddAddressManualy" /> -->
              <BaseButton :text="$t('Add address')"  />
            </div>
          </div>
        </div>
      </template>
    </BaseModal>
    <BaseBottomSheet
      isMobileOnly
      :isShow="isShow"
      @close="$emit('close')"
      :title="$t('Add Address')"
    >
      <template #body>
        <div class="flex flex-col w-full text-start">
          <div class="flex flex-col gap-8 py-6">
            <BaseInputDropdown
              v-if="!isAddAddressManualy"
              name="postal_code"
              :label="$t('Post code')"
              v-model="form.postal_code"
              :options="postalCodeOptions"
            />
            <div class="flex flex-col gap-6">
              <BaseInput name="house_name" 
                :maxlength="30"
                :isDisabled="!isAddAddressManualy && (!form.postal_code || errors.postal_code)" :label="$t('House name/number')" />
              <div class="flex justify-between flex-col [&>*]:w-full gap-4">
                <BaseInput
                  name="Address1"
                  :maxlength="50"
                  v-model="form.address1"
                  :isDisabled="!isAddAddressManualy && (!form.postal_code || errors.postal_code)"
                  :label="$t('Address 1')"
                />
                <BaseInput
                  name="Address2"
                  :maxlength="50"
                  v-model="form.address2"
                  :isDisabled="!isAddAddressManualy && (!form.postal_code || errors.postal_code)"
                  :label="$t('Address 2 (Optional)')"
                />
              </div>
              <div class="flex justify-between flex-col [&>*]:w-full gap-4">
                <BaseInput
                  name="city"
                  :maxlength="30"
                  v-model="form.city"
                  :isDisabled="!isAddAddressManualy && (!form.postal_code || errors.postal_code)"
                  :label="$t('City')"
                />
                <BaseInputDropdown
                  name="Country"
                  v-model="form.country"
                  :isDisabled="!isAddAddressManualy && (!form.postal_code || errors.postal_code)"
                  :label="$t('Country')"
                  :options="countryList"
                />
              </div>
            </div>
            <div class="flex flex-row justify-end">
              <!-- <BaseButton styleType="text" startIcon="IconPlus" :text="isAddAddressManualy ? $t('Add address by postal code') : $t('Add address manually')" @click="toggleAddAddressManualy" /> -->
              <BaseButton :text="$t('Add address')"  />
            </div>
          </div>
          <!-- <BaseButton
            :text="$t('Cancel')"
            styleType="outlined"
            size="s"
            class="mt-10"
            @click="$emit('close')"
          /> -->
        </div>
      </template>
    </BaseBottomSheet>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import * as Yup from "yup";

defineProps({
  isShow: Boolean,
});

defineEmits(["close"]);


const { $postalCodeRegex } = useNuxtApp()

const isLoading = ref(false);

const countryList = [{ id: 0, text: "United Kingdom", value: "United Kingdom" }];

const isAddAddressManualy = ref(true)

const toggleAddAddressManualy = () => {
  isAddAddressManualy.value = !isAddAddressManualy.value
}

const form = reactive({
  postal_code: "",
  house_name: "",
  address1: "",
  address2: "",
  city: "",
  country: "",
});

const Schema = Yup.object().shape({
  postal_code: Yup.string()
    .required()
    .test((value) => {
      return $postalCodeRegex.test(value);
    }),
  house_name: Yup.string(),
  address1: Yup.string(),
  city: Yup.string(),
  country: Yup.string(),
});

const manualSchema = Yup.object().shape({
  house_name: Yup.string(),
  address1: Yup.string(),
  city: Yup.string(),
  country: Yup.string(),
});

const postalCodeOptions = reactive([
  { id: 0, text: "option 1", value: 0 },
  { id: 1, text: "option 2", value: 1 },
  { id: 2, text: "option 3", value: 2 },
]);

const submitForm = async () => {
  const payload = {
    body: { ...form },
  };
  isLoading.value = true;
  isLoading.value = false;
};
</script>
