<template>
    <div class="flex flex-col gap-12">
        <div v-text="$t('Dry Cleaning Request')" class="text-p8 text-3xl" />
        <div v-if="collectionTimes?.data?.length" class="flex flex-col gap-7">
            <div v-text="$t('Collection time')" class="text-p9 text-xl" />
            <div class="relative">
                <div
                    :class="scrollingCollection ? 'cursor-grabbing' : 'cursor-grab'"
                    ref="collectionScrollSection"
                    @mousemove="dragingCollection"
                    @mousedown="mouseIsDownCollection"
                    @mouseleave="scrollingCollection = false"
                    @mouseup="scrollingCollection = false"
                    class="flex gap-4 overflow-auto pr-20"
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
                        v-for="(time, index) in collectionTimes.data"
                        v-show="time?.times?.length"
                        @click="
                            selectCollectionDate(
                                index,
                                time?.date?.split('T')[0]
                            )
                        "
                        :key="`time${index}`"
                        :class="selectedCollectionDate == index ? 'bg-p2' : ''"
                        class="px-4 py-2 border border-[#3F503D] whitespace-nowrap rounded-[10px] text-sm cursor-pointer text-[#3F503D]"
                    >
                    {{ formatDateTime(time?.date) /*?.split('T')[0]*/ }}
                    </div>
                    <span
                        v-if="checkCollectionWidth"
                        @click="scrollRightFunc"
                        class="scroll-right h-full w-10 laptop:w-10 absolute top-0 right-0 flex items-center justify-end px-2"
                        style="
                            background: linear-gradient(
                                270deg,
                                #ffffff 0%,
                                rgba(255, 255, 255, 0) 100%
                            );
                        "
                        ><IconCaretDoubleRight
                    /></span>
                </div>
            </div>
            <span class="h-[1px] bg-p1 w-full" />
            <template
                v-for="(date, index) in collectionTimes.data"
                :key="`dateTime${index}`"
            >
                <div
                    v-if="index == selectedCollectionDate && date.times.length"
                    class="grid grid-cols-1 laptop:grid-cols-2 gap-4"
                >
                    <div
                        v-for="(time, i) in date.times"
                        :key="`timee${i}`"
                        @click="selectedCollectionTime = i"
                        :class="
                            i == selectedCollectionTime
                                ? 'bg-p1 border-2 border-p7'
                                : 'bg-[#F1F4F180] border-2 border-transparent'
                        "
                        class="py-4 px-3 rounded-lg cursor-pointer flex gap-4 items-center"
                    >
                        <div
                            class="w-5 h-5 rounded-full border border-[#858686] flex items-center justify-center"
                        >
                            <IconCheckCircleFill
                                v-if="i == selectedCollectionTime"
                            />
                        </div>
                        {{
                            DateTime.fromISO(time.start)
                                .setZone('UTC')
                                .toFormat('hh:mm a')
                        }}
                        -
                        {{
                            DateTime.fromISO(time.end)
                                .setZone('UTC')
                                .toFormat('hh:mm a')
                        }}
                    </div>
                </div>
            </template>
        </div>
        <div v-if="deliveryTimes?.data?.length" class="flex flex-col gap-7">
            <div v-text="$t('Delivery time')" class="text-p9 text-xl" />
            <div class="relative">
                <div
                    :class="
                        scrollingDelivery ? 'cursor-grabbing' : 'cursor-grab'
                    "
                    ref="deliveryScrollSection"
                    @mousemove="dragingDelivery"
                    @mousedown="mouseIsDownDelivery"
                    @mouseleave="scrollingDelivery = false"
                    @mouseup="scrollingDelivery = false"
                    class="flex gap-4 overflow-auto pr-20"
                >
                    <div
                        v-for="(time, index) in deliveryTimes?.data"
                        v-show="time?.times?.length"
                        @click="selectedDeliveryDate = index"
                        :key="`time${index}`"
                        :class="selectedDeliveryDate === index ? 'bg-p2' : ''"
                        class="px-4 py-2 border border-[#3F503D] rounded-[10px] text-sm cursor-pointer whitespace-nowrap text-[#3F503D]"
                    >
                        {{ formatDateTime(time?.date) /*?.split('T')[0]*/ }}
                    </div>
                    <span
                        v-if="checkDeliveryWidth"
                        @click="scrollRightFunc"
                        class="h-full w-20 laptop:w-40 absolute top-0 right-0 flex items-center justify-end px-2"
                        style="
                            background: linear-gradient(
                                270deg,
                                #ffffff 0%,
                                rgba(255, 255, 255, 0) 100%
                            );
                        "
                        ><IconCaretDoubleRight
                    /></span>
                </div>
            </div>
            <span class="h-[1px] bg-p1 w-full" />
            <template
                v-for="(date, index) in deliveryTimes?.data"
                :key="`dateTime${index}`"
            >
                <div
                    v-if="index == selectedDeliveryDate && date.times.length"
                    class="grid grid-cols-1 laptop:grid-cols-2 gap-4"
                >
                    <div
                        v-for="(time, i) in date.times"
                        :key="`timee${i}`"
                        @click="selectedDeliveryTime = i"
                        :class="
                            i == selectedDeliveryTime
                                ? 'bg-p1 border-2 border-p7'
                                : 'bg-[#F1F4F180] border-2 border-transparent'
                        "
                        class="py-4 px-3 rounded-lg cursor-pointer flex gap-4 items-center"
                    >
                        <div
                            class="w-5 h-5 rounded-full border border-[#858686] flex items-center justify-center"
                        >
                            <IconCheckCircleFill
                                v-if="i == selectedDeliveryTime"
                            />
                        </div>
                        {{
                            DateTime.fromISO(time.start)
                                .setZone('UTC')
                                .toFormat('hh:mm a')
                        }}
                        -
                        {{
                            DateTime.fromISO(time.end)
                                .setZone('UTC')
                                .toFormat('hh:mm a')
                        }}
                    </div>
                </div>
            </template>
        </div>
        <div
            v-if="collectionTimes?.data?.length && deliveryTimes?.data?.length"
            class="hidden laptop:flex justify-end gap-4"
        >
            <button
                class="px-7 flex items-center border-2 border-p7 rounded-full text-p7"
                @click="$emit('back')"
                id="dry-cleaning-back-time"
            >
                Back
            </button>
            <BaseButton
                buttonId="dry-cleaning-select-time"
                :isDisabled="
                    !collectionTimes?.data[selectedCollectionDate]?.times[
                        selectedCollectionTime
                    ]?.start ||
                    !collectionTimes?.data[selectedCollectionDate]?.times[
                        selectedCollectionTime
                    ]?.end ||
                    !deliveryTimes?.data[selectedDeliveryDate]?.times[
                        selectedDeliveryTime
                    ]?.start ||
                    !deliveryTimes?.data[selectedDeliveryDate]?.times[
                        selectedDeliveryTime
                    ]?.end
                "
                text="Next"
                @click="sendTime"
                :isLoading="isLoading"
            />
        </div>
        <div
            v-if="collectionTimes?.data?.length && deliveryTimes?.data?.length"
            class="fixed laptop:hidden bottom-0 left-0 bg-p1 w-full p-6 flex gap-2"
        >
            <button
                id="dry-cleaning-back-time"
                class="px-7 flex items-center justify-center border-2 border-p7 rounded-full text-p7 w-1/2"
                @click="$emit('back')"
            >
                Back
            </button>
            <BaseButton
                buttonId="dry-cleaning-select-time"
                :isDisabled="
                    !collectionTimes.data[selectedCollectionDate].times[
                        selectedCollectionTime
                    ]?.start ||
                    !collectionTimes.data[selectedCollectionDate].times[
                        selectedCollectionTime
                    ]?.end ||
                    !deliveryTimes.data[selectedDeliveryDate].times[
                        selectedDeliveryTime
                    ]?.start ||
                    !deliveryTimes.data[selectedDeliveryDate].times[
                        selectedDeliveryTime
                    ]?.end
                "
                text="Next"
                @click="sendTime"
                :isLoading="isLoading"
                class="w-1/2"
            />
        </div>
    </div>
