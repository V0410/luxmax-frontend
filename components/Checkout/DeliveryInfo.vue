<template>
    <Form
        @submit="submitForm"
        :validation-schema="
            selectedMethod === 'addNew' ? ManualSchema : SavedSchema
        "
        v-slot="{ meta }"
        class="flex flex-col gap-6"
    >
        <div class="flex flex-col gap-6">
            <div
                class="text-p9 font-medium text-xl"
                v-text="
                    isSendItem
                        ? $t('Address Information')
                        : $t('Delivery Information')
                "
            />
            <div class="w-full flex gap-4 [&>*]:w-full">
                <BaseButton
                    styleType="outlined"
                    :text="$t('Saved Addresses')"
                    :isSelected="selectedMethod === 'savedAddress'"
                    @click="selectedMethod = 'savedAddress'"
                    :isDisabled="!isAnyAddressInState"
                    buttonId="show-saved-addresses"
                    type="button"
                    class="max-w-[50%] w-1/2"
                />
                <BaseButton
                    styleType="outlined"
                    :text="$t('New Address')"
                    :isSelected="selectedMethod === 'addNew'"
                    @click="selectedMethod = 'addNew'"
                    type="button"
                    class="max-w-[50%] w-1/2"
                    buttonId="add-new-address"
                />
            </div>
            <template v-if="selectedMethod === 'savedAddress'">
                <div class="flex flex-col gap-4">
                    <BaseInputDropdown
                        name="addressId"
                        :label="$t('Saved addresses')"
                        size="m"
                        v-model="form.addressId"
                        :options="savedAddresses"
                        :placeholder="$t('Use a new address')"
                    />
                </div>
            </template>
            <template v-else-if="selectedMethod === 'addNew'">
                <div class="flex flex-col gap-4">
                    <div class="flex gap-4 [&>*]:w-full">
                        <BaseInputDropdown
                            name="country"
                            :label="$t('Country / Region')"
                            size="m"
                            isDisabled
                            v-model="form.country"
                            :options="countryList"
                            :placeholder="$t('Country')"
                        />
                        <BaseInput
                            name="city"
                            :maxlength="30"
                            :label="$t('City')"
                            v-model="form.city"
                            size="m"
                            isDisabled
                            :placeholder="$t('City')"
                        />
                        
                    </div>
                    <!-- <RepairDeliveryAddress
                        :address="form.address"
                        :postalCode="form.postalCode"
                    /> -->
                    <div
                        id="clickbox"
                        class="relative w-full flex flex-col gap-6"
                        :tabindex="0"
                    >
                        <input
                            class="first-letter:capitalize border-[0.5px] border-t9 p-3 rounded-md"
                            v-model="form.postalCode"   
                            @input="checkPostalCode"
                            ref="search"
                            :maxlength="50"
                            noErrorMessage
                            outline
                            :placeholder="$t('Enter your post code')"
                            @focus="searchMenuIsShow = true"
                            :focus-input="focusInput"
                            @keyup.esc="($event) => $event.target.blur()"
                        />
                        <div
                            ref="searchModal"
                            @click.stop="() => {}"
                            v-if="searchMenuIsShow && addressess?.length"
                            style="box-shadow: 0px 1px 8px 0px #00000014"
                            class="absolute max-h-52 overflow-auto p-2 top-[59px] start-0 z-30 w-full rounded-lg bg-white"
                        >
                            <div
                                v-for="(postal, index) in addressess"
                                @click="setPostalCode(postal.id)"
                                :key="`postal${index}`"
                                class="px-3 py-4 rounded-lg text-xs laptop:text-sm text-t6 hover:text-black hover:bg-p1 cursor-pointer"
                            >
                                {{ postal.address }}
                            </div>
                        </div>
                        <div
                            v-if="
                                showOthers &&
                                form.city.toLocaleLowerCase() === 'london'
                            "
                        >
                            <div class="flex items-center gap-3 p-4 rounded-lg bg-p1">
                                <IconMapPin class="stroke-p7 fill-p7" />
                                <div
                                    v-text="'London, United Kingdom'"
                                    class="text-sm text-p7"
                                />
                            </div>
                            <input
                                class="first-letter:capitalize border-[0.5px] border-t9 p-3 rounded-md w-full mt-5"
                                v-model="form.address"
                                @input="checkAddress"
                                :maxlength="255"
                                :placeholder="$t('Enter your address')"
                                noErrorMessage
                            />
                        </div>
                    </div>
                    <div
                        v-if="form.city.toLocaleLowerCase() !== 'london'"
                        class="mt-6 p-6 bg-[#F9943B1A] text-t7 laptop:rounded-2xl flex items-center gap-4"
                    >
                        <IconWarningCircle class="fill-[#F9943B]" />
                        <div
                            v-text="
                                $t(
                                    'Currently we do not support any request outside the London.'
                                )
                            "
                        />
                    </div>
                </div>
            </template>
        </div>
        <div
            v-show="selectedMethod === 'addNew' || form.addressId"
            class="flex flex-col gap-6"
        >
            <div
                class="text-p9 font-medium text-xl"
                v-text="
                    isSendItem
                        ? $t('Sender Information')
                        : $t('Receiver Information')
                "
            />
            <div class="flex flex-col gap-4">
                <div class="flex gap-4 [&>*]:w-full">
                    <BaseInput
                        v-model="form.first_name"
                        :maxlength="30"
                        name="first_name"
                        :label="$t('First name')"
                        size="m"
                        :placeholder="$t('Input First name')"
                    />
                    <BaseInput
                        v-model="form.last_name"
                        :maxlength="30"
                        name="last_name"
                        :label="$t('Last name')"
                        size="m"
                        :placeholder="$t('Input Last name')"
                    />
                </div>
                <BaseInputPhone
                    v-model="form.phone_number"
                    :maxlength="10"
                    name="phone_number"
                    :label="$t('Phone Number')"
                    size="m"
                    :selectedCountryCode="selectedCountryCode"
                    @selectCountry="(code) => (selectedCountryCode = code)"                    
                    noCountryChange
                />                
            </div>
        </div>
        <div
            v-show="selectedMethod === 'addNew' || form.addressId"
            class="z-10 laptop:justify-end flex flex-col gap-2 laptop:flex-row p-6 pt-2 laptop:p-0 fixed bg-p1 shadow-s-1 laptop:bg-transparent laptop:shadow-transparent laptop:static bottom-0 start-0 end-0"
        >
            <BaseButton
                class="laptop:hidden"
                :text="$t('In your cart')"
                size="m"
                styleType="text"
                endIcon="IconArrowDown"
                @click="$emit('showSummary')"
                rotateIcon
                type="button"
            />
            <BaseButton
                :text="$t('Save and continue')"
                size="l"
                :isLoading="isLoading"
                :isDisabled="!(
                    (selectedMethod === 'addNew' && form.address || selectedMethod === 'savedAddress' && form.addressId) &&
                    form.first_name &&
                    form.last_name &&
                    form.phone_number &&
                    form.city.toLocaleLowerCase() === 'london' &&
                    $UKPhoneRegExp.test(form.phone_number)
                )"
                @click="submitForm"
                type="submit"
                buttonId="save-and-continue"
            />
        </div>
    </Form>
