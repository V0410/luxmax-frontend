<template>
    <div class="w-full flex flex-col">
        <div class="flex relative base-container">
            <h1
                class="w-full h-full laptop:h-auto laptop:w-1/2 laptop:bg-p10 absolute laptop:static lowercase text-white font-bold font-static text-5xl flex justify-center items-center cursor-default"
                v-text="$t('Contact Us')"
            />
            <NuxtImg
                alt=""
                width="2876"
                height="1280"
                src="/img/contactUs/message.webp"
                format="webp"
                quality="100"
                class="w-full laptop:w-1/2"
            />
        </div>
        <BaseBreadcrumb
            :dataArray="breadcrumbData"
            class="gridClass laptop:hidden mt-8"
        />
        <div class="gridClass my-8 laptop:my-20">
            <div
                class="flex flex-col laptop:flex-row gap-6 laptop:gap-0 rounded-2xl overflow-hidden shadow-s-7 laptop:w-[1114px] mx-auto"
            >
                <div
                    ref="container"
                    class="p-6 laptop:p-10 w-full laptop:w-fit bg-p9 flex flex-col gap-10"
                >
                    <div class="flex flex-col gap-2 w-full">
                        <div
                            class="text-white text-[28px] font-semibold"
                            v-text="$t('Contact Information')"
                        />
                        <div
                            class="text-[#C9C9C9] text-lg"
                            v-text="$t('Say something to start a live chat!')"
                        />
                    </div>
                    <NuxtImg
                        alt=""
                        width="1161"
                        height="1644"
                        src="/img/contactUs/map.webp"
                        format="webp"
                        quality="100"
                        class="rounded-xl w-full laptop:w-[290px]"
                    />
                    <a
                        href="mailto:Support@LuxMax.ai"
                        class="flex gap-2 items-center justify-center laptop:justify-start fill-white text-white"
                    >
                        <IconMail class="w-6 h-6" />
                        <div v-text="$t('Support@LuxMax.ai')" />
                    </a>
                    <div
                        class="flex justify-between items-center fill-white [&>*]:w-6 [&>*]:h-6 [&>*]:cursor-pointer"
                    >
                        <NuxtLink
                            to="https://www.linkedin.com/company/luxmaxltd/"
                            target="_blank"
                        >
                            <IconLinkedin class="fill-white w-6 h-6" />
                        </NuxtLink>
                        <NuxtLink
                            to="https://www.facebook.com/"
                            target="_blank"
                        >
                            <IconFacebook class="fill-white w-6 h-6" />
                        </NuxtLink>
                        <NuxtLink
                            to="https://www.instagram.com/"
                            target="_blank"
                        >
                            <IconInstagramFill class="fill-white w-6 h-6" />
                        </NuxtLink>
                        <NuxtLink to="https://twitter.com/" target="_blank">
                            <IconTwitter class="fill-white w-6 h-6" />
                        </NuxtLink>
                    </div>
                </div>
                <div class="p-6 laptop:p-10 flex-grow">
                    <Form
                        class="flex flex-col justify-between h-full gap-14"
                        @submit="submitForm"
                        :validation-schema="Schema"
                        v-slot="{ meta }"
                    >
                        <div class="flex flex-col gap-14">
                            <div class="flex flex-col gap-6">
                                <div
                                    class="flex flex-col laptop:flex-row gap-6 [&>*]:w-full w-full"
                                >
                                    <BaseInput
                                        v-model="form.firstname"
                                        :maxlength="30"
                                        name="firstname"
                                        :label="$t('First name')"
                                        :placeholder="$t('First name')"
                                    />
                                    <BaseInput
                                        v-model="form.lastname"
                                        :maxlength="30"
                                        name="lastname"
                                        :label="$t('Last name')"
                                        :placeholder="$t('Last name')"
                                    />
                                </div>
                                <div
                                    class="flex flex-col laptop:flex-row gap-6 [&>*]:w-full w-full"
                                >
                                    <BaseInput
                                        v-model="form.mail"
                                        :maxlength="40"
                                        name="mail"
                                        :label="$t('Email')"
                                        :placeholder="$t('Email')"
                                    />
                                    <BaseInputPhone
                                        v-model="form.phone"
                                        :maxlength="10"
                                        name="phone"
                                        :label="$t('Phone Number (optional)')"
                                        :selectedCountryCode="
                                            selectedCountryCode
                                        "
                                        @selectCountry="
                                            (code) =>
                                                (selectedCountryCode = code)
                                        "
                                        noCountryChange
                                    />
                                </div>
                            </div>
                            <div class="flex flex-col gap-4">
                                <div
                                    class="text-sm font-medium"
                                    v-text="$t('Select Subject?')"
                                />
                                <div class="flex gap-6 flex-wrap">
                                    <BaseInputRadio
                                        v-for="option in subjectOptions"
                                        :key="option.id"
                                        :modelValue="
                                            form.subject === option.value
                                        "
                                        @click="form.subject = option.value"
                                        :text="option.label"
                                        name="subject"
                                        size="s"
                                        hasIcon
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-10">
                            <BaseInputTextarea
                                v-model="form.msg"
                                :maxlength="1000"
                                name="msg"
                                :label="$t('Message')"
                                :placeholder="$t('Write your message..')"
                            />
                            <div class="flex justify-end">
                                <BaseButton
                                    type="submit"
                                    :isDisabled="!meta.valid"
                                    :isLoading="isLoading"
                                    :text="$t('Send Message')"
                                />
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Form } from 'vee-validate';
import * as Yup from 'yup';
// definePageMeta({
//   name: "contact",
// });

