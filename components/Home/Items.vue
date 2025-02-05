<template>
  <div class=" flex flex-col gap-6 relative">
    <div class=" gridClass flex justify-between items-center">
      <div class=" text-black text-[28px]" v-text="title" />
      <!-- <BaseButton styleType="text" :text="$t('Show all')" @click="$emit('showAll')" /> -->
      <div class="text-black" v-text="description" />
    </div>
    <div>
      <div class="gridClass flex gap-6 overflow-x-auto" id="itemsContainer" ref="itemsContainer">
        <MarketItem
          v-for="(item, i) in items"
          :id="`item-${i}`"
          :key="item.id"
          isForHomePage
          :data="item.product"
          :hasAddFavorite="!!token"
        />
        <div v-show="$refs?.itemsContainer?.scrollLeft > 0" class="w-12 h-12 border border-p7 bg-white rounded-full  cursor-pointer absolute top-52 left-5 flex justify-center items-center" @click="
            selectedSlider <= 0
            ? (selectedSlider = items.length - 1)
            : (selectedSlider = selectedSlider - 1)
            ">
          <IconCaretUpLight
          class="w-8 h-8 p-1.5 fill-p7 me-0.5"
          
        />
      </div>
        <div class="w-12 h-12 border border-p7 bg-white rounded-full  cursor-pointer absolute top-52 right-5 flex justify-center items-center" @click="
            selectedSlider >= items.length - 1
              ? (selectedSlider = 0)
              : (selectedSlider = selectedSlider + 1)
          ">
        <IconCaretUpLight
          class="w-8 h-8 p-1.5 fill-p7 rotate-180 ms-0.5"
          
        />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  items: Array,
  description: String,
});

const token = useCookie("token");

const selectedSlider = ref(0)

watch(() => selectedSlider.value, (newVal, oldVal) => {
  const selectedItem = document.getElementById(`item-${newVal}`)
  const container = document.getElementById(`itemsContainer`)
  if(newVal === -1 || ((container.scrollWidth - container.clientWidth) - container.scrollLeft === 0) && oldVal < newVal){
      selectedSlider.value = 0
      container.scrollTo({left: 0, behavior: 'smooth'})
  }else{
    container.scrollTo({left: selectedItem?.offsetLeft - container?.offsetLeft, behavior: 'smooth'})
  }})
</script>
