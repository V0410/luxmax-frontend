<template>
  <div
    class="rounded-2xl p-6 flex flex-col justify-between text-white w-4/5 min-w-[80%] aspect-[1.57] tablet:w-[343px] tablet:min-w-[343px]"
    :class="isSelected ? 'border-4 border-p7' : ''"
    :style="[
      isSelectable && !isSelected
        ? 'opacity: 0.7; background: lightgray 50%;'
        : colorIndex === 0
        ? 'background: linear-gradient(112deg, #FED4B4 0%, #3BB9A1 100%)'
        : colorIndex === 1
        ? 'background: linear-gradient(112deg, #BAE8FB 0%, #B2B1FD 100%)'
        : colorIndex === 2
        ? 'background: linear-gradient(112deg, #E77879 0%, #FBDDB3 100%)'
        : colorIndex === 3
        ? 'background: linear-gradient(112.91deg, rgba(255, 255, 255, 0.51) 3.51%, rgba(255, 255, 255, 0) 111.71%); linear-gradient(110.65deg, #FFFFFF 1.16%, rgba(255, 255, 255, 0.2) 100%); border: 1px solid; border-image-source: linear-gradient(110.65deg, #FFFFFF 1.16%, rgba(255, 255, 255, 0.2) 100%); box-shadow: 8px 10px 16px 0px #0000000D;'
        : '',
    ]"
  >
    <template v-if="type === 1">
      <div class="flex justify-between">
        <IconViewer v-if="cardTypeComputed" :name="cardTypeComputed" class="h-[48px]" />
        <div v-else class="font-bold" v-text="data?.bank || $t('Untitled.')" />
        <IconTempBankLogo class="h-6 w-6 hidden" />
      </div>
      <div
        v-text="data?.cardNumber?.replace(/^.{2}/g, '**').match(/.{1,4}/g)?.join(' ')"
        class="font-semibold laptop:font-bold text-lg laptop:text-2xl"
      />
      <div class="flex justify-between items-center">
        <div>
          <div v-text="$t('Card Holder Name')" class="text-xs" />
          <div v-text="data.cardName" class="font-bold text-sm" />
        </div>
        <div>
          <div v-text="$t('Expired Date')" class="text-xs" />
          <div v-text="data.expiry" class="font-bold text-sm" />
        </div>
      </div>
    </template>
    <template v-else-if="type === 2">
      <div class="flex justify-between">
        <IconViewer v-if="cardTypeComputed" :name="cardTypeComputed" />
        <div v-else class="font-bold" v-text="data?.bank || $t('Untitled.')" />
        <IconTempBankLogo class="h-6 w-6 hidden" />
      </div>
      <div class="flex gap-12 items-end">
        <div class="flex flex-grow flex-col gap-2">
          <div class="flex justify-between items-center">
            <div
              v-text="data?.cardName || '---'"
              class="font-semibold text-xs tracking-[.05em] uppercase"
            />
            <div
              v-text="data?.expiry || '--/--'"
              class="font-semibold text-xs"
            />
          </div>
          <div
            class="font-medium text-sm laptop:text-base flex justify-between items-center laptop:tracking-[.1em]"
          >
            <div
              v-text="
                data?.cardNumber?.match(/.{1,4}/g)?.join(' ') ||
                `---- ---- ---- ----`
              "
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
  colorIndex: Number,
  type: {
    type: Number,
    default: 1,
  },
  isSelected: Boolean,
  isSelectable: Boolean,
});

const cardTypeComputed = computed(() => {
    if(props.data?.cardNumber){
        if(props.data?.cardNumber.startsWith('3')){
            return 'IconAmex'
        }else if(props.data?.cardNumber.startsWith('4')){
            return 'IconVisa'
        }else if(props.data?.cardNumber.startsWith('5')){
            return 'IconMaster'
        }else if(props.data?.cardNumber.startsWith('6')){
            return 'IconDiscover'
        }else {
            return null
        }
    }else {
        return null
    }
})

const dateToShow = (date) => {
  if (!date) {
    return null;
  }
  const [year, month] = date.split("-");
  return month + "/" + year.split("")[2] + year.split("")[3];
};
</script>
