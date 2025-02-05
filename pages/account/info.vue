<template>
    <BaseSplitLayout>
        <template #left>
            <BaseFoldable class="bg-p1" noArrowDown>
                <template #title>
                    <div class="flex">
                        <BaseAvatar
                            class="m-6"
                            size="xxl"
                            :name="{
                                first: accountInfoState?.firstName || '',
                                last: accountInfoState?.lastName || '',
                            }"
                        />
                        <div class="flex flex-col justify-center text-p9 pe-6">
                            <div
                                class="font-medium mb-2 text-lg capitalize"
                                v-text="
                                    $t('Hi ,', {
                                        name:
                                            accountInfoState?.firstName ||
                                            accountInfoState?.lastName ||
                                            '',
                                    })
                                "
                            />
                            <div class="text-sm">
                                Member since {{ computedDate }}
                            </div>
                        </div>
                    </div>
                </template>
            </BaseFoldable>
        </template>
        <template #right>
            <Form
                @submit="submitForm"
                :validation-schema="Schema"
                v-slot="{ meta }"
                class="flex-grow flex flex-col gap-8 mb-6"
            >
                <BaseFoldable
                    class="flex flex-col shadow-s-3 py-6 px-8 laptop:p-8 gap-8"
                    :class="
                        meta.touched &&
                        !(
                            addressesState &&
                            Array.isArray(addressesState) &&
                            addressesState.length > 0
                        )
                            ? 'mb-28'
                            : ''
                    "
                >
                    <template #title>
                        <div class="flex items-center w-full">
                            <div
                                class="text-p8 font-semibold text-lg leading-10 bg-white pe-6"
                                v-text="$t('Personal info')"
                            />
                            <div class="border-b border-t1 flex-grow" />
                        </div>
                    </template>
                    <template #default>
                        <div class="flex flex-col justify-between h-full gap-8">
                            <div class="flex flex-col gap-4">
                                <div
                                    class="flex gap-6 items-center flex-col laptop:flex-row"
                                >
                                    <BaseInput
                                        :placeholder="$t(`Enter your Password`)"
                                        :label="$t(`Password`)"
                                        v-model="form.password"
                                        @input="showActions"
                                        type="password"
                                        class="w-full"
                                        name="password"
                                        size="l"
                                    />
                                </div>
                                <div
                                    class="flex gap-6 items-center [&>*]:w-full laptop:[&>*]:w-1/2 flex-col laptop:flex-row"
                                >
                                    <BaseInput
                                        v-model="form.firstName"
                                        :maxlength="30"
                                        :label="$t(`First name`)"
                                        :placeholder="$t(`Input First name`)"
                                        @input="showActions"
                                        name="firstName"
                                        size="l"
                                    />
                                    <BaseInput
                                        v-model="form.lastName"
                                        :maxlength="30"
                                        :label="$t(`Last name`)"
                                        :placeholder="$t(`Input Last name`)"
                                        @input="showActions"
                                        name="lastName"
                                        size="l"
                                    />
                                </div>
                                <div
                                    class="flex gap-6 items-center [&>*]:w-full laptop:[&>*]:w-1/2 flex-col laptop:flex-row"
                                >
                                    <BaseInput
                                        v-model="mail"
                                        :maxlength="30"
                                        name=""
                                        :label="$t(`Email`)"
                                        :placeholder="$t(`Input Email`)"
                                        size="l"
                                        isDisabled
                                    />
                                    <BaseInputPhone
                                        v-model="form.phone"
                                        :maxlength="10"
                                        :label="$t(`Phone Number`)"
                                        @input="showActions"
                                        size="l"
                                        name="phone"
                                        noCountryChange
                                        :selectedCountryCode="selectedCountryCode"
                                        @selectCountry="(code) => (selectedCountryCode = code)"
                                    />
                                </div>
                            </div>
                        </div>
                    </template>
                </BaseFoldable>
                <BaseFoldable
                    v-if="
                        addressesState &&
                        Array.isArray(addressesState) &&
                        addressesState.length > 0
                    "
                    class="flex flex-col shadow-s-3 py-6 px-8 laptop:p-8 gap-8"
                    :class="meta.touched ? 'mb-28' : ''"
                >
                    <template #title>
                        <div class="flex items-center w-full">
                            <div
                                class="text-p8 font-semibold text-lg leading-10 bg-white pe-6"
                                v-text="$t('Address')"
                            />
                            <div class="border-b border-t1 flex-grow" />
                        </div>
                    </template>
                    <template #default>
                        <div class="flex gap-6 overflow-x-auto">
                            <AccountAddressCard
                                v-for="address in addressesState?.map((el) => {
                                    return {
                                        id: el.id,
                                        postalCode: el.postal_code,
                                        text: `${el.address}, ${el.city}, ${el.country}`,
                                    };
                                })"
                                :key="address.id"
                                :data="address"
                            />
                        </div>
                    </template>
                </BaseFoldable>
                <div
                    :class="['actions-container', isShowingActions ? 'fixed' : 'hidden']"
                    class="bg-p1 bottom-0 start-0 end-0 shadow-[0px -1px 4px 0px #0000000A] p-6"
                    ref="actionsContainer"
                >
                    <div class="flex items-center gridClass w-full">
                        <div class="flex-grow" />
                        <div
                            class="[&>*]:w-[96px] flex items-center gap-4 ps-6"
                        >
                            <BaseButton
                                @click="resetForm"
                                :isLoading="isLoading"
                                :text="$t(`Reset`)"
                                styleType="outlined"
                            />
                            <BaseButton
                                :isLoading="isLoading"
                                :text="$t(`Save`)"
                            />
                        </div>
                    </div>
                </div>
            </Form>
        </template>
    </BaseSplitLayout>
    <ModalAddAddress
        :isShow="isNewAddressModalShow"
        @close="isNewAddressModalShow = false"
    />