</template>

<script setup>
import { DateTime } from 'luxon';

const props = defineProps({
    data: Object,
});

const selectedCollectionTime = ref(0);
const selectedCollectionDate = ref(0);
const selectedDeliveryTime = ref(0);
const selectedDeliveryDate = ref(0);

const mouseScroll  = () => {
    scrolledFromLeft.value = collectionScrollSection.value.scrollLeft;
};

const emits = defineEmits(['timeSelected']);
const route = useRoute();
const isLoading = ref(false);
// const scrollSection = ref(null);
const scrolledFromLeft = ref(0);
let scrollLeft = ref(null);

const formatDateTime = (dateTimeString) => {
    const date = DateTime.fromISO(dateTimeString).setZone("Europe/London");
    const day = date.day;
    const suffix =
        day === 1 || day === 21 || day === 31
            ? "st"
            : day === 2 || day === 22
            ? "nd"
            : day === 3 || day === 23
            ? "rd"
            : "th";
    const month = date.toLocaleString({
        month: "long",
    });

    return `${month} ${day}${suffix}`;
};

const draging = (e) => {
    if (scrolling.value) {
        e.preventDefault();
        const x = e.pageX - collectionScrollSection.value.offsetLeft;
        const walk = (x - startX.value) * 3; //scroll-fast
        collectionScrollSection.value.scrollLeft = scrollLeft.value - walk / 2;
        scrollLeft.value = collectionScrollSection.value.scrollLeft;
    }
};

