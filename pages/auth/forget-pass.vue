<template>
  <div class="text-p8 mt-10 laptop:mt-0 mb-10 font-medium text-[28px] relative">
    <div class="absolute w-full top-1/2 border-b border-dashed border-p2" />
    <h1
      v-text="
        step === 2
          ? $t('Check Your Email')
          : step === 1
          ? $t('Reset your password')
          : ''
      "
      class="relative px-4 mx-auto w-fit bg-white"
    />
  </div>
  <div v-if="step === 1" class="flex flex-col gap-10 mt-10">
    <div
      class="text-t7 text-center laptop:text-start "
      v-text="
        $t(
          `Enter your email address and we will send you instructions to reset your password.`
        )
      "
    />
    <Form
      class="h-full"
      @submit="submitResetPasswordEmail"
      v-slot="{meta}"
      :validation-schema="schema"
    >
      <div class="flex flex-col justify-between h-full gap-4">
        <div class="flex flex-col justify-between gap-10">
          <BaseInput
            name="mail"
            :maxlength="40"
            v-model="form.mail"
            :label="$t(`Email`)"
            :placeholder="$t(`Enter your Email`)"
            class="w-full"
            size="l"
          />
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4">
            <BaseButton size="l" :text="$t(`Continue`)" :isLoading="isLoading" :isDisabled="!meta.valid" />
            <BaseError :text="errorMessage" />
          </div>
          
          <div class="flex justify-center items-center">
            <NuxtLink :to="{ name: 'login' }">
              <div
                v-text="$t(`Back to log in`)"
                class="text-p7 cursor-pointer"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </Form>
  </div>
  <div v-else-if="step === 2" class="flex flex-col gap-10 mt-10">
    <div class="flex justify-center items-center">
      <IconCheckCircle class="fill-p7 h-16 w-16" />
    </div>
    <div
      class="flex flex-col justify-between h-full gap-8 text-center laptop:text-start"
    >
      <div class="flex flex-col gap-4">
        <div
          class="text-t7"
          v-text="
            $t(
              `Please check the email address for instructions to reset your password.`
            )
          "
        />
        <div class="flex justify-between items-center flex-col laptop:flex-row flex-wrap">
          <div class="text-t7" v-text="form.mail" />
          <BaseButton
            styleType="text"
            size="s"
            :text="$t('Edit email')"
            @click="step = 1"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-6">
      <BaseButton
      styleType="outlined"
      size="l"
      :text="$t(`Resend Email`)"
      :isDisabled="isPending"
      :isLoading="isLoading"
      @click="submitResetPasswordEmail"
      />
      <BaseCountdownTimer ref="countdown" :totalTime="180" @timeFinished="isPending = false" noExtraInfo />
    </div>
    <BaseError :text="errorMessage" />
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import * as Yup from "yup";


definePageMeta({
  name: "forgetPass",
  key: (route) => route.fullPath,
  // layout: '1'
});

useHead({
  title: `Forget Password`,
  meta: [
    {
      name: 'title',
      content: 'LuxMax - Reset Your Password'
    },
    {
      name: 'description',
      content: "Have you forgotten your LuxMax password? Enter your email address below and we'll send you an email with instructions to reset your password."
    }
  ]
})

const { $emailRegex } = useNuxtApp()

const { forget_pass } = useUser();

//// step

const step = ref(1);
const countdown = ref()

const isLoading = ref(false);
const isPending = ref(true)

const errorMessage = ref(null);

//// reset password (send email)

const form = reactive({
  mail: "",
});


const schema = Yup.object().shape({
  mail: Yup.string().matches($emailRegex, "Email is not valid").required('Email is required'),
});

const submitResetPasswordEmail = async () => {
  if(step.value === 2){
    countdown.value?.resendCode();
    isPending.value = true;
  }
  errorMessage.value = null;
  const payload = { body: form };
  isLoading.value = true;
  const { error } = await forget_pass(payload);
  isLoading.value = false;
  if (error.value) {
    errorMessage.value = error.value.data.msg;
  } else {
    step.value = 2;
  }
};

watch(
  () => step.value,
  () => {
    errorMessage.value = null;
  }
);


</script>
