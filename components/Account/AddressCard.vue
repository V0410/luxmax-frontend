<template>
  <div
    class="border rounded-lg flex flex-col w-[360px] min-w-[360px] overflow-hidden"
    :class="isSelected ? 'border-p7 ' : ' border-p1'"
  >
    <!-- <div class="p-4 bg-p1 flex justify-between">
      <div class="flex gap-2.5">
        <BaseInputRadio :modelValue="isSelected" hasIcon name="default" noUpdate />
        <div
          class="text-p7 text-sm font-medium"
          v-text="$t('Set as Default')"
        />
      </div>
      <IconPencil class="w-5 h-5 fill-p7" />
    </div> -->
    <div class="p-4 flex flex-col justify-between h-full gap-6">
      <div class="flex flex-col gap-2">
        <div class="text-t4 font-medium text-sm" v-text="$t('Address:')" />
        <div
          class="text-t8 font-medium text-sm"
          v-text="data.text"
        />
      </div>
      <div class="flex flex-col gap-2">
        <div class="text-t4 font-medium text-sm" v-text="$t('Postal Code:')" />
        <div class="text-t8 font-medium text-sm" v-text="data.postalCode" />
      </div>
    </div>
  </div>
</template>


<script setup>
defineProps({
    data: Object,
    isSelected: Boolean
})
</script>