const scrollRightFunc = (e) => {
    e.preventDefault();    
    let scrollAmount = collectionScrollSection.value.scrollWidth - collectionScrollSection.value.clientWidth;
    collectionScrollSection.value.scrollLeft = scrollAmount;
    scrollLeft.value = scrollAmount;
};

const scrollLeftFunc = (e) => {
    e.preventDefault();
    
    collectionScrollSection.value.scrollLeft = 0;
    scrollLeft.value = collectionScrollSection.value.scrollLeft;
};
const deliveryTimes = ref([]);

const { getCollection, getDelivery } = useItem();
const { data: collectionTimes } = await getCollection();


if(process.client) {
    console.log("drlivery times in the client");
    console.log("---------------------------");
    const { data }  = await getDelivery();
    deliveryTimes.value = data.value;
    console.log(deliveryTimes);
    console.log(deliveryTimes.value);
}

console.log("collection times");
console.log("---------------------------");
console.log(collectionTimes);
console.log(collectionTimes.value);
console.log("---------------------------");

const getDeliveryTimes = async (date) => {
    const { data } = await getDelivery(date);
    deliveryTimes.value = data.value;
    let isSelectedDeliveryTimes = ref(false);
    deliveryTimes.value?.data?.forEach((el, index) => {
        if (el.times.length && isSelectedDeliveryTimes) {
            selectedDeliveryDate.value = index;
            isSelectedDeliveryTimes = false;
        }
    });
};

await nextTick();
await getDeliveryTimes();


console.log("------------");
console.log("Delivery times");

console.log(deliveryTimes.value);
console.log("------------");

const scrollingCollection = ref(false);
const collectionScrollSection = ref(null);
let startXCollection = ref(null);
let scrollLeftCollection = ref(null);

const mouseIsDownCollection = (e) => {
    scrollingCollection.value = true;
    startXCollection.value = e.pageX - collectionScrollSection.value.offsetLeft;
    scrollLeftCollection.value = collectionScrollSection.value.scrollLeft;
};

