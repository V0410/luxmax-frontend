<template>
    <div
        class="text-p8 mt-10 laptop:mt-0 mb-10 font-medium text-[28px] relative"
    >
        <div class="absolute w-full top-1/2 border-b border-dashed border-p2" />
        <h1
            v-text="$t(`Login to LuxMax`)"
            class="relative px-4 mx-auto w-fit bg-white"
        />
    </div>
    <template v-if="step === 1">
        <Form
            class="h-full"
            v-slot="{ meta }"
            @submit="sendEmail"
            :validation-schema="emailSchema"
        >
            <div class="flex flex-col justify-between h-full gap-4">
                <div class="flex flex-col gap-4">
                    <BaseInput
                        size="l"
                        name="mail"
                        class="w-full"
                        :maxlength="40"
                        v-model="form.mail"
                        :label="$t(`Email`)"
                        :placeholder="$t(`Enter your Email`)"
                        no-error-message
                    />
                    <BaseError :text="errorMessage" />
                </div>
                <div class="flex flex-col gap-4">
                    <BaseButton
                        size="l"
                        :text="$t(`Continue`)"
                        :isLoading="isLoading"
                        :isDisabled="!meta.valid || emailSended"
                    />
                </div>
            </div>
        </Form>
    </template>
    <template v-else-if="step === 3">
        <div class="flex flex-col justify-between h-full gap-4">
            <div class="flex justify-between items-center">
                {{ form.mail.toLowerCase() }}
                <BaseButton
                    size="s"
                    styleType="text"
                    @click="step = 1"
                    :text="$t('Edit email')"
                    buttonId="edit-email"
                />
            </div>
            <Form
                class="h-full"
                v-slot="{ meta }"
                @submit="submitForm"
                :validation-schema="passSchema"
            >
                <div class="flex flex-col">
                    <BaseInput
                        :placeholder="$t(`Enter your Password`)"
                        :label="$t(`Password`)"
                        v-model="form.pass"
                        type="password"
                        class="w-full"
                        name="pass"
                        size="l"
                        no-error-message
                    />
                    <BaseError :text="errorMessage" class="w-fit" />
                </div>
                <BaseButton
                    type="button"
                    :text="$t('Forget Password')"
                    buttonId="forget-password"
                    @click="ForgetPass"
                    styleType="text"
                    size="sm"
                    :isLoading="isLoading"
                    :is-disabled="emailSended"
                    class="mt-4 text-sm cursor-pointer w-fit text-p8"
                />
                <div class="flex flex-col gap-4 mt-4">
                    <BaseButton
                        size="l"
                        :text="$t(`Submit`)"
                        :isLoading="isLoading"
                        :isDisabled="!meta.valid"
                    />
                </div>
            </Form>
        </div>
    </template>
</template>

<script setup>
import { Form } from "vee-validate";
import * as Yup from "yup";

definePageMeta({
    name: "login",
    key: (route) => route.fullPath,
});

const emailSended = ref(false);

useHead({
    title: `LuxMax | Login`,
    meta: [
        {
            name: "title",
            content: "LuxMax - Log In",
        },
        {
            name: "description",
            content:
                "Welcome back! Log in to your LuxMax account here with your email address and password.",
        },
    ],
});

const route = useRoute();
const router = useRouter();
const { $emailRegex } = useNuxtApp();
const { login, checkEmail, ifEmailExists } = useUser();

//// steps

const step = ref(1);
const isLoading = ref(false);
const errorMessage = ref(null);

//// login

const form = reactive({
    mail: "",
    pass: "",
});

// Fetch redirect parameter from URL
const redirectParam = route?.query?.redirect;
// Add redirectParam to cookie
if (
    redirectParam &&
    redirectParam !== "" &&
    !redirectParam.includes("?token=")
) {
    const authRedirect = useCookie("authRedirect", { maxAge: 31536000 });
    authRedirect.value = redirectParam;
}

const sendEmail = async () => {
    errorMessage.value = null;
    const payload = { body: { email: form.mail.toLowerCase() } };
    isLoading.value = true;

    let emailExists = false;


    const { data } = await ifEmailExists(payload);
    isLoading.value = false;

    if(data.value.toLowerCase() == "true") {
        emailExists = true;
    }

    if(emailExists) {
        step.value = 3;
    } else {
        router.push({ name: "signup", query: { email: form.mail.toLowerCase() } });
    }

    // const { data, error } = await checkEmail(payload);
    // isLoading.value = false;

    // if (data?.value) {
    //     if (data?.value?.methods[1] === "PASSWORD") {
    //         step.value = 3;
    //     } else {
    //         emailSended.value = true;
    //         const { create } = useToast();
    //         create({
    //             id: Math.random(),
    //             type: "success",
    //             title: "Email sent! Please verify your email to complete registration.",
    //             noClose: true,
    //             time: 5,
    //         });
    //     }
    // } else {
    //     errorMessage.value = error?.value?.data?.msg;
    // }
};

const ForgetPass = async () => {
    const payload = {
        body: { email: form.mail.toLowerCase(), prefer: "MAGIC_LINK" },
    };
    isLoading.value = true;
    const { data, error } = await checkEmail(payload);
    if (data?.value) {
        emailSended.value = true;
        const { create } = useToast();
        create({
            id: Math.random(),
            type: "success",
            title: "We've sent an email with instructions to reset it. Please check your inbox.",
            noClose: true,
            time: 5,
        });
    }
    isLoading.value = false;
};

const submitForm = async () => {
    errorMessage.value = null;
    const payload = {
        body: { email: form.mail.toLowerCase(), password: form.pass },
    };
    isLoading.value = true;
    const { data, error } = await login(payload);
    isLoading.value = false;
    if (error.value) {
        errorMessage.value =
            error?.value?.data?.statusCode === 401
                ? "wrong password"
                : error?.value?.data?.message;
    } else {
        router.push(redirectParam ? redirectParam : { name: "repair" });
    }
};

//// validate form

const emailSchema = Yup.object().shape({
    mail: Yup.string()
        .matches($emailRegex, "Email is not valid")
        .required("Email is required"),
});
const passSchema = Yup.object().shape({
    pass: Yup.string()
        .required("Password must be at least 8 characters")
        .min(3, "Password must be at least 8 characters"),
});

watch(
    () => step.value,
    () => {
        errorMessage.value = null;
    }
);
</script>
