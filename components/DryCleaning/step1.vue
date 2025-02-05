<template>
    <div class="mobile-sss:h-screen laptop:h-auto">
        <div
            class="text-3xl text-p8 mb-12 hidden laptop:block"
            v-text="$t('Dry Cleaning Request')"
        />
        <div
            class="laptop:text-xl text-p9 mb-6"
            v-text="$t('Delivery Information')"
        />
        <div v-if="token && addressesState?.data?.length" class="my-12">
            <div class="flex flex-col gap-8">
                <div
                    id="cardsContainer"
                    class="w-full flex flex-row gap-6 overflow-x-auto"
                >
                    <div
                        :id="`card-0`"
                        class="flex flex-col items-center justify-center gap-4 p-3 rounded-lg cursor-pointer"
                        :class="
                            !cardValue
                                ? 'border-2 border-p7 bg-p1'
                                : 'bg-[#F1F4F180] border border-p1'
                        "
                        @click="newAddressClicked()"
                    >
                        <IconPlus class="w-8 h-8" />
                        <div
                            v-text="'New Address'"
                            class="text-t8 text-sm whitespace-nowrap"
                        />
                    </div>
                    <DryCleaningAddressCard
                        v-for="(card, i) in addressesState?.data"
                        :key="card.id"
                        :id="`card-${i + 1}`"
                        :data="card"
                        :colorIndex="(i + 1) % 3"
                        :isSelected="cardValue === card.id"
                        class="cursor-pointer"
                        @click="selectCard(card)"
                        :isSelectable="true"
                    />
                </div>
                <div
                    v-if="addressesState?.data.length > 1"
                    class="flex gap-2 items-center justify-center laptop:justify-start"
                >
                    <IconCaretUp
                        class="w-8 h-8 p-1.5 fill-p7 cursor-pointer"
                        @click="
                            selectedSlider <= 0
                                ? (selectedSlider = addressesState?.data.length)
                                : (selectedSlider = selectedSlider - 1)
                        "
                    />
                    <div
                        v-for="(item, i) in addressesState?.data.length + 1"
                        :key="item.id"
                        class="rounded-full"
                        :class="
                            selectedSlider === i
                                ? 'w-6 h-1 bg-p7'
                                : 'w-1 h-1 bg-p3 cursor-pointer'
                        "
                        @click="selectedSlider = i"
                    />
                    <IconCaretUp
                        class="w-8 h-8 fill-p7 cursor-pointer rotate-180 p-1.5"
                        @click="
                            selectedSlider >= addressesState?.data.length
                                ? (selectedSlider = 0)
                                : (selectedSlider = selectedSlider + 1)
                        "
                    />
                </div>
            </div>
        </div>
        <div
            ref="formSection"
            v-if="!cardValue"
            class="text-xs laptop:text-sm text-t9 mb-2"
            v-text="$t('Post code')"
        />
        <div
            v-if="!cardValue"
            id="clickbox"
            class="relative w-full flex flex-col gap-6"
            :tabindex="0"
        >
            <BaseInputSearch
                v-model="deliveryForm.postalCode"
                @input="checkPostalCode"
                ref="search"
                :maxlength="50"
                noErrorMessage
                outline
                class="first-letter:capitalize"
                :placeholder="$t('Enter your post code')"
                @focus="searchMenuIsShow = true"
                :focus-input="focusInput"
                @keyup.esc="($event) => $event.target.blur()"
            />
            <div
                ref="searchModal"
                @click.stop="() => {}"
                v-if="searchMenuIsShow && addresses?.length"
                style="box-shadow: 0px 1px 8px 0px #00000014"
                class="absolute max-h-52 overflow-auto p-2 top-[59px] start-0 z-30 w-full rounded-lg bg-white"
            >
                <div
                    v-for="(postal, index) in addresses"
                    @click="setPostalCode(postal.id)"
                    :key="`postal${index}`"
                    class="px-3 py-4 rounded-lg text-xs laptop:text-sm text-t6 hover:text-black hover:bg-p1 cursor-pointer"
                >
                    {{ postal.address }}
                </div>
            </div>
            <!-- v-if="postalCodes.filter(el => el == deliveryForm.postalCode).length" -->
            <div
                v-if="
                    showOthers &&
                    deliveryForm.city.toLocaleLowerCase() === 'london'
                "
            >
                <div class="flex items-center gap-3 p-4 rounded-lg bg-p1">
                    <IconMapPin class="stroke-p7 fill-p7" />
                    <div
                        v-text="'London, United Kingdom'"
                        class="text-sm text-p7"
                    />
                </div>
                <BaseInputTextarea
                    class="mt-4"
                    :label="$t('Address')"
                    v-model="deliveryForm.address"
                    :placeholder="$t('Enter your address')"
                    noErrorMessage
                />
            </div>
        </div>
        <!-- <div
            v-if="!token"
            class="mt-6 p-6 bg-[#65ACF01A] text-t7 laptop:rounded-2xl"
        >
            Please
            <nuxt-link
                :to="{ name: 'login', query: { redirect: route.fullPath } }"
                class="text-info"
                >Login</nuxt-link
            >
            for using saved addresses
        </div> -->
        <div
            v-if="deliveryForm.city.toLocaleLowerCase() !== 'london'"
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
        <div
            class="flex justify-end laptop:mt-12 fixed z-20 bottom-0 left-0 p-6 laptop:p-0 bg-p1 laptop:bg-transparent laptop:relative w-full"
        >
            <BaseButton
                buttonId="dry-cleaning-select-address"
                class="w-full laptop:w-fit"
                :isLoading="isLoading"
                @click="addressSelected"
                size="l"
                :text="$t(`Next`)"
                styleType="fill"
                :isDisabled="
                    (!deliveryForm.postalCode ||
                        !deliveryForm.address ||
                        deliveryForm.city.toLocaleLowerCase() !== 'london') &&
                    !cardValue
                "
            />
        </div>
    </div>