const dragingCollection = (e) => {
    if (scrollingCollection.value) {
        e.preventDefault();
        const x = e.pageX - collectionScrollSection.value.offsetLeft;
        const walk = (x - startXCollection.value) * 3; //scroll-fast
        collectionScrollSection.value.scrollLeft =
            scrollLeftCollection.value - walk / 2;
    }
};

const scrollingDelivery = ref(false);
const deliveryScrollSection = ref(null);
let startXDelivery = ref(null);
let scrollLeftDelivery = ref(null);

const mouseIsDownDelivery = (e) => {
    scrollingDelivery.value = true;
    startXDelivery.value = e.pageX - deliveryScrollSection.value.offsetLeft;
    scrollLeftDelivery.value = deliveryScrollSection.value.scrollLeft;
};

const dragingDelivery = (e) => {
    if (scrollingDelivery.value) {
        e.preventDefault();
        const x = e.pageX - deliveryScrollSection.value.offsetLeft;
        const walk = (x - startXDelivery.value) * 3; //scroll-fast
        deliveryScrollSection.value.scrollLeft =
            scrollLeftDelivery.value - walk / 2;
    }
};


let isSelectedCollectionTimes = ref(false);
collectionTimes.value?.data?.forEach((el, index) => {
    if (el.times.length && isSelectedCollectionTimes) {
        selectedCollectionDate.value = index;
        isSelectedCollectionTimes = false;
    }
});

const selectCollectionDate = (index, date) => {
    selectedCollectionDate.value = index;
    getDeliveryTimes({ date: date });
};

setTimeout(() => {
    collectionTimes.value?.data?.forEach((element, index) => {
        if (
            element?.date?.split('T')[0] ===
            props?.data?.startCollection?.split('T')[0]
        ) {
            selectedCollectionDate.value = index;
            selectCollectionDate(index, element?.date?.split('T')[0]);
            setTimeout(() => {
                deliveryTimes.value?.data?.forEach((element, index) => {
                    if (
                        element?.date?.split('T')[0] ===
                        props?.data?.startDelivery?.split('T')[0]
                    ) {
                        selectedDeliveryDate.value = index;
                    }
                    element.times.forEach((el, i) => {
                        if (el.start === props?.data?.startDelivery) {
                            selectedDeliveryTime.value = i;
                        }
                    });
                });
            }, 1000);
        }
        element.times.forEach((el, i) => {
            if (el.start === props?.data?.startCollection) {
                selectedCollectionTime.value = i;
            }
        });
    });
}, 1000);

const sendTime = async () => {
    isLoading.value = true;
    const startCollection =
        collectionTimes.value?.data[selectedCollectionDate.value].times[
            selectedCollectionTime.value
        ].start;
    const endCollection =
        collectionTimes.value?.data[selectedCollectionDate.value].times[
            selectedCollectionTime.value
        ].end;
    const startDelivery =
        deliveryTimes.value?.data[selectedDeliveryDate.value].times[
            selectedDeliveryTime.value
        ].start;
    const endDelivery =
        deliveryTimes.value?.data[selectedDeliveryDate.value].times[
            selectedDeliveryTime.value
        ].end;
    const { editCleaning } = useItem();
    const { data } = await editCleaning(route.params.id, {
        startCollection,
        endCollection,
        startDelivery,
        endDelivery,
    });
    if (data.value) {
        emits('timeSelected');
    }
    isLoading.value = false;
};

const checkCollectionWidth = computed(() => {
    return collectionScrollSection.value?.clientWidth <
        collectionTimes.value?.data?.length * 132
        ? true
        : false;
});

const checkDeliveryWidth = computed(() => {
    return deliveryScrollSection.value?.clientWidth <
        deliveryTimes.value?.data?.length * 132
        ? true
        : false;
});
</script>
