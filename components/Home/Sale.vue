<template>
    <div v-if="time > 0" class="overflow-visible base-container relative">
      <div class="bg-home-texture ms-4 laptop:ms-8 p-8 flex gap-6 overflow-x-auto" id="itemsContainer" ref="itemsContainer">
        <div class="flex flex-col justify-between min-w-[236px] gap-10" id="item--1">
          <div class="flex flex-col gap-6 text-white">
            <div v-text="title" class="text-3xl laptop:text-[38px] font-bold" />
            <div class="grid grid-cols-7">
              <template v-for="(section, i) in timeList" :key="section.id">
                <div
                  class="w-full flex justify-center items-center text-3xl font-bold"
                >
                  <div v-text="remainingTimeComputed[section.key]" />
                </div>
                <div
                  v-if="i < timeList.length - 1"
                  class="w-full flex justify-center items-center text-2xl font-bold"
                >
                  <div v-text="':'" />
                </div>
              </template>
              <template v-for="(section, i) in timeList" :key="section.id">
                <div class="w-full flex justify-center items-center text-sm">
                  <div v-text="section.label" />
                </div>
                <div v-if="i < timeList.length - 1">
                  <div />
                </div>
              </template>
            </div>
            <div class="text-lg font-bold">
              <span v-text="`&quot;`" />
              <span
                v-text="desc"
              />
              <span v-text="`&quot;`" />
            </div>
          </div>
          <!-- <div
            class="py-2 h-10 w-full flex gap-2 fill-t1 text-t1 justify-center cursor-pointer"
            @click="$emit('showAll')"
            >
            <div v-text="$t('See All')" />
            <IconArrowCircleRight class="w-6 h-6" />
          </div> -->
        </div>
        <MarketItem v-for="(item,i) in items" :key="item.id" :id="`item-${i}`" :isDisbaled="item?.state && item?.state !== 'ready for sell'" isForBigSale :data="item" :hasAddFavorite="!!token" />
        <!-- <div @click="$emit('showAll')" class="bg-white min-w-[292px] p-4 pt-0 cursor-pointer flex flex-col justify-center items-center gap-4 ">
            <IconArrowCircleRight class="fill-p7 w-12 h-12" />
            <div class="text-p7 text-2xl font-medium" v-text="$t('See All')" />
        </div> -->
      </div>
      <div v-show="$refs?.itemsContainer?.scrollLeft > 0" class="w-12 h-12 border border-p7 bg-white rounded-full  cursor-pointer absolute top-52 left-5 flex justify-center items-center" @click="
          selectedSlider <= -1
          ? null
          : (selectedSlider = selectedSlider - 1)
          ">
        <IconCaretUpLight
        class="w-8 h-8 p-1.5 fill-p7 me-0.5"
        
      />
    </div>
      <div class="w-12 h-12 border border-p7 bg-white rounded-full  cursor-pointer absolute top-52 right-5 flex justify-center items-center" @click="
          selectedSlider >= items.length - 1
            ? (selectedSlider = -1)
            : (selectedSlider = selectedSlider + 1)
        ">
      <IconCaretUpLight
        class="w-8 h-8 p-1.5 fill-p7 rotate-180 ms-0.5"
        
      />
      </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    desc: String,
    campaignEndTime: Number,
    items: Array,
})

const { t } = useI18n()
const token = useCookie("token");

const timeList = [
  { id: 0, label: t("day"), key: "day" },
  { id: 1, label: t("hour"), key: "hour" },
  { id: 2, label: t("minute"), key: "minute" },
  { id: 3, label: t("second"), key: "second" },
];


const time = ref(props.campaignEndTime - new Date().getTime());
setInterval(() => {
    time.value = props.campaignEndTime - new Date().getTime();
}, 1000)

const remainingTimeComputed = computed(() => {
  if (time.value && time.value > 0) {
    let remainingTime = time.value
    const remainingDay = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    remainingTime -= remainingDay * (1000 * 60 * 60 * 24);
    const remainingHour = Math.floor(remainingTime / (1000 * 60 * 60));
    remainingTime -= remainingHour * (1000 * 60 * 60);
    const remainingMinute = Math.floor(remainingTime / (1000 * 60));
    remainingTime -= remainingMinute * (1000 * 60);
    const remainingSecond = Math.floor(remainingTime / 1000);
    return {
      day: remainingDay,
      hour: remainingHour.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
      minute: remainingMinute.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
      second: remainingSecond.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
    };
  } else {
    return {
      day: "0",
      hour: "00",
      minute: "00",
      second: "00",
    };
  }
});




const selectedSlider = ref(-1)

watch(() => selectedSlider.value, (newVal, oldVal) => {
  const selectedItem = document.getElementById(`item-${newVal}`)
  const container = document.getElementById(`itemsContainer`)
  if(newVal === -1 || ((container.scrollWidth - container.clientWidth) - container.scrollLeft === 0) && oldVal < newVal){
      selectedSlider.value = -1
      container.scrollTo({left: 0, behavior: 'smooth'})
  }else{
    container.scrollTo({left: selectedItem?.offsetLeft - container?.offsetLeft, behavior: 'smooth'})
  }
})


</script>