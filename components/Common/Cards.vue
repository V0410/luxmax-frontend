<template>
  <BaseFoldable class="flex flex-col" isAlwaysOpen>
    <template #title>
      <div class="flex items-center w-full">
        <div
          class="text-p8 font-semibold text-lg leading-10 bg-white pe-6"
          v-text="title || $t('My Card')"
        />
        <div class="border-b border-t1 flex-grow" />
        <div
          v-if="cards && Array.isArray(cards) && cards.length > 0"
          @click="toggleAddCardModal"
          class="text-p7 fill-p7 cursor-pointer text-sm bg-white ps-6 flex items-center gap-1"
          id="new-card"
        >
          <IconPlus class="w-4 h-4" />
          <div v-text="$t(`New Card`)" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="mt-6 laptop:mt-4">
        <template v-if="!cards || cards.length === 0">
          <div class="flex flex-col items-center justify-between h-full gap-8">
            <IconNoCard
              class="w-[120px] h-[120px] laptop:w-[200px] laptop:h-[200px]"
            />
            <div
              class="text-p8"
              v-text="$t('You have not added a bank card yet')"
            />
            <BaseButton
              :text="$t('New Card')"
              startIcon="IconPlus"
              @click="toggleAddCardModal"
              buttonId="new-card"
            />
          </div>
        </template>
        <template v-else>
          <div v-if="isSelectable" class="text-t9 mb-6" v-text="$t('Please select a card for continue')" />
          <div class="flex flex-col gap-8">
            <div id="cardsContainer" class="w-full flex flex-row items-center gap-6 overflow-x-auto">
              <BaseBankCard
                v-for="(card, i) in cards"
                :key="card.id"
                :id="`card-${i}`"
                :data="card"
                :colorIndex="i%3"
                :isSelected="isSelectable ? modelValue === card.id : false"
                :class="isSelectable ? 'cursor-pointer' : ''"
                @click="selectCard(card.id)"
                :isSelectable="isSelectable"
              />
            </div>
            <div
              v-if="cards.length > 1"
              class="flex gap-2 items-center justify-center laptop:justify-start"
            >
              <IconCaretUp
                class="w-8 h-8 p-1.5 fill-p7 cursor-pointer"
                @click="
                  selectedSlider <= 0
                    ? (selectedSlider = cards.length - 1)
                    : (selectedSlider = selectedSlider - 1)
                "
              />
              <div
                v-for="(item, i) in cards.length"
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
                  selectedSlider >= cards.length - 1
                    ? (selectedSlider = 0)
                    : (selectedSlider = selectedSlider + 1)
                "
              />
            </div>
          </div>
        </template>
      </div>
    </template>
  </BaseFoldable>
  <ModalAddCard
    v-if="isAddCardModalShow"
    :isShow="isAddCardModalShow"
    @close="isAddCardModalShow = false"
  />
</template>

<script setup>

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  title: String,
  modelValue: Number,
  cards: Array,
  isSelectable: Boolean
})

const selectedSlider = ref(0)

watch(() => selectedSlider.value, (newVal) => {
  const selectedCard = document.getElementById(`card-${newVal}`)
  const container = document.getElementById(`cardsContainer`)
  container.scrollTo({left: selectedCard?.offsetLeft -  container?.offsetLeft, behavior: 'smooth'})
})

const selectCard = (id) => {
  if(props.isSelectable){
    emits('update:modelValue', id)
  }
}

const isAddCardModalShow = ref(false);

const toggleAddCardModal = () => {
  isAddCardModalShow.value = !isAddCardModalShow.value;
};
</script>
