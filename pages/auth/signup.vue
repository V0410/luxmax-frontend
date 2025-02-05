<template>
  <div class="text-p8 mt-10 laptop:mt-0 mb-10 font-medium text-[28px] relative">
    <div class="absolute w-full top-1/2 border-b border-dashed border-p2" />
    <h1
      v-text="step === 2 ? $t('Verification Code') : $t(`Create your account`)"
      class="relative px-4 mx-auto w-fit bg-white"
    />
  </div>
  <template v-if="step === 1">
    <Form
      class="h-full"
      @submit="submitForm"
      :validation-schema="signupSchema"
      v-slot="{ meta }"
    >
      <div class="flex flex-col justify-between h-full gap-4">
        <div class="flex flex-col gap-2">
          <BaseInput
            name="email"
            :maxlength="40"
            v-model="form.email"
            :label="$t(`Email`)"
            :placeholder="$t(`Enter your Email`)"
            class="w-full"
            size="l"
          />
          <BaseInputPhone
            v-model="form.phone"
            :maxlength="10"
            :label="$t(`Phone Number (example: 7900000000)`)"
            size="l"
            name="phone"
            noCountryChange
            :selectedCountryCode="
                selectedCountryCode
            "
            @selectCountry="
                (code) =>
                    (selectedCountryCode = code)
            "
        />
          <div class="flex gap-2 [&>*]:w-full">
            <BaseInput
              name="firstName"
              :maxlength="30"
              v-model="form.firstName"
              :label="$t(`First Name`)"
              :placeholder="$t(`Enter your First Name`)"
              size="l"
            />
            <BaseInput
              name="lastName"
              :maxlength="30"
              v-model="form.lastName"
              :label="$t(`Last name`)"
              :placeholder="$t(`Enter your Last Name`)"
              size="l"
            />
          </div>
          <div class="flex flex-col">
            <BaseInput
              name="password"
              v-model="form.password"
              :label="$t(`Password`)"
              :placeholder="$t(`Enter your Password`)"
              class="w-full"
              type="password"
              size="l"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <BaseButton
            size="l"
            :text="$t(`Continue`)"
            :isLoading="isLoading"
            :isDisabled="!meta.valid"
          />
          <BaseError :text="errorMessage" />
          <div class="w-full flex justify-between text-sm">
            <NuxtLink :to="{ name: 'login' }">
              <div v-text="$t(`I have an account`)" class="text-t8" />
            </NuxtLink>
            <NuxtLink :to="{ name: 'login' }">
              <div v-text="$t(`Log in`)" class="text-p7" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </Form>
  </template>
  <template v-else-if="step === 2">
    <div class="flex flex-col gap-4 mt-10">
      <div
        class="text-t7 text-center laptop:text-start"
        v-text="$t(`Enter the code that we have sent to your email`)"
      />
      <div
        class="flex justify-between items-center flex-col laptop:flex-row flex-wrap"
      >
        <div class="text-t7" v-text="form.email" />
        <BaseButton
          styleType="text"
          size="s"
          :text="$t('Edit email')"
          @click="step = 1"
        />
      </div>
    </div>
    <div class="flex flex-col justify-between h-full gap-4">
      <div class="flex flex-col gap-10">
        <BaseInputVerification
          v-model="verificationCode"
          :length="4"
          @lastInput="submitCode"
          :isLoading="isLoading"
        />
      </div>

      <div class="flex flex-col gap-4">
        <BaseButton
          size="l"
          :isDisabled="verificationCode.length !== 4"
          :text="$t(`Submit`)"
          @click="submitCode"
          :isLoading="isLoading"
        />
        <BaseError :text="errorMessage" />
        <BaseCountdownTimer :totalTime="120" @resendCode="resendCode" />
      </div>
    </div>
  </template>
</template>

<script setup>
import { Form } from "vee-validate"
import * as Yup from "yup"

definePageMeta({
  name: "signup",
  key: (route) => route.fullPath,
  // layout: '4'
})

useHead({
  title: `LuxMax | Signup`,
  meta: [
    {
      name: "title",
      content: "LuxMax - Sign Up",
    },
    {
      name: "description",
      content:
        "Join LuxMax for access to specialized luxury bag, shoe, watch repairs and restoration services near you.",
    },
  ],
})

const { register, checkOtp, resend, login } = useUser()

const step = ref(1)

const router = useRouter()
const route = useRoute()

const isLoading = ref(false)

const errorMessage = ref(null)

////  signup

const { $emailRegex, $UKPhoneRegExp } = useNuxtApp();

const selectedCountryCode = ref('44');

const form = reactive({
  email: route?.query?.email ? route.query.email : "",
  firstName: "",
  phone: "",
  lastName: "",
  password: "",
});


const signupSchema = Yup.object().shape({
  email: Yup.string()
    .matches($emailRegex, "Email is not valid")
    .required("Email is not valid"),
  phone: Yup.string()
    .matches($UKPhoneRegExp, 'Phone number is not valid'),
  firstName: Yup.string()
    .required("First name must be at least 2 characters")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name must be at least 2 characters")
    .min(2, "Last name must be at least 2 characters"),
  password: Yup.string()
    .required("Password must be at least 8 characters")
    .min(8, "Password must be at least 8 characters"),
})

const submitForm = async () => {
  errorMessage.value = null;
                
  const updatedForm = { 
    ...form,
    phone: form.phone ? `+${selectedCountryCode.value}${form.phone}` : null
  };
                
  const payload = { body: updatedForm };
  isLoading.value = true;
  const { error } = await register(payload);
  isLoading.value = false
  if (error.value) {
    errorMessage.value = error.value.data.message;
  } else {
    step.value = 2
  }
}

//// 2FA

const verificationCode = ref("")
const redirectParam = route?.query?.redirect;

const submitCode = async () => {
  errorMessage.value = null;
  const payload = {
    body: {
      otp: parseInt(verificationCode.value, 10)
    }
  };
  isLoading.value = true
  const { error } = await checkOtp(payload);
  isLoading.value = false
  if (error.value) {
    verificationCode.value = ""
    errorMessage.value = error.value.data.msg
  } else {  
    const updatedForm = { 
    ...form,
    phone: form.phone ? `+${selectedCountryCode.value}${form.phone}` : null
  };
    const payload = { body: updatedForm };
    const { error } = await login(payload);
    if (error.value) {
      errorMessage.value = error.value.data.msg
    } else {
      router.push(redirectParam? redirectParam : {name: 'home'});
    }
  }
}

const resendCode = async () => {
  errorMessage.value = null
  const payload = {
    body: {
      pre_token: useCookie("pre_token").value,
    },
  }
  isLoading.value = true
  const { error } = await resend(payload)
  isLoading.value = false
  if (error.value) {
    errorMessage.value = error.value.data.msg
  } else {
  }
}

watch(
  () => step.value,
  () => {
    errorMessage.value = null
  }
)
</script>
