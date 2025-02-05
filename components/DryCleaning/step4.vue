<template>
    <div class="flex flex-col gap-6">
        <div v-text="$t('Dry Cleaning Request')" class="text-p8 text-3xl" />
        <div v-text="$t('Contact info')" class="text-p8 text-xl mb-4" />
        <Form
            class="h-full"
            @submit="submitForm"
            :validation-schema="signupSchema"
            v-slot="{ meta }"
            >
            <div class="flex gap-4">

                <BaseInput
                    v-model="user.firstName"
                    class="w-1/2"
                    label="First name"
                    name="firstName"
                />
                <BaseInput
                    v-model="user.lastName"
                    class="w-1/2"
                    label="Last name"
                    name="lastName"
                />
            </div>
            <div class="flex mobile-sss:flex-col justify-between tablet:flex-row gap-4">
                <BaseInputPhone
                    class="flex-col mobile:sss:w-full tablet:w-1/2"
                    :maxlength="10"
                    :label="$t(`Phone Number (example: 7900000000)`)"
                    size="l"
                    name="phone"
                    v-model="user.phone"
                    :selectedCountryCode="selectedCountryCode"
                    @selectCountry="(code) => (selectedCountryCode = code)"
                    noCountryChange
                />
                <div class="flex flex-col mobile-sss:w-full tablet:w-1/2 items-center justify-center">
                    <div class="w-full flex flex-col">
            
                        <div v-if="state == 'sendCode'" class="w-24">
                            <BaseButton
                                @click="sendCode"
                                buttonId="dry-cleaning-send-otp-code"
                                :isLoading="sendCodeIsLoading"
                                text="Send Code"
                                size="s"
                                :isDisabled="!meta.valid || !user.firstName || !user.lastName || !user.phone ||  (verificationCode !=0 && (verificationCode < 999 || verificationCode > 9999 ) )"
                            />
                        </div>

                        <div v-if="state == 'verifyCode'" class="flex mobile-sss:flex-col tablet:flex-row mobile-sss:gap-4 laptop:gap-2 p-2">
                            <div>
                                <BaseInput
                                    v-model="verificationCode"
                                    label="OTP Code"
                                    name="verifyCode"
                                    :maxlength="4"
                                    placeholder="Example: 1234"
                                />
                            </div>
                            <div class="flex items-center">
                                <BaseButton
                                    @click="verifyCode"
                                    buttonId="dry-cleaning-verify-phone"
                                    :isLoading="isPhoneLoading"
                                    text="Verify code"
                                    size="s"
                                    :isDisabled="!meta.valid || !user.firstName || !user.lastName || !user.phone || verificationCode<1000"
                                />
                            </div>
                        </div>

                        <div v-if="wrongOtpCode" class="ms-1 font-light text-xs mt-1 leading-normal text-danger select-none first-letter:capitalize">
                            Wrong code provided, please try again.
                        </div>
                    </div>
                
                </div>
            </div>
   
            <hr class="text-t1 mt-4 mb-4" />

        <div class="hidden laptop:flex laptop:flex-col mt-4">
            
            <div class="flex flex-row gap-4">
                <button
                    @click="$emit('back')"
                    class="border-2 border-p7 px-4 laptop:px-12 text-p7 text-lg rounded-full"
                    id="dry-cleaning-back-user-info"
                >
                    Back
                </button>
                <div class="flex flex-col">
                    <BaseButton
                        :isLoading="isLoading"
                        @click="sendInfo"
                        text="Payment"
                        size="l"
                        :isDisabled="!meta.valid || !user.firstName || !user.lastName || !user.phone || state != 'payment'"
                    />
                </div>
            </div>
            <div class="mt-4 ml-2">
                <BaseError style="text-align: left;" :text="errorMessage" />
            </div>

        </div>

        </Form>
        <div
            class="fixed laptop:hidden bottom-0 left-0 bg-p1 w-full p-6 flex gap-2"
        >
            <button
                @click="$emit('back')"
                class="border-2 border-p7 px-4 laptop:px-12 text-p7 text-lg rounded-full w-1/2"
                id="dry-cleaning-back-user-info"
            >
                Back
            </button>
            <BaseButton
                buttonId="dry-cleaning-select-user-info"
                @click="sendInfo"
                :isLoading="isLoading"
                text="Payment"
                size="l"
                :isDisabled="!user.firstName || !user.lastName || !user.phone"
                class="w-1/2"
            />
        </div>
        <div class="w-full laptop:hidden">
            <div class="bg-p1 rounded-2xl p-6">
                <div
                    v-for="(item, index) in menuList"
                    :key="`item${index}`"
                    class="px-4 py-3 rounded-lg"
                >
                    <div>
                        <div class="flex gap-5">
                            <IconCheckCircle
                                class="fill-p7 min-w-[26px] max-w-[26px] min-h-[26px] max-h-[26px]"
                            />
                            <div
                                v-if="index == 0"
                                class="pt-1 flex flex-col gap-2"
                            >
                                <div v-text="item.name" class="text-p7" />
                                <div
                                    v-text="
                                        `${itemData?.address?.postalCode} ${itemData?.address?.address}`
                                    "
                                    class="text-xs text-t4"
                                />
                            </div>
                            <div
                                v-else-if="index == 1"
                                class="flex flex-col gap-4"
                            >
                                <div class="flex flex-col gap-2">
                                    <div
                                        v-text="'Collection time'"
                                        class="text-p7"
                                    />
                                    <div
                                        v-text="
                                            `${DateTime.fromISO(
                                                itemData?.startCollection
                                            )
                                                .setZone('Europe/London')
                                                .toLocaleString({
                                                    day: 'numeric',
                                                    month: 'long',
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                })}-${DateTime.fromISO(
                                                itemData?.endCollection
                                            )
                                                .setZone('Europe/London')
                                                .toLocaleString({
                                                    day: 'numeric',
                                                    month: 'long',
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                })}`
                                        "
                                        class="text-xs text-t4"
                                    />
                                </div>
                                <div class="flex flex-col gap-2">
                                    <div
                                        v-text="'Delivery time'"
                                        class="text-p7"
                                    />
                                    <div
                                        v-text="
                                            `${DateTime.fromISO(
                                                itemData?.startDelivery
                                            )
                                                .setZone('Europe/London')
                                                .toLocaleString({
                                                    day: 'numeric',
                                                    month: 'long',
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                })}-${DateTime.fromISO(
                                                itemData?.endDelivery
                                            )
                                                .setZone('Europe/London')
                                                .toLocaleString({
                                                    day: 'numeric',
                                                    month: 'long',
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                })}`
                                        "
                                        class="text-xs text-t4"
                                    />
                                </div>
                            </div>
                            <div
                                v-if="index == 2"
                                class="pt-1 flex flex-col gap-2"
                            >
                                <div
                                    v-text="'Selected services'"
                                    class="text-p7"
                                />
                                <div class="text-xs text-t4">
                                    <template
                                        v-for="(
                                            servic, i
                                        ) in itemData?.services"
                                        :key="servic.itemId"
                                    >
                                        {{ i !== 0 ? "," : " "
                                        }}{{ servic.count }}x
                                        {{ servic.service.name }}
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="w-full bg-p1 rounded-2xl p-6 flex laptop:hidden flex-col gap-8"
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
                        <span class="text-p4"
                            >{{ servicesList[service].count }}x</span
                        >
                        {{ servicesList[service].name }}
                    </div>
                    <div class="text-t9">
                        £{{ servicesList[service].price }}
                    </div>
                </div>
            </div>
            <span class="h-[1px] w-full bg-t1" />
            <div class="flex justify-between items-center line-through">
                <div class="text-p8">Total Price before discount</div>
                <div class="text-t9">£{{ totalPrice }}</div>
            </div>
            <div class="flex justify-between items-center">
                <div class="text-p8">Discount(15%)</div>
                <div class="text-t9">£{{ totalPrice * 15 / 100  }}</div>
            </div>
            <div class="flex justify-between items-center">
                <div class="text-p8">Total Price</div>
                <div class="text-t9">£{{ totalPrice * 85 / 100  }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DateTime } from "luxon";
