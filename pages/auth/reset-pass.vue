<template>
  <div class="text-p8 mt-10 laptop:mt-0  mb-10 font-medium text-[28px] relative">
    <div class="absolute w-full top-1/2 border-b border-dashed border-p2" />
    <h1
      v-text="$t('Reset your password')"
      class="relative px-4 mx-auto w-fit bg-white"
    />
  </div>
  <Form
    class="h-full"
    @submit="submitResetPassword"
    :validation-schema="schema"
    v-slot="{meta}"
  >
    <div class="flex flex-col justify-between h-full gap-4">
      <div class="flex flex-col justify-between gap-10">
        <BaseInput
          v-model="form.pass"
          :label="$t(`New Password`)"
          :placeholder="$t(`Enter your Password`)"
          class="w-full"
          name="pass"
          type="password"
          size="l"
        />
      </div>
      <div class="flex flex-col gap-4">
        <BaseButton
          size="l"
          :text="$t(`Reset Password`)"
          :isLoading="isLoading"
          :isDisabled="!meta.valid"
        />
        <BaseError :text="errorMessage" />
      </div>
    </div>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import * as Yup from "yup";

definePageMeta({
  name: "resetPass",
  key: (route) => route.fullPath,
  // layout: 'empty'

    // layout: '3'
});

useHead({
  title: `Reset Password`
})

const { forgetpass_verify } = useUser();
const router = useRouter();
const route = useRoute();

const isLoading = ref(false);

const errorMessage = ref(null);

//// reset password (set password)

const form = reactive({
  pass: "",
});

const schema = Yup.object().shape({
  pass: Yup.string().required().min(8),
});

const submitResetPassword = async () => {
  errorMessage.value = null;
  const payload = {
    body: { ...form, pre_token: route.query?.pretoken },
  };
  isLoading.value = true;
  const { error } = await forgetpass_verify(payload);
  isLoading.value = false;
  if (error.value) {
    errorMessage.value = error.value.data.msg;
  } else {
    router.push({ name: "login", query: { ...route.query} });
  }
};
</script>
