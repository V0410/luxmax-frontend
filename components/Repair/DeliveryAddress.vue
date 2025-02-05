<template>
    <div class="mobile-sss:h-screen laptop:h-auto">
        <div
            id="clickbox"
            class="relative w-full flex flex-col gap-6"
            :tabindex="0"
        >
            <input
                class="first-letter:capitalize border-[0.5px] border-t9 p-3 rounded-md"
                v-model="deliveryForm.postalCode"   
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
                <input
                    class="first-letter:capitalize border-[0.5px] border-t9 p-3 rounded-md w-full mt-5"
                    v-model="deliveryForm.address"
                    @input="checkAddress"
                    :maxlength="255"
                    :placeholder="$t('Enter your address')"
                    noErrorMessage
                />
            </div>
        </div>
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
    </div>
</template>

<script setup>
// definePageMeta({
//     name: 'dry-cleaning-step1',
// });

const props = defineProps({
  address: String,
  postalCode: String
});
const emit = defineEmits(['updateAddress', 'updatePostalCode']);



const route = useRoute();
const router = useRouter();
const showOthers = ref(false);

const deliveryForm = ref({
    postalCode: props.address,
    country: 'United Kingdom',
    city: 'London',
    address: props.postalCode,
});
const searchMenuIsShow = ref(false);

if (route.query.postalCode) {
    console.log('a', route.query.postal);
    deliveryForm.value.postalCode = route.query.postalCode;
    deliveryForm.value.address = route.query.address;
    showOthers.value = true;
    router.push('/repair');
}

const addressess = ref([]);
const checkPostalCode = async () => {
    const { getPostCodes } = useItem();
    const { data } = await getPostCodes({ q: deliveryForm.value.postalCode });
    addressess.value = data.value.data;
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

watch(
    () => route.name,
    () => {
        deliveryForm.postalCode.value = '';
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