</template>

<script setup>
import { Form } from 'vee-validate';
import * as Yup from 'yup';

const emits = defineEmits(['saveClicked']);
defineProps({
    isSendItem: Boolean,
    isLoading: Boolean,
});

const { $UKPhoneRegExp, $postalCodeRegex } = useNuxtApp();

const account_info = useState('account_info');

const form = reactive({
    first_name: account_info.value?.firstName || '',
    last_name: account_info.value?.lastName || '',
    phone_number:
        (account_info.value?.phone &&
        account_info.value?.phone.split(' ').length === 2
            ? account_info.value?.phone.split(' ')[1]
            : '') || '',
    addressId: '',
    /////////////////
    country: 'United Kingdom',
    address: '',
    city: 'London',
    postalCode: '',
});

const ManualSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    postalCode: Yup.string().test((value) => {
        return $postalCodeRegex.test(value);
    }),
    address: Yup.string().min(10, 'Address must be at least 10 characters'),
    city: Yup.string(),
    country: Yup.string(),
    phone_number: Yup.string()
        .matches($UKPhoneRegExp, 'Phone number is not valid')
        .required('Phone number is required'),
});

const SavedSchema = Yup.object().shape({
    addressId: Yup.string().required(),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    phone_number: Yup.string()
        .matches($UKPhoneRegExp, 'Phone number is not valid')
        .required('Phone number is required'),
});

