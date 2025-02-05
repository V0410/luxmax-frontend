<template>
  <div>
    <BaseModal
      type="left"
      hasClose
      isDesktopOnly
      size="l"
      :isShow="isShow"
      @close="$emit('close')"
      :title="itemToShow.status?.title || $t('Item Details')"
      :desc="itemToShow.status?.desc || ''"
    >
      <template #body>
        <div class="flex flex-col">
          <div class="flex flex-col gap-8">
            <div class="py-4 flex justify-between gap-4">
              <div class="flex items-center gap-4">
                <NuxtImg alt=""
                  class="h-[100px] w-[100px]"
                  :src="itemToShow.itemData.img"
                  format="webp"
                  quality="100"
                />
                <div class="flex flex-col gap-2 justify-center">
                  <div
                    class="font-medium text-xs text-t6"
                    v-text="itemToShow.itemData.brand"
                  />
                  <div
                    class="font-medium text-xs text-t9"
                    v-text="itemToShow.itemData.shortName"
                  />
                  <div
                    class="text-[10px] text-t4"
                    v-text="itemToShow.itemData.details.join(' - ')"
                  />
                </div>
              </div>
              <div v-if="itemToShow.itemData.cost" class="bg-p1 bg-opacity-50 p-4 min-w-[216px] rounded-lg text-t6 text-xs flex flex-col justify-between">
                <div class="flex justify-between">
                  <div v-text="$t('Cost of repairs')" />
                  <div v-text="itemToShow.itemData.cost.repair ? '£' + itemToShow.itemData.cost.repair : '-'" />
                </div>
                <div class="flex justify-between">
                  <div v-text="$t('You have already paid')" />
                  <div v-text="itemToShow.itemData.cost.paid ? '£' + itemToShow.itemData.cost.paid : '-'" />
                </div>
                <div class="border-b border-t1" />
                <div class="flex justify-between">
                  <div v-text="$t('Remaining')" />
                  <div v-text="itemToShow.itemData.cost.paid && itemToShow.itemData.cost.repair  ? '£' + (+itemToShow.itemData.cost.repair - +itemToShow.itemData.cost.paid) : '-'" />
                </div>
              </div>
            </div>
            <div v-if="itemToShow.status.value" class="flex flex-col gap-4">
              <div
                class="text-t10 font-medium text-sm"
                v-text="$t('Product State')"
              />
              <AccountProductState
                :currentState="itemToShow.status.value"
                :states="productStates"
              />
            </div>
            <div
              v-if="
                itemToShow.itemData.productDetails &&
                Array.isArray(itemToShow.itemData.productDetails) &&
                itemToShow.itemData.productDetails.length > 0
              "
              class="flex flex-col gap-4"
            >
              <div
                class="text-t10 font-medium text-sm"
                v-text="$t('Product Details')"
              />
              <ul class="list-disc ms-4 text-sm font-light">
                <li
                  v-for="item in itemToShow.itemData.productDetails"
                  :key="item"
                  v-text="item"
                />
              </ul>
            </div>
          </div>
        </div>
      </template>
    </BaseModal>
    <BaseBottomSheet
      isMobileOnly
      :isShow="isShow"
      @close="$emit('close')"
      :title="itemToShow.status?.title || $t('Item Details')"
      :desc="itemToShow.status?.desc || ''"
    >
      <template #body>
        <div class="flex flex-col text-start">
          <div class="flex flex-col gap-6">
            <div class="py-4 flex flex-col gap-4">
              <div class="flex items-center  gap-4">
                <NuxtImg alt=""
                  class="h-[100px] w-[100px]"
                  :src="itemToShow.itemData.img"
                  format="webp"
                  quality="100"
                />
                <div class="flex flex-col gap-2 justify-center">
                  <div
                    class="font-medium text-xs text-t6"
                    v-text="itemToShow.itemData.brand"
                  />
                  <div
                    class="font-medium text-xs text-t9"
                    v-text="itemToShow.itemData.shortName"
                  />
                  <div
                    class="text-[10px] text-t4"
                    v-text="itemToShow.itemData.details.join(' - ')"
                  />
                </div>
              </div>
              <div v-if="itemToShow.itemData.cost" class="bg-p1 bg-opacity-50 p-4 laptop:min-w-[216px] gap-6 rounded-lg text-t6 text-xs flex flex-col justify-between">
                <div class="flex justify-between">
                  <div v-text="$t('Cost of repairs')" />
                  <div v-text="itemToShow.itemData.cost.repair ? '£' + itemToShow.itemData.cost.repair : '-'" />
                </div>
                <div class="flex justify-between">
                  <div v-text="$t('You have already paid')" />
                  <div v-text="itemToShow.itemData.cost.paid ? '£' + itemToShow.itemData.cost.paid : '-'" />
                </div>
                <div class="border-b border-t1" />
                <div class="flex justify-between">
                  <div v-text="$t('Remaining')" />
                  <div v-text="itemToShow.itemData.cost.paid && itemToShow.itemData.cost.repair  ? '£' + (+itemToShow.itemData.cost.repair - +itemToShow.itemData.cost.paid) : '-'" />
                </div>
              </div>
            </div>
            <div v-if="itemToShow.status.value" class="flex flex-col gap-4">
              <div
                class="text-t10 font-medium text-sm"
                v-text="$t('Product State')"
              />
              <AccountProductState
                :currentState="itemToShow.status.value"
                :states="productStates"
              />
            </div>
            <div
              v-if="
                itemToShow.itemData.productDetails &&
                Array.isArray(itemToShow.itemData.productDetails) &&
                itemToShow.itemData.productDetails.length > 0
              "
              class="flex flex-col gap-4"
            >
              <div
                class="text-t10 font-medium text-sm"
                v-text="$t('Product Details')"
              />
              <ul class="list-disc ms-4 text-sm font-light">
                <li
                  v-for="item in itemToShow.itemData.productDetails"
                  :key="item"
                  v-text="item"
                />
              </ul>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <div class="flex flex-col gap-5"></div>
          <BaseButton
            :text="$t('Cancel')"
            styleType="outlined"
            size="s"
            class="mt-10"
            @click="$emit('close')"
          />
        </div>
      </template>
    </BaseBottomSheet>
  </div>
</template>

<script setup>
defineProps({
  isShow: Boolean,
  itemToShow: Object,
});

const emits = defineEmits(["close"]);

const { t } = useI18n();

const productStates = [
  { id: 0, text: t("On the way"), value: "on the way" },
  { id: 1, text: t("Received"), value: "received" },
  { id: 2, text: t("Expert review"), value: "expert review" },
  { id: 3, text: t("Repair"), value: "repair" },
  { id: 4, text: t("Ready for use"), value: "ready for use" },
  { id: 5, text: t("Delivered"), value: "delivered" },
];
</script>