</template>

<script setup>
// definePageMeta({
//     name: 'dry-cleaning-step1',
// });

const props = defineProps({
    data: Object,
});

const emits = defineEmits(['addressSelected']);

const token = useCookie('token');

const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
const showOthers = ref(false);

const deliveryForm = ref({
    postalCode: '',
    country: 'United Kingdom',
    city: 'London',
    address: '',
});
const searchMenuIsShow = ref(false);

if (route.query.postalCode) {
    deliveryForm.value.postalCode = route.query.postalCode;
    deliveryForm.value.address = route.query.address;
    showOthers.value = true;
    router.push('/dry-cleaning/request');
}

const addresses = ref([]);
const checkPostalCode = async () => {
    const { getPostCodes } = useItem();
    const { data } = await getPostCodes({ q: deliveryForm.value.postalCode });
    addresses.value = data.value.data;
};

const setPostalCode = async (id) => {
    searchMenuIsShow.value = false;
    const { getPostCode } = useItem();
    const { data } = await getPostCode(id);
    if (data.value) {
        showOthers.value = true;
        deliveryForm.value = {
            postalCode: data.value.postcode,
            country: data.value.country,
            city: data.value.town_or_city,
            address: data.value.formatted_address.join(' '),
        };
    }
};

// const postalCodesFilter = computed(() => {
//   postalCodes.value.filter(el => el.cityname.includes(searchedCity.value))
// })

const selectedSlider = ref(0);
const cardValue = ref(null);

if (props.data?.addressId) {
    cardValue.value = props.data?.addressId;
}

const selectCard = (card) => {
    if (cardValue.value === card.id) {
        cardValue.value = null;
        deliveryForm.value.postalCode = '';
        deliveryForm.value.address = '';
    } else {
        cardValue.value = card.id;
        deliveryForm.value.postalCode = card.postalCode;
        deliveryForm.value.address = card.address;
    }
};

const formSection = ref(null);
const search = ref(null);

const focusInput = ref(false);
const newAddressClicked = () => {
    cardValue.value = null;
    deliveryForm.value.postalCode = '';
    deliveryForm.value.address = '';
    setTimeout(() => {
        window.scrollTo({
            top: formSection.value?.offsetTop - 150,
            behavior: 'smooth',
        });
        // search.value.focus();
        focusInput.value = true;
    }, 100);
};

const addressSelected = async () => {
    isLoading.value = true;
    const { createCleaning } = useItem();
    const { addAddress } = useAccount();
    let res, err;
    if (cardValue.value) {
        const { data, error } = await createCleaning({
            addressId: cardValue.value,
        });
        res = data.value;
        err = error.value;
    } else {
        const form = {
            address: deliveryForm.value.address,
            postalCode: deliveryForm.value.postalCode,
            country: deliveryForm.value.country,
            city: deliveryForm.value.city,
        };
        const { data: addressData } = await addAddress({ body: form });
        const { data, error } = await createCleaning({
            addressId: addressData.value.id,
        });
        res = data.value;
        if (error.value) {
            isLoading.value = false;
            const { create } = useToast();
            create({
                id: Math.random(),
                type: 'danger',
                desc: 'Currently we do not support any request outside the London.',
                noClose: true,
                time: 5,
            });
        }
    }
    if (res) {
        router.push({
            name: 'single-dry-cleaning-request',
            params: { id: res.id },
            query: { step: 2 },
        });
        emits('addressSelected');
    }
    isLoading.value = false;
};

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

watch(
    () => route.name,
    () => {
        deliveryForm.postalCode.value = '';
    }
);
const addressesState = useState('addresses');
onBeforeMount(async () => {
    const token = useCookie('token');
    const addressesState = useState('addresses');
    if (token.value) {
        if (!addressesState.value) {
            const { addresses } = useAccount();
            const { data, error } = await addresses();
        }
    }
});
onMounted(() => {
    window.addEventListener('click', checkModal);
});
</script>