import { Form } from "vee-validate"
import * as Yup from "yup"

definePageMeta({
  name: "order dry cleaning",
  key: (route) => route.fullPath,
  // layout: '4'
});


useHead({
  title: `LuxMax | Order Dry Cleaning`,
  meta: [
    {
      name: "title",
      content: "LuxMax - Order Dry Cleaning",
    },
    {
      name: "description",
      content:
        "Join LuxMax for access to specialized luxury bag, shoe, watch repairs and restoration services near you.",
    },
  ],
});

const props = defineProps({
    address: String,
    servicesList: Object,
    itemData: Object,
    totalPrice: Number,
});

const { $UKPhoneRegExp } = useNuxtApp();

const submitForm = async () => {
    // sendInfo();      
};

const errorMessage = ref("");

const wrongOtpCode = ref(false);
const userExists = ref(false);

const verificationCode = ref("");

const selectedCountryCode = ref("44");
const token = useCookie("token");
const route = useRoute();

const emits = defineEmits(["infoSelected"]);
const { ifPhoneExists, register, sendOtpForLogin, loginWithOtp } = useUser();


let user = reactive({
    firstName: "",
    lastName: "",
    phone: "",
});

let stateString = "beginning";
if (token.value) {
    const { account_info } = useAccount();
    const { data } = account_info();

    user = {
        firstName: data?.value?.firstName,
        lastName: data?.value?.lastName,
        phone: data?.value?.phone.replace(/^\+44/, ""),
    };
    stateString = "payment";
}