const { $emailRegex, $UKPhoneRegExp } = useNuxtApp();
const { t } = useI18n();
const router = useRouter();
const { contact_us } = useUser();

useHead({
    title: `LuxMax - Contact us`,
    meta: [
        {
            name: 'title',
            content: 'Contact LuxMax - Experts',
        },
        {
            name: 'description',
            content:
                'Luxury repair experts ready to help diagnose issues and restore your cherished items to their original glory.',
        },
    ],
});

const isLoading = ref(false);

const subjectOptions = [
    { id: 0, value: 'Repair Request', label: t('Repair Request') },
    { id: 1, value: 'Buy', label: t('Buy') },
    { id: 2, value: 'Withdraw Money', label: t('Withdraw Money') },
    { id: 3, value: 'Login / Register', label: t('Login / Register') },
    { id: 4, value: 'Other', label: t('Other') },
];

const selectedCountryCode = ref('44');

const form = reactive({
    firstname: '',
    lastname: '',
    mail: '',
    phone: '',
    subject: 'Other',
    msg: '',
});

const Schema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    mail: Yup.string()
        .matches($emailRegex, 'Email is not valid')
        .required('Email is required'),
    phone: Yup.string().matches($UKPhoneRegExp, 'Phone number is not valid'),
    subject: Yup.string().required(),
    msg: Yup.string().required('Message is required'),
});

const submitForm = async (values, { resetForm }) => {
    const payload = {
        body: {
            ...form,
            phone: form.phone
                ? `+${selectedCountryCode.value} ${form.phone.replace(
                      /^0+/,
                      ''
                  )}`
                : null,
        },
    };
    isLoading.value = true;
    const { data, error } = await contact_us(payload);
    isLoading.value = false;
    if (!error.value) {
        resetForm();
        const { create } = useToast();
        create({
            id: Math.random(),
            type: 'success',
            title: t('Your request has been registered'),
            noClose: true,
            time: 5,
        });
        // router.push({name: 'home'})
    }
    scrollToTop();
};

const container = ref();

const scrollToTop = () => {
    window.scrollTo({
        top: container.value?.offsetTop - 100,
        behavior: 'smooth',
    });
};

const breadcrumbData = computed(() => [
    {
        id: 0,
        text: t('Home'),
        action: () => {
            router.push({ name: 'home' });
        },
    },
    {
        id: 1,
        text: t('Contact Us'),
        action: () => {},
    },
]);
</script>
