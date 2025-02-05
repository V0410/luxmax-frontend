<template>
    <div>
        <TheMeta :seoItems="seoItems" />
        <div>
            <BannerContactUs
                src="/img/contactUs/banner.webp"
                :title="$t('Contact Us')"
                :description="
                    $t(
                        `At LuxMax, we're dedicated to luxury, sustainability, and superior craftsmanship. Whether you have inquiries about our services, seek assistance with an order, or wish to collaborate, we're here for you. Reach out to us via phone, email, or the contact form below. Let's connect and continue celebrating the beauty of preloved luxury items together.`
                    )
                "
            />
            <div class="my-8 laptop:my-20 px-4 laptop:px-44">
                <BaseBreadcrumb
                    :dataArray="breadcrumbData"
                    class="gridClass laptop:hidden mb-8"
                />
                <div
                    class="flex flex-col laptop:flex-row gap-6 laptop:gap-0 rounded-[40px] overflow-hidden laptop:w-full mx-auto border border-p8"
                >
                    <div
                        ref="container"
                        class="py-6 px-6 laptop:px-10 w-full laptop:w-fit bg-p9 flex flex-col gap-10"
                    >
                        <div class="flex flex-col gap-2 w-full">
                            <div
                                class="text-white text-[28px] font-semibold"
                                v-text="$t('Contact Information')"
                            />
                            <div
                                class="text-[#C9C9C9] text-lg"
                                v-text="
                                    $t('Say something to start a live chat!')
                                "
                            />
                        </div>
                        <NuxtImg
                            alt=""
                            width="1161"
                            height="1644"
                            src="/img/contactUs/map.webp"
                            format="webp"
                            quality="100"
                            class="rounded-lg w-full laptop:w-[290px]"
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
                            <NuxtLink to="https://twitter.com/" target="_blank">
                                <IconWhiteTwitter class="fill-white w-6 h-6" />
                            </NuxtLink>
                            <NuxtLink
                                to="https://www.linkedin.com/company/luxmaxltd/"
                                target="_blank"
                            >
                                <IconWhiteLinkedin class="fill-white w-6 h-6" />
                            </NuxtLink>
                            <NuxtLink
                                to="https://www.facebook.com/"
                                target="_blank"
                            >
                                <IconWhiteFacebook class="fill-white w-6 h-6" />
                            </NuxtLink>
                            <NuxtLink
                                to="https://www.instagram.com/"
                                target="_blank"
                            >
                                <IconInstagramFill class="fill-white w-6 h-6" />
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
                                            :label="
                                                $t('Phone Number (optional)')
                                            "
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
                                        buttonId="send-message"
                                    />
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    name: 'contact',
});

import { Form } from 'vee-validate';
import * as Yup from 'yup';
import BannerContactUs from '~/components/landings/BannerContactUs.vue';

const { $emailRegex, $phoneRegExp } = useNuxtApp();
const { t } = useI18n();
const router = useRouter();
const { contact_us } = useUser();

const route = useRoute();
const seoItems = ref(null);
const { getSeo } = useItem();
const { data: Seo } = await getSeo(route.fullPath);
if (Seo.value) {
    seoItems.value = {
        metaTitle: Seo.value?.metaTitle,
        metaDescription: Seo.value?.metaDescription,
        metaRobots: Seo.value?.metaRobots,
        metaViewport: Seo.value?.metaViewport,
        canonicalUrl:
            Seo.value?.canonicalUrl || `https://luxmax.co${route.fullPath}`,
    };
} else {
    seoItems.value = {
        metaTitle: `Contact LuxMax - Experts`,
        metaDescription: `Luxury repair experts ready to help diagnose issues and restore your cherished items to their original glory.`,
        metaRobots: 'index',
        metaViewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        canonicalUrl: `https://luxmax.co${route.fullPath}`,
    };
}

const isLoading = ref(false);

const subjectOptions = [
    { id: 0, value: 'Repair Request', label: t('Repair Request') },
    { id: 1, value: 'Buy', label: t('Buy') },
    { id: 2, value: 'Withdraw Money', label: t('Withdraw Money') },
    { id: 3, value: 'Login / Register', label: t('login sign up') },
];

const selectedCountryCode = ref('44');

const form = reactive({
    firstname: '',
    lastname: '',
    mail: '',
    phone: '',
    subject: 'Buy',
    msg: '',
});

const Schema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    mail: Yup.string()
        .matches($emailRegex, 'Email is not valid')
        .required('Email is required'),
    phone: Yup.string().matches($phoneRegExp, 'Phone number is not valid'),
    subject: Yup.string().required(),
    msg: Yup.string().required('Message is required'),
});

const submitForm = () => {
    window.open(
        `mailto:support@luxmax.ai?subject=${form.subject}&body=${form.msg}`,
        '_blank'
    );
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