</template>

<style>
/* Set height to 0 when actions div is hidden */
.actions-container.hidden {
  height: 0;
  overflow: hidden;
}

/* Define height based on content when actions div is shown */
.actions-container.fixed {
  height: auto;
}
</style>

<script setup>
import { Form } from 'vee-validate';
import * as Yup from 'yup';

definePageMeta({
    name: 'info',
    key: (route) => route.fullPath,
    layout: false,
});

const actionsContainer = ref(null);


const route = useRoute();
const router = useRouter();

const { account_info, update_account_info, addresses } = useAccount();

////

const { $UKPhoneRegExp, $postalCodeRegex } = useNuxtApp();

const { t } = useI18n();
const isLoading = ref(false);
let accountInfoState = useState('account_info');

onBeforeMount(async () => {
    let accountInfoState = useState('account_info');
    if (!accountInfoState.value) {
        const { data } = await account_info();
    }
});

const isShowingActions = ref(false);
const showActions = () => {
    if(isShowingActions.value != true) {
        isShowingActions.value = true;
    }
};

watch(
    () => accountInfoState.value,
    (newVal) => resetAccountInfo(newVal)
);

watch(isShowingActions, () => {
  if (isShowingActions.value) {
    scrollToActions();
  }
});

const scrollToActions = () => {
  if (isShowingActions.value) {

    setTimeout(() => {
        document.body.style.minHeight = `${document.body.clientHeight + actionsContainer.value.clientHeight + 10}px`;

        window.scrollTo({
            top: document.body.scrollHeight + actionsContainer.value.clientHeight,
            behavior: 'smooth'
        });
    }, 90)


  }
};

//// address
const isNewAddressModalShow = ref(false);

const addressesState = useState('addressesState');

//// address

const personalData = reactive({
    firstName: '',
    lastName: '',
    register_date: 0,
});

//// form

const mail = ref('');
let initialPhone = accountInfoState.value?.phone?.replace(/^\+44/, "") || '';


const selectedCountryCode = ref('44');
let form = reactive({
    firstName: accountInfoState.value?.firstName || '',
    lastName: accountInfoState.value?.lastName || '',
    postal_code: '',
    address: '',
    password: '',
    city: '',
    state: '',
    phone: initialPhone,
});


if (accountInfoState.value?.email) {
    mail.value = accountInfoState.value?.email;
}

const Schema = Yup.object().shape({
    phone: Yup.string().matches($UKPhoneRegExp, 'Phone number is not valid'),
});

const submitForm = async () => {
    const payload = {
        body: {
            ...form,
            phone: `+${selectedCountryCode.value}${form.phone}`,
        },
    };
    isLoading.value = true;
    isShowingActions.value = false;
    const { create } = useToast();
    create({
        id: Math.random(),
        type: 'success',
        desc: 'Your changes have been saved.',
        noClose: true,
        time: 5,
    });
    if (route.query.token) {
        router.push('/');
    }
    return Promise.all([update_account_info(payload)])
        .then(() => Promise.all([account_info()]))
        .then(() => (isLoading.value = false));
};

//// carbon foot print

const chartData = reactive([100, 20, 200, 180]);

const computedDate = computed(() => {
    return accountInfoState.value?.createdAt?.split('T')[0];
});

//// reset

const resetAccountInfo = (newVal) => {
    personalData.firstName = newVal.firstName;
    personalData.lastName = newVal.lastName;
    personalData.register_date = newVal.register_date;
    Object.keys(newVal).forEach((key) => {
        if (key === 'email') {
            mail.value = newVal[key];
        } else if (key === 'phone') {
            const phone = newVal[key];
        
            if (phone && phone.startsWith("+44")) {
                selectedCountryCode.value = "+44";
                let restOfNumber = phone.substring(3);
                form[key] = restOfNumber;
            }
        
        } else if (key !== 'register_date') {
            form[key] = newVal[key];
        }
    });
    isShowingActions.value = false;
};

const resetForm = () => {
    resetAccountInfo(accountInfoState.value);
};

watch(
    () => form.postal_code,
    (newVal) => {
        if ($postalCodeRegex.test(newVal)) {
            const payload = {
                body: {
                    postal_code: newVal.toUpperCase(),
                },
            };
            isLoading.value = true;
            const { data, error } = get_address(payload);
            isLoading.value = false;
            if (!error.value) {
                const resData = data.value?.body;
                if (resData?.state) {
                    form.state = resData.state;
                }
                if (resData?.address) {
                    form.address = resData?.address;
                }
                if (resData?.city) {
                    form.city = resData?.city;
                }
            }
        }
    }
);
</script>