// 1 - beginning | 2 - sendCode | 3 - verifyCode | 4 - payment
const state = ref(stateString);

const signupSchema = Yup.object().shape({
  phone: Yup.string()
    .matches($UKPhoneRegExp, 'Phone number is not valid'),
  firstName: Yup.string()
    .required("First name must be at least 2 characters")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name must be at least 2 characters")
    .min(2, "Last name must be at least 2 characters")
});

// Watcher for the phone number
watch(() => user.phone, (newPhone) => {
  if (newPhone.length >= 10) {
    state.value = "sendCode";
    errorMessage.value = "";
  } else {
    state.value = "beginning";
  }
});

// Watcher for verification code
watch(() => verificationCode, (newVerificationCode) => {
  if (newPhone.length = 4) {

    state.value = "sendCode";
    errorMessage.value = "";
  }

});


const sendCodeIsLoading = ref(false);
const verifyCodeIsLoading = ref(false);

const isLoading = ref(false);

const sendCode = async () => {    
    sendCodeIsLoading.value = true;
    const phoneWithCountryCode = "+44" + user.phone;

    const { data: doesExist, error } = await ifPhoneExists({
        body: { phone: phoneWithCountryCode}
    });

    if(error.value) {
        if(error.value && error?.value?.statusCode == 400) {
            errorMessage.value = error.value.message;
        }
    } else {
        if(doesExist.value.toLowerCase() == "true") {
            userExists.value = true;
            // send sms and login
            const { data: sendCodeResult, error } = await sendOtpForLogin({ body: { phone: "+44" + user.phone} });
            if(error.value && error?.value?.statusCode == 401) {
                errorMessage.value = error.value.message;
            }
        }
        else {
            // register using otp
            // User doesn't exist in our database, try to register them
            const requestBody = {
                body : {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: generatePassword(8),
                    phone: "+44" + user.phone
                }
            };
            const { data: registerResult, error } = await register(requestBody);

            if(error.value && error?.value?.statusCode == 400) {
                errorMessage.value = error.value.message;
            }
            else {

            }
        }
    }

    sendCodeIsLoading.value = false;
    state.value = "verifyCode";
};


// Watching changes in inputValue
// watch(verificationCode, (newValue, oldValue) => {
//   console.log('Input value changed from', oldValue, 'to', newValue);
// });

const verifyCode = async () => {
    const { verifyPhone } = useUser();

    const landingQueryString = localStorage.getItem('landing_query');
    const landingQuery = landingQueryString ? JSON.parse(landingQueryString) : null;

    const requestBody = {
        body: {
            phone: "+44" + user.phone,
            code: +verificationCode.value,
            landingQuery
        }
    };

    if(userExists.value) {
        const { data: loginWithOtpResult, error } = await loginWithOtp(requestBody);

        if(error && error?.value?.statusCode == 401) {
            // Invalid otp code provided
            wrongOtpCode.value = true;
            verificationCode.value = "";
            // errorMessage.value = error.value.message;
        }
        else {
            errorMessage.value = "";
            wrongOtpCode.value = false;
            state.value = "payment";
            localStorage.removeItem('landing_query');
        }
    }
    else {
        const { data: verifyPhoneResult, error } = await verifyPhone(requestBody);

        if(error && error?.value?.statusCode == 401) {
            // Invalid otp code provided
            wrongOtpCode.value = true;
            verificationCode.value = 0;
            // errorMessage.value = error.value.message;
        }
        else if(error && error?.value?.statusCode == 400) {
            // Invalid otp code provided
            wrongOtpCode.value = true;
            verificationCode.value = "";
            // errorMessage.value = error.value.message;
        }
        else {
            errorMessage.value = "";
            wrongOtpCode.value = false;
            state.value = "payment";
            localStorage.removeItem('landing_query');
        }
    }

}

const sendInfo = async () => {
    isLoading.value = true;
    emits("infoSelected");
    isLoading.value = false;
};

const menuList = ref([
    { name: "Address" },
    { name: "Collection and Delivery time" },
    { name: "Selected services" },
]);


function generatePassword(length) {
  const crypto = window.crypto || window.msCrypto;

  if (typeof crypto === 'undefined') {
    throw new Error('Crypto API is not supported. Please upgrade your web browser');
  }

  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const indexes = crypto.getRandomValues(new Uint32Array(length));

  let secret = '';

  for (const index of indexes) {
    secret += charset[index % charset.length];
  }

  return secret;
}




// console.log(user.firstName, user.lastName, user.phone, state);
</script>
