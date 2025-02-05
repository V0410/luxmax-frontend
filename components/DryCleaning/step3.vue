<template>
    <div class="flex flex-col gap-6">
        <div v-text="$t('Dry Cleaning Request')" class="text-p8 text-3xl" />
        <div class="p-6 rounded-2xl bg-[#65ACF01A] text-t7">
            Usually our dry cleaning service take 48 to 72 hours, if you need
            our service in a shorter time please
            <a href="/contact" target="_blank" class="text-info cur">Call Us</a>
        </div>
        <div v-text="$t('Select services')" class="text-p8 text-xl mb-4" />
        <BaseInputSearch
            v-model="searchInput"
            size="l"
            ref="search"
            :maxlength="50"
            noErrorMessage
            outline
            class="first-letter:capitalize"
            :placeholder="$t('Search for dresses, jeans, and more')"
            @keyup.enter="($event) => $event.target.blur()"
        />
        <div class="relative">
            <div
                class="flex overflow-auto gap-4 pr-20"
                :class="scrolling ? 'cursor-grabbing' : 'cursor-grab'"
                ref="scrollSection"
                @mousemove="draging"
                @mousedown="mouseIsDown"
                @mouseleave="scrolling = false"
                @mouseup="scrolling = false"
                @scroll="mouseScroll"
            >
                <span
                    v-if="scrolledFromLeft > 30"
                    @click="scrollLeftFunc"
                    class="scroll-left h-full w-10 laptop:w-10 absolute top-0 left-0 flex items-center justify-start px-2"
                    style="
                        background: linear-gradient(
                            270deg,
                            #ffffff 0%,
                            rgba(255, 255, 255, 0) 100%
                        );
                        transform: scaleX(-1);
                    "
                    ><IconCaretDoubleRight/>
                </span>
                <div
                    ref="service-list"
                    v-for="(service, i) in data?.data"
                    :key="i"
                    @click="
                        (selectedService = i),
                            (searchInput = null),
                            (searchedServices = null)
                    "
                    :title="service.type ? (service.type === 'wash_dry' ? 'Wash and Dry' : service.type === 'dry_cleaning' ? 'Dry Cleaning' : '') : null"
                    v-text="service.name"
                    :class="selectedService == i ? 'bg-p2' : ''"
                    class="border cursor-pointer whitespace-nowrap border-[#3F503D] rounded-[10px] text-[#3F503D] py-2 px-4"
                />
                <span
                    v-if="scrolledFromLeft < 30"
                    @click="scrollRightFunc"
                    class="scroll-right h-full w-10 laptop:w-10 absolute top-0 right-0 flex items-center justify-end px-2"
                    style="
                        background: linear-gradient(
                            270deg,
                            #ffffff 0%,
                            rgba(255, 255, 255, 0) 100%
                        );
                    "
                    ><IconCaretDoubleRight/>
                </span>
            </div>
        </div>

        <span class="h-[1px] w-full bg-p1" />
        <div
            class="flex flex-col gap-4"
            v-if="!!searchedServices?.data?.length || !!searching"
        >
            <template v-if="!searching">
                <template
                    v-for="(service, i) in searchedServices?.data"
                    :key="`subService${i}`"
                >
                    <div
                        v-for="(subService, i) in service.services"
                        :key="`subService${i}`"
                        class="flex justify-between items-center border-b border-p2 p-4"
                    >
                        <div v-text="subService.name" />              
                        <div class="flex items-center gap-5">
                            <div>£{{ subService.price }}</div>
                            <div
                                class="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center bg-p7"
                            >
                                <IconMinus
                                    @click="
                                        manageServiceList('minus', subService)
                                    "
                                    class="w-[70%] stroke-white"
                                />
                            </div>
                            <div>
                                {{ serviceList[subService?.id]?.count || 0 }}
                            </div>
                            <div
                                class="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center bg-p7"
                            >
                                <IconPlus
                                    @click="
                                        manageServiceList('plus', subService)
                                    "
                                    class="w-[70%] fill-white"
                                />
                            </div>
                        </div>
                    </div>
                </template>
            </template>

            <div v-else class="flex justify-center">
                <IconSpinner
                    class="animate-spin w-10 h-10"
                    :class="
                        styleType === 'fill'
                            ? 'fill-white'
                            : styleType === 'outlined'
                            ? 'fill-p8'
                            : styleType === 'text'
                            ? 'fill-p8'
                            : ''
                    "
                />
            </div>
        </div>
        <div
            class="flex flex-col gap-4"
            v-else-if="
                !!data?.data[selectedService]?.services?.length &&
                !searchedServices?.data?.length
            "
        >
            <div
                v-for="(subService, i) in data?.data[selectedService]?.services"
                :key="`subService${i}`"
                class="flex justify-between items-center border-b border-p2 p-4"
            >
                <div v-text="subService.name" />
                <div class="flex items-center gap-5">
                    <div>£{{ subService.price }}</div>
                    <div
                        class="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center bg-p7"
                    >
                        <IconMinus
                            @click="manageServiceList('minus', subService)"
                            class="w-[70%] stroke-white"
                        />
                    </div>
                    <div>{{ serviceList[subService.id]?.count || 0 }} </div>
                    <div
                        class="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center bg-p7"
                    >
                        <IconPlus
                            @click="manageServiceList('plus', subService)"
                            class="w-[70%] fill-white"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="rounded-2xl p-6 bg-[#F9943B1A] text-t7">
            We couldn't find what you're looking for. Try searching with
            different keywords.  If you still can't find the dress you
            want, feel free to
            <nuxt-link :to="{ name: 'contact' }" class="text-warning"
                >contact us</nuxt-link
            >
        </div>

        <div v-if="!canProceed" class="p-6 rounded-2xl bg-[#fff3cd] text-t7">
            Orders must be at least £30. Please add more items to your cart to proceed.
        </div>
        <div class="p-5 bg-[#1cb756a3] text-t8 rounded-2xl">
            We will apply 15% discount to your first order.
        </div>
        <div class="hidden laptop:flex justify-end mt-4 gap-4">
            <button
                @click="$emit('back')"
                class="border-2 border-p7 px-4 laptop:px-12 text-p7 text-lg rounded-full"
            >
                Back
            </button>
            <BaseButton
                @click="servicesSelected"
                :isLoading="isLoading"
                buttonId="dry-cleaning-select-services"
                text="Next"
                size="l"
                :isDisabled="!canProceed"
            />
        </div>
        <div
            class="fixed laptop:hidden bottom-0 left-0 bg-p1 w-full p-6 pt-2 flex flex-col gap-2"
        >
            <BaseButton
                v-if="!imageUploadLoading"
                :text="$t('Selected services')"
                buttonId="dry-cleaning-selected-services"
                size="m"
                class="flex-grow"
                styleType="text"
                endIcon="IconArrowDown"
                rotateIcon
                @click="$emit('openServices')"
            />
            <div class="flex gap-4 w-full">
                <button
                    @click="$emit('back')"
                    class="border-2 border-p7 px-4 laptop:px-12 text-p7 w-1/2 text-lg rounded-full"
                    id="dry-cleaning-back-services"
                >
                    Back
                </button>
                <BaseButton
                    buttonId="dry-cleaning-select-services"
                    @click="servicesSelected"
                    :isLoading="isLoading"
                    text="Next"
                    size="l"
                    :isDisabled="!Object.values(serviceList).filter(item => item.count > 0).length"
                    class="w-1/2"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import debounce from 'lodash/debounce';