const selectedCountryCode = ref('44');

const { addresses, addAddress } = useAccount();
await addresses();
const addressesState = useState('addresses');

const isAnyAddressInState = computed(
    () =>
        addressesState.value?.data &&
        Array.isArray(addressesState.value?.data) &&
        addressesState.value?.data.length > 0
);

const savedAddresses = computed(() => {
    return addressesState.value?.data.map((el) => {
        return {
            id: el.id,
            value: el.id,
            text: `${el.postalCode} | ${el.address} | ${
                el.city
            } | ${el.country?.toUpperCase()}`,
        };
    });
});

const countryList = [
    { id: 0, text: 'United Kingdom', value: 'United Kingdom' },
];

await addresses();

const selectedMethod = ref(
    isAnyAddressInState.value ? 'savedAddress' : 'addNew'
);

const submitForm = async () => {
    if (selectedMethod.value === 'savedAddress') {
        const body = {
            addressId: form.addressId,
            first_name: form.first_name,
            last_name: form.last_name,
            phone_number: `+${
                selectedCountryCode.value
            }${form.phone_number.replace(/^0+/, '')}`,
        };
        emits('saveClicked', body);
    } else if (selectedMethod.value === 'addNew') {
        const body = {
            address: form.address,
            postalCode: form.postalCode,
            country: form.country,
            city: form.city,
        };
        const { data, error } = await addAddress({ body: body });
        await addresses();
        if (!error.value) {
            const body = {
                addressId: data.value.id,
                postalCode: form.postalCode,
                first_name: form.first_name,
                last_name: form.last_name,
                phone_number: `+${
                    selectedCountryCode.value
                }${form.phone_number.replace(/^0+/, '')}`,
            };

            emits('saveClicked', body);
        }
    }
};

const route = useRoute();
const router = useRouter();
const showOthers = ref(false);

const searchMenuIsShow = ref(false);

if (route.query.postalCode) {
    form.postalCode = route.query.postalCode;
    form.address = route.query.address;
    showOthers.value = true;
    router.push('/repair');
}

const addressess = ref([]);
const checkPostalCode = async () => {
    const { getPostCodes } = useItem();
    const { data } = await getPostCodes({ q: form.postalCode });
    addressess.value = data.value.data;
};

const setPostalCode = async (id) => {
    searchMenuIsShow.value = false;
    const { getPostCode } = useItem();
    const { data } = await getPostCode(id);
    if (data.value) {
        showOthers.value = true;
            form.postalCode = data.value.postcode;
            form.city = data.value.town_or_city;
            form.address = data.value.formatted_address.join(' ');
    }
};

const selectedSlider = ref(0);
const search = ref(null);

const focusInput = ref(false);

const checkModal = (e) => {
    if (!document.getElementById('clickbox')?.contains(e.target)) {
        searchMenuIsShow.value = false;
        focusInput.value = false;
    }
};

watch(
    () => selectedSlider.value,
    (newVal) => {
        const selectedCard = document.getElementById(`card-${newVal}`);
        const container = document.getElementById(`cardsContainer`);
        container.scrollTo({
            left: selectedCard?.offsetLeft - container?.offsetLeft,
            behavior: 'smooth',
        });
    }
);

onBeforeMount(async () => {
    const token = useCookie('token');
    const addressessState = useState('addressess');
    if (token.value) {
        if (!addressessState.value) {
            const { addressess } = useAccount();
            await addressess();
        }
    }
});
onMounted(() => {
    window.addEventListener('click', checkModal);
});
</script>
