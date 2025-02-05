<template>
  <div class="bg-[#EDF5F280] px-6 py-10 laptop:px-20 laptop:py-16 flex flex-col gap-8">
    <div class="flex items-center">
      <span class="h-[1px] w-full bg-p2 hidden laptop:block" />
      <div v-text="title" class="laptop:px-8 text-center laptop:whitespace-nowrap text-[32px] font-semibold text-p8"/>
      <span class="h-[1px] w-full bg-p2 hidden laptop:block" />
    </div>
    <div class="flex flex-col gap-6 laptop:px-20">
      <div v-for="(faq, index) in data" :key="`faq${index}`" ref="faqRef" class="flex flex-col w-full overflow-hidden gap-6 transition-all">
        <span v-if="index !== 0" class="min-h-[1px] !h-[1px] w-full bg-[#DDDDDD]" />
        <span v-if="index === 0" class="min-h-[1px] !h-[1px] w-full bg-transparent" />
        <div @click="manageFaq(index)" class="flex items-center justify-between gap-4 w-full cursor-pointer" ref="faqQuestion">
          <div :class="index === selectedFaq ? 'text-p7' : 'text-t7'" class="laptop:text-[22px]" v-text="faq?.question"/>
          <IconPlus v-if="index !== selectedFaq"  class="fill-t7 w-[14px] min-w-[14px]"/>
          <IconMinus v-if="index === selectedFaq" class="stroke-p7 w-[14px] min-w-[14px]"/>
        </div>
        <div v-text="faq?.awnser" class="text-t6 text-xs laptop:text-base" ref="faqAwnser"/>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  data: Array,
})
const selectedFaq = ref(-1)
const faqRef = ref([])
const faqQuestion = ref([])
const faqAwnser = ref([])

const manageFaq = (index) => {
  if (index == selectedFaq.value) {
    selectedFaq.value = -1
    faqRef.value[index].style.height = faqQuestion.value[index].clientHeight + 24 + 'px'
  } else {
    faqRef.value.forEach((element, index) => {
      element.style.height = faqQuestion.value[index].clientHeight + 24 + 'px'
    });
    selectedFaq.value = index
    faqRef.value[index].style.height = faqQuestion.value[index].clientHeight + faqAwnser.value[index].clientHeight + 48 + 'px'
  }
}
onMounted(() => {
  faqRef.value.forEach((element, index) => {
    element.style.height = faqQuestion.value[index].clientHeight + 24 + 'px'
  });
})
</script>