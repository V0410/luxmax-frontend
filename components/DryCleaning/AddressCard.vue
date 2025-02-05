<template>
  <div
    class="rounded-2xl p-6 flex flex-col justify-between text-white w-2/5 min-w-[40%] aspect-[1.57] tablet:w-[2/5] tablet:min-w-[200px]"
    :class="isSelected ? 'border-2 border-p7 bg-p1' : 'bg-[#F1F4F180] border border-p1'"
  >
  
    <div class="flex-col gap-2">
      <div v-text="$t('Address:')" class="text-sm text-t4"/>
      <div v-text="data?.address" class="text-sm text-t8"/>
    </div>
    <div class="flex-col gap-2">
      <div v-text="$t('Postal Code:')" class="text-sm text-t4"/>
      <div v-text="data?.postalCode" class="text-sm text-t8"/>
    </div>
  </div>
</template>

<script setup> 
const props = defineProps({
  data: Object,
  colorIndex: Number,
  isSelected: Boolean,
});
</script>