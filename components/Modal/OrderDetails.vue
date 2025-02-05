<template>
  <div>
    <BaseModal
      type="left"
      hasIcon
      hasClose
      isDesktopOnly
      size="l"
      :isShow="isShow"
      @close="$emit('close')"
      :title="$t('Order Details')"
      :desc="$t('Stay Informed with Order Details')"
    >
      <template #body>
        <div class="flex flex-col">
          <div class="flex flex-col gap-8">
            <div
              class="flex justify-between items-center border border-p2 pe-10 text-xs"
            >
              <div class="flex items-center">
                <NuxtImg alt=""
                  v-if="orderToShow.item?.img"
                  :src="orderToShow.item.img"
                  format="webp"
                  quality="100"
                  class="w-24 me-2"
                />
                <div class="flex flex-col gap-2">
                  <div class="flex gap-2">
                    <div v-text="orderToShow.item.text" />
                    <template v-if="orderToShow.item.options">
                      <template
                        v-for="option in orderToShow.item.options"
                        :key="option"
                      >
                        <div class="border-r border-t1" />
                        <div class="text-t4 text-xs" v-text="option" />
                      </template>
                    </template>
                  </div>
                  <div
                    class="text-xs text-t5 text-[10px]"
                    v-text="orderToShow.item.desc"
                  />
                </div>
              </div>
              <div>
                <BaseBadge
                  :text="orderToShow.condition.badge"
                  size="s"
                  :color="orderToShow.condition.color"
                />
              </div>
              <div>
                <div v-text="orderToShow.price.value.toLocaleString() + ' £'" />
              </div>
            </div>
            <div class="flex flex-col gap-10 text-sm text-t8">
              <div class="flex justify-between">
                <div class="flex gap-4">
                  <div class="text-t10" v-text="$t('Order Date')" />
                  <div v-text="dateToShow(orderToShow.date.value)" />
                </div>
                <div class="flex gap-4">
                  <div class="text-t10" v-text="$t('Order Number')" />
                  <div v-text="orderToShow.orderNumber" />
                </div>
              </div>
              <div class="flex flex-col gap-4">
                <div class="text-t10" v-text="$t('Delivery Address')" />
                <div
                  class="flex flex-wrap"
                  v-if="
                    orderToShow.deliveryAddress &&
                    Array.isArray(orderToShow.deliveryAddress) &&
                    orderToShow.deliveryAddress.length > 0
                  "
                >
                  <template
                    v-for="(item, i) in orderToShow.deliveryAddress"
                    :key="item"
                  >
                    <div v-text="item" />
                    <div
                      v-if="i < orderToShow.deliveryAddress.length - 1"
                      class="border-r border-t1 mx-3"
                    />
                  </template>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="text-t10" v-text="$t('Zip Code')" />
                <div v-text="orderToShow.zipCode" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </BaseModal>
    <BaseBottomSheet
      isMobileOnly
      :isShow="isShow"
      @close="$emit('close')"
      :title="$t('Order Details')"
    >
      <template #body>
        <div class="flex flex-col">
          <div class="flex flex-col gap-5">
            <div class="border border-p2 text-xs">
              <div class="flex items-center justify-center flex-col mx-6 mb-4 gap-5">
                <NuxtImg alt=""
                  v-if="orderToShow.item?.img"
                  :src="orderToShow.item.img"
                  format="webp"
                  quality="100"
                  class="w-[120px]"
                />
                <div class="flex justify-between text-start w-full">
                  <div class="flex flex-col gap-2">
                    <div v-text="orderToShow.item.text" />
                    <div
                      class="text-xs text-t5 text-[10px]"
                      v-text="orderToShow.item.desc"
                    />
                  </div>
                  <div class="flex justify-end flex-col text-end gap-2">
                    <div
                      v-text="orderToShow.price.value.toLocaleString() + ' £'"
                    />
                    <BaseBadge
                      :text="orderToShow.condition.badge"
                      size="s"
                      :color="orderToShow.condition.color"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-8 text-sm text-t8">
              <div class="flex gap-4">
                  <div class="text-t10" v-text="$t('Order Date')" />
                  <div v-text="dateToShow(orderToShow.date.value)" />
                </div>
                <div class="flex gap-4">
                  <div class="text-t10" v-text="$t('Order Number')" />
                  <div v-text="orderToShow.orderNumber" />
                </div>
              <div class="flex flex-col gap-4 text-start">
                <div class="text-t10" v-text="$t('Delivery Address')" />
                <div
                  class="grid grid-cols-2"
                  v-if="
                    orderToShow.deliveryAddress &&
                    Array.isArray(orderToShow.deliveryAddress) &&
                    orderToShow.deliveryAddress.length > 0
                  "
                >
                  <template
                    v-for="(item, i) in orderToShow.deliveryAddress"
                    :key="item"
                  >
                    <div  v-text="item"
                    :class="i % 2 === 1 ? 'text-end' : ''"
                     />
                  </template>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="text-t10" v-text="$t('Zip Code')" />
                <div v-text="orderToShow.zipCode" />
              </div>
            </div>
          </div>
          <BaseButton :text="$t('Cancel')" styleType="outlined" size="s" class="mt-10" @click="$emit('close')" />
        </div>
      </template>
    </BaseBottomSheet>
    </div>
</template>

<script setup>
defineProps({
    isShow: Boolean,
    orderToShow: Object
});
const emits = defineEmits(["close"]);

const dateToShow = (date) => {
  const newDate = new Date(date);
  return newDate.toDateString().split(" ").splice(1).join(" ");
};
</script>
