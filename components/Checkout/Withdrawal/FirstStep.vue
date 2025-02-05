<template>
    <Form
      @submit="submitForm"
      :validation-schema="Schema"
      v-slot="{ meta }"
      class="flex-grow flex flex-col gap-8"
    >
    <div class="flex flex-col gap-8">
      <div class="text-p9 text-xl font-medium" v-text="$t('Withdrawal Amount')" />
      <div class="flex flex-col gap-2">
        <BaseInput v-model="value" name="value" type="number" :label="$t('Enter the amount you wish to withdraw from your earnings')"  />
        <div class=" text-sm text-t9" v-text="$t('minimum withdrawal - maximum withdrawal', { min: 50, max: 5000})" />
      </div>
    </div>
    <div
      class="z-20 flex flex-col gap-2 laptop:flex-row laptop:justify-end p-6 pt-2 laptop:p-0 fixed bg-p1 shadow-s-1 laptop:bg-transparent laptop:shadow-transparent laptop:static bottom-0 start-0 end-0"
    >
      <BaseButton
        class="laptop:hidden"
        :text="$t('Summary')"
        size="m"
        styleType="text"
        endIcon="IconArrowDown"
        @click="$emit('showSummary')"
        rotateIcon
      />
      <BaseButton
        :isDisabled="!meta.valid"
        :text="$t('Continue')"
        size="l"
        type="submit"
        :isLoading="isLoading"
      />
    </div>
    </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import * as Yup from "yup";

const emits = defineEmits(["update:modelValue", "checkoutClicked"]);
const props = defineProps({
  modelValue: String,
  maxValue: Number
})

const router = useRouter()

const isLoading = ref(false)

const value = ref(props.modelValue || "")
watch(() => value.value, (newVal) => {
  emits("update:modelValue", newVal)
})

const Schema = Yup.object().shape({
  value: Yup.number().required().min(50).max(Math.min(5000, props.maxValue) ),
});

const { withdraw } = useCheckout()

const submitForm = async () => {
  // emits('checkoutClicked', value.value)
  isLoading.value = true
  const { data } = await withdraw({ amount : parseInt(value.value)})
  isLoading.value = false
  if(data.value) {
    router.push({name: 'bank'})
  }
}
</script>