const props = defineProps({
    data: Object,
    canProceed: Boolean
});
const scrolling = ref(false);
const scrollSection = ref(null);
let startX = ref(null);
let scrollLeft = ref(null);
const serviceList = ref({});
const isLoading = ref(false);
const scrolledFromLeft = ref(0);
const route = useRoute();
const emits = defineEmits(['servicesChanged', 'servicesSelected']);

props.data?.services.forEach((service) => {
    serviceList.value[service.serviceId] = {
        name: service.service.name,
        count: service.count,
        price: service.service.price,
    };
});

const totalPrice = inject('totalPrice');
const coupon = inject('coupon');


emits('servicesChanged', serviceList.value);

const { cleaningServices } = useItem();
const { data } = await cleaningServices();

const selectedService = ref(0);

const mouseScroll  = () => {
    scrolledFromLeft.value = scrollSection.value.scrollLeft;
};

const mouseIsDown = (e) => {
    scrolling.value = true;
    startX.value = e.pageX - scrollSection.value.offsetLeft;
    scrollLeft.value = scrollSection.value.scrollLeft;
    scrolling.value = false;
};

const draging = (e) => {
    if (scrolling.value) {
        e.preventDefault();
        const x = e.pageX - scrollSection.value.offsetLeft;
        const walk = (x - startX.value) * 3; //scroll-fast
        scrollSection.value.scrollLeft = scrollLeft.value - walk / 2;
        scrollLeft.value = scrollSection.value.scrollLeft;
    }
};

const scrollRightFunc = (e) => {
    e.preventDefault();    
    let scrollAmount = scrollSection.value.scrollWidth - scrollSection.value.clientWidth;
    scrollSection.value.scrollLeft = scrollAmount;
    scrollLeft.value = scrollAmount;
};

const scrollLeftFunc = (e) => {
    e.preventDefault();
    
    scrollSection.value.scrollLeft = 0;
    scrollLeft.value = scrollSection.value.scrollLeft;
};

const searchInput = ref('');
const searchedServices = ref(null);
const searching = ref(false);

const debounceDelay = 1500;
const debouncedSearchServices = debounce(async () => {
    if (searchInput.value) {
        searching.value = true;
        selectedService.value = -1;
        const { data } = await cleaningServices({
            q: searchInput.value.toLowerCase(),
        });
        searchedServices.value = data.value;
        searching.value = false;
    }
}, debounceDelay);

watch(
    () => searchInput.value,
    () => {
        debouncedSearchServices.cancel();
        debouncedSearchServices();
    },
    { immediate: true }
);

const manageServiceList = (func, service) => {
    if (!serviceList.value[service.id])
        serviceList.value[service.id] = {
            name: service.name,
            count: 0,
            price: service.price,
        };
    if (func == 'minus' && serviceList.value[service.id].count > 0) {
        serviceList.value[service.id].count -= 1;
    } else if (
        func == 'plus' &&
        serviceList.value[service.id].count < service.max
    ) {
        serviceList.value[service.id].count += 1;
    }
    emits('servicesChanged', serviceList.value);
};

const servicesSelected = () => {
    isLoading.value = true;
    const { itemServices } = useItem();
    let data = [];

    Object.keys(serviceList.value).forEach((el) => {
        data.push({
            itemId: route.params.id,
            count: serviceList.value[el].count,
            serviceId: el,
        });
    });

    const { data: dataRes, error } = itemServices({ 
        services: data,
        coupon:coupon.value,
        totalPrice:totalPrice.value 
    });
    
    console.log("----------");
    console.log(dataRes);
    console.log("----------");
    if (!error.value) {
        emits('servicesSelected');
    }
    isLoading.value = false;
};

</script>
